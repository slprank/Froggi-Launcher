import {
	DolphinConnection,
	Ports,
	ConnectionEvent,
	DolphinMessageType,
	ConnectionStatus,
	SlpStream,
} from '@slippi/slippi-js';
import { inject, singleton } from 'tsyringe';
import type { ElectronLog } from 'electron-log';
import { ConnectionState, LiveStatsScene, NotificationType } from '../../frontend/src/lib/models/enum';
import { ElectronDolphinStore } from './store/storeDolphin';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { Api } from './api';
import { ElectronSettingsStore } from './store/storeSettings';
import { findPlayKey } from '../utils/playkey';
import { ElectronCurrentPlayerStore } from './store/storeCurrentPlayer';
import os from 'os';
import { MemoryRead } from './memoryRead';
import { ElectronSessionStore } from './store/storeSession';
import { isDolphinRunning } from '../utils/dolphinProcess';
import { MessageHandler } from './messageHandler';

@singleton()
export class SlippiJs {
	dolphinConnection = new DolphinConnection();
	dolphinProcessInterval: NodeJS.Timeout;
	isWindows = os.platform() === 'win32';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('SlpStream') private slpStream: SlpStream,
		@inject(Api) private api: Api,
		@inject(ElectronCurrentPlayerStore) private storeCurrentPlayer: ElectronCurrentPlayerStore,
		@inject(ElectronDolphinStore) private storeDolphin: ElectronDolphinStore,
		@inject(ElectronLiveStatsStore) private storeLiveStats: ElectronLiveStatsStore,
		@inject(ElectronSessionStore) private storeSession: ElectronSessionStore,
		@inject(ElectronSettingsStore) private storeSettings: ElectronSettingsStore,
		@inject(MessageHandler) private messageHandler: MessageHandler,
		@inject(MemoryRead) private memoryRead: MemoryRead,
	) {
		this.initSlippiJs();
	}

	initSlippiJs() {
		this.log.info('Initializing SlippiJs');
		this.storeLiveStats.setStatsScene(LiveStatsScene.WaitingForDolphin);
		this.startProcessSearchInterval();

		this.dolphinConnection.on(ConnectionEvent.STATUS_CHANGE, async (status) => {
			this.log.info('Dolphin Connection State:', ConnectionStatus[status]);
			if (status === ConnectionStatus.DISCONNECTED) {
				this.handleDisconnected();
			}
			if (status === ConnectionStatus.CONNECTED) {
				this.messageHandler.sendMessage('Notification', 'Dolphin connected', NotificationType.Success);
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
			if (err.message.includes('Unexpected game data cursor')) {
				this.messageHandler.sendMessage('Notification', "Dolphin connection seems unstable, consider restarting.", NotificationType.Danger, 5000);
			}
		});
	}

	private handleDisconnected() {
		this.storeDolphin.setDolphinConnectionState(ConnectionState.Disconnected);
		this.storeLiveStats.setStatsScene(LiveStatsScene.WaitingForDolphin);
		this.memoryRead.stopMemoryRead();
		setTimeout(() => {
			this.startProcessSearchInterval();
		}, 1000);
	}

	private handleConnecting() {
		this.storeDolphin.setDolphinConnectionState(ConnectionState.Connecting);
	}

	private async handleConnected() {
		this.handleUserSlippiData();
		this.memoryRead.stopMemoryRead();
		this.storeDolphin.setDolphinConnectionState(ConnectionState.Connected);
		this.storeLiveStats.setStatsScene(LiveStatsScene.Menu);
		this.memoryRead.initMemoryRead();
		this.stopProcessSearchInterval();
	}

	private async handleUserSlippiData() {
		this.log.info("Fetching loggen in user")
		const connectCode = (await findPlayKey()).connectCode;
		this.storeSettings.setCurrentPlayerConnectCode(connectCode);
		const rankedNetplayProfile = await this.api.getPlayerRankStats(connectCode);
		this.log.info("Logging in user ranked netplay profile:", rankedNetplayProfile)
		this.storeCurrentPlayer.setCurrentPlayerCurrentRankStats(rankedNetplayProfile);
		this.storeCurrentPlayer.setCurrentPlayerNewRankStats(rankedNetplayProfile);
		this.storeSession.updateSessionStats(rankedNetplayProfile);
	}

	private async startProcessSearchInterval() {
		this.stopProcessSearchInterval();
		this.storeDolphin.setDolphinConnectionState(ConnectionState.Searching);
		this.log.info('Looking For Dolphin Process');
		this.dolphinProcessInterval = setInterval(async () => {

			if (await isDolphinRunning()) {
				this.log.info('Dolphin Found');
				this.dolphinConnection.connect('127.0.0.1', Ports.DEFAULT);
				this.stopProcessSearchInterval();
			}
		}, 5000);
	}

	private stopProcessSearchInterval() {
		clearInterval(this.dolphinProcessInterval);
	}
}
