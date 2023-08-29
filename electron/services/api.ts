import axios from 'axios';
import { ElectronLog } from 'electron-log';
import { inject, injectable } from 'tsyringe';
import { Player, RankedNetplayProfile } from '../../frontend/src/lib/models/types';
import { PlayerType } from '@slippi/slippi-js';

@injectable()
export class Api {
	constructor(@inject("ElectronLog") public log: ElectronLog) { }

	async getPlayerRankStats(connectCode: string): Promise<RankedNetplayProfile | undefined> {
		this.log.info("Attempting to fetch user:", connectCode)
		if (!connectCode) return undefined;
		try {
			let player = await axios.get(`http://slprank.com/rank/${connectCode.replace('#', '-')}?raw`)
			this.log.info("Fetched user:", player.data)
			return player.data
		} catch (err) {
			this.log.error(err);
			return
		}
	}

	async getPlayerWithRankStats(player: PlayerType): Promise<Player | undefined> {
		try {
			const rankData = (await axios.get(`http://slprank.com/rank/${player.connectCode.replace('#', '-')}?raw`)).data as RankedNetplayProfile
			return { ...player, rank: { current: rankData } }
		} catch (err) {
			this.log.error(err);
			return undefined
		}
	}
}
