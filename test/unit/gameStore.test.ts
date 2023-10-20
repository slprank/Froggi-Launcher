import "reflect-metadata";
import { ElectronGamesStore } from '../../electron/services/store/storeGames';
import { StatsDisplay } from '../../electron/services/statsDisplay';
import { SlippiGame } from '@slippi/slippi-js';
import { InGameState } from "../../frontend/src/lib/models/enum";


describe('ElectnronGamesStore', () => {
    let electronGamesStore: ElectronGamesStore;
    let statsDisplay: StatsDisplay;

    beforeAll(() => {
        // Create a mock ElectronLog instance
        const log: any = {
            info: (_: string) => { },
        };

        const api: any = {}
        const messageHandler: any = {};
        const storeCurrentPlayer: any = {
            getCurrentPlayer: () => {
                return {
                    connectCode: "PRML#682"
                }
            }
        };

        const slpParser: any = {
            on: () => { }
        }
        const slpStream: any = {
            on: () => { }
        }
        const storeSettings: any = {
            getCurrentPlayerConnectCode: () => "PRML#682"
        };
        const storeLiveStats: any = {
            getGameState: () => InGameState.Inactive
        }
        const storePlayers: any = {}

        electronGamesStore = new ElectronGamesStore(log, messageHandler, storeSettings, storeCurrentPlayer);
        statsDisplay = new StatsDisplay(log, slpParser, slpStream, api, messageHandler, electronGamesStore, storeLiveStats, storePlayers, storeCurrentPlayer, storeSettings)
    });

    test('Test Game Save', () => {
        const game = new SlippiGame("/Users/sindrevatnaland/VSCode/slpRank-client/test/sample-games/ranked-set-1/Game_20231018T220639.slp")
        const gameStats = statsDisplay["getGameStats"](game)
        electronGamesStore.setGameMatch(gameStats)
        const gameFromStore = electronGamesStore.getGameMatch(gameStats?.settings?.matchInfo.matchId)
        console.log(gameFromStore)
        expect(gameFromStore);

        // Add more test cases as needed.
    });
});