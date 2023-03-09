const {
	SlpParser,
	DolphinConnection,
	Ports,
	ConnectionEvent,
	DolphinMessageType,
	Command,
	ConnectionStatus,
	SlpCommandEventPayload,
	SlpParserEvent,
	FrameEntryType,
	SlpStream,
	SlpStreamEvent,
	SlippiGame,
	GameMode,
	Stats,
} = require('@slippi/slippi-js');

class StatsDisplay {
	constructor(messageHandler, ipcMain, log, slpStream, slpParser, store, api) {
		this.messageHandler = messageHandler;
		this.ipcMain = ipcMain;
		this.log = log;
		this.slpStream = slpStream;
		this.parser = slpParser;
		this.store = store;
		this.api = api;

		this.initStatDisplay();
	}

	initStatDisplay() {
		this.slpStream.on(SlpStreamEvent.COMMAND, (event) => {
			// console.log("Commmand parsed by SlpStream: " + event.command + event.payload)
			this.parser.handleCommand(event.command, event.payload);
			if (event.command == 54) {
				this.messageGameStart(this.parser.getSettings());
			}
		});

		this.parser.on(SlpParserEvent.END, (frameEntry) => {
			this.messageGameEnd(
				frameEntry,
				this.parser.getLatestFrame(),
				this.parser.getSettings(),
				//this.getRecentGameStats(),
			);
		});

		this.parser.on(SlpParserEvent.FRAME, (frameEntry) => {
			this.messageHandler.sendMessage('game_frame', frameEntry);
		});
	}

	// GAME START
	messageGameStart(settings) {
		if (!settings.players.some((p) => !p.connectCode)) this.messageOfflineData();
		//this.messageRankData(settings);
	}

	messageRankData() {
		let [player1, player2] = [
			this.api.getPlayerRank(settings.players[0].connectCode),
			this.api.getPlayerRank(settings.players[1].connectCode),
		];

		// Player {
		//	 connectCode,
		// 	 displayName,
		//   character {
		//		characterId
		//		characterColor
		//		characterName
		//	 },
		// 	 rankedNetplayProfile {
		//	 	...
		//   },
		//}

		// CharacterId, Color, Name

		// Game mode - `mode.unranked-2022-12-20T06:52:39.18-0`

		// Check if gameNumber is 1 - reset score

		// Update data in DB
		this.messageHandler.sendMessage('game_start', settings);
	}

	messageOfflineData() {
		// Get players from json db

		// Handle score manually?

		this.messageHandler.sendMessage('game_start', settings);
	}

	// GAME END
	messageGameEnd(frameEntry, latestFrame, settings, stats) {
		console.log(frameEntry, latestFrame, settings, stats);
		// Get game from db
		// Update score
		// Save game in db

		// Get players rank
		// Set current player rank in db

		// If win/loss number changed - Message rank up/down - 10 sec

		// Message - post game stats
	}

	messageRankChange() {
		//
	}

	// OTHER

	getGameFiles() {
		const fs = require('fs');
		const re = new RegExp('^Game_.*.slp$');
		const path = require('path');

		const slippiDir = this.store.getSlippiRootDirectory();

		let files = fs.readdirSync(slippiDir).map((filename) => `${path.parse(filename).name}.slp`);

		files = files.filter((f) => re.test(f)).map((f) => `${slippiDir}/${f}`);
		return files.sort((a, b) => a.length - b.length);
	}

	getRecentGameStats() {
		const files = this.getGameFiles();
		const game = new SlippiGame(files[files.length - 1]);

		return game.getStats();
	}
}

module.exports = { StatsDisplay };
