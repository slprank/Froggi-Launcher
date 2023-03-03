// https://www.npmjs.com/package/electron-store

class ElectronStore {
	constructor(log) {
		const Store = require('electron-store');
		this.store = new Store();
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
	setGame(gameStats) {
		if (!gameStats?.matchId) return;
		if (!gameStats.players.some((p) => p.connectCode == this.getCurrentPlayer())) return;

		const regex = /mode\.(\w+)/;
		const gameMode = gameStats.matchId.match(regex)[1];

		this.store.set(
			`users.${this.getCurrentPlayer()}.games.${gameStats.matchId}.${gameStats.gameNumber}`,
			gameStats,
		);
	}

	getGame(matchId, gameNumber) {
		return this.store.get(`users.${this.getCurrentPlayer()}.games.${matchId}.${gameNumber}`);
	}

	getSet(matchId) {
		return this.store.get(`users.${this.getCurrentPlayer()}.games.${matchId}`);
	}

	getAllSets(mode = null) {
		// Add logic to get all set given a mode
	}
}

module.exports = { ElectronStore };
