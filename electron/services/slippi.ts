import {
	DolphinConnection,
	Ports,
	ConnectionEvent,
	DolphinMessageType,
	ConnectionStatus,
	SlpStream,
} from '@slippi/slippi-js';
import { IpcMain } from 'electron';
import { inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { ConnectionState, LiveStatsScene } from '../../frontend/src/lib/models/enum';
import { ElectronDolphinStore } from './store/storeDolphin';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { Api } from './api';
import { ElectronSettingsStore } from './store/storeSettings';
import { findPlayKey } from '../utils/playkey';
import { ElectronCurrentPlayerStore } from './store/storeCurrentPlayer';
import os from 'os';
import { MemoryRead } from './memoryRead';
import { isDolphinRunning } from '../utils/dolphinProcess';
import { ElectronSessionStore } from './store/storeSession';

@singleton()
export class SlippiJs {
	dolphinConnection = new DolphinConnection();
	dolphinProcessInterval: NodeJS.Timeout;
	isWindows = os.platform() === 'win32';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('IpcMain') private ipcMain: IpcMain,
		@inject('SlpStream') private slpStream: SlpStream,
		@inject(Api) private api: Api,
		@inject(ElectronCurrentPlayerStore) private storeCurrentPlayer: ElectronCurrentPlayerStore,
		@inject(ElectronDolphinStore) private storeDolphin: ElectronDolphinStore,
		@inject(ElectronLiveStatsStore) private storeLiveStats: ElectronLiveStatsStore,
		@inject(ElectronSessionStore) private storeSession: ElectronSessionStore,
		@inject(ElectronSettingsStore) private storeSettings: ElectronSettingsStore,
		@inject(MemoryRead) private memoryRead: MemoryRead,
	) {
		this.initSlippiJs();
	}

	initSlippiJs() {
		this.log.info('Initializing SlippiJs');
		this.storeLiveStats.setStatsScene(LiveStatsScene.WaitingForDolphin);
		this.startProcessSearchInterval();
		this.dolphinConnection.on(ConnectionEvent.STATUS_CHANGE, async (status) => {
			this.log.info('Dolphin Connection State', status);
			if (status === ConnectionStatus.DISCONNECTED) {
				this.handleDisconnected();
			}
			if (status === ConnectionStatus.CONNECTED) {
				await this.handleConnected();
			}
			if (status === ConnectionStatus.CONNECTING) {
				this.handleConnecting();
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

	private handleDisconnected() {
		this.log.info('Dolphin Disconnected');
		this.storeDolphin.setDolphinConnectionState(ConnectionState.Disconnected);
		this.storeLiveStats.setStatsScene(LiveStatsScene.WaitingForDolphin);
		this.startProcessSearchInterval();
		this.memoryRead.stopMemoryRead();
	}

	private handleConnecting() {
		this.log.info('Dolphin Connecting');
		this.storeDolphin.setDolphinConnectionState(ConnectionState.Connecting);
	}

	private async handleConnected() {
		this.log.info('Dolphin Connected');
		this.memoryRead.stopMemoryRead();
		this.storeDolphin.setDolphinConnectionState(ConnectionState.Connected);
		this.storeLiveStats.setStatsScene(LiveStatsScene.Menu);
		const connectCode = (await findPlayKey()).connectCode;
		this.storeSettings.setCurrentPlayerConnectCode(connectCode);
		const rankedNetplayProfile = await this.api.getPlayerRankStats(connectCode);
		this.storeCurrentPlayer.setCurrentPlayerCurrentRankStats(rankedNetplayProfile);
		this.storeCurrentPlayer.setCurrentPlayerNewRankStats(rankedNetplayProfile);
		this.storeSession.updateSessionStats(rankedNetplayProfile)
		this.memoryRead.initMemoryRead();
	}

	private async startProcessSearchInterval() {
		this.storeDolphin.setDolphinConnectionState(ConnectionState.Searching);
		this.log.info('Looking For Dolphin Process');
		const dolphinProcessInterval = setInterval(async () => {
			if (await isDolphinRunning()) {
				this.dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);
				clearInterval(dolphinProcessInterval);
			}
		}, 5000);
	}
}
