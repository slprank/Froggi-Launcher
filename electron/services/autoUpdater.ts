import type { ElectronLog } from 'electron-log';
import { ProgressInfo, UpdateDownloadedEvent, UpdateInfo, autoUpdater } from 'electron-updater';
import { delay, inject, injectable } from 'tsyringe';
import { MessageHandler } from './messageHandler';
import { AutoUpdaterStatus, NotificationType } from '../../frontend/src/lib/models/enum';
import { TypedEmitter } from '../../frontend/src/lib/utils/customEventEmitter';
import { App } from 'electron';

@injectable()
export class AutoUpdater {
	private status: AutoUpdaterStatus;
	constructor(
		@inject('App') private app: App,
		@inject('ElectronLog') private log: ElectronLog,
		@inject('LocalEmitter') private localEmitter: TypedEmitter,
		@inject('ClientEmitter') private clientEmitter: TypedEmitter,
		@inject('Dev') private dev: boolean,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {
		this.log.info('Initializing Auto Updater');
		this.initListeners();

		autoUpdater.checkForUpdates();
		autoUpdater.autoInstallOnAppQuit = true;
	}

	private async initListeners() {
		if (this.dev) return;
		this.log.verbose('Current Version:', autoUpdater.currentVersion);
		this.messageHandler.sendMessage('AutoUpdaterVersion', autoUpdater.currentVersion.version);

		autoUpdater.on('checking-for-update', () => {
			this.log.verbose('Checking for Update');
			this.messageHandler.sendMessage(
				'AutoUpdaterStatus',
				AutoUpdaterStatus.LookingForUpdate,
			);
		});

		autoUpdater.on('update-not-available', () => {
			this.log.verbose('Update Not Available');
			this.messageHandler.sendMessage('AutoUpdaterStatus', AutoUpdaterStatus.UpToDate);
			this.messageHandler.sendMessage(
				'AutoUpdaterVersion',
				autoUpdater.currentVersion.version,
			);
		});

		autoUpdater.on('update-available', (info: UpdateInfo) => {
			this.log.verbose(`Update Available: ${info.version}`);
			this.messageHandler.sendMessage(
				'Notification',
				'Update Available',
				NotificationType.Success,
			);
			this.messageHandler.sendMessage('AutoUpdaterStatus', AutoUpdaterStatus.UpdateAvailable);
		});

		autoUpdater.on('download-progress', (progress: ProgressInfo) => {
			this.log.verbose(`Downloading: ${progress.percent.toFixed()}`);
			this.messageHandler.sendMessage('AutoUpdaterStatus', AutoUpdaterStatus.Downloading);
			this.messageHandler.sendMessage(
				'AutoUpdaterProgress',
				`${Number(progress.percent.toFixed())}`,
			);
		});

		autoUpdater.on('update-downloaded', (data: UpdateDownloadedEvent) => {
			this.log.verbose(`Download Complete: ${data.version}`);
			this.log.debug(
				`Download Url: https://github.com/slprank/Froggi-Launcher/releases/download/${data.releaseName}/${data.files[0].url}`,
			);
			this.messageHandler.sendMessage(
				'AutoUpdaterStatus',
				AutoUpdaterStatus.DownloadComplete,
			);
			this.messageHandler.sendMessage(
				'AutoUpdaterDownloadUrl',
				`https://github.com/slprank/Froggi-Launcher/releases/download/${data.releaseName}/${data.files[0].url}`,
			);
			this.messageHandler.sendMessage('AutoUpdaterProgress', '100');
			this.messageHandler.sendMessage(
				'Notification',
				'Update Downloaded',
				NotificationType.Success,
			);
		});

		this.clientEmitter.on('AutoUpdaterInstall', async () => {
			if (this.status !== AutoUpdaterStatus.DownloadComplete) return;
			this.log.warn('Quit and install');
			autoUpdater.quitAndInstall();
			setTimeout(this.app.exit.bind(this), 1000)
		});

		this.clientEmitter.on('AutoUpdaterCheckForUpdate', async () => {
			if (this.status !== AutoUpdaterStatus.UpToDate) return;
			autoUpdater.checkForUpdatesAndNotify();
		});

		this.clientEmitter.on('AutoUpdaterDownloadUpdate', async () => {
			if (this.status !== AutoUpdaterStatus.UpdateAvailable) return;
			autoUpdater.downloadUpdate();
		});

		this.localEmitter.on('AutoUpdaterStatus', (status) => {
			this.status = status;
		});
	}
}
