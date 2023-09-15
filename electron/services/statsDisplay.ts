import { SlpParserEvent, SlpStreamEvent, SlippiGame, SlpParser, SlpStream, SlpRawEventPayload, FrameEntryType, GameEndType, GameStartType, PlayerType, PlacementType, ConversionType } from '@slippi/slippi-js';
import { MessageHandler } from './messageHandler';
import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import { Api } from './api';
import { EdgeGuard, GameStats, OverallTypeExtended, Player, Recovery, StatsTypeExtended } from '../../frontend/src/lib/models/types/slippiData';
import { InGameState, LiveStatsScene } from '../../frontend/src/lib/models/enum';
import fs from "fs/promises"
import { ElectronGamesStore } from './store/storeGames';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { ElectronCurrentPlayerStore } from './store/storeCurrentPlayer';
import { ElectronSettingsStore } from './store/storeSettings';
import { ElectronPlayersStore } from './store/storePlayers';
import { dateTimeNow, getGameMode } from '../utils/functions';
import { isInHitStun, isOffStage } from 'utils/framesPredicates';

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
		const gameStats = await this.getRecentGameStats(settings);
		console.log("game stats:", gameStats?.postGameStats?.overall[0])
		// TODO: If Game Set End - Get All Match Games

		this.storeCurrentPlayer.setCurrentPlayerNewRankStats(currentPlayer?.rank?.current);
		this.storeLiveStats.setGameStats(gameEnd)
		this.storeLiveStats.setGameState(InGameState.End)
		this.storeLiveStats.setStatsScene(LiveStatsScene.PostGame)
		this.storeGames.setGameMatch(gameStats)
		if (gameStats) this.messageHandler.sendMessage('post_game_stats', gameStats);
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

	private async getRecentGameStats(settings: GameStartType): Promise<GameStats | null> {
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
		return {
			settings: game.getSettings(),
			gameEnd: game.getGameEnd(),
			postGameStats: this.enrichPostGameStats(game),
			timestamp: dateTimeNow(),
			score: this.storeGames.getGameScore(),
			mode: getGameMode(game.getSettings())
		} as GameStats
	}

	private enrichPostGameStats(game: SlippiGame | null): StatsTypeExtended | null {
		console.log("Enrich data")
		if (!game) return null
		console.log("P1:", this.getEdgeGuardStats(game, 0))
		return {
			...game.getStats(),
			overall: [
				{
					...game.getStats()?.overall.at(0),
					edgeGuard: this.getEdgeGuardStats(game, 0),
					recovery: this.getRecoveryStats(game, 0)
				} as OverallTypeExtended,
				{
					...game.getStats()?.overall.at(1),
					edgeGuard: this.getEdgeGuardStats(game, 1),
					recovery: this.getRecoveryStats(game, 1)
				} as OverallTypeExtended,
			]
		}
	}

	private getEdgeGuardStats(game: SlippiGame, playerIndex: number | undefined): EdgeGuard | undefined {
		console.log("Get Edge Guard Data")
		if (!playerIndex) return;
		const stats = game.getStats()
		const edgeGuards = stats?.conversions
			.filter(conversion => conversion.playerIndex === playerIndex)
			.map(conversation => this.isSuccessfulEdgeGuardAttempt(game, conversation, playerIndex))
			.flat()

		const totalAttempts = edgeGuards?.length ?? 0
		const successfulAttempts = edgeGuards?.map(edgeGuard => edgeGuard).length ?? 0
		const unsuccessfulAttempts = edgeGuards?.map(edgeGuard => !edgeGuard).length ?? 0
		return {
			totalAttempts: totalAttempts,
			successfulAttempts: successfulAttempts,
			unsuccessfulAttempts: unsuccessfulAttempts,
			successfulAttemptsPercent: Number((successfulAttempts / totalAttempts).toFixed(1)),
			unsuccessfulAttemptsPercent: Number((unsuccessfulAttempts / totalAttempts).toFixed(1))
		}
	}

	private getRecoveryStats(game: SlippiGame, playerIndex: number | undefined): Recovery | undefined {
		if (!playerIndex) return;
		const opponentIndex = playerIndex === 0 ? 1 : 0;
		const edgeGuard = this.getEdgeGuardStats(game, opponentIndex)
		if (!edgeGuard) return;
		return {
			totalRecoveries: edgeGuard.totalAttempts,
			successfulRecoveries: edgeGuard.unsuccessfulAttempts,
			unsuccessfulRecoveries: edgeGuard.successfulAttempts,
			successfulRecoveriesPercent: edgeGuard.unsuccessfulAttempts,
			unsuccessfulRecoveriesPercent: edgeGuard.successfulAttempts
		}
	}

	private isSuccessfulEdgeGuardAttempt(game: SlippiGame, conversion: ConversionType, playerIndex: number): boolean[] {
		console.log("Is successful attempt:", conversion.moves)
		if (conversion.moves.length <= 1) return [];
		const opponentIndex = playerIndex === 0 ? 1 : 0;
		const opponentHitStunsOffStage = []
		for (let i = 0; i < conversion.moves.length - 1; i++) {
			const from = conversion.moves.at(i)?.frame
			opponentHitStunsOffStage.push(this.hasHitStunOffStage(game, from, opponentIndex))
		}
		console.log("Hit stun off stage", opponentHitStunsOffStage)
		// Assuming 3 consecutive false is a missed edge guard
		let result = [];
		let currentSubarray = [];

		let consecutiveFalse = 0;
		for (let i = 0; i < opponentHitStunsOffStage.length; i++) {
			currentSubarray.push(opponentHitStunsOffStage[i])
			if (!opponentHitStunsOffStage[i]) {
				consecutiveFalse++
				if (consecutiveFalse >= 3) {
					result.push(currentSubarray);
					currentSubarray = [];
				}
			}
		}

		// Assuming 2 Hits Offstage Is A Potential EdgeGuard
		// Only last sequence is a potential kill. Other sequences are assumed to be unsuccessful
		let attempts: boolean[] = result.slice(0, -1).map(sequence => sequence.filter(s => s).length > 2)
		if ((result?.at(-1)?.length ?? 0) > 2) {
			if (conversion.didKill) attempts.push(true)
			if (!conversion.didKill) attempts.push(false)
		}
		return attempts
	}

	// TODO: Replace `hitlag` with stun
	private hasHitStunOffStage(game: SlippiGame, from: number | undefined, receivingPlayerIndex: number): boolean {
		console.log("Hit stun from:", from)
		const frames = game.getFrames()
		const stageId = game.getSettings()?.stageId ?? 32
		if (from === undefined) return false
		for (let i = from; i++;) {
			if (!isInHitStun(receivingPlayerIndex, frames[i + 1])) return false
			if (isOffStage(stageId, frames[i + 1], receivingPlayerIndex)) return true;
		}
		return false;
	}

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