// https://github.com/obs-websocket-community-projects/obs-websocket-js

import EventEmitter from "events";
import { MessageHandler } from "./messageHandler";
import { ElectronLog } from "electron-log";
import { delay, inject, singleton } from "tsyringe";
import OBSWebSocket from "obs-websocket-js";

@singleton()
export class ObsWebSocket {
	constructor(
		@inject("ElectronLog") public log: ElectronLog,
		@inject("EventEmitter") public eventEmitter: EventEmitter,
		@inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
	) {
		this.initObsWebSocket();
	}

	initObsWebSocket = () => {
		try {
			this.log.info('Init OBS');

			// Inits scene change from svelte
			this.eventEmitter.on('obs_switch', async (scene: any) => {
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
