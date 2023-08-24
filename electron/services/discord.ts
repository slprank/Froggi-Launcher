import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import { Client, Presence } from "discord-rpc"
import { LiveStatsScene } from '@svelte/models/enum';
import { FrameEntryType } from '@slippi/slippi-js';

@singleton()
export class Discord {
	rpc: Client;
	activity: Presence = {
		details: "Ranked: In Game",
		state: "SNIDER#0 vs IBDW#1 (0 - 1)",
		startTimestamp: undefined,
		endTimestamp: 15076221500,
		smallImageKey: "character_icon_2_0",
		smallImageText: "Fox",
		largeImageKey: "stage_32",
		largeImageText: "Final Destination",
		buttons: [
			{
				label: "SNIDER - Fox - Stock: 3 - 43%",
				url: "https://slippi.gg/user/snider-0"
			},
			{
				label: "IBDW - Fox - Stock: 4 - 83%",
				url: "https://slippi.gg/user/ibdw-0"
			},
		]
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
		this.eventEmitter.on("live_stats_scene", (live_stats_scene: LiveStatsScene) => {
			this.log.info("Updating discord game mode:", live_stats_scene)
			// Update discord game mode
		})
		this.eventEmitter.on("game_frame", (frame: FrameEntryType) => {
			this.log.info("Updating frame:", frame)
		})
	};
}
