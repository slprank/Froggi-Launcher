// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { Player } from '../../../frontend/src/lib/models/types/slippiData';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { PlayerType } from '@slippi/slippi-js';
import os from 'os';


@singleton()
export class ElectronPlayersStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Players Store")
        this.initListeners();
    }

    getCurrentPlayers(): Player[] | undefined {
        return this.store.get('stats.currentPlayers') as Player[];
    }

    setCurrentPlayers(players: (Player | PlayerType)[]) {
        this.store.set('stats.currentPlayers', players?.filter(player => player));
    }

    initListeners() {
        this.store.onDidChange(`stats.currentPlayers`, async (value) => {
            this.messageHandler.sendMessage('current_players', value);
        })
    }
}
