class JsonDb {
	constructor(log) {
		const { JsonDB, Config } = require('node-json-db');
		this.db = new JsonDB(new Config('./src/electron-utils/slippiSettings.json', true, true));
		this.log = log;
		this.db.push('/user', { hallo: 'silje' });
		this.db.getData('/user').then((data) => {
			log.info(data);
		});
	}

	updateCurrentPlayer(payload) {
		this.db.push('/user', payload);
	}
	updateCurrentGame(payload) {
		this.db.push('/game', payload);
	}
	getEntity = async (key) => {
		return this.db.getData(key);
	};
}

module.exports = { JsonDb };
