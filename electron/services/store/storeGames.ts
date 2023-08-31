// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { GameStartMode, GameStats, Sets } from '../../../frontend/src/lib/models/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { GameEndType, GameStartType, PlayerType, StatsType } from '@slippi/slippi-js';
import os from 'os';
import { ElectronSettingsStore } from './storeSettings';
import { dateTimeNow } from '../../utils/functions';
import { ElectronCurrentPlayerStore } from './storeCurrentPlayer';


@singleton()
export class ElectronGamesStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    listeners: Function[];
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
        @inject(delay(() => ElectronSettingsStore)) private storeSettings: ElectronSettingsStore,
        @inject(delay(() => ElectronCurrentPlayerStore)) private storeCurrentPlayer: ElectronCurrentPlayerStore,
    ) {
        this.log.info("Initializing Game Store")
        this.initPlayerListener()
    }

    getRecentOfflineSets() {
        return this.getRecentSetsByMode();
    }

    getRecentDirectSets() {
        return this.getRecentSetsByMode('direct');
    }

    getRecentUnankedSets() {
        return this.getRecentSetsByMode('unranked');
    }

    getRecentRankedSets() {
        return this.getRecentSetsByMode('ranked');
    }

    // GAME
    getGameScore(): number[] | undefined {
        return this.store.get('stats.game.score') as number[];
    }

    setGameScore(score: number[]) {
        this.store.set('stats.game.score', score);
    }

    setGameMatch(settings: GameStartType, gameEnd: GameEndType, postGameStats: StatsType | null) {
        const player = this.storeCurrentPlayer.getCurrentPlayer();
        if (!settings?.matchInfo?.matchId || !player) return;
        if (!settings.players.some((p: PlayerType) => p.connectCode === player.connectCode))
            return;

        const regex = /mode\.(\w+)/;
        let gameStats: GameStats = {
            settings: settings,
            gameEnd: gameEnd,
            postGameStats: postGameStats,
            timestamp: dateTimeNow(),
            score: this.getGameScore() ?? [0, 0],
            mode: settings.matchInfo.matchId.match(regex)![1] as GameStartMode
        }

        this.setRecentGames(gameStats)

        if (!settings.matchInfo.matchId || !settings.matchInfo.gameNumber) return;
        let matches = (this.getSetByMatchId(settings.matchInfo.matchId) ?? []) as GameStats[];
        matches.push(gameStats)

        this.store.set(`player.${player.connectCode}.game`, gameStats);
    }

    getGameMatch(matchId: string, gameNumber: number): GameStats | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        const games = this.store.get(`player.${connectCode}.game`) as GameStats[];
        return games.find(game => game.settings.matchInfo?.matchId === matchId && game.settings.matchInfo?.gameNumber === gameNumber) as GameStats
    }

    getSetByMatchId(matchId: string): GameStats[] | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        const games = this.store.get(`player.${connectCode}.game`) as GameStats[];
        return games.filter(game => game.settings.matchInfo?.matchId === matchId) as GameStats[]
    }

    setRecentGames(game: GameStats) {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        let games = this.getRecentGames();
        games.push(game)
        this.store.set(`player.${connectCode}.game.recent`, games)
    }

    getRecentGames(): GameStats[] {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return [];
        return (this.store.get(`player.${connectCode}.game.recent`) ?? []) as GameStats[];
    }

    resetRecentGames() {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        this.store.set(`player.${connectCode}.game.recent`, [])
    }

    private getAllSets(): Sets | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        return this.store.get(`player.${connectCode}.game`) as Sets | undefined;
    }

    getAllSetsByMode(mode: GameStartMode): GameStats[] | undefined {
        if (!mode) return;
        let sets = this.getAllSets();
        if (!sets) return;
        return sets[mode]
    }

    getRecentSets(number = 10): GameStats[] {
        const sets = this.getAllSets();
        if (!sets) return []
        return sets["recent"]?.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number) ?? [];
    }

    getRecentSetsByMode(mode: GameStartMode = "recent", number = 10) {
        const sets = this.getAllSets();
        if (!sets) return []
        return sets[mode ?? "recent"]?.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number) ?? [];
    }

    private initPlayerListener() {
        this.store.onDidChange(`stats.currentPlayers`, async () => {
            this.unsubscribeListeners()
            this.initListeners()
        })
    }

    // TODO:
    private initListeners() {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode()
        if (!connectCode) return;
        this.listeners = [
            this.store.onDidChange(`player.${connectCode}.game.recent`, (value) => {
                console.log(value)
                // Emit to svelte
            }),
            this.store.onDidChange(`stats.game.score`, async (value) => {
                console.log("Updating score")
                this.messageHandler.sendMessage('game_score', value);
            }),
        ]
    }
    private unsubscribeListeners() {
        this.listeners.forEach(unsubscribe => unsubscribe())
    }
}
