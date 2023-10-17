import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import os from 'os';
import { getControllerInputs } from './memoryRead/controllerInputs';
import { MessageHandler } from './messageHandler';
import DolphinMemory from 'dolphin-memory-reader';

@singleton()
export class MemoryRead {
	private memoryReadInterval: NodeJS.Timeout;
	private isWindows = os.platform() === 'win32';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) { }

	initMemoryRead() {
		this.initMemoryReadWin()
	}

	async initMemoryReadWin() {
		if (!this.isWindows) return;
		this.log.info('Initializing Memory Read');
		const memory: DolphinMemory = require('dolphin-memory-reader');
		await memory.init();
		this.memoryReadInterval = setInterval(() => {
			const controllers = getControllerInputs(memory);
			this.messageHandler.sendMessage('memory-controller', controllers);
			// TODO: Get Pause
			// TODO: Get Menu Location
		}, 16);
	}

	stopMemoryRead() {
		this.log.info('Stopping memory read');
		clearInterval(this.memoryReadInterval);
	}
}
