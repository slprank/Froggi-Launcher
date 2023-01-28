const initObsWebSocket = (mainWindow, ipcMain, log) => {
	try {
		log.info('obs');

		const OBSWebSocket = require('obs-websocket-js').default;
		const obs = new OBSWebSocket();

		// Inits scene change from svelte
		ipcMain.handle('obs:switch', async (_, scene) => {
			if (!scene) return;
			await obs.connect('ws://127.0.0.1:4455');
			await obs.call('SetCurrentProgramScene', { sceneName: scene });
		});
	} catch (err) {
		log.error(err);
	}
};

const changeObsScene = async (scene) => {
	try {
		log.info('obs');

		const obs = new OBSWebSocket();

		await obs.connect('ws://127.0.0.1:4455');
		await obs.call('SetCurrentProgramScene', { sceneName: scene });
	} catch (err) {
		log.error(err);
	}
};

module.exports = { initObsWebSocket, changeObsScene };
