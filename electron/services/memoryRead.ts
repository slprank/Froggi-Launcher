import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import os from 'os';
import DolphinMemory from 'dolphin-memory-reader';
import { ByteSize } from 'dolphin-memory-reader/dist/types/enum';
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
		try {
			const memory = new DolphinMemory();
			setInterval(() => {
				const value = memory.read(0x8043208b, ByteSize.U8);
				this.messageHandler.sendMessage('test-css-value', value);
				console.log('memory', value);
			}, 1000);
		} catch (err) {
			console.log(err);
		}
	}

	stopMemoryRead() {
		this.log.info('Stopping memory read');
		clearInterval(this.memoryReadInterval);
	}
}
