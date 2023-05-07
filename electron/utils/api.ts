import axios from 'axios';
export class Api {
	log: any;
	constructor(log: any) {
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
