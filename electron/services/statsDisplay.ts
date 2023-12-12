import { SlpParserEvent, SlippiGame, SlpParser, SlpStream, FrameEntryType, GameEndType, GameStartType, PlayerType, GameEndMethod, SlpStreamEvent, SlpRawEventPayload } from '@slippi/slippi-js';
import { MessageHandler } from './messageHandler';
import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import { Api } from './api';
import { GameStats, Player, StatsTypeExtended } from '../../frontend/src/lib/models/types/slippiData';
import { InGameState, LiveStatsScene } from '../../frontend/src/lib/models/enum';
import fs from "fs/promises"
import { ElectronGamesStore } from './store/storeGames';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { ElectronCurrentPlayerStore } from './store/storeCurrentPlayer';
import { ElectronSettingsStore } from './store/storeSettings';
import { ElectronPlayersStore } from './store/storePlayers';
import { dateTimeNow, getGameMode } from '../utils/functions';
import { analyzeMatch } from '../utils/analyzeMatch';
import os from "os"
import { debounce, isNil } from 'lodash';
import { getGameScore, isTiedGame } from '../../frontend/src/lib/utils/gamePredicates';
import { Command } from '../../frontend/src/lib/models/types/overlay';

@singleton()
export class StatsDisplay {
	private pauseInterval: NodeJS.Timeout;
	private isWin: boolean = os.platform() === "win32";
	constructor(
		@inject("ElectronLog") private log: ElectronLog,
		@inject("SlpParser") private slpParser: SlpParser,
		@inject("SlpStream") private slpStream: SlpStream,
		@inject(delay(() => Api)) private api: Api,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
		@inject(delay(() => ElectronGamesStore)) private storeGames: ElectronGamesStore,
		@inject(delay(() => ElectronLiveStatsStore)) private storeLiveStats: ElectronLiveStatsStore,
		@inject(delay(() => ElectronPlayersStore)) private storePlayers: ElectronPlayersStore,
		@inject(delay(() => ElectronCurrentPlayerStore)) private storeCurrentPlayer: ElectronCurrentPlayerStore,
		@inject(delay(() => ElectronSettingsStore)) private storeSettings: ElectronSettingsStore,
	) {
		this.initStatDisplay();
	}

	private async initStatDisplay() {
		this.log.info("Initialize Dolphin Events")
		this.slpStream.on(SlpStreamEvent.COMMAND, async (event: SlpRawEventPayload) => {
			this.slpParser.handleCommand(event.command, event.payload);
			if (event.command === Command.GAME_START) {
				const gameSettings = this.slpParser.getSettings()
				this.handleUndefinedPlayers(gameSettings)
				await this.handleGameStart(gameSettings);
			}
		});

		this.slpParser.on(SlpParserEvent.END, async (gameEnd: GameEndType) => {
			await new Promise(resolve => setTimeout(resolve, 10))
			const settings = this.slpParser.getSettings()
			const latestFrame = this.slpParser.getLatestFrame()
			if (isNil(settings) || isNil(latestFrame) || isNil(gameEnd)) return
			await this.handleGameEnd(gameEnd, latestFrame, settings);
		});

		this.slpParser.on(SlpParserEvent.FRAME, debounce(async (frameEntry: FrameEntryType) => {
			await this.handleGameFrame(frameEntry);
		}, 8, { leading: true, trailing: true, maxWait: 16 }));
	}

	private resetPauseInterval() {
		if (this.isWin) return; // Windows utilized memory reads
		this.stopPauseInterval()
		this.pauseInterval = setTimeout(() => {
			this.handleGamePaused(this.slpParser.getLatestFrame())
		}, 160)
	}

	private stopPauseInterval() {
		clearInterval(this.pauseInterval)
	}

	async handleGameFrame(frameEntry: FrameEntryType) {
		this.resetPauseInterval()
		this.messageHandler.sendMessage('GameFrame', frameEntry);
		this.storeLiveStats.setGameState(InGameState.Running)
	}

	async handleGamePaused(frameEntry: FrameEntryType | null) {
		this.storeLiveStats.setGameFrame(frameEntry)
		this.storeLiveStats.setGameState(InGameState.Paused)
	}

