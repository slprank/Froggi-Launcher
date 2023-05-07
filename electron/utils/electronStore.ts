// https://www.npmjs.com/package/electron-store
import ip from 'ip';
import Store from 'electron-store';
export class ElectronStore {
	log: any;
	store: any;
	constructor(log: any) {
		this.store = new Store();
		this.log = log;
		this.initCustom();
	}

	newId = () => `${Math.random().toString(36).slice(-8)}`;

	dateTimeNow() {
		var utcSeconds = Date.now() / 1000;
		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds(utcSeconds);
		return d;
	}

	// SETTINGS
	getCurrentPlayer() {
		return this.store.get('settings.currentPlayer');
	}

	setCurrentPlayer(connectCode: string) {
		this.store.set('settings.currentPlayer', connectCode);
	}

	getSlippiRootDirectory() {
		return this.store.get('settings.slippiReplayDir');
	}

	setSlippiRootDirectory(dir: string) {
		this.store.set('settings.slippiReplayDir', dir);
	}

	getLocalUrl() {
		let urls = { local: '', external: '' };
		urls.local = `http://localhost:3200`;
		urls.external = `http://${ip.address()}:3200`;
		return urls;
	}

	// CUSTOM OVERLAY
	getCustom() {
		return this.store.get('obs.custom');
	}

	setCustom(value: any) {
		if (!value) return;
		this.store.set('obs.custom', value);
	}

	initCustom() {
		if (this.store.get('obs.custom.overlays') === undefined)
			this.store.set('obs.custom.overlays', []);
	}

	getCustomOverlayById(overlayId: string) {
		const custom = this.getCustom();
		return custom?.overlays?.find((overlay: any) => overlay.id === overlayId);
	}

	getCustomOverlayIndex(overlayId: string) {
		const overlays = this.getCustom().overlays;
		return overlays?.findIndex((overlay: any) => overlay.id == overlayId) ?? undefined;
	}

	updateCustomOverlay(overlay: any) {
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

	uploadCustomOverlay(overlay: any) {
		if (!overlay) return;
		let custom = this.getCustom();
		overlay.id = this.newId();
		custom.overlays.push(overlay);
		this.setCustom(custom);
	}

	deleteCustomOverlay(overlayId: string) {
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

	getCurrentPlayersRankStats() {
		return this.store.get('stats.currentPlayersRankStats');
	}

	setCurrentPlayersRankStats(playersRankStats: any) {
		this.store.set('stats.currentPlayersRankStats', playersRankStats);
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

	getGameScore() {
		return this.store.get('stats.game.score');
	}

	setGameScore(score: any) {
		this.store.set('stats.game.score', score);
	}

	getSessionStats() {
		return this.store.get(`player.${this.getCurrentPlayer()}.session`);
	}

	setSessionStats(rankStats: any) {
		let session = {
			startRankStats: rankStats,
			startTime: this.dateTimeNow(),
			currentRankStats: rankStats,
			latestUpdate: this.dateTimeNow(),
		};
		this.store.set(`player.${this.getCurrentPlayer()}.session`, session);
		return session;
	}

	updateSessionStats(rankStats: any) {
		let session = this.getSessionStats() ?? this.setSessionStats(rankStats);
		session.latestDate = this.dateTimeNow();
		session.currentRankStats = rankStats;
		this.store.set(`player.${this.getCurrentPlayer()}.session`, session);
	}

	getRecentRankedSets() {
		return this.getRecentSets('ranked');
	}

	// GAME
	// Save pre and post game (In case opening app mid game)
	// Save players rank, set score and last frame*
	setGame(gameStats: any) {
		if (!gameStats?.matchId) return;
		if (!gameStats.players.some((p: any) => p.connectCode == this.getCurrentPlayer())) return;
		gameStats.timestamp = this.dateTimeNow();
		this.store.set(
			`player.${this.getCurrentPlayer()}.game.${gameStats.matchId}.${gameStats.gameNumber}`,
			gameStats,
		);
	}

	getGame(matchId: any, gameNumber: any) {
		return this.store.get(`player.${this.getCurrentPlayer()}.game.${matchId}.${gameNumber}`);
	}

	getSet(matchId: string) {
		return this.store.get(`player.${this.getCurrentPlayer()}.game.${matchId}`);
	}

	getAllSets(mode: any) {
		if (!mode) return;
		const sets = this.store.get(`player.${this.getCurrentPlayer()}.game`);
		const matchIds = Object.keys(sets ?? {});
		const regex = /mode\.(\w+)/;
		const setIds = matchIds.filter((m) => m.match(regex)![1] == mode);
		return setIds?.map((id) => sets[id]);
	}

	// RECENT SETS
	getRecentSets(mode: any, number = 10) {
		if (!mode) return;
		const rankedSets = this.getAllSets(mode) ?? [];
		const recentSets = rankedSets.sort((a, b) => a.matchId - b.matchId).slice(0, number);

		return recentSets.map((id) => recentSets[id]);
	}

	// Rank
	getCurrentPlayerRankStats() {
		this.store.get(`player.${this.getCurrentPlayer()}.rank`);
	}

	setCurrentPlayerCurrentRankStats(rankStats: any) {
		if (!rankStats) return;
		// TODO: Check if number of ranked games are changed
		// If true, fill gap with empty games
		this.store.set(`player.${this.getCurrentPlayer()}.rank.current`, rankStats);
	}

	setCurrentPlayerActualRankStats(rankStats: any) {
		if (!rankStats) return;
		this.store.set(`player.${this.getCurrentPlayer()}.rank.new`, rankStats);
		const currentRank = this.getCurrentPlayerRankStats();
		if (currentRank == rankStats) return; // Not tested
		this.updateCurrentPlayerRankHistory(rankStats);
	}

	getPlayerRankHistory() {
		this.store.get(`player.${this.getCurrentPlayer()}.rank.history`);
	}

	updateCurrentPlayerRankHistory(rankStats: any) {
		if (!rankStats) return;
		this.store.set(
			`player.${this.getCurrentPlayer()}.rank.history.${this.dateTimeNow()}`,
			rankStats,
		);
	}

	// Get recent game - statDisplay
}
