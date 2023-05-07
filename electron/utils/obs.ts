// https://github.com/obs-websocket-community-projects/obs-websocket-js

export class ObsWebSocket {
	messageHandler: any;
	eventEmitter: any;
	log: any;
	constructor(messageHandler: any, eventEmitter: any, log: any) {
		this.messageHandler = messageHandler;
		this.eventEmitter = eventEmitter;
		this.log = log;

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

			const OBSWebSocket = require('obs-websocket-js').default;
			const obs = new OBSWebSocket();

			await obs.connect('ws://127.0.0.1:4455');
			await obs.call('SetCurrentProgramScene', { sceneName: scene });
		} catch (err) {
			this.log.error(err);
		}
	};
}
