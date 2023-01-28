const initAutoUpdater = (mainWindow, ipcMain, log) => {
	try {
		log.info('autoUpdater');

		const { autoUpdater } = require('electron-updater');

		autoUpdater.checkForUpdates();
		autoUpdater.autoInstallOnAppQuit = true;

		log.info('current version', autoUpdater.currentVersion);
		autoUpdater
			.checkForUpdates()
			.then((data) => log.info('update', data))
			.catch((err) => console.error(err));

		autoUpdater.on('checking-for-update', () => {
			log.info('Checking for update');
			mainWindow.webContents.send('update-status', `Checking for update`);
		});

		autoUpdater.on('update-not-available', () => {
			log.info('update not available');
			mainWindow.webContents.send('update-status', `No update available`);
		});

		autoUpdater.on('update-available', (data) => {
			log.info(`update available: ${data.version}`);
			mainWindow.webContents.send('version', data.version);
			mainWindow.webContents.send('update-status', `Download`);
			autoUpdater.downloadUpdate();
		});

		autoUpdater.on('download-progress', (data) => {
			log.info(`Downloading: ${data.percent.toFixed()}`);
			mainWindow.webContents.send('update-status', `Downloading: ${data.percent.toFixed()}%`);
		});

		autoUpdater.on('update-downloaded', (data) => {
			log.info(`Download complete: ${data.version}`);
			log.info(
				`Download url: https://github.com/slprank/slpRank-client/releases/download/${data.releaseName}/${data.files[0].url}`,
			);
			mainWindow.webContents.send('update-status', `Install`);
			autoUpdater.quitAndInstall();
		});

		ipcMain.handle('update:install', async () => {
			autoUpdater.quitAndInstall();
		});
	} catch (err) {
		log.error(err);
	}
};

module.exports = { initAutoUpdater };
