// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { CurrentPlayer, GameStartMode, GameStats } from '../../../frontend/src/lib/models/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { GameEndType, GameStartType, PlayerType, StatsType } from '@slippi/slippi-js';
import os from 'os';
import { ElectronSettingsStore } from './storeSettings';
import { dateTimeNow } from '../../utils/functions';


@singleton()
export class ElectronGamesStore {
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
        const player = this.settingsStore.getCurrentPlayer();
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
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return;
        const games = this.store.get(`player.${player.connectCode}.game`) as GameStats[];
        return games.find(game => game.settings.matchInfo?.matchId === matchId && game.settings.matchInfo?.gameNumber === gameNumber) as GameStats
    }

    getSetByMatchId(matchId: string): GameStats[] | undefined {
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return;
        const games = this.store.get(`player.${player.connectCode}.game`) as GameStats[];
        return games.filter(game => game.settings.matchInfo?.matchId === matchId) as GameStats[]
    }

    setRecentGames(game: GameStats) {
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return;
        let games = this.getRecentGames();
        games.push(game)
        this.store.set(`player.${player.connectCode}.game.recent`, games)
    }

    getRecentGames(): GameStats[] {
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return [];
        return (this.store.get(`player.${player.connectCode}.game.recent`) ?? []) as GameStats[];
    }

    resetRecentGames() {
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return;
        this.store.set(`player.${player.connectCode}.game.recent`, [])
    }

    getAllSets(): GameStats[] | undefined {
        const player = this.settingsStore.getCurrentPlayer();
        if (!player) return;
        return this.store.get(`player.${player.connectCode}.game`) as GameStats[] | undefined;
    }

    getAllSetsByMode(mode: GameStartMode): GameStats[] | undefined {
        if (!mode) return;
        let sets = this.getAllSets();
        if (!sets) return;
        return sets.filter(set => set.mode === mode)
    }

    // RECENT SETS
    getRecentSets(number = 10): GameStats[] {
        const recentSets = this.getAllSets() ?? [];
        return recentSets.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number);
    }

    getRecentSetsByMode(mode: GameStartMode | undefined = undefined, number = 10) {
        const rankedSets = this.getAllSets() ?? [];
        if (!mode) return rankedSets.filter(set => !set.mode).sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number)
        return rankedSets.filter(set => set.mode === mode).sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number);
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
            this.store.onDidChange(`player.${player.connectCode}.game.recent`, (value) => {
                console.log(value)
                // Emit to svelte
            }),
        ]
    }
    private unsubscribeListeners() {
        this.listeners.forEach(unsubscribe => unsubscribe())
    }
}
