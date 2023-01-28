const {
	SlpParser,
	DolphinConnection,
	Ports,
	ConnectionEvent,
	ConnectionStatus,
	DolphinMessageType,
	Command,
	SlpCommandEventPayload,
	SlpParserEvent,
	FrameEntryType,
	SlpStream,
	SlpStreamEvent,
	SlippiGame,
	GameMode,
} = require('@slippi/slippi-js');
const initSlippiJs = (mainWindow, ipcMain, log) => {
	try {
		log.info('Init slippi-js');

		const dolphinConnection = new DolphinConnection();
		const parser = new SlpParser();
		const slpStream = new SlpStream();

		dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);

		slpStream.on(SlpStreamEvent.COMMAND, (event) => {
			log.info('event');
			// console.log("Commmand parsed by SlpStream: " + event.command + event.payload)
			parser.handleCommand(event.command, event.payload);
		});

		parser.on(SlpParserEvent.SETTINGS, (frameEntry) => {
			mainWindow.webContents.send('game-start', 'something');
		});

		parser.on(SlpParserEvent.END, (frameEntry) => {
			mainWindow.webContents.send('game-end', 'something');
		});

		parser.on(SlpParserEvent.FINALIZED_FRAME, (frameEntry) => {
			mainWindow.webContents.send('game-frame', 'something');
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

		ipcMain.on('ipc', (event, arg) => {
			// Command to connect to Dolphin
			if (arg === 'connectDolphin') {
				if (dolphinConnection.getStatus() === ConnectionStatus.DISCONNECTED) {
					// Now try connect to our local Dolphin instance
					dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);
				}
			}
		});
	} catch (err) {
		log.error(err);
	}
};

module.exports = { initSlippiJs };
