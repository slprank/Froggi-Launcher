import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
declare function require(name: string): any;

@singleton()
export class MemoryRead {
	node_memory_reader = require('node_memory_reader');
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('EventEmitter') private eventEmitter: EventEmitter,
	) {
		this.log.info('Initializing Memory Read');
		this.initMemoryRead();
	}

	initMemoryRead() {
		this.runMemoryRead();
		this.initMemoryReadEvents();
	}

	runMemoryRead() {
		setInterval(() => {
			try {
				const memory: number[] = this.node_memory_reader.read_memory(
					16704,
					0x804c1fac + 0x44,
					20,
				);
				console.log('memory', memory);
			} catch (err) {
				this.log.error(err);
			}
		}, 1000);
	}

	initMemoryReadEvents = () => {
		this.eventEmitter.on('csharp-menu-activity', (activity: string) => {
			this.log.info('New menu activity', activity);
			// Save data to electron store
		});
	};
}
