const { SlpParserEvent } = require('@slippi/slippi-js');

const initAchievements = (mainWindow, ipcMain, log, parser) => {
	try {
		log.info('Init Stat Display');

		parser.on(SlpParserEvent.END, (frameEntry) => {
			// Handle frameEntry

			// Update achievements

			// If any new achievements:
			// Emit achievement to electron
			// Emit achievement to web-socket
			console.log('end', frameEntry);
			mainWindow.webContents.send('game:stats', frameEntry);
		});

		return parser;
	} catch (err) {
		log.error(err);
	}
};

const updateAchievements = () => {
	log.info('Updating achievements');
};

module.exports = { initAchievements };
