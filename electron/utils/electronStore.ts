// https://www.npmjs.com/package/electron-store
import ip from 'ip';
import Store from 'electron-store';
import type { CurrentPlayer, GameStartMode, GameStats, Obs, Overlay, Player, RankedNetplayProfile, Session, Url } from '../../frontend/src/lib/types/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from './messageHandler';
import getAppDataPath from 'appdata-path';
import fs from 'fs';
import { GameStartType, PlayerType } from '@slippi/slippi-js';

@singleton()
export class ElectronJsonStore {
	log: ElectronLog;
	messageHandler: MessageHandler;
	store: Store = new Store();
	constructor(
		@inject("ElectronLog") log: ElectronLog,
		@inject(delay(() => MessageHandler)) messageHandler: MessageHandler,
	) {
		this.log = log;
		this.messageHandler = messageHandler
		this.initListeners();
		this.initCustom();
	}

	setListener(key: string, callback: Function) {
		this.store.onDidChange(key, () => callback())
	}

	newId = () => `${Math.random().toString(36).slice(-8)}`;

	dateTimeNow(): Date {
		var utcSeconds = Date.now() / 1000;
		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds(utcSeconds);
		this.log.info(d)
		return d;
	}

	// SETTINGS
	getCurrentPlayer(): CurrentPlayer | undefined {
		return this.store.get('settings.currentPlayer') as CurrentPlayer;
	}

	setCurrentPlayer(player: CurrentPlayer) {
		this.store.set('settings.currentPlayer', player);
	}

	getSlippiRootDirectory(): string {
		return this.store.get('settings.slippiReplayDir') as string;
	}

	setSlippiRootDirectory(dir: string) {
		this.store.set('settings.slippiReplayDir', dir);
	}

	getSlippiSettings() {
		try {
			const slippiPath = getAppDataPath('Slippi Launcher');
			const rawData = fs.readFileSync(`${slippiPath}/Settings`, 'utf-8');
			const settings = JSON.parse(rawData)?.settings;
			return settings;
		} catch (err) {
			this.log.error(err);
		}
	}

	getLocalUrl(): Url {
		let urls = {} as Url;
		urls.local = `http://localhost:3200`;
		urls.external = `http://${ip.address()}:3200`;
		return urls;
	}

	// CUSTOM OVERLAY
	getCustom(): Obs {
		return this.store.get('obs.custom') as Obs;
	}

	setCustom(value: any) {
		if (!value) return;
		this.store.set('obs.custom', value);
	}

	initCustom() {
		if (this.store.get('obs.custom.overlays') === undefined)
			this.store.set('obs.custom.overlays', []);
	}

	getCustomOverlayById(overlayId: string): Overlay {
		const custom = this.getCustom();
		return custom?.overlays?.find((overlay: Overlay) => overlay.id === overlayId) as Overlay;
	}

	getCustomOverlayIndex(overlayId: string): number {
		const overlays = this.getCustom().overlays;
		return overlays?.findIndex((overlay: any) => overlay.id == overlayId) ?? undefined;
	}

	updateCustomOverlay(overlay: any): void {
		if (!overlay) return;
		let custom = this.getCustom();
		console.log('custom', custom);
		const overlayIndex = this.getCustomOverlayIndex(overlay.id);
		console.log('index', overlayIndex);
		overlayIndex === undefined || overlayIndex === -1
			? custom.overlays.push(overlay)
			: (custom.overlays[overlayIndex] = overlay);
		this.setCustom(custom);
	}

	uploadCustomOverlay(overlay: any): void {
		if (!overlay) return;
		let custom = this.getCustom();
		overlay.id = this.newId();
		custom.overlays.push(overlay);
		this.setCustom(custom);
	}

	deleteCustomOverlay(overlayId: string): void {
		if (!overlayId) return;
		let custom = this.getCustom();
		custom.overlays = custom.overlays.filter((overlay: any) => overlay.id !== overlayId);
		this.setCustom(custom);
	}

	// STATUS
	getDolphinConnectionStatus() {
		return this.store.get('status.dolphin');
	}

	setDolphinConnectionStatus(status: any) {
		return this.store.set('status.dolphin', status);
	}

	// LIVE STATS
	getStatsScene() {
		return this.store.get('stats.scene') ?? 0;
	}

	setStatsScene(scene: any) {
		this.store.set('stats.scene', scene ?? 0);
	}

	getCurrentPlayers(): Player[] {
		return this.store.get('stats.currentPlayers') as Player[];
	}

	setCurrentPlayers(players: Player[]) {
		this.store.set('stats.currentPlayers', players);
	}

	getGameSettings() {
		return this.store.get('stats.game.settings');
	}

	setGameSettings(settings: any) {
		return this.store.set('stats.game.settings', settings);
	}

	getGameStats() {
		return this.store.get('stats.game.stats');
	}

	setGameStats(gameStats: any, latestFrame: any) {
		if (latestFrame) gameStats.latestFrame = latestFrame;
		this.store.set('stats.game.stats', gameStats);
	}

	getGameScore(): number[] {
		return this.store.get('stats.game.score') as number[];
	}

	setGameScore(score: any) {
		this.store.set('stats.game.score', score);
	}

