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

const initSlippiJs = (mainWindow, ipcMain, log) => {
	try {
		log.info('Init slippi-js');

		const dolphinConnection = new DolphinConnection();
		const parser = new SlpParser();
		const slpStream = new SlpStream();

		dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);

		slpStream.on(SlpStreamEvent.COMMAND, (event) => {
			console.log(event.command);
			console.log(event.payload);
			// console.log("Commmand parsed by SlpStream: " + event.command + event.payload)
			parser.handleCommand(event.command, event.payload);
		});

		parser.on(SlpParserEvent.SETTINGS, (frameEntry) => {
			console.log('start', frameEntry);
			mainWindow.webContents.send('game:start', frameEntry);
		});

		parser.on(SlpParserEvent.END, (frameEntry) => {
			console.log('end', frameEntry);
			mainWindow.webContents.send('game:end', frameEntry);
		});

		parser.on(SlpParserEvent.FINALIZED_FRAME, (frameEntry) => {
			mainWindow.webContents.send('game:frame', frameEntry);
		});

		dolphinConnection.on(ConnectionEvent.STATUS_CHANGE, (status) => {
			log.info('status', status);
			mainWindow.webContents.send('test', status);
			// Disconnect from Slippi server when we disconnect from Dolphin
			if (status === ConnectionStatus.DISCONNECTED) {
				mainWindow.webContents.send('dolphin-status', 'disconnected');
				dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);
			}
			if (status === ConnectionStatus.CONNECTED) {
				mainWindow.webContents.send('dolphin-status', 'connected');
			}
			if (status === ConnectionStatus.CONNECTING) {
				mainWindow.webContents.send('dolphin-status', 'connecting');
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
