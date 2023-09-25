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
import { DolphinConnectionState, LiveStatsScene } from '../../frontend/src/lib/models/enum';
import { ElectronDolphinStore } from './store/storeDolphin';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { Api } from './api';
import { ElectronSettingsStore } from './store/storeSettings';
import { findPlayKey } from '../utils/playkey';
import { ElectronCurrentPlayerStore } from './store/storeCurrentPlayer';
import os from 'os';

@singleton()
export class SlippiJs {
	dolphinConnection = new DolphinConnection()
	dolphinProcessInterval: NodeJS.Timeout;
	isWindows = os.platform() === 'win32';
	constructor(
		@inject("ElectronLog") private log: ElectronLog,
		@inject("IpcMain") private ipcMain: IpcMain,
		@inject("SlpStream") private slpStream: SlpStream,
		@inject(Api) private api: Api,
		@inject(ElectronDolphinStore) private storeDolphin: ElectronDolphinStore,
		@inject(ElectronLiveStatsStore) private storeLiveStats: ElectronLiveStatsStore,
		@inject(ElectronSettingsStore) private storeSettings: ElectronSettingsStore,
		@inject(ElectronCurrentPlayerStore) private storeCurrentPlayer: ElectronCurrentPlayerStore,
	) {
		this.initSlippiJs()
	}

	initSlippiJs() {
		this.log.info("Initializing SlippiJs")
		this.storeLiveStats.setStatsScene(LiveStatsScene.WaitingForDolphin)
		this.startProcessSearchInterval()
		this.dolphinConnection.on(ConnectionEvent.STATUS_CHANGE, async (status) => {
			this.log.info('Dolphin Connection State', status);
			if (status === ConnectionStatus.DISCONNECTED) {
				await this.handleDisconnected()
			}
			if (status === ConnectionStatus.CONNECTED) {
				await this.handleConnected()
			}
			if (status === ConnectionStatus.CONNECTING) {
				this.handleConnecting()
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

	private async handleDisconnected() {
		this.log.info("Dolphin Disconnected")
		this.storeDolphin.setDolphinConnectionState(DolphinConnectionState.Disconnected)
		this.storeLiveStats.setStatsScene(LiveStatsScene.WaitingForDolphin)
		this.startProcessSearchInterval()
	}

	private handleConnecting() {
		this.log.info("Dolphin Connecting")
		this.storeDolphin.setDolphinConnectionState(DolphinConnectionState.Connecting)
		clearInterval(this.dolphinProcessInterval)
	}

	private async handleConnected() {
		this.log.info("Dolphin Connected")
		clearInterval(this.dolphinProcessInterval)
		this.storeDolphin.setDolphinConnectionState(DolphinConnectionState.Connected)
		this.storeLiveStats.setStatsScene(LiveStatsScene.Menu)
		const connectCode = (await findPlayKey()).connectCode
		this.storeSettings.setCurrentPlayerConnectCode(connectCode)
		const rankedNetplayProfile = await this.api.getPlayerRankStats(connectCode)
		this.storeCurrentPlayer.setCurrentPlayerCurrentRankStats(rankedNetplayProfile)
		this.storeCurrentPlayer.setCurrentPlayerNewRankStats(rankedNetplayProfile)
	}

	private async startProcessSearchInterval() {
		this.log.info("Looking For Dolphin Process")
		this.storeDolphin.setDolphinConnectionState(DolphinConnectionState.Searching)
		this.dolphinProcessInterval = setInterval(async () => {
			const exec = require('child_process').exec;
			const command = this.isWindows ? "Get-Process" : "ps -ax | grep Dolphin"
			const shell = this.isWindows ? 'powershell.exe' : "/bin/bash"
			const include = this.isWindows ? "dolphin" : "slippi dolphin"
			exec(command, { 'shell': shell }, (err: Error, stdout: string, stderr: Error) => {
				const includesDolphin = stdout.toLowerCase().includes(include)
				if (err) this.log.error(err)
				if (stderr) this.log.error(stderr);
				if (includesDolphin) this.dolphinConnection.connect('127.0.0.1', Ports.DEFAULT)
			})
		}, 1000)
	}
}
