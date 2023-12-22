// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { ObsControllerCommand, ObsSceneSwitch } from '../../../frontend/src/lib/models/types/obsTypes';
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';
import { LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import { PlayerController } from '../../../frontend/src/lib/models/types/controller';
import { ElectronPlayersStore } from './storePlayers';
import { ElectronSettingsStore } from './storeSettings';
import { ObsWebSocket } from '../obs';

@singleton()
export class ElectronObsCommandStore {
    private store: Store = new Store();
    private controllerCommands: ObsControllerCommand[] = []
    private commandTimeout: boolean = false;
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject('LocalEmitter') private localEmitter: TypedEmitter,

        @inject(ObsWebSocket) private obsWebSocket: ObsWebSocket,
        @inject(ElectronPlayersStore) private storePlayer: ElectronPlayersStore,
        @inject(ElectronSettingsStore) private storeSettings: ElectronSettingsStore,
        //@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Command Store")
        this.initListeners();
        this.initEventListeners();
        this.init()
    }

    getObsControllerCommands(): ObsControllerCommand[] | undefined {
        return this.controllerCommands;
    }

    addObsControllerCommand(command: ObsControllerCommand) {
        const commands = this.getObsControllerCommands() ?? [];
        return this.store.set('obs.command.controller', [...commands, command]);
    }

    deleteObsControllerCommand(commandId: string) {
        const commands = this.getObsControllerCommands() ?? [];
        return this.store.set('obs.command.controller', commands.filter(command => command.id !== commandId))
    }

    getObsSceneSwitch(): ObsSceneSwitch {
        return this.store.get('obs.command.sceneSwitch') as ObsSceneSwitch ?? {}
    }

    setObsSceneSwitch(value: ObsSceneSwitch) {
        this.store.set('obs.command.sceneSwitch', value)
    }

    private init() {
        this.controllerCommands = this.store.get('obs.command.controller') as ObsControllerCommand[] ?? [];
    }

    private handleControllerCommand = (playerControllerInputs: PlayerController) => {
        if (this.commandTimeout) return;
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        const players = this.storePlayer.getCurrentPlayers();
        const player = players?.find(player => player.connectCode === connectCode)
        const lowestIndex = players?.sort((a, b) => a.port - b.port).at(0)?.playerIndex ?? 0
        const controllerInputs = playerControllerInputs[player?.playerIndex ?? lowestIndex]
        const controllerCommand = this.controllerCommands.find(command => command.inputs === controllerInputs)?.command
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
            if (!obsScene) return;
            this.obsWebSocket.executeCommand("SetCurrentProgramScene", { sceneName: obsScene })
        })
    }

    private initListeners() {
        this.store.onDidChange("obs.command.controller", (value) => {
            this.controllerCommands = value as ObsControllerCommand[];
        })
    }
}
