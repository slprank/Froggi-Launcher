const initObsWebSocket = (mainWindow, ipcMain) => {
	console.log('obs');

	const OBSWebSocket = require('obs-websocket-js').default;
	const obs = new OBSWebSocket();

	// Inits scene change from svelte
	ipcMain.handle('obs:switch', async (_, scene) => {
		if (!scene) return;
		await obs.connect('ws://127.0.0.1:4455');
		await obs.call('SetCurrentProgramScene', { sceneName: scene });
	});
};

const changeObsScene = async (scene) => {
	console.log('obs');

	const obs = new OBSWebSocket();

	await obs.connect('ws://127.0.0.1:4455');
	await obs.call('SetCurrentProgramScene', { sceneName: scene });
};

module.exports = { initObsWebSocket, changeObsScene };
