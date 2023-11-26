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
import { ElectronPlayersStore } from './storePlayers';
import { getWinnerIndex } from '../../../frontend/src/lib/utils/gamePredicates';
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
        @inject(delay(() => ElectronPlayersStore)) private storePlayers: ElectronPlayersStore,
    ) {
        this.log.info("Initializing Game Store")
        this.initListeners()
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
        this.addRecentGames(gameStats)
        const player = this.storeCurrentPlayer.getCurrentPlayer();
        if (!player || !gameStats?.settings?.players.some((p: PlayerType) => p.connectCode === player?.connectCode))
            return;
        if (!gameStats.settings.matchInfo?.matchId || !gameStats?.settings.matchInfo.gameNumber) return;
        const matches = this.getGameMatch(gameStats.settings.matchInfo.matchId);
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

    getRecentGames(): GameStats[][] {
        return (this.store.get(`player.any.game.recent`) ?? []) as GameStats[][]
    }

    addRecentGames(newGame: GameStats) {
        if (newGame.settings?.matchInfo.matchId) this.handleOnlineGame(newGame)
        if (!newGame.settings?.matchInfo.matchId) this.handleOfflineGame(newGame)
    }

    private handleOnlineGame(newGame: GameStats) {
        const prevGames = this.getRecentGames()
        const currentGame = prevGames.find(prevGame => prevGame.some(game => game.settings?.matchInfo.gameNumber === newGame.settings?.matchInfo.gameNumber))

        const filteredGames = prevGames.filter(game => game.at(0)?.settings?.matchInfo.matchId !== currentGame?.at(0)?.settings?.matchInfo.matchId)
        if (newGame.settings?.matchInfo.tiebreakerNumber !== 0) {
            return this.store.set("player.any.game.recent", [[...(currentGame ?? []), newGame], ...(filteredGames ?? [])])
        }
        return this.store.set("player.any.game.recent", [[newGame], ...prevGames])
    }

    private handleOfflineGame(newGame: GameStats) {
        if (this.hasGameBombRain(newGame)) return;

        const prevGames = this.getRecentGames()
        const currentGame = prevGames.at(0)

        const filteredGames = prevGames.slice(1)
        if (this.isRematchGame(newGame)) {
            return this.store.set(`player.any.game.recent`, [[...(currentGame ?? []), newGame], ...(filteredGames ?? [])])
        }
        return this.store.set(`player.any.game.recent`, [[newGame], ...prevGames])
    }

    private isRematchGame(game: GameStats): boolean {
        if (!game.settings) return true
        if (game.settings.matchInfo.tiebreakerNumber ||
            game.settings.players.some(player => player && player.startStocks && player.startStocks < 4)) return true
        return false
    }

    private hasGameBombRain(game: GameStats): boolean {
        if (game.settings?.gameInfoBlock?.bombRainEnabled) return true
        return false
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

    private initListeners() {
        this.store.onDidChange(`stats.game.score`, async (value) => {
            this.messageHandler.sendMessage("GameScore", value as number[]);
        })
        this.store.onDidChange("player.any.game.recent", async (value) => {
            const recentGames = value as GameStats[][]
            this.messageHandler.sendMessage("RecentGames", recentGames);
        })
    }

    handleGameScore(recentGames: GameStats[][]) {
        const players = this.storePlayers.getCurrentPlayers();
        if (!players) return;
        const gameScore = recentGames?.map(recentGame => recentGame.at(-1))
            .reduce((score: number[], game: GameStats | undefined) => {
                if (!game) return score

                const isTie = this.isTiedGame(game)
                if (isTie) return score

                const winnerIndex = getWinnerIndex(game?.gameEnd)
                if (isNil(winnerIndex)) return score
                score[winnerIndex] += 1
                return score
            }, [0, 0]) ?? [0, 0]
        this.setGameScore(gameScore)
    }

    isTiedGame(game: GameStats | undefined) {
        if (!game) return false
        const players = Object.entries(game.lastFrame.players).map(([_, player]) => player)
        if (players.every((player) => isNil(player) || player.post.stocksRemaining === 0)) return true
        if (players.every(player => {
            const reference = players[0];
            if (!reference) return;
            return reference.post.stocksRemaining === player?.post.stocksRemaining && Math.floor(reference.post.percent ?? 0) === Math.floor(player?.post.percent ?? -1)
        })) return true
        return false
    }

}
