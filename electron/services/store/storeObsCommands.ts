// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { Obs, ObsConnection, ObsControllerCommand } from '../../../frontend/src/lib/models/types/obsTypes';

@singleton()
export class ElectronObsCommandStore {
    store: Store = new Store();
    commands: ObsControllerCommand[] = []
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Store")
        this.initListeners();
    }

    getObsControllerCommands(): ObsControllerCommand[] | undefined {
        return this.store.get('obs.command.controller') as ObsControllerCommand[];
    }

    addObsControllerCommand(command: ObsControllerCommand) {
        const commands = this.getObsControllerCommands() ?? [];
        return this.store.set('obs.command.controller', [...commands, command]);
    }

    deleteObsControllerCommand(commandId: string) {
        const commands = this.getObsControllerCommands() ?? [];
        return this.store.set('obs.command.controller', commands.filter(command => command.id !== commandId))
    }


    initListeners() {
        this.store.onDidChange("obs.auth", (value) => {
            this.messageHandler.sendMessage("Obs", value as Obs);
        })
        this.store.onDidChange("obs.connection", (connection) => {
            this.messageHandler.sendMessage("ObsConnection", { ...(connection as ObsConnection), auth: undefined } as ObsConnection);
        })
    }
}
