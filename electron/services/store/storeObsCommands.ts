// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { ObsController, ObsControllerCommand, ObsSceneSwitch } from '../../../frontend/src/lib/models/types/obsTypes';
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';
import { InGameState, LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import { PlayerController } from '../../../frontend/src/lib/models/types/controller';
import { ElectronPlayersStore } from './storePlayers';
import { ElectronSettingsStore } from './storeSettings';
import { ObsWebSocket } from '../obs';
import { MessageHandler } from '../messageHandler';
import { newId } from '../../utils/functions';
import { ElectronLiveStatsStore } from './storeLiveStats';

@singleton()
export class ElectronObsCommandStore {
    private store: Store = new Store();
    private controllerCommands: ObsControllerCommand[] = []
    private controllerCommandState: boolean = false;
    private commandTimeout: boolean = false;
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject('LocalEmitter') private localEmitter: TypedEmitter,
        @inject('SvelteEmitter') private svelteEmitter: TypedEmitter,

        @inject(ObsWebSocket) private obsWebSocket: ObsWebSocket,
        @inject(ElectronPlayersStore) private storePlayer: ElectronPlayersStore,
        @inject(ElectronSettingsStore) private storeSettings: ElectronSettingsStore,
        @inject(ElectronLiveStatsStore) private storeLiveStats: ElectronLiveStatsStore,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Command Store")
        this.initListeners();
        this.initEventListeners();
        this.init()
    }

    getObsController(): ObsController {
        return this.store.get('obs.command.controller') as ObsController
    }

    setObsController(controller: ObsController) {
        this.store.set('obs.command.controller', controller)
        this.controllerCommands = controller.inputCommands as ObsControllerCommand[];
        this.controllerCommandState = controller.enabled as boolean;
    }

    getObsControllerCommandInputs(): ObsControllerCommand[] {
        return this.controllerCommands ?? [];
    }

    addObsControllerCommand(command: ObsControllerCommand) {
        const commands = this.getObsControllerCommandInputs()
        console.log(commands)
        console.log(command)
        this.store.set('obs.command.controller.inputCommands', [...commands, { ...command, id: newId() }])
    }

    deleteObsControllerCommand(commandId: string) {
        const commands = this.getObsControllerCommandInputs() ?? [];
        return this.store.set('obs.command.controller.inputCommands', commands.filter(command => command.id !== commandId))
    }

    getObsControllerCommandsState(): boolean {
        return this.controllerCommandState ?? false;
    }

    toggleObsControllerCommandsState() {
        const state = this.store.get('obs.command.controller.enabled') as boolean ?? false;
        this.store.set('obs.command.controller.enabled', !state)
    }

    getObsSceneSwitch(): ObsSceneSwitch {
        return this.store.get('obs.command.sceneSwitch') as ObsSceneSwitch ?? {
            [LiveStatsScene.WaitingForDolphin]: { sceneName: "", delay: 0 },
            [LiveStatsScene.Menu]: { sceneName: "", delay: 0 },
            [LiveStatsScene.InGame]: { sceneName: "", delay: 0 },
            [LiveStatsScene.PostGame]: { sceneName: "", delay: 0 },
            [LiveStatsScene.PostSet]: { sceneName: "", delay: 0 },
            [LiveStatsScene.RankChange]: { sceneName: "", delay: 0 },
        }
    }

    setObsSceneSwitch(value: ObsSceneSwitch) {
        this.store.set('obs.command.sceneSwitch', value)
    }

    private init() {
        this.controllerCommands = this.store.get('obs.command.controller.inputCommands') as ObsControllerCommand[] ?? [];
        this.controllerCommandState = this.store.get('obs.command.controller.enabled') as boolean ?? false;
    }

    private handleControllerCommand = (playerControllerInputs: PlayerController) => {
        if (!this.getObsControllerCommandsState()) return;
        if (this.commandTimeout) return;
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        const players = this.storePlayer.getCurrentPlayers();
        const player = players?.find(player => player.connectCode === connectCode)
        if (players?.some(player => player.connectCode) && !player) return;

        const isGameActive = [InGameState.Inactive, InGameState.End, InGameState.Time, InGameState.Tie].includes(this.storeLiveStats.getGameState());
        const lowestActiveControllerIndex = Number(Object.entries(playerControllerInputs).find(controller => controller[1].isConnected)?.[0]) ?? 0
        const lowestIndex = isGameActive ? players?.sort((a, b) => a.port - b.port).at(0)?.playerIndex ?? 0 : lowestActiveControllerIndex

        const controllerInputs = playerControllerInputs[player?.playerIndex ?? lowestIndex].buttons
        const controllerCommand = this.controllerCommands.find(command => command.inputs === controllerInputs)
        if (!controllerCommand) return;

        this.obsWebSocket.executeCommand(controllerCommand.command, controllerCommand.payload)
        this.commandTimeout = true;
        setTimeout(() => {
            this.commandTimeout = false;
        }, 1000)
    }

    private initEventListeners() {
        this.localEmitter.on("MemoryControllerInput", (controllerInputs) => {
            this.handleControllerCommand(controllerInputs)
        })
        this.localEmitter.on("LiveStatsSceneChange", (scene: LiveStatsScene) => {
            const sceneConfig = this.getObsSceneSwitch()
            const obsScene = sceneConfig[scene]
            if (!obsScene || !obsScene.sceneName) return;
            this.obsWebSocket.executeCommand("SetCurrentProgramScene", { sceneName: obsScene.sceneName })
        })
        this.svelteEmitter.on("ObsSceneSwitchUpdate", (options: ObsSceneSwitch) => {
            this.setObsSceneSwitch(options)
        })
        this.svelteEmitter.on("ObsControllerCommandAdd", (command: ObsControllerCommand) => {
            this.addObsControllerCommand(command)
        })
        this.svelteEmitter.on("ObsControllerCommandDelete", (commandId: string) => {
            this.deleteObsControllerCommand(commandId)
        })
        this.svelteEmitter.on("ObsControllerCommandStateToggle", () => {
            this.toggleObsControllerCommandsState()
        })
    }

    private initListeners() {
        this.store.onDidChange("obs.command.controller", (value) => {
            const controller = value as ObsController;
            this.setObsController(controller)
            this.messageHandler.sendMessage("ObsControllerCommand", value as ObsController)
        })
        this.store.onDidChange('obs.command.sceneSwitch', (value) => {
            this.messageHandler.sendMessage("ObsSceneSwitch", value as ObsSceneSwitch)
        })
    }
}
