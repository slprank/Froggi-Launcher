import { SlpParserEvent, SlpStreamEvent, SlippiGame, SlpParser, SlpStream, SlpRawEventPayload, FrameEntryType, GameEndType, GameStartType, PlayerType, PlacementType } from '@slippi/slippi-js';
import { MessageHandler } from './messageHandler';
import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import { Api } from './api';
import { Player } from '../../frontend/src/lib/models/types';
import { InGameState, LiveStatsScene } from '../../frontend/src/lib/models/enum';
import fs from "fs"
import { ElectronGamesStore } from './store/storeGames';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { ElectronRankStore } from './store/storeRank';
import { ElectronSettingsStore } from './store/storeSettings';
import { ElectronPlayersStore } from './store/storePlayers';

@singleton()
export class StatsDisplay {
	pauseInterval: NodeJS.Timer
	constructor(
		@inject("ElectronLog") public log: ElectronLog,
		@inject("SlpParser") public slpParser: SlpParser,
		@inject("SlpStream") public slpStream: SlpStream,
		@inject(delay(() => Api)) public api: Api,
		@inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
		@inject(delay(() => ElectronGamesStore)) public storeGames: ElectronGamesStore,
		@inject(delay(() => ElectronLiveStatsStore)) public storeLiveStats: ElectronLiveStatsStore,
		@inject(delay(() => ElectronPlayersStore)) public storePlayers: ElectronPlayersStore,
		@inject(delay(() => ElectronRankStore)) public storeRank: ElectronRankStore,
		@inject(delay(() => ElectronSettingsStore)) public storeSettings: ElectronSettingsStore,
	) {
		this.initStatDisplay();
	}

	async initStatDisplay() {
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

	resetPauseInterval() {
		this.stopPauseInterval()
		this.pauseInterval = setTimeout(() => {
			this.handleGamePaused(this.slpParser.getLatestFrame())
		}, 64)
	}

	stopPauseInterval() {
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
		this.storeGames.resetRecentGames();

		if (!currentPlayer.rankedNetplayProfile) return
		this.storeSettings.setCurrentPlayer(currentPlayer)
		this.storeRank.setCurrentPlayerCurrentRankStats(currentPlayer.rankedNetplayProfile);
	}

	async handleGameEnd(gameEnd: GameEndType, settings: GameStartType) {
		this.stopPauseInterval()
		this.handleScore(gameEnd)

		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayer = this.getCurrentPlayer(currentPlayers)
		const postGameStats = this.getRecentGameStats();

		this.storeRank.setCurrentPlayerNewRankStats(currentPlayer?.rankedNetplayProfile);
		this.storeLiveStats.setGameStats(gameEnd)
		this.storeLiveStats.setGameState(InGameState.End)
		this.storeGames.setGameMatch(settings, gameEnd, postGameStats)
		this.storeLiveStats.setStatsScene(LiveStatsScene.PostGame)
		if (postGameStats) this.messageHandler.sendMessage('post_game_stats', postGameStats);
		// If post set
	}

	async getCurrentPlayersWithRankStats(settings: GameStartType): Promise<(Player)[]> {
		let currentPlayers = settings.players.filter(player => player)
		if (currentPlayers.some(player => !player.connectCode))
			return settings.players.filter(player => player).map((player, i: number) => {
				return {
					...player,
					rankedNetplayProfile: this.storePlayers.getCurrentPlayers()?.at(i)?.rankedNetplayProfile
				}
			})

		return (await Promise.all(
			currentPlayers.map(async (player: PlayerType) => await this.api.getPlayerWithRankStats(player))
		)).filter((player): player is Player => player !== undefined);
	}

	getCurrentPlayer(players: Player[]): Player | undefined {
		const player = this.storeSettings.getCurrentPlayer()
		if (!player) return;
		return players.find(p => p.connectCode === player.connectCode);
	}

	// TODO: Consider Tie
	handleScore(gameEnd: GameEndType) {
		let score: number[] = this.storeGames.getGameScore() ?? [0, 0];
		const winnerIndex = getWinnerIndex(gameEnd)
		score[winnerIndex] += 1;
		this.storeGames.setGameScore(score);
	}

	// OTHER
	// TODO: Complete these
	getGameFiles() {
		const re = new RegExp('^Game_.*.slp$');
		const path = require('path');

		const slippiDir = this.storeSettings.getSlippiLauncherSettings()?.rootSlpPath;

		if (!slippiDir) return null;

		// TODO: Handle monthly sub folder
		let files = fs
			.readdirSync(slippiDir)
			.map((filename: string) => `${path.parse(filename).name}.slp`);

		files = files.filter((f: string) => re.test(f)).map((f: string) => `${slippiDir}/${f}`);
		return files.sort((a: string, b: string) => a.length - b.length); // Fix
	}

	getRecentGameStats() {
		const files = this.getGameFiles();
		if (!files || !files.length) return null;
		const game = new SlippiGame(files.at(-1)!);

		return game?.getStats();
	}

	handleUndefinedPlayers(settings: GameStartType | undefined) {
		if (!settings) return;
		const players = this.storePlayers.getCurrentPlayers()
		if (!players) this.storePlayers.setCurrentPlayers(settings.players)
	}
}

const getWinnerIndex = (gameEnd: GameEndType) => {
	const lrasIndex = gameEnd.lrasInitiatorIndex
	if (lrasIndex === null) return gameEnd.placements
		.filter((p: PlacementType) => (p.position ?? -1) >= 0)
		.sort((a: PlacementType, b: PlacementType) => a.playerIndex - b.playerIndex)
		.findIndex(p => p.position === 0);
	return lrasIndex === 0 ? 1 : 0
}