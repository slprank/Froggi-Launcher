// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { CurrentPlayer, RankedNetplayProfile } from '../../../frontend/src/lib/models/types/slippiData';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import os from 'os';
import { ElectronSettingsStore } from './storeSettings';
import { LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import { ElectronLiveStatsStore } from './storeLiveStats';
import { MessageHandler } from '../messageHandler';


@singleton()
export class ElectronCurrentPlayerStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    listeners: Function[];
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject(delay(() => ElectronLiveStatsStore)) private storeLiveStats: ElectronLiveStatsStore,
        @inject(delay(() => ElectronSettingsStore)) private storeSettings: ElectronSettingsStore,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Current Player Store")
        this.initPlayerListener();
        this.initListeners()
    }

    // Rank
    getCurrentPlayer(): CurrentPlayer | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        return this.store.get(`player.${connectCode}`) as CurrentPlayer;
    }

    getCurrentPlayerCurrentRankStats(): RankedNetplayProfile | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        return this.store.get(`player.${connectCode}.rank.current`) as RankedNetplayProfile;
    }

    updateCurrentPlayerConnectCode() {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        this.store.set(`player.${connectCode}.connectCode`, connectCode);
    }

    setCurrentPlayerCurrentRankStats(rankStats: RankedNetplayProfile | undefined) {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!rankStats || !connectCode) return;
        this.store.set(`player.${connectCode}.rank.current`, rankStats);
    }

    setCurrentPlayerNewRankStats(rankStats: RankedNetplayProfile | undefined) {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        const currentRankedNetplayProfile = this.getCurrentPlayerCurrentRankStats()
        if (!rankStats || !connectCode) return;
        this.store.set(`player.${connectCode}.rank.prev`, currentRankedNetplayProfile ?? rankStats)
        this.store.set(`player.${connectCode}.rank.new`, rankStats);
        this.updateCurrentPlayerRankHistory(rankStats);
    }

    getPlayerRankHistory(): RankedNetplayProfile[] | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        return this.store.get(`player.${connectCode}.rank.history`) as RankedNetplayProfile[];
    }

    updateCurrentPlayerRankHistory(rankStats: RankedNetplayProfile) {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        let history = this.getPlayerRankHistory();
        if (!rankStats || !connectCode || !history) return;
        history.push(rankStats)
        this.store.set(
            `player.${connectCode}.rank.history`,
            history,
        );
    }

    private async handleRankChange() {
        const player = this.getCurrentPlayer()
        if (!player) return
        await new Promise((resolve) => {
            if (player.rank.current !== player.rank.new) this.storeLiveStats.setStatsScene(LiveStatsScene.RankChange)
            setTimeout(resolve, 10000);
        });
        this.setCurrentPlayerCurrentRankStats(player.rank.new);
        this.storeLiveStats.setStatsScene(LiveStatsScene.PostGame)
    }

    private initPlayerListener() {
        this.store.onDidChange(`settings.currentPlayer.connectCode`, async () => {
            this.unsubscribeListeners()
            this.initListeners()
        })
    }

    private initListeners() {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode()
        if (!connectCode) return;
        this.listeners = [
            this.store.onDidChange(`player.${connectCode}`, (value) => {
                this.messageHandler.sendMessage("current_player", value)
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