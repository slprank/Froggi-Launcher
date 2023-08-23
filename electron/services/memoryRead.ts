import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import { ElectronJsonStore } from './electronStore';

@singleton()
export class MemoryRead {
	constructor(
		@inject("ElectronLog") public log: ElectronLog,
		@inject("EventEmitter") public eventEmitter: EventEmitter,
		public store: ElectronJsonStore,
	) { }

	initMemoryRead() {
		this.log.info("Initializing memory read")
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
		this.eventEmitter.on("csharp-game-mode", (gameMode: string) => {
			this.log.info("New game mode", gameMode)
			// Save data to electron store
		})
	};
}
