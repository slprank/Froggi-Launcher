const { SlpParserEvent } = require('@slippi/slippi-js');

const initStatsDisplay = (messageHandler, ipcMain, log, parser) => {
	try {
		log.info('Init Stat Display');

		parser.on(SlpParserEvent.SETTINGS, (frameEntry) => {
			messageHandler.sendMessage('game_settings', frameEntry);
		});

		parser.on(SlpParserEvent.END, (frameEntry) => {
			messageHandler.sendMessage('game_end', frameEntry);
		});

		parser.on(SlpParserEvent.FINALIZED_FRAME, (frameEntry) => {
			messageHandler.sendMessage('game_frame', frameEntry);
		});

		return parser;
	} catch (err) {
		log.error(err);
	}
};

module.exports = { initStatsDisplay };
