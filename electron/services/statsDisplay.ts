import { SlpParserEvent, SlpStreamEvent, SlippiGame, SlpParser, SlpStream, SlpRawEventPayload, FrameEntryType, GameEndType, GameStartType, PlayerType, PlacementType, StatsType } from '@slippi/slippi-js';
import { MessageHandler } from './messageHandler';
import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import { Api } from './api';
import { Player, StatsTypeExtended } from '../../frontend/src/lib/models/types/slippiData';
import { InGameState, LiveStatsScene } from '../../frontend/src/lib/models/enum';
import fs from "fs/promises"
import { ElectronGamesStore } from './store/storeGames';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { ElectronCurrentPlayerStore } from './store/storeCurrentPlayer';
import { ElectronSettingsStore } from './store/storeSettings';
import { ElectronPlayersStore } from './store/storePlayers';

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
		this.resetPauseInterval()
		await this.messageHandler.sendMessage('game_frame', frameEntry);
		this.storeLiveStats.setGameState(InGameState.Running)
	}

	async handleGamePaused(frameEntry: FrameEntryType | null) {
		if (!frameEntry) return;
		this.storeLiveStats.setGameFrame(frameEntry)
		this.storeLiveStats.setGameState(InGameState.Paused)
	}

	async handleGameStart(settings: GameStartType | null) {
		if (!settings) return;
		const gameNumber = settings.matchInfo?.gameNumber
		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayer = this.getCurrentPlayer(currentPlayers)!

		this.storeLiveStats.setGameSettings(settings);
		this.storeLiveStats.setGameState(InGameState.Running)
		this.storeLiveStats.setStatsScene(LiveStatsScene.InGame)
		this.storePlayers.setCurrentPlayers(currentPlayers);

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
		const postGameStats = await this.getRecentGameStats(settings);
		// TODO: If Game Set End - Get All Match Games

		this.storeCurrentPlayer.setCurrentPlayerNewRankStats(currentPlayer?.rank?.current);
		this.storeLiveStats.setGameStats(gameEnd)
		this.storeLiveStats.setGameState(InGameState.End)
		this.storeGames.setGameMatch(settings, gameEnd, postGameStats)
		this.storeLiveStats.setStatsScene(LiveStatsScene.PostGame)
		this.messageHandler.sendMessage('game_end', postGameStats);
		if (postGameStats) this.messageHandler.sendMessage('post_game_stats', postGameStats);
		// If post set
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
		if (winnerIndex === undefined) return;
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
		if (slippiSettings.useMonthlySubfolders === false) {
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

	private async getRecentGameStats(settings: GameStartType): Promise<StatsTypeExtended | null> {
		const files = await this.getGameFiles();
		if (!files || !files.length) return null;
		const matchId = settings.matchInfo?.matchId
		const gameNumber = settings.matchInfo?.gameNumber
		const file = files.find(file => {
			const settings = new SlippiGame(file).getSettings();
			return settings?.matchInfo?.matchId === matchId && settings?.matchInfo?.gameNumber === gameNumber;
		})
		if (!file) return null;
		this.log.info("Analyzing recent game file:", file)
		const game = new SlippiGame(file)
		return enrichPostGameStats(game?.getStats());
	}

	async getRecentSetStats(settings: GameStartType): Promise<StatsType[] | null> {
		const files = await this.getGameFiles();
		if (!files || !files.length) return null;
		const matchId = settings.matchInfo?.matchId
		const setFiles = files.filter(file => {
			const settings = new SlippiGame(file).getSettings();
			return settings?.matchInfo?.matchId === matchId;
		})
		if (!setFiles.length) return null;
		this.log.info("Analyzing recent set files:", files)
		const gamesStats = setFiles.map(file => new SlippiGame(file)?.getStats()).filter((game): game is StatsType => game !== null)
		return gamesStats
	}

	private handleUndefinedPlayers(settings: GameStartType | undefined) {
		if (!settings) return;
		const players = this.storePlayers.getCurrentPlayers()
		if (!players) this.storePlayers.setCurrentPlayers(settings.players)
	}
}

const enrichPostGameStats = (stats: StatsType | null): StatsTypeExtended | null => {
	if (!stats) return null
	// Filter each conversion by playerIndex
	// For analyze the start-end frame
	// If opposing player is in hitstun off-stage or below by x units
	// And at least one hit after going off stage
	// Count as an edgeguard
	// If Did-kill - Count as successful
	return { ...stats } as StatsTypeExtended
}

// TODO: If tie, return
const getWinnerIndex = (gameEnd: GameEndType): number | undefined => {
	const lrasIndex = gameEnd.lrasInitiatorIndex
	if (lrasIndex === -1) return gameEnd.placements
		.filter((p: PlacementType) => (p.position ?? -1) >= 0)
		.sort((a: PlacementType, b: PlacementType) => a.playerIndex - b.playerIndex)
		.findIndex(p => p.position === 0);
	return lrasIndex === 0 ? 1 : 0
}