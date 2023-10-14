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
		const memory = new DolphinMemory();
		this.memoryReadInterval = setInterval(() => {
			try {
				const value = memory.read(0x8049e6c8 + 0x88 + 0x03, ByteSize.U8);
				this.messageHandler.sendMessage('test-css-value', value);
				console.log('memory', value);
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
