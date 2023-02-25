const { SlpParserEvent } = require('@slippi/slippi-js');

class Achievements {
	constructor(messageHandler, ipcMain, log) {
		this.messageHandler = messageHandler;
		this.ipcMain = ipcMain;
		this.log = log;

		this.initAchievements();
	}
	initAchievements() {
		this.log.info('Init Stat Display');
	}

	updateAchievements = () => {
		log.info('Updating achievements');
	};
}

module.exports = { Achievements };
