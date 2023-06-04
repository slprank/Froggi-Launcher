import axios from 'axios';
import { ElectronLog } from 'electron-log';
import { inject, injectable } from 'tsyringe';
import { Player, RankedNetplayProfile } from '../../frontend/src/lib/types/types';
import { PlayerType } from '@slippi/slippi-js';

@injectable()
export class Api {
	log: ElectronLog;
	constructor(@inject("ElectronLog") log: ElectronLog) {
		this.log = log;
	}

	async getPlayerRankStats(connectCode: string): Promise<RankedNetplayProfile | undefined> {
		if (!connectCode) return undefined;
		try {
			let player = await axios.get(`http://slprank.com/rank/${connectCode.replace('#', '-')}?raw`)
			return player.data
		} catch (err) {
			this.log.error(err);
			return undefined
		}
	}

	async getPlayerWithRankStats(player: PlayerType): Promise<Player | undefined> {
		try {
			const rankData = (await axios.get(`http://slprank.com/rank/${player.connectCode.replace('#', '-')}?raw`)).data
			return { ...player, rankedNetplayProfile: rankData }
		} catch (err) {
			this.log.error(err);
			return undefined
		}
	}
}
