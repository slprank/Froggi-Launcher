import { SlpParserEvent, SlpStreamEvent, SlippiGame, SlpParser, SlpStream, SlpRawEventPayload, FrameEntryType, GameEndType, GameStartType, PlayerType } from '@slippi/slippi-js';
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
import { getWinnerIndex } from '../utils/gamePredicates';
import { SCENE_TRANSITION_DELAY } from '../../frontend/src/lib/models/const';

@singleton()
export class StatsDisplay {
	pauseInterval: NodeJS.Timeout
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
			if (event.command === 54) {
				this.handleUndefinedPlayers(this.slpParser.getSettings() ?? undefined)
				await this.handleGameStart(this.slpParser.getSettings());
			}
		});

		this.slpParser.on(SlpParserEvent.END, async (gameEnd: GameEndType) => {
			const settings = this.slpParser.getSettings()
			if (!settings) return
			await this.handleGameEnd(gameEnd, settings);
		});

		this.slpParser.on(SlpParserEvent.FRAME, async (frameEntry: FrameEntryType) => {
			await this.handleGameFrame(frameEntry)
		});
	}

	private resetPauseInterval() {
		this.stopPauseInterval()
		this.pauseInterval = setTimeout(() => {
			this.handleGamePaused(this.slpParser.getLatestFrame())
		}, 64)
	}

	private stopPauseInterval() {
		clearInterval(this.pauseInterval)
	}

	async handleGameFrame(frameEntry: FrameEntryType) {
		if (frameEntry.frame < 0) return
		if (this.storeLiveStats.getGameState() === InGameState.Inactive) return;
		this.resetPauseInterval()
		await this.messageHandler.sendMessage('game_frame', frameEntry);
		this.storeLiveStats.setGameState(InGameState.Running)
	}

	async handleGamePaused(frameEntry: FrameEntryType | null) {
		if (!frameEntry) return;
		if (this.storeLiveStats.getGameState() === InGameState.Inactive) return
		this.storeLiveStats.setGameFrame(frameEntry)
		this.storeLiveStats.setGameState(InGameState.Paused)
	}

	async handleGameStart(settings: GameStartType | null) {
		if (!settings) return;
		const gameNumber = settings.matchInfo?.gameNumber
		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayer = this.getCurrentPlayer(currentPlayers)!

		this.storeLiveStats.setGameState(InGameState.Running)
		this.storeLiveStats.setStatsScene(LiveStatsScene.InGame)
		this.storePlayers.setCurrentPlayers(currentPlayers);
		this.storeLiveStats.setGameSettings(settings);

		if (gameNumber !== 1) return;
		this.storeGames.setGameScore([0, 0]);

		if (!currentPlayer.rank?.current) return
		this.storeCurrentPlayer.setCurrentPlayerCurrentRankStats(currentPlayer.rank.current);
	}

	async handleGameEnd(gameEnd: GameEndType, settings: GameStartType) {
		this.stopPauseInterval()
		this.handleScore(gameEnd)

		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayer = this.getCurrentPlayer(currentPlayers)
		const gameStats = await this.getRecentGameStats(settings);
		// TODO: If Game Set End - Get All Match Games

		this.storeCurrentPlayer.setCurrentPlayerNewRankStats(currentPlayer?.rank?.current);
		this.storeLiveStats.setGameStats(gameStats)
		this.storeLiveStats.setGameState(InGameState.Inactive)
		this.storeLiveStats.setStatsScene(LiveStatsScene.PostGame)
		this.storeGames.setGameMatch(gameStats)
		if (gameStats) this.messageHandler.sendMessage('post_game_stats', gameStats);
		this.storeLiveStats.setGameFrame(null)
		setTimeout(() => this.messageHandler.sendMessage('game_frame', null), SCENE_TRANSITION_DELAY);
		// TODO: Post set - If post set
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

	private handleScore(gameEnd: GameEndType) {
		let score: number[] = this.storeGames.getGameScore() ?? [0, 0];
		const winnerIndex = getWinnerIndex(gameEnd)
		if (winnerIndex === undefined || winnerIndex === -1) return;
		score[winnerIndex] += 1;
		this.storeGames.setGameScore(score);
	}


	private async getGameFiles(): Promise<string[] | undefined> {
		const re = new RegExp('^Game_.*.slp$');
		const path = require('path');

		const slippiSettings = this.storeSettings.getSlippiLauncherSettings()
		console.log("Settings:", slippiSettings)

		if (!slippiSettings?.rootSlpPath) return;

		let files: string[];
		let subFolder: string;
		if (slippiSettings.useMonthlySubfolders) {
			subFolder = (await fs.readdir(slippiSettings.rootSlpPath, { withFileTypes: true }))
				.filter(dirent => dirent.isDirectory())
				.map(dirent => dirent.name)
				.sort((a, b) => a > b ? 1 : -1)
				.at(0) ?? ""
			files = (await fs
				.readdir(`${slippiSettings.rootSlpPath}/${subFolder}`))
				.map((filename: string) => `${path.parse(filename).name}.slp`);
		} else {
			files = (await fs
				.readdir(slippiSettings.rootSlpPath))
				.map((filename: string) => `${path.parse(filename).name}.slp`);
		}

		files = files.filter((f: string) => re.test(f)).map((f: string) => `${slippiSettings.rootSlpPath}/${subFolder ? `${subFolder}/` : ""}${f}`);
		return files.sort((a, b) => a > b ? -1 : 1);
	}

	private async getRecentGameStats(settings: GameStartType): Promise<GameStats | null> {
		const files = await this.getGameFiles();
		console.log("files", files)
		if (!files || !files.length) return null;
		const matchId = settings.matchInfo?.matchId
		const gameNumber = settings.matchInfo?.gameNumber
		const file = files
			.find(file => {
				const settings = new SlippiGame(file).getSettings();
				return settings?.matchInfo?.matchId === matchId && settings?.matchInfo?.gameNumber === gameNumber;
			})
		if (!file) return null;
		this.log.info("Analyzing recent game file:", file)
		return this.getGameStats(new SlippiGame(file))
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

	private handleUndefinedPlayers(settings: GameStartType | undefined) {
		if (!settings) return;
		const players = this.storePlayers.getCurrentPlayers()
		if (!players) this.storePlayers.setCurrentPlayers(settings.players)
	}

	private getGameStats(game: SlippiGame | null): GameStats | null {
		if (!game) return null;
		const settings = game.getSettings()
		return {
			gameEnd: game.getGameEnd(),
			lastFrame: game.getLatestFrame(),
			mode: getGameMode(game.getSettings()),
			postGameStats: this.enrichPostGameStats(game),
			score: this.storeGames.getGameScore(),
			settings: { ...settings, matchInfo: { ...settings?.matchInfo, mode: getGameMode(settings) } },
			timestamp: dateTimeNow(),
		} as GameStats
	}

	// TODO: Add additional data not included in the default stats
	private enrichPostGameStats(game: SlippiGame | null): StatsTypeExtended | null {
		console.log("Enrich data")
		if (!game) return null
		return {
			...game.getStats(),
		} as StatsTypeExtended
	}

}
