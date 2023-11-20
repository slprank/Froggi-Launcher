// https://github.com/obs-websocket-community-projects/obs-websocket-js

import EventEmitter from 'events';
import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import OBSWebSocket from 'obs-websocket-js';

@singleton()
export class ObsWebSocket {
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('LocalEmitter') private localEmitter: EventEmitter,
	) //@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	{
		this.log.info('Initializing OBS');
		this.initObsWebSocket();
	}

	initObsWebSocket = () => {
		try {
			// Inits scene change from svelte
			this.localEmitter.on('obs_switch', async (scene: any) => {
				this.changeObsScene(scene);
			});
		} catch (err) {
			this.log.error(err);
		}
	};

	changeObsScene = async (scene: any) => {
		try {
			this.log.info(`Change OBS scene: ${scene}`);
			const obs = new OBSWebSocket();

			await obs.connect('ws://127.0.0.1:4455');
			await obs.call('SetCurrentProgramScene', { sceneName: scene });
		} catch (err) {
			this.log.error(err);
		}
	};
}
