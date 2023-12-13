import { ElectronLog } from 'electron-log';
import { ProgressInfo, UpdateDownloadedEvent, UpdateInfo, autoUpdater } from 'electron-updater';
import { delay, inject, injectable } from 'tsyringe';
import { MessageHandler } from './messageHandler';
import { AutoUpdaterStatus, NotificationType } from '../../frontend/src/lib/models/enum';
import { TypedEmitter } from '../../frontend/src/lib/utils/customEventEmitter';

@injectable()
export class AutoUpdater {
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('LocalEmitter') private localEmitter: TypedEmitter,
		@inject('Dev') private dev: boolean,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {
		this.initListeners();
		setInterval(() => {
			autoUpdater.checkForUpdates();
		}, 1000 * 60 * 5);
	}

	async initListeners() {
		if (this.dev) return;
		this.log.info('Initializing Auto Updater');
		this.log.info('Current Version:', autoUpdater.currentVersion);
		autoUpdater.autoInstallOnAppQuit = true;
		this.messageHandler.sendMessage("AutoUpdaterVersion", autoUpdater.currentVersion.version);

		autoUpdater.on('checking-for-update', () => {
			this.log.info('Checking for update');
			autoUpdater.checkForUpdates();
			this.messageHandler.sendMessage(
				"AutoUpdaterStatus",
				AutoUpdaterStatus.LookingForUpdate,
			);
		});

		autoUpdater.on('update-not-available', () => {
			this.log.info('Update Not Available');
			this.messageHandler.sendMessage("AutoUpdaterStatus", AutoUpdaterStatus.UpToDate);
			this.messageHandler.sendMessage(
				"AutoUpdaterVersion",
				autoUpdater.currentVersion.version,
			);
		});

		autoUpdater.on('update-available', (info: UpdateInfo) => {
			this.log.info(`update available: ${info.version}`);
			this.messageHandler.sendMessage("Notification", "Update Available", NotificationType.Success);
			autoUpdater.downloadUpdate();
			this.messageHandler.sendMessage(
				"AutoUpdaterStatus",
				AutoUpdaterStatus.DownloadAvailable,
			);
		});

		autoUpdater.on('download-progress', (progress: ProgressInfo) => {
			this.log.info(`Downloading: ${progress.percent.toFixed()}`);
			this.messageHandler.sendMessage(
				"AutoUpdaterProgress",
				`${Number(progress.percent.toFixed())}`,
			);
		});

		autoUpdater.on('update-downloaded', (data: UpdateDownloadedEvent) => {
			this.log.info(`Download Complete`);
			this.log.info(`New Version: ${data.version}`);
			this.log.info(
				`Download Url: https://github.com/slprank/Froggi-Launcher/releases/download/${data.releaseName}/${data.files[0].url}`,
			);
			this.messageHandler.sendMessage(
				"AutoUpdaterStatus",
				AutoUpdaterStatus.DownloadComplete,
			);
			this.messageHandler.sendMessage("AutoUpdaterProgress", "100");
			this.messageHandler.sendMessage("Notification", "Update Complete", NotificationType.Success);
		});

		this.localEmitter.on("AutoUpdaterInstall", async () => {
			autoUpdater.quitAndInstall();
		});
	}
}
