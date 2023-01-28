const initAutoUpdater = (mainWindow, ipcMain) => {
	console.log('autoUpdater');

	const log = require('electron-log');
	const { autoUpdater } = require('electron-updater');

	autoUpdater.checkForUpdates();
	autoUpdater.autoInstallOnAppQuit = true;

	log.info('current version', autoUpdater.currentVersion);
	autoUpdater
		.checkForUpdates()
		.then((data) => console.log('update', data))
		.catch((err) => console.error(err));

	autoUpdater.on('checking-for-update', () => {
		console.log('Checking for update');
		mainWindow.webContents.send('update-status', `Checking for update`);
	});

	autoUpdater.on('update-not-available', () => {
		console.log('update not available');
		mainWindow.webContents.send('update-status', `No update available`);
	});

	autoUpdater.on('update-available', (data) => {
		console.log(`update available: ${data.version}`);
		mainWindow.webContents.send('version', data.version);
		mainWindow.webContents.send('update-status', `Download`);
		autoUpdater.downloadUpdate();
	});

	autoUpdater.on('download-progress', (data) => {
		console.log(`Downloading: ${data.percent.toFixed()}`);
		mainWindow.webContents.send('update-status', `Downloading: ${data.percent.toFixed()}%`);
	});

	autoUpdater.on('update-downloaded', (data) => {
		console.log(`Download complete: ${data.version}`);
		console.log(
			`Download url: https://github.com/slprank/slpRank-client/releases/download/${data.releaseName}/${data.files[0].url}`,
		);
		mainWindow.webContents.send('update-status', `Install`);
		autoUpdater.quitAndInstall();
	});

	ipcMain.handle('update:install', async () => {
		autoUpdater.quitAndInstall();
	});
};

module.exports = { initAutoUpdater };
