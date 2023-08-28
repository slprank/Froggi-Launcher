// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { CurrentPlayer, RankedNetplayProfile, Session } from '../../../frontend/src/lib/models/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import os from 'os';
import { ElectronSettingsStore } from './storeSettings';
import { dateTimeNow } from '../../utils/functions';


@singleton()
export class ElectronSessionStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    listeners: Function[];
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") public log: ElectronLog,
        @inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
        @inject(delay(() => ElectronSettingsStore)) public settingsStore: ElectronSettingsStore,
    ) {
        this.initPlayerListener();
        this.initListeners(this.settingsStore.getCurrentPlayer())
    }

    getSessionStats(): Session | undefined {
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return;
        return this.store.get(`player.${player.connectCode}.session`) as Session;
    }

    resetSessionStats() {
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return;
        let currentRankedStats = player.rankedNetplayProfile;
        if (!currentRankedStats) return;
        let session: Session = {
            startRankStats: currentRankedStats,
            startTime: dateTimeNow(),
            currentRankStats: currentRankedStats,
            latestUpdate: dateTimeNow(),
        };
        this.store.set(`player.${player.connectCode}.session`, session);
        return session;
    }

    updateSessionStats(rankStats: RankedNetplayProfile) {
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return;
        let session = this.getSessionStats() ?? this.resetSessionStats();
        if (!session) return;
        session.latestUpdate = dateTimeNow();
        session.currentRankStats = rankStats;
        this.store.set(`player.${player.connectCode}.session`, session);
    }

    private initPlayerListener() {
        this.store.onDidChange('settings.currentPlayer', async (player) => {
            this.unsubscribeListeners()
            this.initListeners(player as CurrentPlayer)
        })
    }

    // TODO:
    private initListeners(player: CurrentPlayer | undefined) {
        if (!player) return;
        this.listeners = [
            this.store.onDidChange(`player.${player.connectCode}.session`, (value) => {
                console.log(value)
                // Emit to svelte
            }),
        ]
    }

    private unsubscribeListeners() {
        this.listeners.forEach(unsubscribe => unsubscribe())
    }
}
