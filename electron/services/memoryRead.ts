import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
//import os from 'os';
import DolphinMemory from "dolphin-memory-reader"

@singleton()
export class MemoryRead {
	private memoryReadInterval: NodeJS.Timeout
	//private isWindows = os.platform() === 'win32';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('EventEmitter') private eventEmitter: EventEmitter,
	) {
		this.runMemoryRead()
	}

	async runMemoryRead() {
		this.log.info('Initializing Memory Read');
		const memory = new DolphinMemory();
		console.log(memory.read(0x84d00000, 0x04))
		this.eventEmitter.emit("place-holder", "here")
	}

	stopMemoryRead() {
		this.log.info("Stopping memory read")
		clearInterval(this.memoryReadInterval)
	}
}
