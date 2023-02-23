const { SlpParserEvent } = require('@slippi/slippi-js');

const initStatsDisplay = (sendMessage, ipcMain, log, parser) => {
	try {
		log.info('Init Stat Display');

		parser.on(SlpParserEvent.SETTINGS, (frameEntry) => {
			// Handle frameEntry
			// Get players data
			// Emit players to electron
			// Emit player to web-socket
			console.log('start', frameEntry);
			sendMessage('game:players', frameEntry);
		});

		parser.on(SlpParserEvent.END, (frameEntry) => {
			// Handle frameEntry
			// Get post game stats
			// Detect if change in rating

			// Emit stats to electron
			// Emit stats to web-socket
			console.log('end', frameEntry);
			sendMessage('game:stats', frameEntry);
		});

		parser.on(SlpParserEvent.FINALIZED_FRAME, (frameEntry) => {
			sendMessage('game:frame', frameEntry);
		});

		return parser;
	} catch (err) {
		log.error(err);
	}
};

module.exports = { initStatsDisplay };
