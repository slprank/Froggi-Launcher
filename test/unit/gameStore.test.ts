import "reflect-metadata";
import { ElectronGamesStore } from '../../electron/services/store/storeGames';
import { StatsDisplay } from '../../electron/services/statsDisplay';
import { SlippiGame } from '@slippi/slippi-js';
import Store from "electron-store";
import { Api } from "../../electron/services/api";
import { ElectronPlayersStore } from "../../electron/services/store/storePlayers";
import { ElectronCurrentPlayerStore } from "../../electron/services/store/storeCurrentPlayer";
import { GameStartMode, Player, SlippiLauncherSettings } from "../../frontend/src/lib/models/types/slippiData";
import { ElectronLiveStatsStore } from "../../electron/services/store/storeLiveStats";
import { ElectronSettingsStore } from "../../electron/services/store/storeSettings";

jest.mock("../../electron/services/api")
describe('ElectnronGamesStore', () => {
    let electronGamesStore: ElectronGamesStore;
    let statsDisplay: StatsDisplay;
    let storeLiveStats: ElectronLiveStatsStore;
    let storeCurrentPlayer: ElectronCurrentPlayerStore
    let storePlayers: ElectronPlayersStore
    let storeSettings: ElectronSettingsStore;

    let store: Store;

    interface TestFile {
        file: string,
        expectedLength: number,
        expectedScore: number[],
        expectedMode: GameStartMode;
    }

    const rankedGameTest: TestFile[] = [
        { file: "ranked-set-1/Game_20231018T220639.slp", expectedLength: 1, expectedScore: [1, 0], expectedMode: "ranked" },
        { file: "ranked-set-1/Game_20231018T220924.slp", expectedLength: 2, expectedScore: [1, 1], expectedMode: "ranked" },
        { file: "ranked-set-1/Game_20231018T221143.slp", expectedLength: 3, expectedScore: [2, 1], expectedMode: "ranked" },
        { file: "ranked-set-2/Game_20230924T231007.slp", expectedLength: 1, expectedScore: [1, 0], expectedMode: "ranked" },
        { file: "ranked-set-2/Game_20230924T231242.slp", expectedLength: 1, expectedScore: [0, 1], expectedMode: "ranked" },
    ]

    beforeAll(() => {
        const connectCode = "PRML#682"
        store = new Store({ cwd: `${__dirname}/..` })
        store.delete("player")
        store.delete("stats")

        const log: any = {
            info: (_: string) => { },
        };

        const api: Api = new Api(log)
        const messageHandler: any = {
            sendMessage: () => { }
        };

        const slpParser: any = {
            on: () => { }
        }
        const slpStream: any = {
            on: () => { }
        }

        storeSettings = new ElectronSettingsStore(log, "", store, {} as any);
        storeSettings.getCurrentPlayerConnectCode = () => connectCode
        storeSettings.getSlippiLauncherSettings = (): SlippiLauncherSettings => {
            return {
                rootSlpPath: `${__dirname}/../sample-games`,
                useMonthlySubfolders: true,
                appDataPath: undefined,
                isoPath: undefined,
                spectateSlpPath: undefined,
            }
        }

        storeLiveStats = new ElectronLiveStatsStore(log, store, messageHandler)

        storeCurrentPlayer = new ElectronCurrentPlayerStore(log, store, storeLiveStats, storeSettings, messageHandler)
        storeCurrentPlayer.getCurrentPlayer = (): any => {
            return {
                connectCode: connectCode,
                rank: {

                }
            }
        };

        storePlayers = new ElectronPlayersStore(log, store, messageHandler)

        electronGamesStore = new ElectronGamesStore(log, store, messageHandler, storeSettings, storeCurrentPlayer);

        statsDisplay = new StatsDisplay(log, slpParser, slpStream, api, messageHandler, electronGamesStore, storeLiveStats, storePlayers, storeCurrentPlayer, storeSettings)
        statsDisplay["getCurrentPlayersWithRankStats"] = async (): Promise<Player[]> => (new Promise<Player[]>(resolve => {
            resolve([{ connectCode: connectCode, rank: {} } as Player])
        }));
        statsDisplay["getGameFiles"] = async (): Promise<string[]> => (new Promise<string[]>(resolve => {
            resolve(rankedGameTest.map(test => `${__dirname}/../sample-games/${test.file}`))
        }));
    });

    afterEach(() => {
        store.delete("player")
        store.delete("stats")
    })

    // TODO: Include all games
    test('Is New Game The Same As Recent Game', async () => {
        for (const test of rankedGameTest) {
            const game = new SlippiGame(`${__dirname}/../sample-games/${test.file}`)
            const currentGameEnd = game.getGameEnd();
            const currentGameSettings = game.getSettings();
            if (!currentGameEnd || !currentGameSettings) return;
            await statsDisplay.handleGameStart(currentGameSettings)
            await statsDisplay.handleGameEnd(currentGameEnd, currentGameSettings)
            const recentGame = electronGamesStore.getRecentGames()?.at(0)
            expect(currentGameSettings.matchInfo?.matchId?.replace(/[.:]/g, '-')).toStrictEqual(recentGame?.settings?.matchInfo?.matchId)
            expect(currentGameSettings.matchInfo?.gameNumber).toStrictEqual(recentGame?.settings?.matchInfo?.gameNumber);
        }
    })

    test('Is Returned Match Games A Match As Expected', async () => {
        for (const test of rankedGameTest) {
            const game = new SlippiGame(`${__dirname}/../sample-games/${test.file}`)
            const currentGameEnd = game.getGameEnd();
            const currentGameSettings = game.getSettings();
            if (!currentGameEnd || !currentGameSettings) return;
            await statsDisplay.handleGameStart(currentGameSettings)
            await statsDisplay.handleGameEnd(currentGameEnd, currentGameSettings)
            const recentGame = electronGamesStore.getRecentGames()?.at(0)
            const matchGames = electronGamesStore.getGameMatch(recentGame?.settings?.matchInfo.matchId)
            expect(matchGames).toHaveLength(test.expectedLength);
        }
    })

    test('Set Score Is As Expected', async () => {
        for (const test of rankedGameTest) {
            const game = new SlippiGame(`${__dirname}/../sample-games/${test.file}`)
            const currentGameEnd = game.getGameEnd();
            const currentGameSettings = game.getSettings();
            if (!currentGameEnd || !currentGameSettings) return;
            await statsDisplay.handleGameStart(currentGameSettings)
            await statsDisplay.handleGameEnd(currentGameEnd, currentGameSettings)
            const gameScore = electronGamesStore.getGameScore()
            expect(gameScore).toStrictEqual(test.expectedScore)
            //expect(gameScore.reduce((value, score) => value + score, 0)).toStrictEqual(currentGameSettings.matchInfo?.gameNumber)
        }
    })

    test('Set Score Is As Expected', async () => {
        for (const test of rankedGameTest) {
            const game = new SlippiGame(`${__dirname}/../sample-games/${test.file}`)
            const currentGameEnd = game.getGameEnd();
            const currentGameSettings = game.getSettings();
            if (!currentGameEnd || !currentGameSettings) return;
            await statsDisplay.handleGameStart(currentGameSettings)
            await statsDisplay.handleGameEnd(currentGameEnd, currentGameSettings)
            const gameScore = electronGamesStore.getGameScore()
            expect(gameScore).toStrictEqual(test.expectedScore)
            //expect(gameScore.reduce((value, score) => value + score, 0)).toStrictEqual(currentGameSettings.matchInfo?.gameNumber)
        }
    })


    // TODO: Test Current Game Id === Recent Game (Game number)

    // TODO: Test Score

    // test('Test Match Game Length', () => {
    //     let gameScore = electronGamesStore.getGameScore()
    //     console.log("score", gameScore)
    //     expect(gameScore).toStrictEqual([0, 0]);
    //     rankedGameTest.forEach((test) => {
    //         const game = new SlippiGame(`${__dirname}/../sample-games/${test.file}`)
    //         const gameEnd = game.getGameEnd();
    //         const settings = game.getSettings();
    //         if (!gameEnd || !settings) return;
    //         statsDisplay.handleGameStart(settings)
    //         statsDisplay.handleGameEnd(gameEnd, settings)
    //         const gameStats = statsDisplay["getGameStats"](game)
    //         electronGamesStore.setGameMatch(gameStats)
    //         const gameFromStore = electronGamesStore.getGameMatch(gameStats?.settings?.matchInfo.matchId)
    //         gameScore = electronGamesStore.getGameScore()
    //         expect(gameScore).toStrictEqual(test.expectedScore)
    //         expect(gameStats?.settings?.matchInfo.mode).toStrictEqual(test.expectedMode)
    //         expect(gameFromStore).toHaveLength(test.expectedLength);
    //     })

    //     // Add more test cases as needed.
    // });
});