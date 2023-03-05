// https://www.npmjs.com/package/electron-store

class ElectronStore {
	constructor(log) {
		const Store = require('electron-store');
		this.store = new Store();
		this.log = log;
	}

	// SETTINGS
	getCurrentPlayer() {
		return this.store.get('settings.currentUser');
	}

	setCurrentPlayer(connectCode) {
		this.store.set('settings.currentUser', connectCode);
	}

	getSlippiRootDirectory() {
		return this.store.get('settings.slippiReplayDir');
	}

	setSlippiRootDirectory(dir) {
		this.store.set('settings.slippiReplayDir', dir);
	}

	// GAME
	// Save pre and post game (In case opening app mid game)
	// Save players rank, set score and last frame*
	setGame(gameStats) {
		if (!gameStats?.matchId) return;
		if (!gameStats.players.some((p) => p.connectCode == this.getCurrentPlayer())) return;

		this.store.set(
			`user.${this.getCurrentPlayer()}.game.${gameStats.matchId}.${gameStats.gameNumber}`,
			gameStats,
		);
	}

	getGame(matchId, gameNumber) {
		return this.store.get(`user.${this.getCurrentPlayer()}.game.${matchId}.${gameNumber}`);
	}

	getSet(matchId) {
		return this.store.get(`user.${this.getCurrentPlayer()}.game.${matchId}`);
	}

	getAllSets(mode) {
		if (!mode) return;
		const sets = this.store.get(`user.${this.getCurrentPlayer()}.game`);
		const matchIds = Object.keys(sets);
		const regex = /mode\.(\w+)/;

		const setIds = matchIds.filter((m) => m.match(regex)[1] == mode);
		return setIds.map((id) => sets[id]);
	}

	// SESSION
	getSession() {
		this.store.get(`session.${this.getCurrentPlayer()}`);
	}

	setSession(session) {
		this.store.set(`session.${this.getCurrentPlayer()}`, session);
	}

	// RECENT SETS
	getRecentSets(mode, number = 10) {
		if (!mode) return;
		const sets = this.getAllSets(mode);
		const recentSets = rankedSet.sort((a, b) => a.matchId > b.matchId).slice(0, number);

		return recentSets.map((id) => sets[id]);
	}
}

module.exports = { ElectronStore };
