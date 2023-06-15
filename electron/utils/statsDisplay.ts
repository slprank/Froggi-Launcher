import { SlpParserEvent, SlpStreamEvent, SlippiGame, SlpParser, SlpStream, SlpRawEventPayload, FrameEntryType, GameEndType, GameStartType, PlayerType } from '@slippi/slippi-js';
import { MessageHandler } from './messageHandler';
import EventEmitter from 'events';
import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import { Api } from './api';
import { ElectronJsonStore } from './electronStore';
import { Player, RankedNetplayProfile } from '../../frontend/src/lib/models/types';
import { LiveStatsScene } from '../../frontend/src/lib/models/enum';

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
		this.store = store;
		this.api = api;

		this.initStatDisplay();
	}

	async initStatDisplay() {
		this.slpStream.on(SlpStreamEvent.COMMAND, async (event: SlpRawEventPayload) => {
			// console.log("Commmand parsed by SlpStream: " + event.command + event.payload)
			this.slpParser.handleCommand(event.command, event.payload);
			console.log(event.command, event.payload)
			if (event.command === 54) {
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

	// TODO: Handle offline game data by returning existing values
	async handleGameStart(settings: GameStartType | null) {
		if (!settings) return;
		this.log.info("Game start", settings)
		let currentPlayers: Player[] = await this.getCurrentPlayersWithRankStats(settings)

		let currentPlayerRankStats: RankedNetplayProfile | undefined = this.getCurrentPlayerRankStats(currentPlayers)

		if (settings?.matchInfo?.gameNumber === 0) {
			this.store.setGameScore([0, 0]);
		}

		this.store.setCurrentPlayerCurrentRankStats(currentPlayerRankStats);
		this.store.setCurrentPlayers(currentPlayers);
		this.store.setGameSettings(settings);
		this.store.setStatsScene(LiveStatsScene.InGame)
	}

	// TODO: Handle offline game data by returning existing values
	async handleGameEnd(gameEnd: GameEndType, frameEntry: FrameEntryType | null, settings: GameStartType | null) {
		if (!settings) return;
		this.log.info("Game End", gameEnd, frameEntry, settings);

		const currentPlayersRankStats: Player[] = await this.getCurrentPlayersWithRankStats(settings)
		const currentPlayerRankStats: RankedNetplayProfile | undefined = this.getCurrentPlayerRankStats(currentPlayersRankStats)
		const recentGameStats = this.getRecentGameStats();

		this.store.setCurrentPlayerNewRankStats(currentPlayerRankStats);
		if (recentGameStats) this.messageHandler.sendMessage('game_stats', recentGameStats);
	}

	async getCurrentPlayersWithRankStats(settings: GameStartType): Promise<Player[]> {
		let currentPlayers = settings.players.filter(player => player)
		if (currentPlayers.some(player => !player.connectCode)) {
			return await new Promise<Player[]>(resolve => {
				resolve(this.store.getCurrentPlayers());
			})
		}
		return (await Promise.all(
			currentPlayers.map(async (player: PlayerType) => await this.api.getPlayerWithRankStats(player))
		)).filter((player): player is Player => player !== undefined);
	}

	getCurrentPlayerRankStats(players: Player[]): RankedNetplayProfile | undefined {
		const player = this.store.getCurrentPlayer()
		if (!player) return;
		return players.find(player => player.connectCode === player.connectCode)?.rankedNetplayProfile;
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
	// TODO: Fix these
	getGameFiles() {
		const fs = require('fs');
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
		if (!files) return null;
		const game = new SlippiGame(files.at(-1));

		return game?.getStats();
	}
}
