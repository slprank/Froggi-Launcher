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
	constructor(messageHandler, ipcMain, log, slpStream, slpParser) {
		this.messageHandler = messageHandler;
		this.ipcMain = ipcMain;
		this.log = log;
		this.slpStream = slpStream;
		this.parser = slpParser;

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
			this.messageHandler.sendMessage('game_end', frameEntry);
		});

		this.parser.on(SlpParserEvent.FRAME, (frameEntry) => {
			this.messageHandler.sendMessage('game_frame', frameEntry);
		});
	}

	messageGameStart(settings) {
		if (!settings.players.some((p) => !p.connectCode)) this.messageOfflineData();
		let [player1, player2] = [
			getRankStats(settings.players[0].connectCode),
			getRankStats(settings.players[0].connectCode),
		];
		this.messageHandler.sendMessage('game_start', settings);
	}

	messageRankData() {
		let [player1, player2] = [
			getRankStats(settings.players[0].connectCode), // Create API
			getRankStats(settings.players[0].connectCode),
		];

		// Player {
		//	 connectCode
		// 	 displayName
		//   character {
		//		characterId
		//		characterColor
		//		characterName
		//	 }
		// 	 rankedNetplayProfile {
		//	 	...
		//   }
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
}

module.exports = { StatsDisplay };
