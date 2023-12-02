// https://github.com/obs-websocket-community-projects/obs-websocket-js

import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import OBSWebSocket from 'obs-websocket-js';
import { TypedEmitter } from '../../frontend/src/lib/utils/customEventEmitter';
import { ElectronObsStore } from './store/storeObs';

@singleton()
export class ObsWebSocket {
	private obs = new OBSWebSocket();
	private obsConnectionInterval: NodeJS.Timeout | undefined;
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('SvelteEmitter') private svelteEmitter: TypedEmitter,
		@inject(delay(() => ElectronObsStore)) private storeObs: ElectronObsStore,
	) //@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	{
		this.log.info('Initializing OBS');
		this.initObsWebSocket();
		this.initSvelteListeners();
	}


	changeObsScene = async (scene: any) => {
		try {
			this.log.info(`Change OBS scene: ${scene}`);


			await this.obs.connect('ws://127.0.0.1:4455');
			await this.obs.call('SetCurrentProgramScene', { sceneName: scene });
		} catch (err) {
			this.log.error(err);
		}
	};

	initObsWebSocket = async () => {
		try {
			this.obs.on("ConnectionClosed", async () => {
				this.searchForObs()
				this.log.info("OBS Connection Closed")
			});
			this.obs.on("ConnectionError", () => {
				this.searchForObs()
				this.log.error("OBS Connection Error")
			});
			this.obs.on("ConnectionOpened", () => {
				clearInterval(this.obsConnectionInterval)
				this.log.info("OBS Connection Opened")
			});

			this.searchForObs()
		} catch (err) {
			this.log.error(err);
		}
	};

	searchForObs = async () => {
		this.log.info("Searching for OBS connection")
		this.obsConnectionInterval = setInterval(async () => {
			const password = this.storeObs.getObsPassword()
			const ipAddress = this.storeObs.getObsIpAddress()
			const port = this.storeObs.getObsPort()
			await this.obs.connect(`ws://${ipAddress}:${port}`, password);
		}, 5000)
	}

	initSvelteListeners() {
		this.svelteEmitter.on("ObsCommand", (command, payload) => {
			console.log("service", command, payload)
			this.obs.call(command, payload);
		});
	}
}
