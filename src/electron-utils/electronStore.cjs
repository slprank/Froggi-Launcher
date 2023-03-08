// https://www.npmjs.com/package/electron-store

class ElectronStore {
	constructor(log) {
		const Store = require('electron-store');
		this.store = new Store();
		this.log = log;
	}

	dateTimeNow() {
		var utcSeconds = Date.now() / 1000;
		var d = new Date(0).setUTCSeconds(utcSeconds); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds(utcSeconds);
		return d;
	}

	// Json parse on get?
	// SETTINGS
	getCurrentPlayer() {
		return this.store.get('settings.currentPlayer');
	}

	setCurrentPlayer(connectCode) {
		this.store.set('settings.currentPlayer', JSON.stringify(connectCode));
	}

	getSlippiRootDirectory() {
		return this.store.get('settings.slippiReplayDir');
	}

	setSlippiRootDirectory(dir) {
		this.store.set('settings.slippiReplayDir', JSON.stringify(dir));
	}

	// LIVE STATS
	getStatsScene() {
		return this.store.get('stats.scene');
	}

	setStatsScene(scene) {
		this.store.set('stats.scene', JSON.stringify(scene));
	}

	getCurrentPlayerRankStats() {
		return this.store.get('stats.currentPlayerRankStats');
	}

	setCurrentPlayerRankStats(playerRankStats) {
		this.store.set('stats.currentPlayerRankStats', JSON.stringify(playerRankStats));
	}

	getCurrentPlayersRankStats() {
		return this.store.get('stats.currentPlayersRankStats');
	}

	setCurrentPlayersRankStats(playersRankStats) {
		this.store.set('stats.currentPlayersRankStats', JSON.stringify(playersRankStats));
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
		this.store.set('stats.game.stats', JSON.stringify(gameStats));
	}

	getGameScore() {
		return this.store.get('stats.game.score');
	}

	setGameScore(score) {
		this.store.set('stats.game.score', JSON.stringify(score));
	}

	getSessionStats() {
		return this.store.get(`player.${this.getCurrentPlayer()}.session`);
	}

	setSessionStats(rankStats) {
		let session = {
			startRankStats: rankStats,
			startDate: this.dateTimeNow(),
			currentRankStats: rankStats,
			latestDate: this.dateTimeNow(),
		};
		this.store.set(`player.${this.getCurrentPlayer()}.session`, JSON.stringify(session));
		return session;
	}

	updateSessionStats(rankStats) {
		let session = this.getSessionStats() ?? this.setSession(rankStats);
		session.latestDate = this.dateTimeNow();
		session.currentRankStats = rankStats;
		this.store.set(`player.${this.getCurrentPlayer()}.session`, session);
	}

	getRecentRankedSets() {
		this.getRecentSets('ranked');
	}

	// GAME
	// Save pre and post game (In case opening app mid game)
	// Save players rank, set score and last frame*
	setGame(gameStats) {
		if (!gameStats?.matchId) return;
		if (!gameStats.players.some((p) => p.connectCode == this.getCurrentPlayer())) return;

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
		const matchIds = Object.keys(sets);
		const regex = /mode\.(\w+)/;

		const setIds = matchIds.filter((m) => m.match(regex)[1] == mode);
		return setIds.map((id) => sets[id]);
	}

	// RECENT SETS
	getRecentSets(mode, number = 10) {
		if (!mode) return;
		const sets = this.getAllSets(mode);
		const recentSets = rankedSet.sort((a, b) => a.matchId > b.matchId).slice(0, number);

		return recentSets.map((id) => sets[id]);
	}

	// Rank
	getPlayerCurrentRank() {
		this.store.get(`player.${this.getCurrentPlayer()}.rank.current`);
	}

	setPlayerCurrentRank(rankStats) {
		if (this.getPlayerCurrentRank() == rankStats) return; // TODO: Check if number of ranked games are changed
		this.store.set(`player.${this.getCurrentPlayer()}.rank.current`, rankStats);
		this.updatePlayerRank(rankStats);
	}

	getPlayerRankHistory() {
		this.store.get(`player.${this.getCurrentPlayer()}.rank.history`);
	}

	updatePlayerRankHistory(rankStats) {
		this.store.set(`player.${this.getCurrentPlayer()}.rank.history.${Date.now()}`, rankStats);
	}
}

module.exports = { ElectronStore };
