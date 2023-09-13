// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { GameStartMode, GameStats, PlayerGame, Sets, StatsTypeExtended } from '../../../frontend/src/lib/models/types/slippiData';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { GameEndType, GameStartType, PlayerType } from '@slippi/slippi-js';
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

    setGameMatch(settings: GameStartType, gameEnd: GameEndType, postGameStats: StatsTypeExtended | null) {
        const player = this.storeCurrentPlayer.getCurrentPlayer();
        if (!settings?.matchInfo?.matchId || !player) return;
        if (!settings.players.some((p: PlayerType) => p.connectCode === player.connectCode))
            return;

        const regex = /mode\.(\w+)/;
        const gameStats: GameStats = {
            settings: settings,
            gameEnd: gameEnd,
            postGameStats: postGameStats,
            timestamp: dateTimeNow(),
            score: this.getGameScore() ?? [0, 0],
            mode: settings.matchInfo.matchId.match(regex)![1] as GameStartMode
        }

        if (!settings.matchInfo.matchId || !settings.matchInfo.gameNumber) return;
        const matches = this.getGameMatch(settings.matchInfo.matchId);
        if (!matches) return;
        matches.push(gameStats)
        this.store.set(`player.${player.connectCode}.game.${gameStats.mode}.${settings.matchInfo.matchId}`, matches);
    }

    getGameMatch(matchId: string): GameStats[] | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        const games = Object.assign(this.getAllSetsByMode("ranked") ?? {}, this.getAllSetsByMode("unranked") ?? {}, this.getAllSetsByMode("direct") ?? {})
        return games[matchId]
    }

    getGameMatchGame(matchId: string, gameNumber: number): GameStats | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        const games = Object.assign(this.getAllSetsByMode("ranked") ?? {}, this.getAllSetsByMode("unranked") ?? {}, this.getAllSetsByMode("direct") ?? {})
        return games[matchId].find(game => game.settings.matchInfo?.gameNumber === gameNumber)
    }

    getAllSetsByMode(mode: GameStartMode): { [matchId: string]: GameStats[] } | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        const playerGame = this.store.get(`player.${connectCode}.game`) as PlayerGame;
        return playerGame[mode]
    }

    setRecentGames(game: GameStats) {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        let games = this.store.get(`player.${connectCode}.game.recent`) as GameStats[];
        if (!games) return;
        games.push(game)
        this.store.set(`player.${connectCode}.game.recent`, games)
    }

    private getAllSets(): Sets | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        return this.store.get(`player.${connectCode}.game`) as Sets | undefined;
    }

    getRecentSets(number = 10): GameStats[] {
        const sets = this.getAllSetsByMode("ranked"); // TODO: Fix
        if (!sets) return []
        return sets["recent"]?.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number) ?? [];
    }

    getRecentSetsByMode(mode: GameStartMode, number = 10) {
        const sets = this.getAllSets();
        if (!sets) return []
        return sets[mode ?? "recent"]?.sort((a: GameStats, b: GameStats) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number) ?? [];
    }

    private initPlayerListener() {
        this.store.onDidChange(`stats.currentPlayers`, async () => {
            this.unsubscribeListeners()
            this.initListeners()
        })
    }

    private initListeners() {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode()
        if (!connectCode) return;
        this.listeners = [
            this.store.onDidChange(`stats.game.score`, async (value) => {
                console.log("Updating score")
                this.messageHandler.sendMessage('game_score', value);
            }),
        ]
    }
    private unsubscribeListeners() {
        this.listeners?.forEach(unsubscribe => unsubscribe())
    }
}
