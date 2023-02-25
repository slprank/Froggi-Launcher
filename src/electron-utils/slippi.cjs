// https://github.com/project-slippi/slippi-js

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

const initSlippiJs = (messageHandler, ipcMain, log) => {
	try {
		log.info('Init slippi-js');

		const dolphinConnection = new DolphinConnection();
		const parser = new SlpParser();
		const slpStream = new SlpStream();

		dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);

		slpStream.on(SlpStreamEvent.COMMAND, (event) => {
			// console.log("Commmand parsed by SlpStream: " + event.command + event.payload)
			parser.handleCommand(event.command, event.payload);
		});

		parser.on(SlpParserEvent.SETTINGS, (frameEntry) => {
			messageHandler.sendMessage('game_start', frameEntry);
		});

		parser.on(SlpParserEvent.END, (frameEntry) => {
			messageHandler.sendMessage('game_end', frameEntry);
		});

		parser.on(SlpParserEvent.FINALIZED_FRAME, (frameEntry) => {
			messageHandler.sendMessage('game_frame', frameEntry);
		});

		dolphinConnection.on(ConnectionEvent.STATUS_CHANGE, (status) => {
			log.info('status', status);
			messageHandler.sendMessage('dolphin_connection_status', status);
			// Disconnect from Slippi server when we disconnect from Dolphin
			if (status === ConnectionStatus.DISCONNECTED) {
				messageHandler.sendMessage('dolphin_connection_status', 'disconnected');
				dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);
			}
			if (status === ConnectionStatus.CONNECTED) {
				messageHandler.sendMessage('dolphin_connection_status', 'connected');
			}
			if (status === ConnectionStatus.CONNECTING) {
				messageHandler.sendMessage('dolphin_connection_status', 'connecting');
			}
		});

		dolphinConnection.on(ConnectionEvent.MESSAGE, (message) => {
			switch (message.type) {
				case DolphinMessageType.CONNECT_REPLY:
					console.log('Connected: ' + message);
					break;
				case DolphinMessageType.GAME_EVENT:
					var decoded = Buffer.from(message.payload, 'base64');
					slpStream.write(decoded);
					break;
			}
		});

		dolphinConnection.on(ConnectionEvent.ERROR, (err) => {
			// Log the error messages we get from Dolphin
			log.error('Dolphin connection error', err);
		});

		dolphinConnection.on(ConnectionEvent.ERROR, (err) => {
			// Log the error messages we get from Dolphin
			log.error('Dolphin connection error', err);
		});

		ipcMain.on('ipc', (event, arg) => {
			// Command to connect to Dolphin
			if (arg === 'connectDolphin') {
				log.info(arg);
				if (dolphinConnection.getStatus() === ConnectionStatus.DISCONNECTED) {
					// Now try connect to our local Dolphin instance
					dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);
				}
			}
		});

		return parser;
	} catch (err) {
		log.error(err);
	}
};

module.exports = { initSlippiJs };
