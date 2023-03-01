class JsonDb {
	constructor(log) {
		this.log = log;
	}

	initDatabase() {
		// Create db and fill dummy data
	}

	updateCurrentPlayer(payload) {
		// Create or update current player
	}
	updateCurrentGame(payload) {
		// Create or update game
	}
	getEntity(table, key) {}
}

module.exports = { JsonDb };
