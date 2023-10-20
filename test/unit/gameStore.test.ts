import "reflect-metadata";
import { ElectronGamesStore } from '../../electron/services/store/storeGames';
import { StatsDisplay } from '../../electron/services/statsDisplay';
import { SlippiGame } from '@slippi/slippi-js';
import { InGameState } from "../../frontend/src/lib/models/enum";
import Store from "electron-store";

describe('ElectnronGamesStore', () => {
    let electronGamesStore: ElectronGamesStore;
    let statsDisplay: StatsDisplay;

    let store: Store;

    beforeAll(() => {
        const connectCode = "PRML#682"
        store = new Store({ cwd: `${__dirname}/..` })
        store.delete("player")

        const log: any = {
            info: (_: string) => { },
        };

        const api: any = {}
        const messageHandler: any = {};
        const storeCurrentPlayer: any = {
            getCurrentPlayer: () => {
                return {
                    connectCode: connectCode
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
            getCurrentPlayerConnectCode: () => connectCode
        };
        const storeLiveStats: any = {
            getGameState: () => InGameState.Inactive
        }
        const storePlayers: any = {}

        electronGamesStore = new ElectronGamesStore(log, store, messageHandler, storeSettings, storeCurrentPlayer);
        statsDisplay = new StatsDisplay(log, slpParser, slpStream, api, messageHandler, electronGamesStore, storeLiveStats, storePlayers, storeCurrentPlayer, storeSettings)

    });

    test('Test Game Save', () => {
        const game = new SlippiGame(`${__dirname}/../sample-games/ranked-set-1/Game_20231018T220639.slp`)
        const gameStats = statsDisplay["getGameStats"](game)
        electronGamesStore.setGameMatch(gameStats)
        const gameFromStore = electronGamesStore.getGameMatch(gameStats?.settings?.matchInfo.matchId)
        console.log("player", store.get(`player`))
        expect(gameFromStore).toHaveLength(1);

        // Add more test cases as needed.
    });
});