	getSessionStats(): Session | undefined {
		const player = this.getCurrentPlayer();
		if (!player) return;
		return this.store.get(`player.${player.connectCode}.session`) as Session;
	}

	resetSessionStats() {
		const player = this.getCurrentPlayer();
		if (!player) return;
		let currentRankedStats = player.rankedNetplayProfile;
		if (!currentRankedStats) return;
		let session: Session = {
			startRankStats: currentRankedStats,
			startTime: this.dateTimeNow(),
			currentRankStats: currentRankedStats,
			latestUpdate: this.dateTimeNow(),
		};
		this.store.set(`player.${player.connectCode}.session`, session);
		return session;
	}

	updateSessionStats(rankStats: RankedNetplayProfile) {
		const player = this.getCurrentPlayer();
		if (!player) return;
		let session = this.getSessionStats() ?? this.resetSessionStats();
		if (!session) return;
		session.latestUpdate = this.dateTimeNow();
		session.currentRankStats = rankStats;
		this.store.set(`player.${player.connectCode}.session`, session);
	}

	getRecentRankedSets() {
		return this.getRecentSetsByMode('ranked');
	}

	// GAME
	setGame(settings: GameStartType) {
		const player = this.getCurrentPlayer();
		if (!settings?.matchInfo?.matchId || !player) return;
		if (!settings.players.some((p: PlayerType) => p.connectCode === player.connectCode))
			return;
		const regex = /mode\.(\w+)/;
		let gameStats: GameStats = {
			...settings,
			timestamp: this.dateTimeNow(),
			score: this.getGameScore(),
			mode: settings.matchInfo.matchId.match(regex)![1] as GameStartMode
		}
		let sets = this.store.get(`player.${player.connectCode}.game`) as GameStats[];
		sets.push(gameStats)

		this.store.set(
			`player.${player.connectCode}.games`,
			gameStats,
		);
	}

	getGame(matchId: string, gameNumber: number): GameStats | undefined {
		const player = this.getCurrentPlayer();
		if (!player) return;
		const games = this.store.get(`player.${player.connectCode}.game`) as GameStats[];
		return games.find(game => game.matchInfo?.matchId === matchId && game.matchInfo?.gameNumber === gameNumber) as GameStats
	}

	getSet(matchId: string): GameStats[] | undefined {
		const player = this.getCurrentPlayer();
		if (!player) return;
		const games = this.store.get(`player.${player.connectCode}.game`) as GameStats[];
		return games.filter(game => game.matchInfo?.matchId === matchId) as GameStats[]
	}

	getAllSets(): GameStats[] | undefined {
		const player = this.getCurrentPlayer();
		if (!player) return;
		return this.store.get(`player.${player.connectCode}.game`) as GameStats[] | undefined;
	}

	getAllSetsByMode(mode: GameStartMode): GameStats[] | undefined {
		if (!mode) return;
		let sets = this.getAllSets();
		if (!sets) return;
		return sets.filter(set => set.mode === mode)
	}

	// RECENT SETS
	getRecentSets(number = 10): GameStats[] {
		const recentSets = this.getAllSets() ?? [];
		return recentSets.sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number);
	}

	getRecentSetsByMode(mode: GameStartMode, number = 10) {
		if (!mode) return;
		let rankedSets = this.getAllSets() ?? [];
		return rankedSets.filter(set => set.mode === mode).sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()).slice(0, number);
	}

	// Rank
	getCurrentPlayerRankStats(): RankedNetplayProfile | undefined {
		const player = this.getCurrentPlayer();
		if (!player) return;
		return this.store.get(`settings.currentPlayer.rankedNetplayProfile`) as RankedNetplayProfile;
	}

	setCurrentPlayerCurrentRankStats(rankStats: RankedNetplayProfile) {
		const player = this.getCurrentPlayer();
		if (!rankStats || !player) return;
		this.store.set(`settings.currentPlayer.rankedNetplayProfile`, rankStats);
	}

	setCurrentPlayerNewRankStats(rankStats: RankedNetplayProfile) {
		const player = this.getCurrentPlayer();
		if (!rankStats || !player) return;
		this.store.set(`settings.currentPlayer.newRankedNetplayProfile`, rankStats);
		this.updateCurrentPlayerRankHistory(rankStats);
	}

	// TODO: Use array instead
	getPlayerRankHistory(): RankedNetplayProfile[] | undefined {
		const player = this.getCurrentPlayer();
		if (!player) return;
		return this.store.get(`player.${player.connectCode}.rank.history`) as RankedNetplayProfile[];
	}

	updateCurrentPlayerRankHistory(rankStats: RankedNetplayProfile) {
		const player = this.getCurrentPlayer();
		let history = this.getPlayerRankHistory();
		if (!rankStats || !player || !history) return;
		history.push(rankStats)
		this.store.set(
			`player.${player.connectCode}.rank.history`,
			history,
		);
	}

	// Get recent game - statDisplay

	// Listeners
	initListeners() {
		this.store.onDidChange("stats.scene", () => {
			this.messageHandler.sendMessage("live_stats_scene", this.getStatsScene())
		})
	}
}