	async handleGameStart(settings: GameStartType | null) {
		if (!settings) return;
		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayer = this.getCurrentPlayer(currentPlayers)!

		this.storeLiveStats.setGameState(InGameState.Running)
		this.storeLiveStats.setStatsScene(LiveStatsScene.InGame)
		this.storePlayers.setCurrentPlayers(currentPlayers);
		this.storeLiveStats.setGameSettings(settings);

		const previousGame = this.storeGames.getRecentGames()?.at(0)?.at(0)

		if (previousGame?.settings?.matchInfo.matchId === settings?.matchInfo?.matchId?.replace(/[.:]/g, '-')) return;
		this.storeGames.clearRecentGames()

		if (!currentPlayer?.rank?.current) return
		this.storeCurrentPlayer.setCurrentPlayerCurrentRankStats(currentPlayer.rank.current);
	}

	async handleGameEnd(gameEnd: GameEndType, latestGameFrame: FrameEntryType | null, settings: GameStartType) {
		this.stopPauseInterval()
		const gameStats = await this.getRecentGameStats(settings, gameEnd);
		this.handleInGameState(gameEnd, latestGameFrame)

		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayer = this.getCurrentPlayer(currentPlayers)

		this.storeCurrentPlayer.setCurrentPlayerNewRankStats(currentPlayer?.rank?.current);

		this.handleGameSetStats(gameStats)
		this.handlePostGameScene(gameStats)
		this.storeLiveStats.deleteGameFrame()
	}

	private handlePostGameScene(game: GameStats | null) {
		if (isTiedGame(game)) return

		const score = this.storeGames.getGameScore();
		const bestOf = this.storeLiveStats.getBestOf();
		const isPostSet = score.some(score => score >= Math.ceil(bestOf / 2))
		if (isPostSet) return this.storeLiveStats.setStatsSceneTimeout(LiveStatsScene.PostSet, LiveStatsScene.Menu, 60000)
		if (!isPostSet) return this.storeLiveStats.setStatsSceneTimeout(LiveStatsScene.PostGame, LiveStatsScene.Menu, 60000)
	}

	private handleInGameState(gameEnd: GameEndType | null, latestGameFrame: FrameEntryType | null) {
		if (gameEnd?.gameEndMethod === GameEndMethod.TIME) this.storeLiveStats.setGameState(InGameState.Time)
		if (gameEnd?.gameEndMethod === GameEndMethod.GAME) this.storeLiveStats.setGameState(InGameState.End)
		if (latestGameFrame && Object.entries(latestGameFrame.players).every(([_, player]) => isNil(player) || player.post.stocksRemaining === 0)) this.storeLiveStats.setGameState(InGameState.Tie)
	}

	private handleGameSetStats(gameStats: GameStats | null) {
		this.storeLiveStats.setGameStats(gameStats)
		this.storeGames.setGameMatch(gameStats)
		const games = this.storeGames.getRecentGames()
		if (!games || !games?.length) return;

		const score = getGameScore(games)
		this.storeGames.setGameScore(score)

		const matchStats = analyzeMatch(games.flat().filter(game => !game.isMock))
		this.storeLiveStats.setMatchStats(matchStats)
	}

	private async getCurrentPlayersWithRankStats(settings: GameStartType): Promise<(Player)[]> {
		let currentPlayers = settings.players.filter(player => player)
		if (currentPlayers.some(player => !player.connectCode))
			return settings.players.filter(player => player).map((player, i: number) => {
				return {
					...player,
					rank: this.storePlayers.getCurrentPlayers()?.at(i)?.rank
				}
			})

		return (await Promise.all(
			currentPlayers.map(async (player: PlayerType) => await this.api.getPlayerWithRankStats(player))
		)).filter((player): player is Player => player !== undefined);
	}

	private getCurrentPlayer(players: Player[]): Player | undefined {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode()
		if (!connectCode) return;
		return players.find(p => p.connectCode === connectCode);
	}


