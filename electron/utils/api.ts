import axios from 'axios';
import { ElectronLog } from 'electron-log';
import { inject, injectable } from 'tsyringe';

@injectable()
export class Api {
	log: ElectronLog;
	constructor(@inject("ElectronLog") log: ElectronLog) {
		this.log = log;
	}

	async getPlayerRankStats(connectCode: string) {
		if (!connectCode) return;

		try {
			return (await axios.get(`http://slprank.com/rank/${connectCode.replace('#', '-')}?raw`))
				.data;
		} catch (err) {
			this.log.error(err);
		}
	}
}
