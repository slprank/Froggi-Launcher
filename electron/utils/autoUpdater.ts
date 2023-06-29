export class initAutoUpdater {
	mainWindow: any;
	eventEmitter: any;
	log: any;
	constructor(mainWindow: any, eventEmitter: any, log: any) {
		this.mainWindow = mainWindow;
		this.eventEmitter = eventEmitter;
		this.log = log;
	}
	init() {
		this.log.info('autoUpdater');

		const { autoUpdater } = require('electron-updater');

		autoUpdater.autoInstallOnAppQuit = true;

		this.log.info('current version', autoUpdater.currentVersion);

		autoUpdater
			.checkForUpdates()
			.then((data) => this.log.info('update', data))
			.catch((err) => this.log.error(err));

		autoUpdater.on('checking-for-update', () => {
			this.log.info('Checking for update');
			this.mainWindow.webContents.send('update-status', `Checking for update`);
		});

		autoUpdater.on('update-not-available', () => {
			this.log.info('update not available');
			this.mainWindow.webContents.send('update-status', `No update available`);
		});

		autoUpdater.on('update-available', (data) => {
			this.log.info(`update available: ${data.version}`);
			this.mainWindow.webContents.send('version', data.version);
			this.mainWindow.webContents.send('update-status', `Download`);
			autoUpdater.downloadUpdate();
		});

		autoUpdater.on('download-progress', (data) => {
			this.log.info(`Downloading: ${data.percent.toFixed()}`);
			this.mainWindow.webContents.send(
				'update-status',
				`Downloading: ${data.percent.toFixed()}%`,
			);
		});

		autoUpdater.on('update-downloaded', (data) => {
			this.log.info(`Download complete: ${data.version}`);
			this.log.info(
				`Download url: https://github.com/slprank/slpRank-client/releases/download/${data.releaseName}/${data.files[0].url}`,
			);
			this.mainWindow.webContents.send('update-status', `Install`);
			autoUpdater.quitAndInstall(); // Should be handled manually?
		});

		this.eventEmitter.on('update-install', async () => {
			autoUpdater.quitAndInstall();
		});
	}
}
