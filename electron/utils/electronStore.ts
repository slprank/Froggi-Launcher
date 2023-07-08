// https://www.npmjs.com/package/electron-store
import ip from 'ip';
import Store from 'electron-store';
import type { CurrentPlayer, GameStartMode, GameStats, Obs, Overlay, Player, RankedNetplayProfile, Session, SlippiLauncherSettings, Url } from '../../frontend/src/lib/models/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from './messageHandler';
import { FrameEntryType, GameEndType, GameStartType, PlayerType, StatsType } from '@slippi/slippi-js';
import getAppDataPath from 'appdata-path';
import fs from 'fs';
import os from 'os';
import { InGameState, LiveStatsScene } from '../../frontend/src/lib/models/enum';


@singleton()
export class ElectronJsonStore {
	isMac: boolean = os.platform() === 'darwin';
	isWindows: boolean = os.platform() === 'win32';
	isLinux: boolean = os.platform() === 'linux';
	store: Store = new Store();
	constructor(
		@inject("ElectronLog") public log: ElectronLog,
		@inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
	) {
		this.log = log;
		this.messageHandler = messageHandler
		this.initListeners();
		this.initCustom();
		this.updateSlippiSettings();
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

	getSlippiLauncherSettings(): SlippiLauncherSettings {
		return this.store.get('settings.slippiLauncher') as SlippiLauncherSettings;
	}

	setSlippiLauncherSettings(dir: string) {
		this.store.set('settings.slippiLauncher', dir);
	}

	updateSlippiSettings(): SlippiLauncherSettings | undefined {
		try {
			const slippiPath = getAppDataPath('Slippi Launcher');
			const rawData = fs.readFileSync(`${slippiPath}/Settings`, 'utf-8');
			let settings = JSON.parse(rawData)?.settings as SlippiLauncherSettings;
			settings = this.verifyAndFixDefaultSettings(settings);
			this.setSlippiLauncherSettings(settings.rootSlpPath!)
			return settings;
		} catch (err) {
			this.log.error(err);
		}
		return
	}

	verifyAndFixDefaultSettings(settings: SlippiLauncherSettings): SlippiLauncherSettings {
		const defaultPath = this.getSlippiDefaultPath()
		if (settings?.rootSlpPath === undefined) {
			settings.rootSlpPath = defaultPath
		}
		if (settings?.spectateSlpPath === undefined) {
			settings.rootSlpPath = `${settings.rootSlpPath}/spectate`
		}
		if (settings?.spectateSlpPath === undefined) {
			settings.useMonthlySubfolders = false
		}
		fs.writeFileSync(`${getAppDataPath('Slippi Launcher')}/Settings`, JSON.stringify({ settings: settings }))
		return settings;
	}

	getSlippiDefaultPath(): string {
		const username = os.userInfo().username
		if (this.isWindows) return `C:/Users/${username}/Documents/Slippi`;
		if (this.isMac) return `/Users/${username}/Slippi`;
		if (this.isLinux) return `/Users/${username}/Slippi`;
		throw new Error("No valid OS")
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

	setCustom(value: Obs) {
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

	updateCustomOverlay(overlay: Overlay): void {
		if (!overlay) return;
		let custom = this.getCustom();
		const overlayIndex = this.getCustomOverlayIndex(overlay.id);
		overlayIndex === undefined || overlayIndex === -1
			? custom.overlays.push(overlay)
			: (custom.overlays[overlayIndex] = overlay);
		this.setCustom(custom);
	}

	uploadCustomOverlay(overlay: Overlay): void {
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
		return this.store.get('dolphin.status');
	}

	setDolphinConnectionStatus(status: any) {
		return this.store.set('dolphin.status', status);
	}

	// LIVE STATS
	getStatsScene(): LiveStatsScene {
		return this.store.get('stats.scene') as LiveStatsScene ?? 0;
	}

	setStatsScene(scene: LiveStatsScene) {
		this.store.set('stats.scene', scene ?? 0);
	}

	getCurrentPlayers(): Player[] | undefined {
		return this.store.get('stats.currentPlayers') as Player[];
	}

	setCurrentPlayers(players: (Player | PlayerType)[]) {
		this.store.set('stats.currentPlayers', players?.filter(player => player));
	}

	getGameFrame(): FrameEntryType {
		return this.store.get('stats.game.frame') as FrameEntryType
	}

	setGameFrame(frameEntry: FrameEntryType) {
		this.store.set('stats.game.frame', frameEntry)
	}

	getGameState() {
		return this.store.get("stats.game.state")
	}

	setGameState(state: InGameState) {
		if (state === this.getGameState()) return;
		return this.store.set("stats.game.state", state)
	}

	getGameSettings(): GameStartType {
		return this.store.get('stats.game.settings') as GameStartType;
	}

	setGameSettings(settings: GameStartType) {
		return this.store.set('stats.game.settings', settings);
	}

	getGameStats(): StatsType {
		return this.store.get('stats.game.stats') as StatsType;
	}

	setGameStats(gameStats: GameEndType) {
		this.store.set('stats.game.stats', gameStats);
	}

	getGameScore(): number[] {
		return this.store.get('stats.game.score') as number[];
	}

	setGameScore(score: number[]) {
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

	getRecentOfflineSets() {
		return this.getRecentSetsByMode('');
	}

	getRecentDirectSets() {
		return this.getRecentSetsByMode('direct');
	}

	getRecentUnankedSets() {
		return this.getRecentSetsByMode('unranked');
	}

	getRecentRankedSets() {
		return this.getRecentSetsByMode('ranked');
	}

	// GAME
	setGameMatch(settings: GameStartType, gameEnd: GameEndType, postGameStats: StatsType | null) {
		const player = this.getCurrentPlayer();
		if (!settings?.matchInfo?.matchId || !player) return;
		if (!settings.players.some((p: PlayerType) => p.connectCode === player.connectCode))
			return;

		const regex = /mode\.(\w+)/;
		let gameStats: GameStats = {
			settings: settings,
			gameEnd: gameEnd,
			postGameStats: postGameStats,
			timestamp: this.dateTimeNow(),
			score: this.getGameScore(),
			mode: settings.matchInfo.matchId.match(regex)![1] as GameStartMode
		}

		this.setRecentGames(gameStats)

		if (!settings.matchInfo.matchId || !settings.matchInfo.gameNumber) return;
		let matches = (this.getSetByMatchId(settings.matchInfo.matchId) ?? []) as GameStats[];
		matches.push(gameStats)

		this.store.set(`player.${player.connectCode}.game`, gameStats);
	}

	getGameMatch(matchId: string, gameNumber: number): GameStats | undefined {
		const player = this.getCurrentPlayer();
		if (!player) return;
		const games = this.store.get(`player.${player.connectCode}.game`) as GameStats[];
		return games.find(game => game.settings.matchInfo?.matchId === matchId && game.settings.matchInfo?.gameNumber === gameNumber) as GameStats
	}

	getSetByMatchId(matchId: string): GameStats[] | undefined {
		const player = this.getCurrentPlayer();
		if (!player) return;
		const games = this.store.get(`player.${player.connectCode}.game`) as GameStats[];
		return games.filter(game => game.settings.matchInfo?.matchId === matchId) as GameStats[]
	}

	setRecentGames(game: GameStats) {
		let games = this.getRecentGames();
		games.push(game)
		this.store.set(`recent.game`, games)
	}

	getRecentGames(): GameStats[] {
		return (this.store.get(`recent.game`) ?? []) as GameStats[];
	}

	resetRecentGames() {
		this.store.set(`recent.game`, [])
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

	setCurrentPlayerCurrentRankStats(rankStats: RankedNetplayProfile | undefined) {
		const player = this.getCurrentPlayer();
		if (!rankStats || !player) return;
		this.store.set(`settings.currentPlayer.rankedNetplayProfile`, rankStats);
	}

	setCurrentPlayerNewRankStats(rankStats: RankedNetplayProfile | undefined) {
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

	// Listeners
	initListeners() {
		this.store.onDidChange(`dolphin.status`, async (value) => {
			this.messageHandler.sendMessage('dolphin_status', value);
		})
		this.store.onDidChange("obs.custom", (value) => {
			this.messageHandler.sendMessage('obs_custom', value);
		})
		this.store.onDidChange("stats.scene", (value) => {
			this.messageHandler.sendMessage("live_stats_scene", value)
		})
		this.store.onDidChange(`settings.currentPlayer`, async (value) => {
			this.messageHandler.sendMessage('current_player', value);
		})
		this.store.onDidChange(`stats.currentPlayers`, async (value) => {
			this.messageHandler.sendMessage('current_players', value);
		})
		this.store.onDidChange(`stats.game.frame`, async (value) => {
			this.messageHandler.sendMessage('game_frame', value);
		})
		this.store.onDidChange(`stats.game.settings`, async (value) => {
			this.messageHandler.sendMessage('game_settings', value);
		})
		this.store.onDidChange(`stats.game.score`, async (value) => {
			this.messageHandler.sendMessage('game_score', value);
		})
		this.store.onDidChange(`stats.game.state`, async (value) => {
			console.log("state", value)
			this.messageHandler.sendMessage('game_state', value);
		})
		this.store.onDidChange(`stats.game.stats`, async (value) => {
			this.messageHandler.sendMessage('post_game_stats', value);
		})
		this.store.onDidChange(`recent.game`, async (value) => {
			this.messageHandler.sendMessage('recent_games', value);
		})
	}
}
