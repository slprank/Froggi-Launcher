// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { ObsControllerCommand, ObsSceneSwitch } from '../../../frontend/src/lib/models/types/obsTypes';
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';
import { ObsWebSocket } from 'services/obs';
import { LiveStatsScene } from '../../../frontend/src/lib/models/enum';

@singleton()
export class ElectronObsCommandStore {
    private store: Store = new Store();
    private controllerCommands: ObsControllerCommand[] = []
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject('LocalEmitter') private localEmitter: TypedEmitter,

        @inject(delay(() => ObsWebSocket)) private obsWebSocket: ObsWebSocket,
        //@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Store")
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

    private initEventListeners() {
        this.localEmitter.on("MemoryControllerInput", (controllerInputs) => {
            const controllerCommand = this.controllerCommands.find(command => command.inputs === controllerInputs)?.command
            if (!controllerCommand) return;
            this.obsWebSocket.executeCommand(controllerCommand.command, controllerCommand.payload)
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
