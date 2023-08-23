import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import { Client, Presence } from "discord-rpc"

@singleton()
export class Discord {
	rpc: Client;
	activity: Presence = {
		details: "Menu",
		state: "Ranked",
		startTimestamp: undefined,
		endTimestamp: undefined,
		smallImageKey: "character_2_0",
		smallImageText: "Fox",
		largeImageKey: "stage_32",
		largeImageText: "Final Destination",
		buttons: []
	};
	constructor(
		@inject("ElectronLog") public log: ElectronLog,
		@inject("EventEmitter") public eventEmitter: EventEmitter,
	) {
		this.rpc = new Client({ transport: "ipc" })
		this.rpc.login({ clientId: "1143955754643112016" }).catch(err => this.log.error("err", err))
		this.initDiscordJs()
	}

	initDiscordJs() {
		this.rpc.on("ready", () => {
			console.log("rpc ready", this.activity)
			setInterval(() => {
				this.rpc.setActivity(this.activity).catch(err => this.log.error(err))
			}, 1500)
		})
		this.log.info("Initializing discord")
		this.initDiscordEvents()
	}

	initDiscordEvents = () => {
		this.eventEmitter.on("game-mode", (gameMode: string) => {
			this.log.info("Updating discord game mode:", gameMode)
			// Update discord game mode
		})
	};
}
