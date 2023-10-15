import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import os from 'os';
import DolphinMemory from 'dolphin-memory-reader';
import { getControllerInputs } from './memoryRead/controllerInputs';
import { MessageHandler } from './messageHandler';

@singleton()
export class MemoryRead {
	private memoryReadInterval: NodeJS.Timeout;
	private isWindows = os.platform() === 'win32';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {}

	async runMemoryRead() {
		if (!this.isWindows) return;
		this.log.info('Initializing Memory Read');
		const memory = new DolphinMemory();
		this.memoryReadInterval = setInterval(() => {
			try {
				const controllers = getControllerInputs(memory);
				console.log(controllers);
				this.messageHandler.sendMessage('test-css-value', controllers);
			} catch (err) {
				this.log.error(err);
				clearInterval(this.memoryReadInterval);
			}
		}, 1000);
	}

	stopMemoryRead() {
		this.log.info('Stopping memory read');
		clearInterval(this.memoryReadInterval);
	}
}
