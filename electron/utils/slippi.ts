// https://github.com/project-slippi/slippi-js

import {
	SlpParser,
	DolphinConnection,
	Ports,
	ConnectionEvent,
	DolphinMessageType,
	ConnectionStatus,
	SlpStream,
} from '@slippi/slippi-js';
import { MessageHandler } from './messageHandler';
import { IpcMain } from 'electron';
import { inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { ElectronJsonStore } from './electronStore';

@singleton()
export class SlippiJs {

	constructor(
		@inject("DolphinConnection") public dolphinConnection: DolphinConnection,
		@inject("ElectronLog") public log: ElectronLog,
		@inject("IpcMain") public ipcMain: IpcMain,
		@inject("SlpParser") public parser: SlpParser,
		@inject("SlpStream") public slpStream: SlpStream,
		public messageHandler: MessageHandler,
		public store: ElectronJsonStore,
	) {
		this.dolphinConnection = new DolphinConnection();
		this.parser = new SlpParser();
		this.slpStream = new SlpStream();
		this.ipcMain = ipcMain;
		this.log = log;
		this.messageHandler = messageHandler
		this.store = store;
		this.initSlippiJs();
	}

	initSlippiJs() {
		this.log.info('Init slippi-js');

		this.dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);

		this.dolphinConnection.on(ConnectionEvent.STATUS_CHANGE, (status) => {
			this.log.info('dolphin connection state', status);
			// Disconnect from Slippi server when we disconnect from Dolphin
			this.store.setDolphinConnectionStatus(status);
			if (status === ConnectionStatus.DISCONNECTED) {
				this.messageHandler.sendMessage('dolphin_connection_status', 'disconnected');
				this.dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);
			}
			if (status === ConnectionStatus.CONNECTED) {
				this.messageHandler.sendMessage('dolphin_connection_status', 'connected');
			}
			if (status === ConnectionStatus.CONNECTING) {
				this.messageHandler.sendMessage('dolphin_connection_status', 'connecting');
			}
		});

		this.dolphinConnection.on(ConnectionEvent.MESSAGE, (message) => {
			switch (message.type) {
				case DolphinMessageType.CONNECT_REPLY:
					this.log.info('Connected: ' + message);
					break;
				case DolphinMessageType.GAME_EVENT:
					var decoded = Buffer.from(message.payload, 'base64');
					this.slpStream.write(decoded);
					break;
				case DolphinMessageType.START_GAME:
					var decoded = Buffer.from(message.payload, 'base64');
					this.slpStream.write(decoded);
					break;
				case DolphinMessageType.END_GAME:
					var decoded = Buffer.from(message.payload, 'base64');
					this.slpStream.write(decoded);
					break;
			}
		});

		this.dolphinConnection.on(ConnectionEvent.ERROR, (err) => {
			// Log the error messages we get from Dolphin
			this.log.error('Dolphin connection error', err);
		});

		this.dolphinConnection.on(ConnectionEvent.ERROR, (err) => {
			// Log the error messages we get from Dolphin
			this.log.error('Dolphin connection error', err);
		});

		this.ipcMain.on('ipc', (_: any, arg: any) => {
			// Command to connect to Dolphin
			if (arg === 'connectDolphin') {
				this.log.info(arg);
				if (this.dolphinConnection.getStatus() === ConnectionStatus.DISCONNECTED) {
					// Now try connect to our local Dolphin instance
					this.dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);
				}
			}
		});

	}
}
