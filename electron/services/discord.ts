import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import { Client, Presence } from "discord-rpc"
import { LiveStatsScene } from '@svelte/models/enum';
import { FrameEntryType, GameEndType, GameStartType } from '@slippi/slippi-js';
import { ElectronJsonStore } from './electronStore';

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
		public store: ElectronJsonStore,
	) {
		this.rpc = new Client({ transport: "ipc" })
		this.rpc.login({ clientId: "1143955754643112016" }).catch(err => this.log.error("err", err))
		this.initDiscordJs()
	}

	initDiscordJs() {
		this.log.info("Initializing discord rpc")
		this.rpc.on("ready", () => {
			setInterval(() => {
				this.rpc.setActivity(this.activity).catch(err => this.log.error(err))
			}, 1500)
		})
		this.initDiscordEvents()
	}

	initDiscordEvents = () => {
		this.eventEmitter.on("live_stats_scene", (live_stats_scene: LiveStatsScene) => {
			if (live_stats_scene !== LiveStatsScene.InGame) this.activity.details = "Menu"
		})
		this.eventEmitter.on("game_settings", (settings: GameStartType) => {
			this.log.info("Updating settings:", settings)
			const mode = this.store.getGameMode()
			const score = this.store.getGameScore() ?? [0, 0]

			const players = this.store.getCurrentPlayers()
			const player1 = players?.at(0)
			const player2 = players?.at(1)

			var oldDateObj = new Date();
			var newDateObj = new Date();
			newDateObj.setTime(oldDateObj.getTime() + (8 * 60 * 1000 + 2000));
			const timer = newDateObj.getTime()

			this.activity = {
				...this.activity,
				details: `${mode} - In Game`,
				state: `${player1?.connectCode} - ${player2?.connectCode} (${score.join(" - ")})`,
				endTimestamp: timer,
				buttons: [
					{
						label: `${player1?.connectCode.split("#").at(0)} - ${CharacterConversion[Number(player1?.characterId)]} - Stock: ${player1?.startStocks} - 0%`,
						url: `https://slippi.gg/user/${player1?.connectCode?.replace("#", "-")}`
					},
					{
						label: `${player2?.connectCode.split("#").at(0)} - ${CharacterConversion[(player2?.characterId ?? 0).toString()]} - Stock: ${player2?.startStocks} - 0%`,
						url: `https://slippi.gg/user/${player2?.connectCode?.replace("#", "-")}`
					},
				]
			}

			this.updateActivity()
		})

		this.eventEmitter.on("game_end", (gameEnd: GameEndType) => {
			this.log.info("Discord game end:", gameEnd)
			const currentPlayer = this.store.getCurrentPlayer()
			this.activity = {
				...this.activity,
				details: `Menu`,
				endTimestamp: undefined,
				state: `${currentPlayer?.rankedNetplayProfile?.rank} - ${currentPlayer?.rankedNetplayProfile?.ratingOrdinal}`,
			}
			delete this.activity.buttons;
			this.updateActivity()
		})

		this.eventEmitter.on("game_frame", (frame: FrameEntryType) => {
			if (this.store.getStatsScene() !== LiveStatsScene.InGame) return
			const players = this.store.getCurrentPlayers()
			const player1 = players?.at(0)
			const player2 = players?.at(1)

			const player1frame = frame.players[player1?.playerIndex ?? 0]?.post
			const player2frame = frame.players[player2?.playerIndex ?? 0]?.post

			this.activity = {
				...this.activity,
				buttons: [
					{
						label: `${player1?.connectCode.split("#").at(0)} - ${CharacterConversion[player1?.characterId ?? 0]} - Stock: ${player1frame?.stocksRemaining} - ${player1frame?.percent?.toFixed()}%`,
						url: `https://slippi.gg/user/${player1?.connectCode?.replace("#", "-")}`
					},
					{
						label: `${player2?.connectCode.split("#").at(0)} - ${CharacterConversion[player2?.characterId ?? 0]} - Stock: ${player2frame?.stocksRemaining} - ${player2frame?.percent?.toFixed()}%`,
						url: `https://slippi.gg/user/${player2?.connectCode?.replace("#", "-")}`
					},
				]
			}

			this.updateActivity()

			this.log.info("Updating frame:", frame)
		})
	};

	updateActivity() {
		this.rpc.setActivity(this.activity)
	}
}

const CharacterConversion = {
	0: "CF",
	1: "DK",
	2: "Fox",
	3: "G&W",
	4: "Kirby",
	5: "Bowsr",
	6: "Link",
	7: "Luigi",
	8: "Mario",
	9: "Marth",
	10: "Mew2",
	11: "Ness",
	12: "Peach",
	13: "Pika",
	14: "ICs",
	15: "Puff",
	16: "Samus",
	17: "Yoshi",
	18: "Zelda",
	19: "Sheik",
	20: "Falco",
	21: "YLink",
	22: "Dr.M",
	23: "Roy",
	24: "Pichu",
	25: "Ganon",
}