	private async getGameFiles(): Promise<string[] | undefined> {
		const re = new RegExp('^Game_.*.slp$');
		const path = require('path');

		const slippiSettings = this.storeSettings.getSlippiLauncherSettings()
		console.log("Settings:", slippiSettings)

		if (!slippiSettings?.rootSlpPath) return;

		const isBeta = slippiSettings?.useNetplayBeta
		const betaRegex = /\b(Mainline|beta)\b/i;

		const subFolder = slippiSettings.useMonthlySubfolders ? (await fs.readdir(slippiSettings.rootSlpPath, { withFileTypes: true }))
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name)
			.filter(dirname => isBeta ? betaRegex.test(dirname) : dirname)
			.sort((a, b) => a < b ? 1 : -1)
			.at(0) : ""


		const root = slippiSettings.rootSlpPath

		const replayFolders = await this.getReplayDirs(root, subFolder)

		const replayFiles = replayFolders
			.map((filename: string) => `${path.parse(filename).name}.slp`)
			.filter((f: string) => re.test(f)).map((f: string) => `${slippiSettings.rootSlpPath}/${subFolder ? `${subFolder}/` : ""}${f}`);

		return replayFiles.sort((a, b) => a > b ? -1 : 1);
	}

	// TODO: Test
	private getReplayDirs = async (root: string, subFolder: string | undefined) => {
		let filesFromRoot: string[] = []
		let filesFromSpectate: string[] = [];
		try {
			filesFromRoot = await fs.readdir((`${root}${subFolder ? `/${subFolder}` : ""}`));
		} catch (error) {
			if (error.code !== 'ENOENT') {
				console.error('Error reading files from root:', error);
			}
		}

		try {
			filesFromSpectate = await fs.readdir(`${root}/Spectate`);
		} catch (error) {
			if (error.code !== 'ENOENT') {
				console.error('Error reading files from Spectate:', error);
			}
		}

		return [
			...(filesFromRoot || []),
			...(filesFromSpectate || [])
		];
	}

	private async getRecentGameStats(settings: GameStartType | undefined = undefined, gameEnd: GameEndType | undefined = undefined): Promise<GameStats | null> {
		const files = await this.getGameFiles();
		if (!files || !files.length) return null;
		const matchId = settings?.matchInfo?.matchId ?? "";
		const gameNumber = settings?.matchInfo?.gameNumber ?? 0
		const file = files
			.find(file => {
				const settings = new SlippiGame(file).getSettings();
				return settings?.matchInfo?.matchId === matchId && settings?.matchInfo?.gameNumber === gameNumber && settings?.matchInfo?.tiebreakerNumber === 0;
			})
		if (!file) return null;
		this.log.info("Analyzing recent game file:", file)
		const game = new SlippiGame(file)
		return this.getGameStats(game, gameEnd)
	}

	async getRecentSetStats(settings: GameStartType): Promise<GameStats[] | null> {
		const files = await this.getGameFiles();
		if (!files || !files.length) return null;
		const matchId = settings.matchInfo?.matchId
		const setFiles = files.filter(file => {
			const settings = new SlippiGame(file).getSettings();
			return settings?.matchInfo?.matchId === matchId;
		})
		if (!setFiles.length) return null;
		this.log.info("Analyzing recent set files:", files)
		const gamesStats = setFiles.map(file => this.getGameStats(new SlippiGame(file))).filter((game): game is GameStats => game !== null)
		return gamesStats
	}

	private async handleUndefinedPlayers(settings: GameStartType | null | undefined) {
		if (!settings) return;
		const players = this.storePlayers.getCurrentPlayers()
		if (!players) this.storePlayers.setCurrentPlayers(settings.players)
	}

	private getGameStats(game: SlippiGame | null, gameEnd: GameEndType | undefined = undefined): GameStats | null {
		if (!game) return null;
		const settings = game.getSettings()
		return {
			gameEnd: gameEnd ?? game?.getGameEnd(),
			lastFrame: game.getLatestFrame(),
			postGameStats: this.enrichPostGameStats(game),
			settings: { ...settings, matchInfo: { ...settings?.matchInfo, mode: getGameMode(settings), matchId: settings?.matchInfo?.matchId?.replace(/[.:]/g, '-'), bestOf: this.storeLiveStats.getBestOf() } },
			timestamp: dateTimeNow(),
		} as GameStats
	}

	// TODO: Add additional data not included in the default stats
	private enrichPostGameStats(game: SlippiGame | null): StatsTypeExtended | null {
		if (!game) return null
		return {
			...game.getStats(),
		} as StatsTypeExtended
	}

}
