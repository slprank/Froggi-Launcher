import { ElectronLog } from "electron-log";
import { ProgressInfo, UpdateDownloadedEvent, UpdateInfo, autoUpdater } from "electron-updater"
import EventEmitter from "events";
import { delay, inject, injectable } from "tsyringe";
import { MessageHandler } from "./messageHandler";
import { AutoUpdaterStatus } from "../../frontend/src/lib/models/enum";

@injectable()
export class AutoUpdater {
	constructor(
		@inject("ElectronLog") private log: ElectronLog,
		@inject("EventEmitter") private eventEmitter: EventEmitter,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {
		this.log.info("Initializing Auto Updater")
		this.initListeners()
	}

	async initListeners() {
		this.log.info('Initializing Auto Updater');
		this.log.info('Current Version:', autoUpdater.currentVersion);
		autoUpdater.autoInstallOnAppQuit = true;
		autoUpdater.checkForUpdates()
		this.messageHandler.sendMessage(
			'auto-updater-version',
			autoUpdater.currentVersion.version,
		);

		autoUpdater.on('checking-for-update', () => {
			this.log.info('Checking for update');
			this.messageHandler.sendMessage(
				'auto-updater-status',
				AutoUpdaterStatus.LookingForUpdate,
			);
		});

		autoUpdater.on('update-not-available', () => {
			this.log.info('Update Not Available');
			this.messageHandler.sendMessage(
				'auto-updater-status',
				AutoUpdaterStatus.UpToDate,
			);
			this.messageHandler.sendMessage(
				'auto-updater-version',
				autoUpdater.currentVersion.version,
			);
		});

		autoUpdater.on('update-available', (info: UpdateInfo) => {
			this.log.info(`update available: ${info.version}`);
			autoUpdater.downloadUpdate();
			this.messageHandler.sendMessage(
				'auto-updater-status',
				AutoUpdaterStatus.DownloadAvailable,
			);
		});

		autoUpdater.on('download-progress', (progress: ProgressInfo) => {
			this.log.info(`Downloading: ${progress.percent.toFixed()}`);
			this.messageHandler.sendMessage(
				'auto-updater-progress',
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
				'auto-updater-status',
				AutoUpdaterStatus.DownloadComplete,
			);
			this.messageHandler.sendMessage(
				'auto-updater-progress',
				100,
			);
		});

		this.eventEmitter.on('update-install', async () => {
			autoUpdater.quitAndInstall();
		});
	}
}
