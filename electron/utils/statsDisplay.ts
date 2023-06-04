import { SlpParserEvent, SlpStreamEvent, SlippiGame, SlpParser, SlpStream, SlpRawEventPayload, FrameEntryType, GameEndType, GameStartType, PlayerType } from '@slippi/slippi-js';
import { MessageHandler } from './messageHandler';
import EventEmitter from 'events';
import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import { Api } from './api';
import { ElectronJsonStore } from './electronStore';
import { Player } from '../../frontend/src/lib/types/types';
import { LiveStatsScene } from '../../frontend/src/lib/types/enum';

@singleton()
export class StatsDisplay {

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
		this.slpStream = slpStream;
		this.slpParser = slpParser;
		this.store = store;
		this.api = api;

		this.initStatDisplay();
	}

	async initStatDisplay() {
		this.slpStream.on(SlpStreamEvent.COMMAND, async (event: SlpRawEventPayload) => {
			// console.log("Commmand parsed by SlpStream: " + event.command + event.payload)
			this.slpParser.handleCommand(event.command, event.payload);
			if (event.command == 54) {
				await this.handleGameStart(this.slpParser.getSettings());
			}
		});

		this.slpParser.on(SlpParserEvent.END, async (gameEnd: GameEndType) => {
			this.handleScore(gameEnd)
			await this.handleGameEnd(gameEnd, this.slpParser.getLatestFrame(), this.slpParser.getSettings());
		});

		this.slpParser.on(SlpParserEvent.FRAME, async (frameEntry: FrameEntryType) => {
			await this.handleGameFrame(frameEntry)
		});
	}

	async handleGameFrame(frameEntry: FrameEntryType) {
		await this.messageHandler.sendMessage('game_frame', frameEntry);
	}

	async handleGameStart(settings: GameStartType | null) {
		if (!settings) return;
		let currentPlayers: Player[] = await this.getCurrentPlayersWithRankStats(settings)

		let currentPlayer: Player | undefined = this.getCurrentPlayerRankStats(currentPlayers)
		if (!currentPlayer) return;

		if (settings?.matchInfo?.gameNumber === 0) {
			this.store.setGameScore([0, 0]);
		}

		this.store.setCurrentPlayerCurrentRankStats(currentPlayer.rankedNetplayProfile);
		this.store.setCurrentPlayers(currentPlayers);
		this.store.setGameSettings(settings);
	}

	// TODO: Handle offline data by returning existing values
	async handleGameEnd(gameEnd: GameEndType, frameEntry: FrameEntryType | null, settings: GameStartType | null) {
		if (!settings) return;
		this.log.info("Game End", gameEnd, frameEntry, settings);

		let currentPlayersRankStats: Player[] = await this.getCurrentPlayersWithRankStats(settings)

		let currentPlayer: Player | undefined = this.getCurrentPlayerRankStats(currentPlayersRankStats)
		if (!currentPlayer) return;

		this.store.setCurrentPlayerNewRankStats(currentPlayer?.rankedNetplayProfile);

		let recentGameStats = this.getRecentGameStats();
		this.messageHandler.sendMessage('game_stats', recentGameStats);
	}

	async getCurrentPlayersWithRankStats(settings: GameStartType): Promise<Player[]> {
		let currentPlayers = settings.players.filter(player => player)
		return (await Promise.all(
			currentPlayers.map(async (player: PlayerType) => await this.api.getPlayerWithRankStats(player))
		)).filter((player): player is Player => player !== undefined);
	}

	getCurrentPlayerRankStats(players: Player[]): Player | undefined {
		const player = this.store.getCurrentPlayer()
		if (!player) return;
		return players.find(player => player.connectCode === player.connectCode);
	}

	handleScore(gameEnd: GameEndType) {
		this.store.setGameScore([0, 0]);
		let score: number[] = this.store.getGameScore() ?? [0, 0];
		const winnerIndex = gameEnd.placements
			.filter((p: any) => p.position >= 0)
			.sort((a: any, b: any) => a.position - b.position)[0].playerIndex;
		score[winnerIndex] += 1;
		this.messageHandler.sendMessage('game_score', score);
		this.store.setGameScore(score);
	}

	async initListeners() {
		this.store.setListener(`settings.currentPlayer.newRankedNetplayProfile`, async () => {
			await this.handleRankChange()
		})
		this.store.setListener(`settings.currentPlayer.rankedNetplayProfile`, async () => {
			this.messageHandler.sendMessage('current_player', this.store.getCurrentPlayer());
		})
		this.store.setListener(`stats.currentPlayers`, async () => {
			this.messageHandler.sendMessage('current_players', this.store.getCurrentPlayers());
		})
		this.store.setListener(`stats.game.settings`, async () => {
			this.messageHandler.sendMessage('game_settings', this.store.getGameSettings());
		})
	}

	async handleRankChange() {
		const playerRank = this.store.getCurrentPlayer()
		if (!playerRank) return
		await new Promise((resolve) => {
			if (playerRank.rankedNetplayProfile !== playerRank.newRankedNetplayProfile) this.store.setStatsScene(LiveStatsScene.RankChange)
			setTimeout(resolve, 10000);
		});
		this.store.setCurrentPlayerCurrentRankStats(playerRank.newRankedNetplayProfile);
		this.store.setStatsScene(LiveStatsScene.PostGame)
	}

	// OTHER
	getGameFiles() {
		const fs = require('fs');
		const re = new RegExp('^Game_.*.slp$');
		const path = require('path');

		const slippiDir = this.store.getSlippiRootDirectory();

		if (!slippiDir) return null;

		let files = fs
			.readdirSync(slippiDir)
			.map((filename: string) => `${path.parse(filename).name}.slp`);

		files = files.filter((f: string) => re.test(f)).map((f: string) => `${slippiDir}/${f}`);
		return files.sort((a: string, b: string) => a.length - b.length); // Fix
	}

	getRecentGameStats() {
		const files = this.getGameFiles();
		if (!files) return null;
		const game = new SlippiGame(files[files.length - 1]);

		return game?.getStats();
	}
}
