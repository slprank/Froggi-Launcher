// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { RankedNetplayProfile, Session } from '../../../frontend/src/lib/models/types/slippiData';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { dateTimeNow, getHoursDifference } from '../../utils/functions';
import { ElectronCurrentPlayerStore } from './storeCurrentPlayer';


@singleton()
export class ElectronSessionStore {
    private listeners: Function[] = [];
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject("ElectronStore") private store: Store,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
        @inject(delay(() => ElectronCurrentPlayerStore)) private storeCurrentPlayer: ElectronCurrentPlayerStore,
    ) {
        this.log.info("Initializing Session Store")
        this.initPlayerListener()
    }

    getSessionStats(): Session | undefined {
        const player = this.storeCurrentPlayer.getCurrentPlayer();
        if (!player) return;
        return this.store.get(`player.${player.connectCode}.session`) as Session;
    }

    resetSessionStats() {
        const player = this.storeCurrentPlayer.getCurrentPlayer();
        if (!player) return;
        const currentRankedStats = player.rank.current;
        if (!currentRankedStats) return;
        const session: Session = {
            startRankStats: currentRankedStats,
            startTime: dateTimeNow(),
            currentRankStats: currentRankedStats,
            latestUpdate: dateTimeNow(),
        };
        this.store.set(`player.${player.connectCode}.session`, session);
        return session;
    }

    updateSessionStats(rankStats: RankedNetplayProfile | undefined) {
        if (!rankStats) return;
        const player = this.storeCurrentPlayer.getCurrentPlayer();
        if (!player) return;
        let session = this.getSessionStats();
        if (!session || (getHoursDifference(new Date(session?.latestUpdate), dateTimeNow()) > 6)) {
            this.resetSessionStats();
            return
        }
        session.latestUpdate = dateTimeNow();
        session.currentRankStats = rankStats;
        this.store.set(`player.${player.connectCode}.session`, session);
    }

    private initPlayerListener() {
        this.store.onDidChange(`stats.currentPlayers`, async () => {
            this.unsubscribeListeners()
            this.initListeners()
        })
    }

    private initListeners() {
        const player = this.storeCurrentPlayer.getCurrentPlayer()
        if (!player) return;
        this.listeners = [
            this.store.onDidChange(`player.${player.connectCode}.session`, (value) => {
                this.messageHandler.sendMessage("SessionStats", value as Session)
            }),
        ]
    }

    private unsubscribeListeners() {
        this.listeners.forEach(unsubscribe => unsubscribe())
    }
}
