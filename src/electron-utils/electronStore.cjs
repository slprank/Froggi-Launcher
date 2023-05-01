// https://www.npmjs.com/package/electron-store

class ElectronStore {
	constructor(log) {
		const Store = require('electron-store');
		this.ip = require('ip');
		this.store = new Store();
		this.log = log;
	}

	newId = () => '_' + Math.random().toString(36);

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

	setCurrentPlayer(connectCode) {
		this.store.set('settings.currentPlayer', connectCode);
	}

	getSlippiRootDirectory() {
		return this.store.get('settings.slippiReplayDir');
	}

	setSlippiRootDirectory(dir) {
		this.store.set('settings.slippiReplayDir', dir);
	}

	getLocalUrl() {
		let urls = {};
		urls.local = `http://localhost:3200`;
		urls.external = `http://${this.ip.address()}:3200`;
		return urls;
	}

	// CUSTOM OVERLAY
	getCustomOverlay() {
		return this.store.get('obs.custom');
	}

	getCustomOverlayById(overlayId) {
		const custom = this.getCustomOverlay();
		return custom.overlays.find((overlay) => overlay.id === overlayId);
	}

	getCustomOverlayIndex(overlayId) {
		const overlays = this.getCustomOverlay().overlays;
		return overlays.findIndex((overlay) => (overlay.id = overlayId));
	}

	setCustomOverlay(value) {
		if (!value) return;
		this.store.set('obs.custom', value);
	}

	updateCustomOverlay(overlay) {
		if (!overlay) return;
		let custom = this.getCustomOverlay();
		const overlayIndex = this.getCustomOverlayIndex(overlay.id);
		overlayIndex === undefined || overlayIndex === -1
			? custom.overlays.push(overlay)
			: (custom.overlays[overlayIndex] = overlay);
		this.setCustomOverlay(custom);
	}

	uploadCustomOverlay(overlay) {
		if (!overlay) return;
		let custom = this.getCustomOverlay();
		overlay.id = this.newId();
		custom.overlays.push(overlay);
		this.setCustomOverlay(custom);
	}

	// STATUS
	getDolphinConnectionStatus() {
		return this.store.get('status.dolphin');
	}

	setDolphinConnectionStatus(status) {
		return this.store.set('status.dolphin', status);
	}

	// LIVE STATS
	getStatsScene() {
		return this.store.get('stats.scene') ?? 0;
	}

	setStatsScene(scene) {
		this.store.set('stats.scene', scene ?? 0);
	}

	getCurrentPlayersRankStats() {
		return this.store.get('stats.currentPlayersRankStats');
	}

	setCurrentPlayersRankStats(playersRankStats) {
		this.store.set('stats.currentPlayersRankStats', playersRankStats);
	}

	getGameSettings() {
		return this.store.get('stats.game.settings');
	}

	setGameSettings(settings) {
		return this.store.set('stats.game.settings', settings);
	}

	getGameStats() {
		return this.store.get('stats.game.stats');
	}

	setGameStats(gameStats, latestFrame) {
		if (latestFrame) gameStats.latestFrame = latestFrame;
		this.store.set('stats.game.stats', gameStats);
	}

	getGameScore() {
		return this.store.get('stats.game.score');
	}

	setGameScore(score) {
		this.store.set('stats.game.score', score);
	}

	getSessionStats() {
		return this.store.get(`player.${this.getCurrentPlayer()}.session`);
	}

	setSessionStats(rankStats) {
		let session = {
			startRankStats: rankStats,
			startTime: this.dateTimeNow(),
			currentRankStats: rankStats,
			latestUpdate: this.dateTimeNow(),
		};
		this.store.set(`player.${this.getCurrentPlayer()}.session`, session);
		return session;
	}

	updateSessionStats(rankStats) {
		let session = this.getSessionStats() ?? this.setSession(rankStats);
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
	setGame(gameStats) {
		if (!gameStats?.matchId) return;
		if (!gameStats.players.some((p) => p.connectCode == this.getCurrentPlayer())) return;
		gameStats.timestamp = this.dateTimeNow();
		this.store.set(
			`player.${this.getCurrentPlayer()}.game.${gameStats.matchId}.${gameStats.gameNumber}`,
			gameStats,
		);
	}

	getGame(matchId, gameNumber) {
		return this.store.get(`player.${this.getCurrentPlayer()}.game.${matchId}.${gameNumber}`);
	}

	getSet(matchId) {
		return this.store.get(`player.${this.getCurrentPlayer()}.game.${matchId}`);
	}

	getAllSets(mode) {
		if (!mode) return;
		const sets = this.store.get(`player.${this.getCurrentPlayer()}.game`);
		const matchIds = Object.keys(sets ?? {});
		const regex = /mode\.(\w+)/;
		const setIds = matchIds.filter((m) => m.match(regex)[1] == mode);
		return setIds?.map((id) => sets[id]);
	}

	// RECENT SETS
	getRecentSets(mode, number = 10) {
		if (!mode) return;
		const rankedSets = this.getAllSets(mode);
		const recentSets = rankedSets.sort((a, b) => a.matchId > b.matchId).slice(0, number);

		return recentSets.map((id) => sets[id]);
	}

	// Rank
	getCurrentPlayerRankStats() {
		this.store.get(`player.${this.getCurrentPlayer()}.rank`);
	}

	setCurrentPlayerCurrentRankStats(rankStats) {
		if (!rankStats) return;
		// TODO: Check if number of ranked games are changed
		// If true, fill gap with empty games
		this.store.set(`player.${this.getCurrentPlayer()}.rank.current`, rankStats);
	}

	setCurrentPlayerActualRankStats(rankStats) {
		if (!rankStats) return;
		this.store.set(`player.${this.getCurrentPlayer()}.rank.new`, rankStats);
		const currentRank = this.getCurrentPlayerRankStats();
		if (currentRank == rankStats) return; // Not tested
		this.updateCurrentPlayerRankHistory(rankStats);
	}

	getPlayerRankHistory() {
		this.store.get(`player.${this.getCurrentPlayer()}.rank.history`);
	}

	updateCurrentPlayerRankHistory(rankStats) {
		if (!rankStats) return;
		this.store.set(
			`player.${this.getCurrentPlayer()}.rank.history.${this.dateTimeNow()}`,
			rankStats,
		);
	}

	// Get recent game - statDisplay
}

module.exports = { ElectronStore };
