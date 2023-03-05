class Api {
	constructor(log) {
		this.log = log;
		this.axios = require('axios');
	}

	async getPlayerRank(connectCode) {
		if (!connectCode) return;

		try {
			return (await axios.get(`http://slprank.com/rank/${connectCode.replace('#', '-')}?raw`))
				.data;
		} catch (err) {
			this.log.error(err);
		}
	}
}

module.exports = { Api };
