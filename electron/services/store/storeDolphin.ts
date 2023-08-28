// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import os from 'os';


@singleton()
export class ElectronDolphinStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") public log: ElectronLog,
        @inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
    ) {
        this.initListeners();
    }

    // TODO: Add enum
    getDolphinConnectionStatus() {
        return this.store.get('dolphin.status');
    }

    setDolphinConnectionStatus(status: any) {
        return this.store.set('dolphin.status', status);
    }

    initListeners() {
        this.store.onDidChange(`dolphin.status`, async (value) => {
            this.messageHandler.sendMessage('dolphin_status', value);
        })
    }
}
