// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { ObsControllerCommand, ObsSceneSwitch } from '../../../frontend/src/lib/models/types/obsTypes';

@singleton()
export class ElectronObsCommandStore {
    store: Store = new Store();
    controllerCommands: ObsControllerCommand[] = []
    sceneSwitches: ObsSceneSwitch;
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        //@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Store")
        this.initListeners();
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

    getObsSceneSwitch() {
        return
    }

    setObsSceneSwitch() {
        return
    }

    private init() {
        this.controllerCommands = this.store.get('obs.command.controller') as ObsControllerCommand[] ?? [];
    }


    initListeners() {
        this.store.onDidChange("obs.command.controller", (value) => {
            console.log(value)
            //this.messageHandler.sendMessage("ObsControllerCommands", value as ObsControllerCommand[]);
        })

    }
}
