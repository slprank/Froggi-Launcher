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
const initSlippiJs = (mainWindow, ipcMain) => {
	console.log('Init slippi-js');

	var dolphinConnection = new DolphinConnection();
	var parser = new SlpParser();
	var slpStream = new SlpStream();

	slpStream.on(SlpStreamEvent.COMMAND, (event) => {
		console.log('event');
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
		console.log('status');
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
};

module.exports = { initSlippiJs };
