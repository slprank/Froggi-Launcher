import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';

@singleton()
export class MemoryRead {
	constructor(
		@inject("ElectronLog") private log: ElectronLog,
		@inject("EventEmitter") private eventEmitter: EventEmitter,
	) {
		this.log.info("Initializing Memory Read")
		this.initMemoryRead()
	}

	initMemoryRead() {
		this.runMemoryRead()
		this.initMemoryReadEvents()
	}

	runMemoryRead() {
		this.log.info('Starting MemoryRead.cs');
		// Run C# script that 
		// Connects to: ws://localhost:3100
		// Start memory reads
	}

	initMemoryReadEvents = () => {
		this.eventEmitter.on("csharp-menu-activity", (activity: string) => {
			this.log.info("New menu activity", activity)
			// Save data to electron store
		})
	};
}
