import { SlpParserEvent, SlpStreamEvent, SlippiGame, SlpParser, SlpStream, SlpRawEventPayload, FrameEntryType, GameEndType, GameStartType, PlayerType, PlacementType } from '@slippi/slippi-js';
import { MessageHandler } from './messageHandler';
import EventEmitter from 'events';
import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import { Api } from './api';
import { ElectronJsonStore } from './electronStore';
import { Player } from '../../frontend/src/lib/models/types';
import { InGameState, LiveStatsScene } from '../../frontend/src/lib/models/enum';
import fs from "fs"

@singleton()
export class StatsDisplay {
	pauseInterval: NodeJS.Timer
	constructor(
		@inject("EventEmitter") public eventEmitter: EventEmitter,
		@inject("ElectronLog") public log: ElectronLog,
		@inject("SlpParser") public slpParser: SlpParser,
		@inject("SlpStream") public slpStream: SlpStream,
		public api: Api,
		public messageHandler: MessageHandler,
		public store: ElectronJsonStore,
	) {
		this.messageHandler = messageHandler;
		this.eventEmitter = eventEmitter;
		this.log = log;
		this.store = store;
		this.api = api;
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
		this.store.setGameState(InGameState.Running)
	}

	async handleGamePaused(frameEntry: FrameEntryType | null) {
		if (!frameEntry) return;
		this.store.setGameFrame(frameEntry)
		this.store.setGameState(InGameState.Paused)
	}

	async handleGameStart(settings: GameStartType | null) {
		if (!settings) return;
		const gameNumber = settings.matchInfo?.gameNumber
		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayer = this.getCurrentPlayer(currentPlayers)!

		this.store.setGameSettings(settings);
		this.store.setGameState(InGameState.Running)
		this.store.setStatsScene(LiveStatsScene.InGame)
		this.store.setCurrentPlayers(currentPlayers);
		this.store.setCurrentPlayer(currentPlayer)
		this.store.setCurrentPlayerCurrentRankStats(currentPlayer.rankedNetplayProfile);

		if (gameNumber !== 1) return;
		this.store.setGameScore([0, 0]);
		this.store.resetRecentGames();
	}

	async handleGameEnd(gameEnd: GameEndType, settings: GameStartType) {
		this.stopPauseInterval()
		this.handleScore(gameEnd)

		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayer = this.getCurrentPlayer(currentPlayers)
		const postGameStats = this.getRecentGameStats();

		this.store.setCurrentPlayerNewRankStats(currentPlayer?.rankedNetplayProfile);
		this.store.setGameStats(gameEnd)
		this.store.setGameState(InGameState.End)
		this.store.setGameMatch(settings, gameEnd, postGameStats)
		this.store.setStatsScene(LiveStatsScene.PostGame)
		if (postGameStats) this.messageHandler.sendMessage('post_game_stats', postGameStats);
		// If post set
	}

	async getCurrentPlayersWithRankStats(settings: GameStartType): Promise<(Player)[]> {
		let currentPlayers = settings.players.filter(player => player)
		if (currentPlayers.some(player => !player.connectCode))
			return settings.players.filter(player => player).map((player, i: number) => {
				return {
					...player,
					rankedNetplayProfile: this.store.getCurrentPlayers()?.at(i)?.rankedNetplayProfile
				}
			})

		return (await Promise.all(
			currentPlayers.map(async (player: PlayerType) => await this.api.getPlayerWithRankStats(player))
		)).filter((player): player is Player => player !== undefined);
	}

	getCurrentPlayer(players: Player[]): Player | undefined {
		const player = this.store.getCurrentPlayer()
		if (!player) return;
		return players.find(p => p.connectCode === player.connectCode);
	}

	handleScore(gameEnd: GameEndType) {
		// TODO: Consider LRAS
		// TODO: Consider Tie
		let score: number[] = this.store.getGameScore() ?? [0, 0];
		const winnerIndex = gameEnd.placements
			.filter((p: PlacementType) => (p.position ?? -1) >= 0)
			.sort((a: PlacementType, b: PlacementType) => a.playerIndex - b.playerIndex)
			.findIndex(p => p.position === 0); // Verify that winner is 0
		score[winnerIndex] += 1;
		this.store.setGameScore(score);
	}

	async initListeners() {
		this.store.setListener(`settings.currentPlayer.newRankedNetplayProfile`, async () => {
			await this.handleRankChange()
		})
	}

	async handleRankChange() {
		const player = this.store.getCurrentPlayer()
		if (!player) return
		await new Promise((resolve) => {
			if (player.rankedNetplayProfile !== player.newRankedNetplayProfile) this.store.setStatsScene(LiveStatsScene.RankChange)
			setTimeout(resolve, 10000);
		});
		this.store.setCurrentPlayerCurrentRankStats(player.newRankedNetplayProfile);
		this.store.setStatsScene(LiveStatsScene.PostGame)
	}

	// OTHER
	// TODO: Complete these
	getGameFiles() {
		const re = new RegExp('^Game_.*.slp$');
		const path = require('path');

		const slippiDir = this.store.getSlippiLauncherSettings()?.rootSlpPath;

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
		const players = this.store.getCurrentPlayers()
		if (!players) this.store.setCurrentPlayers(settings.players)
	}
}
