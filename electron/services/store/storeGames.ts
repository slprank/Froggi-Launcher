// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { GameStartMode, GameStats, PlayerGame, Sets } from '../../../frontend/src/lib/models/types/slippiData';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { PlayerType } from '@slippi/slippi-js';
import * as os from 'os';
import { ElectronSettingsStore } from './storeSettings';
import { ElectronCurrentPlayerStore } from './storeCurrentPlayer';
import { isNil } from 'lodash';


@singleton()
export class ElectronGamesStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    listeners: Function[];
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject("ElectronStore") private store: Store,
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
    getGameScore(): number[] {
        return (this.store.get('stats.game.score') ?? [0, 0]) as number[];
    }

    setGameScore(score: number[]) {
        this.store.set('stats.game.score', score);
    }

    setGameMatch(gameStats: GameStats | null) {
        if (!gameStats) return;
        const player = this.storeCurrentPlayer.getCurrentPlayer();
        if (!player || !gameStats?.settings?.players.some((p: PlayerType) => p.connectCode === player?.connectCode))
            return;
        if (!gameStats.settings.matchInfo?.matchId || !gameStats?.settings.matchInfo.gameNumber) return;
        const matches = this.getGameMatch(gameStats.settings.matchInfo.matchId);
        this.addRecentGames(gameStats)
        this.store.set(`player.${player.connectCode}.game.${gameStats.settings.matchInfo.mode}.${gameStats.settings.matchInfo.matchId}`, [...matches, gameStats]);
    }

    getGameMatch(matchId: string | undefined | null): GameStats[] {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode || !matchId) return [];
        const games = Object.assign(this.getAllSetsByMode("ranked") ?? {}, this.getAllSetsByMode("unranked") ?? {}, this.getAllSetsByMode("direct") ?? {})
        return games[matchId] ?? []
    }

    getGameMatchGame(matchId: string, gameNumber: number): GameStats | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        const games = Object.assign(this.getAllSetsByMode("ranked") ?? {}, this.getAllSetsByMode("unranked") ?? {}, this.getAllSetsByMode("direct") ?? {})
        console.log("all games", games)
        return games[matchId].find(game => game.settings?.matchInfo?.gameNumber === gameNumber)
    }

    getAllSetsByMode(mode: GameStartMode): { [matchId: string]: GameStats[] } {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return {};
        const playerGame = this.store.get(`player.${connectCode}.game`) as PlayerGame;
        if (!playerGame) return {}
        return playerGame[mode]
    }

    getRecentGames(): GameStats[][] | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        return this.store.get(`player.any.game.recent`) as GameStats[][]
    }

    addRecentGames(newGame: GameStats) {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        const prevGames = this.store.get(`player.any.game.recent`) as GameStats[][] ?? [];
        const currentGame = prevGames.find(prevGame => prevGame.some(game => game.settings?.matchInfo.gameNumber === newGame.settings?.matchInfo.gameNumber))

        if (isNil(currentGame)) {
            this.store.set(`player.any.game.recent`, [[newGame], ...prevGames])
        } else {
            this.store.set(`player.any.game.recent`, [[newGame, ...currentGame], ...prevGames])
        };
    }

    clearRecentGames() {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        this.store.set(`player.any.game.recent`, [])
    }

    private getAllSets(): Sets | undefined {
        const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
        if (!connectCode) return;
        return this.store.get(`player.${connectCode}.game`) as Sets | undefined;
    }

    getRecentSets(number = 10): GameStats[] | undefined {
        const sets = this.getAllSetsByMode("ranked"); // TODO: Fix
        if (!sets) return []
        return sets["recent"]?.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number) ?? [];
    }

    getRecentSetsByMode(mode: GameStartMode, number = 10): GameStats[] {
        const sets = this.getAllSets();
        if (!sets) return []
        return (sets[mode ?? "recent"]?.sort((a: GameStats, b: GameStats) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number)) ?? [];
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
                this.messageHandler.sendMessage("GameScore", value as number[]);
            }),
            this.store.onDidChange(`player.any.game.recent`, async (value) => {
                this.messageHandler.sendMessage("RecentGames", value as GameStats[][]);
            }),
        ]
    }
    private unsubscribeListeners() {
        this.listeners?.forEach(unsubscribe => unsubscribe())
    }
}
