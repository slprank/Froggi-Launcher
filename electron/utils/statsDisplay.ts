import { SlpParserEvent, SlpStreamEvent, SlippiGame, SlpParser, SlpStream, SlpRawEventPayload, FrameEntryType, GameEndType, GameStartType, PlayerType, PlacementType } from '@slippi/slippi-js';
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
			//console.log(event.command, event.payload)
			if (event.command === 54) {
				this.handleUndefinedPlayers(this.slpParser.getSettings() ?? undefined)
				await this.handleGameStart(this.slpParser.getSettings());
			}
		});

		this.slpParser.on(SlpParserEvent.END, async (gameEnd: GameEndType) => {
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
		let currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		console.log("current", currentPlayers)

		if (settings?.matchInfo?.matchId && [1].includes(settings?.matchInfo?.gameNumber ?? 0)) {
			this.store.setGameScore([0, 0]);
		}

		this.store.setCurrentPlayerCurrentRankStats(this.getCurrentPlayer(currentPlayers)?.rankedNetplayProfile);
		this.store.setCurrentPlayers(currentPlayers);
		this.store.setGameSettings(settings);
		this.store.setStatsScene(LiveStatsScene.InGame)
	}

	async handleGameEnd(gameEnd: GameEndType, frameEntry: FrameEntryType | null, settings: GameStartType | null) {
		if (!settings) return;
		this.log.info("Game End", gameEnd, frameEntry, settings);
		this.handleScore(gameEnd)

		const currentPlayers = await this.getCurrentPlayersWithRankStats(settings)
		
		const currentPlayer = this.getCurrentPlayer(currentPlayers)
		const recentGameStats = this.getRecentGameStats();

		this.store.setCurrentPlayerNewRankStats(currentPlayer?.rankedNetplayProfile);
		this.store.setGameStats(gameEnd)
		this.store.setStatsScene(LiveStatsScene.PostGame)
		if (recentGameStats) this.messageHandler.sendMessage('post_game_stats', recentGameStats);
	}

	async getCurrentPlayersWithRankStats(settings: GameStartType): Promise<(Player)[]> {
		let currentPlayers = settings.players.filter(player => player)
		console.log("settings", settings.players)
		if (currentPlayers.some(player => !player.connectCode))
			return settings.players.filter(player => player).map((player, i: number) => { return{
				...player,
				rankedNetplayProfile: this.store.getCurrentPlayers()?.at(i)?.rankedNetplayProfile
			}})
		
		return (await Promise.all(
			currentPlayers.map(async (player: PlayerType) => await this.api.getPlayerWithRankStats(player))
		)).filter((player): player is Player => player !== undefined);
	}

	getCurrentPlayer(players: Player[]): Player | undefined {
		const player = this.store.getCurrentPlayer()
		if (!player) return;
		return players.find(player => player.connectCode === player.connectCode);
	}

	handleScore(gameEnd: GameEndType) {
		let score: number[] = this.store.getGameScore() ?? [0, 0];
		const winnerIndex = gameEnd.placements
			.filter((p: PlacementType) => (p.position ?? -1) >= 0)
			.sort((a: PlacementType, b: PlacementType) => a.playerIndex - b.playerIndex)
			.findIndex(p => p.position === 0); // Verify that winner is 0
		console.log("Game end", gameEnd.placements)
		console.log(winnerIndex)
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

	handleUndefinedPlayers(settings: GameStartType | undefined) {
		if (!settings) return;
		const players = this.store.getCurrentPlayers()
		if (!players) this.store.setCurrentPlayers(settings.players)
	}
}
