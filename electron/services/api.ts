import axios from 'axios';
import { ElectronLog } from 'electron-log';
import { inject, injectable } from 'tsyringe';
import { Player, RankedNetplayProfile } from '../../frontend/src/lib/models/types';
import { PlayerType } from '@slippi/slippi-js';
import { CHARACTERS } from '../../frontend/src/lib/models/const';

@injectable()
export class Api {
	constructor(@inject("ElectronLog") private log: ElectronLog) {
		this.log.info("Initializing Api")
	}

	async getPlayerRankStats(connectCode: string): Promise<RankedNetplayProfile | undefined> {
		this.log.info("Attempting to fetch user:", connectCode)
		if (!connectCode) return undefined;
		try {
			const rankData = (await axios.get(`http://slprank.com/rank/${connectCode.replace('#', '-')}?raw`)).data as RankedNetplayProfile
			this.log.info("Fetched user:", this.enrichData(rankData))
			return this.enrichData(rankData)
		} catch (err) {
			this.log.error(err);
			return
		}
	}

	async getPlayerWithRankStats(player: PlayerType): Promise<Player | undefined> {
		try {
			const rankData = (await axios.get(`http://slprank.com/rank/${player.connectCode.replace('#', '-')}?raw`)).data as RankedNetplayProfile
			this.log.info("Fetched user:", this.enrichData(rankData))
			return { ...player, rank: { current: this.enrichData(rankData) } }
		} catch (err) {
			this.log.error(err);
			return undefined
		}
	}

	private enrichData(playerRank: RankedNetplayProfile): RankedNetplayProfile {
		const totalGames = playerRank.characters?.map(c => c.gameCount).reduce((a: number, b: number) => a + b) ?? 0;
		const totalSets = playerRank?.wins ?? 0 + playerRank.losses ?? 0;
		const winsPercent = playerRank?.wins / (totalSets ? totalSets : 1);
		const lossesPercent = playerRank?.losses / (totalSets ? totalSets : 1);
		const characters = playerRank.characters.map(character => {
			return {
				...character,
				characterId: CHARACTERS[character.characterName] as number,
				gameCountPercent: character.gameCount / (totalGames ? totalGames : 1),
			}
		})
		return {
			...playerRank,
			characters: characters,
			lossesPercent: lossesPercent,
			totalSets: totalSets,
			totalGames: totalGames,
			winsPercent: winsPercent,
		}
	}
}