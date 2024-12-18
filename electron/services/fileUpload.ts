import { delay, inject, singleton } from "tsyringe";
import { TypedEmitter } from "../../frontend/src/lib/utils/customEventEmitter";
import { MessageHandler } from "./messageHandler";
import { ElectronLog } from "electron-log";
import { BrowserWindow, dialog } from "electron";
import fs from "fs";
import path from "path";

@singleton()
export class FileUpload {
	constructor(
		@inject('AppDir') private appDir: string,
		@inject('BrowserWindow') private mainWindow: BrowserWindow,
		@inject('ElectronLog') private log: ElectronLog,
		@inject('ClientEmitter') private clientEmitter: TypedEmitter,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {
		this.initEventListeners();
		this.log.info("Initializing File Upload listeners")
	}

	uploadFile = async (overlayId: string, directory: string, fileName: string, acceptedExtensions: string[]) => {
		const { canceled, filePaths } = await dialog.showOpenDialog(this.mainWindow, {
			properties: ['openFile'],
			filters: [{ name: '', extensions: acceptedExtensions }],
		});
		if (canceled) {
			this.log.info("Uploading custom file canceled")
			return
		};
		const fileExtension = path.extname(filePaths[0]);
		const saveDir = path.join(this.appDir, "public", "custom", overlayId, directory)
		if (!fs.existsSync(saveDir)) {
			fs.mkdirSync(saveDir, { recursive: true });
		}
		this.log.info("Uploading custom file")
		const newFileName = `${fileName}${fileExtension}`
		const filePath = path.join(saveDir, newFileName);
		fs.copyFileSync(filePaths[0], filePath)
		this.messageHandler.sendMessage("ImportCustomFileComplete", newFileName)
	};

	private initEventListeners() {
		this.clientEmitter.on("ImportCustomFile", (overlayId: string, directory: string, fileName: string, acceptedExtensions: string[]) => {
			this.uploadFile(overlayId, directory, fileName, acceptedExtensions)
		});
	}
}
