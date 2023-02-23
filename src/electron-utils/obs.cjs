// https://github.com/obs-websocket-community-projects/obs-websocket-js

const initObsWebSocket = (sendMessage, ipcMain, log) => {
	try {
		log.info('Init OBS');

		// Inits scene change from svelte
		ipcMain.handle('obs:switch', async (_, scene) => {
			changeObsScene(scene);
		});
	} catch (err) {
		log.error(err);
	}
};

const changeObsScene = async (scene) => {
	try {
		log.info(`Change OBS scene: ${scene}`);

		const OBSWebSocket = require('obs-websocket-js').default;
		const obs = new OBSWebSocket();

		await obs.connect('ws://127.0.0.1:4455');
		await obs.call('SetCurrentProgramScene', { sceneName: scene });
	} catch (err) {
		log.error(err);
	}
};

module.exports = { initObsWebSocket, changeObsScene };
