// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { CurrentPlayer, RankedNetplayProfile } from '../../../frontend/src/lib/models/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import os from 'os';
import { ElectronSettingsStore } from './storeSettings';
import { LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import { ElectronLiveStatsStore } from './storeLiveStats';


@singleton()
export class ElectronRankStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    listeners: Function[];
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") public log: ElectronLog,
        @inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
        @inject(delay(() => ElectronLiveStatsStore)) public storeLiveStats: ElectronLiveStatsStore,
        @inject(delay(() => ElectronSettingsStore)) public storeSettings: ElectronSettingsStore,
    ) {
        this.initPlayerListener();
        this.initListeners(this.storeSettings.getCurrentPlayer())
    }

    // Rank
    getCurrentPlayerCurrentRankStats(): RankedNetplayProfile | undefined {
        const player = this.storeSettings.getCurrentPlayer();
        if (!player) return;
        return this.store.get(`player.${player.connectCode}.rank.rankedNetplayProfile`) as RankedNetplayProfile;
    }

    setCurrentPlayerCurrentRankStats(rankStats: RankedNetplayProfile | undefined) {
        const player = this.storeSettings.getCurrentPlayer();
        if (!rankStats || !player) return;
        this.store.set(`player.${player.connectCode}.rank.rankedNetplayProfile`, rankStats);
    }

    setCurrentPlayerNewRankStats(rankStats: RankedNetplayProfile | undefined) {
        const player = this.storeSettings.getCurrentPlayer();
        if (!rankStats || !player) return;
        this.store.set(`player.${player.connectCode}.rank.prevRankedNetplayProfile`, player.rankedNetplayProfile)
        this.store.set(`player.${player.connectCode}.rank.newRankedNetplayProfile`, rankStats);
        this.updateCurrentPlayerRankHistory(rankStats);
    }

    getPlayerRankHistory(): RankedNetplayProfile[] | undefined {
        const player = this.storeSettings.getCurrentPlayer();
        if (!player) return;
        return this.store.get(`player.${player.connectCode}.rank.history`) as RankedNetplayProfile[];
    }

    updateCurrentPlayerRankHistory(rankStats: RankedNetplayProfile) {
        const player = this.storeSettings.getCurrentPlayer();
        let history = this.getPlayerRankHistory();
        if (!rankStats || !player || !history) return;
        history.push(rankStats)
        this.store.set(
            `player.${player.connectCode}.rank.history`,
            history,
        );
    }

    private initPlayerListener() {
        this.store.onDidChange('settings.currentPlayer', async (player) => {
            this.unsubscribeListeners()
            this.initListeners(player as CurrentPlayer)
        })
    }

    async handleRankChange() {
        const player = this.storeSettings.getCurrentPlayer()
        if (!player) return
        await new Promise((resolve) => {
            if (player.rankedNetplayProfile !== player.newRankedNetplayProfile) this.storeLiveStats.setStatsScene(LiveStatsScene.RankChange)
            setTimeout(resolve, 10000);
        });
        this.setCurrentPlayerCurrentRankStats(player.newRankedNetplayProfile);
        this.storeLiveStats.setStatsScene(LiveStatsScene.PostGame)
    }

    // TODO:
    private initListeners(player: CurrentPlayer | undefined) {
        if (!player) return;
        this.listeners = [
            this.store.onDidChange(`player.${player.connectCode}.rank.prevRankedNetplayProfile`, (value) => {
                console.log(value)
                // Emit to svelte
            }),
            this.store.onDidChange(`player.${player.connectCode}.rank.currentRankedNetplayProfile`, (value) => {
                console.log(value)
                // Emit to svelte
            }),
            this.store.onDidChange(`player.${player.connectCode}.rank.newRankedNetplayProfile`, (value) => {
                console.log(value)
                // Emit to svelte
            }),
            this.store.onDidChange(`settings.currentPlayer.newRankedNetplayProfile`, async () => {
                await this.handleRankChange()
            })
        ]
    }

    private unsubscribeListeners() {
        this.listeners.forEach(unsubscribe => unsubscribe())
    }
}
