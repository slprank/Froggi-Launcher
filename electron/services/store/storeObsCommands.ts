// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import {
	CommandType,
	ObsController,
	ObsControllerCommand,
	ObsSceneSwitchCommands,
	Command,
} from '../../../frontend/src/lib/models/types/obsTypes';
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';
import { InGameState, LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import { PlayerController } from '../../../frontend/src/lib/models/types/controller';
import { ElectronPlayersStore } from './storePlayers';
import { ElectronSettingsStore } from './storeSettings';
import { ObsWebSocket } from '../obs';
import { MessageHandler } from '../messageHandler';
import { newId } from '../../utils/functions';
import { ElectronLiveStatsStore } from './storeLiveStats';
import { isNil } from 'lodash';
import { getOverlappingCommands } from '../../../frontend/src/lib/utils/controllerCommandHelper';

@singleton()
export class ElectronObsCommandStore {
	private store: Store = new Store();
	private controllerCommands: ObsControllerCommand[] = [];
	private controllerCommandState: boolean = false;
	private commandTimeout: boolean = false;
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('LocalEmitter') private localEmitter: TypedEmitter,
		@inject('ClientEmitter') private clientEmitter: TypedEmitter,

		@inject(ObsWebSocket) private obsWebSocket: ObsWebSocket,
		@inject(ElectronPlayersStore) private storePlayer: ElectronPlayersStore,
		@inject(ElectronSettingsStore) private storeSettings: ElectronSettingsStore,
		@inject(ElectronLiveStatsStore) private storeLiveStats: ElectronLiveStatsStore,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {
		this.log.info('Initializing Obs Command Store');
		this.initListeners();
		this.initEventListeners();
		this.init();
	}

	getObsController(): ObsController {
		return this.store.get('obs.command.controller') as ObsController;
	}

	setObsController(controller: ObsController) {
		this.store.set('obs.command.controller', controller);
		this.controllerCommands = controller.inputCommands as ObsControllerCommand[];
		this.controllerCommandState = controller.enabled as boolean;
	}

	getObsControllerCommandInputs(): ObsControllerCommand[] {
		return this.controllerCommands ?? [];
	}

	addObsControllerCommand(command: ObsControllerCommand) {
		const commands = this.getObsControllerCommandInputs();
		this.store.set('obs.command.controller.inputCommands', [
			...commands,
			{ ...command, id: newId() },
		]);
	}

	deleteObsControllerCommand(commandId: string) {
		const commands = this.getObsControllerCommandInputs() ?? [];
		return this.store.set(
			'obs.command.controller.inputCommands',
			commands.filter((command) => command.id !== commandId),
		);
	}

	getObsControllerCommandsState(): boolean {
		return this.controllerCommandState ?? false;
	}

	toggleObsControllerCommandsState() {
		const state = (this.store.get('obs.command.controller.enabled') as boolean) ?? false;
		this.store.set('obs.command.controller.enabled', !state);
	}

	getObsSceneCommands(): ObsSceneSwitchCommands {
		return (
			(this.store.get('obs.command.sceneSwitch') as ObsSceneSwitchCommands) ?? {
				[LiveStatsScene.WaitingForDolphin]: [],
				[LiveStatsScene.Menu]: [],
				[LiveStatsScene.InGame]: [],
				[LiveStatsScene.PostGame]: [],
				[LiveStatsScene.PostSet]: [],
				[LiveStatsScene.RankChange]: [],
			}

		);
	}

	getObsSceneCommandsByScene(scene: LiveStatsScene): Command[] {
		const commands = this.getObsSceneCommands();
		return commands[scene];
	}

	setObsSceneCommands(value: ObsSceneSwitchCommands) {
		this.store.set('obs.command.sceneSwitch', value);
	}

	private init() {
		this.controllerCommands =
			(this.store.get('obs.command.controller.inputCommands') as ObsControllerCommand[]) ??
			[];
		this.controllerCommandState =
			(this.store.get('obs.command.controller.enabled') as boolean) ?? false;
	}

	private getControllerIndex = (playerControllerInputs: PlayerController): number | undefined => {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		const players = this.storePlayer.getCurrentPlayers();
		const player = players?.find((player) => player.connectCode === connectCode);
		if (players?.some((player) => player.connectCode) && !player) return;
		const isGameActive = [InGameState.Running, InGameState.Paused].includes(
			this.storeLiveStats.getGameState(),
		);
		const lowestActiveControllerIndex = Number(
			Object.entries(playerControllerInputs)?.find(
				(controller) => controller[1].isConnected,
			)?.[0],
		);
		const lowestIndex = isGameActive
			? players?.sort((a, b) => a.port - b.port).at(0)?.playerIndex ?? 0
			: lowestActiveControllerIndex;

		return player?.playerIndex ?? lowestIndex;
	};

	private handleControllerCommand = (playerControllerInputs: PlayerController) => {
		if (!this.getObsControllerCommandsState()) return;
		if (this.commandTimeout) return;

		const controllerIndex = this.getControllerIndex(playerControllerInputs);

		if (isNil(controllerIndex)) return;

		const buttonInputs = playerControllerInputs?.[controllerIndex].buttons;

		const controllerCommands = getOverlappingCommands(this.controllerCommands, buttonInputs);
		if (!controllerCommands) return;

		controllerCommands.forEach((controllerCommand) => {
			this.obsWebSocket.executeCommand(CommandType.Obs, controllerCommand.command, controllerCommand.payload);
		});
		this.commandTimeout = true;
		setTimeout(() => {
			this.commandTimeout = false;
		}, 100);
	};

	private handleSceneChangeCommands = (commands: Command[]) => {
		commands?.forEach((command) => {
			this.obsWebSocket.executeCommand(command.type, command.requestType, command.payload);
		});
	}

	private initEventListeners() {
		this.localEmitter.on('MemoryControllerInput', (controllerInputs) => {
			this.handleControllerCommand(controllerInputs);
		});
		this.localEmitter.on('LiveStatsSceneChange', (scene: LiveStatsScene) => {
			const commands = this.getObsSceneCommandsByScene(scene);
			if (!commands) return;
			this.handleSceneChangeCommands(commands);
		});
		this.clientEmitter.on('ObsSceneSwitchAdd', (scene: LiveStatsScene, options: Command) => {
			const sceneCommands = this.getObsSceneCommands();
			sceneCommands[scene] = [...sceneCommands[scene], { ...options, id: newId() }];
			this.setObsSceneCommands(sceneCommands);
		});
		this.clientEmitter.on('ObsSceneSwitchDelete', (scene: LiveStatsScene, commandId: string) => {
			const sceneCommands = this.getObsSceneCommands();
			sceneCommands[scene] = sceneCommands[scene].filter((command) => command.id !== commandId);
			this.setObsSceneCommands(sceneCommands);
		});
		this.clientEmitter.on('ObsControllerCommandAdd', (command: ObsControllerCommand) => {
			this.addObsControllerCommand(command);
		});
		this.clientEmitter.on('ObsControllerCommandDelete', (commandId: string) => {
			this.deleteObsControllerCommand(commandId);
		});
		this.clientEmitter.on('ObsControllerCommandStateToggle', () => {
			this.toggleObsControllerCommandsState();
		});
	}

	private initListeners() {
		this.store.onDidChange('obs.command.controller', (value) => {
			const controller = value as ObsController;
			this.setObsController(controller);
			this.messageHandler.sendMessage('ObsControllerCommand', value as ObsController);
		});
		this.store.onDidChange('obs.command.sceneSwitch', (value) => {
			this.messageHandler.sendMessage('ObsSceneSwitch', value as ObsSceneSwitchCommands);
		});
	}
}
