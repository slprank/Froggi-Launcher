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
				this.messageHandler.sendMessage('game_start', this.parser.getSettings());
			}
		});

		this.parser.on(SlpParserEvent.END, (frameEntry) => {
			this.messageHandler.sendMessage('game_end', frameEntry);
		});

		this.parser.on(SlpParserEvent.FRAME, (frameEntry) => {
			this.messageHandler.sendMessage('game_frame', frameEntry);
		});
	}
}

module.exports = { StatsDisplay };
