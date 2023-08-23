import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import { ElectronJsonStore } from './electronStore';

@singleton()
export class Discord {
	constructor(
		@inject("ElectronLog") public log: ElectronLog,
		@inject("EventEmitter") public eventEmitter: EventEmitter,
		public store: ElectronJsonStore,
	) {
		this.initDiscordJs
	}

	initDiscordJs() {
		this.log.info("Initializing memory read")
		this.initDiscordEvents()
	}

	initDiscordEvents = () => {
		this.eventEmitter.on("game-mode", (gameMode: string) => {
			this.log.info("Updating discord game mode:", gameMode)
			// Update discord game mode
		})
	};
}
