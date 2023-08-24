import { ElectronLog } from 'electron-log';
import { inject, singleton } from 'tsyringe';
import EventEmitter from 'events';
import { Client, Presence } from "discord-rpc"
import { LiveStatsScene } from '../../frontend/src/lib/models/enum';
import { FrameEntryType, GameEndType, GameStartType } from '@slippi/slippi-js';
import { ElectronJsonStore } from './electronStore';

@singleton()
export class Discord {
	rpc: Client;
	activity: Presence = {
		details: "Menu",
		state: "Rating",
		startTimestamp: undefined,
		endTimestamp: 15076221500,
		largeImageKey: "menu",
		largeImageText: "Menu",
		buttons: [
			{
				label: `Get Froggy`,
				url: `https://slippi.gg/user/snider-0`
			},
		],
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
		this.eventEmitter.on("game_settings", (settings: GameStartType | undefined) => {
			if (!settings) return;
			this.log.info("Updating settings:", settings)
			const mode = this.store.getGameMode()
			const score = this.store.getGameScore() ?? [0, 0]

			const currentPlayer = this.store.getCurrentPlayer()
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
				endTimestamp: timer,
				buttons: [
					{
						label: `${player1?.connectCode.split("#").at(0)} - ${CharacterConversion[player1?.characterId ?? 0]} - Stock: ${player1?.startStocks} - 0%`,
						url: `https://slippi.gg/user/${player1?.connectCode?.replace("#", "-")}`
					},
					{
						label: `${player2?.connectCode.split("#").at(0)} - ${CharacterConversion[player1?.characterId ?? 0]} - Stock: ${player2?.startStocks} - 0%`,
						url: `https://slippi.gg/user/${player2?.connectCode?.replace("#", "-")}`
					},
				],
				largeImageKey: `stage_${settings.stageId}`,
				largeImageText: StageConversion[settings.stageId ?? 2],
				smallImageKey: `character_icon_${currentPlayer?.characterId}_${currentPlayer?.characterColor}`,
				state: `${player1?.connectCode} - ${player2?.connectCode} (${score.join(" - ")})`,
			}

			this.updateActivity()
		})

		this.eventEmitter.on("game_end", (gameEnd: GameEndType) => {
			this.log.info("Discord game end:", gameEnd)
			const currentPlayer = this.store.getCurrentPlayer()
			this.activity = {
				...this.activity,
				buttons: [
					{
						label: `Get Froggy`,
						url: `https://slippi.gg/user/snider-0`
					},
				],
				details: `Menu`,
				endTimestamp: undefined,
				largeImageKey: "menu",
				largeImageText: "Menu",
				smallImageKey: undefined,
				state: `${currentPlayer?.rankedNetplayProfile?.rank} - ${currentPlayer?.rankedNetplayProfile?.ratingOrdinal}`,
			}
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
						label: `${player2?.connectCode.split("#").at(0)} - ${CharacterConversion[player1?.characterId ?? 0]} - Stock: ${player2frame?.stocksRemaining} - ${player2frame?.percent?.toFixed()}%`,
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

const CharacterConversion: any = {
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

const StageConversion: any = {
	2: "Fountain of Dreams",
	3: "Pokémon Stadium",
	4: "Princess Peach's Castle",
	5: "Kongo Jungle",
	6: "Brinstar",
	7: "Corneria",
	8: "Yoshi's Story",
	9: "Onett",
	10: "MuteCity",
	11: "Rainbow Cruise",
	12: "Jungle Japes",
	13: "Great Bay",
	14: "Temple",
	15: "Brinstar Depths",
	16: "Yoshi's Island",
	17: "Green Greens",
	18: "Fourside",
	19: "Mushroom Kingdom",
	20: "Mushroom Kingdom II",
	22: "Venom",
	23: "Poké Floats",
	24: "Big Blue",
	25: "Icicle Mountain",
	27: "Flat Zone",
	28: "Dream Land",
	29: "Yoshi's Island",
	30: "Kongo Jungle",
	31: "Battlefield",
	32: "Final Destination",
}