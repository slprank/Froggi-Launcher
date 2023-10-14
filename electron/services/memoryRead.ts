import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import os from 'os';
import DolphinMemory from 'dolphin-memory-reader';
import { ByteSize } from 'dolphin-memory-reader/dist/types/enum';

@singleton()
export class MemoryRead {
	private memoryReadInterval: NodeJS.Timeout;
	private isWindows = os.platform() === 'win32';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('EventEmitter') private eventEmitter: EventEmitter,
	) {}

	async runMemoryRead() {
		if (!this.isWindows) return;
		this.log.info('Initializing Memory Read');
		try {
			const memory = new DolphinMemory();
			setInterval(() => {
				this.eventEmitter.emit('test-css-value', memory.read(0x8043208b, ByteSize.U8));
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
