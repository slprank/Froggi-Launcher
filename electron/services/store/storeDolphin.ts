// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import os from 'os';
import { ConnectionState } from '../../../frontend/src/lib/models/enum';


@singleton()
export class ElectronDolphinStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject("ElectronStore") private store: Store,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Dolphin Store")
        this.initListeners();
    }

    getDolphinConnectionState(): ConnectionState | undefined {
        return this.store.get('dolphin.connection.state') as ConnectionState;
    }

    setDolphinConnectionState(state: ConnectionState) {
        return this.store.set('dolphin.connection.state', state);
    }

    initListeners() {
        this.store.onDidChange(`dolphin.connection.state`, async (value) => {
            this.messageHandler.sendMessage("DolphinConnectionState", value as ConnectionState);
        })
    }
}
