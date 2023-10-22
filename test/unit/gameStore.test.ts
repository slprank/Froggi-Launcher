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
import log from 'electron-log';
import { BestOf, LiveStatsScene } from "../../frontend/src/lib/models/enum";

jest.mock("../../electron/services/api")
describe('ElectnronGamesStore', () => {
    let connectCode: string;
    let electronGamesStore: ElectronGamesStore;
    let statsDisplay: StatsDisplay;
    let storeLiveStats: ElectronLiveStatsStore;
    let storeCurrentPlayer: ElectronCurrentPlayerStore
    let storePlayers: ElectronPlayersStore
    let storeSettings: ElectronSettingsStore;

    let store: Store;

    interface TestFile {
        connectCode: string,
        file: string,
        expectedLength: number,
        expectedScore: number[],
        expectedMode: GameStartMode,
        expectedScene: LiveStatsScene,
        setBestOf: BestOf | undefined,
    }

    const rankedGameTest: TestFile[] = [
        { file: "ranked-set-1/Replay 1 [W].slp", expectedLength: 1, expectedScore: [1, 0], expectedMode: "ranked", connectCode: "PRML#682", expectedScene: LiveStatsScene.PostGame, setBestOf: undefined },
        { file: "ranked-set-1/Replay 2 [L].slp", expectedLength: 2, expectedScore: [1, 1], expectedMode: "ranked", connectCode: "PRML#682", expectedScene: LiveStatsScene.PostGame, setBestOf: undefined },
        { file: "ranked-set-1/Replay 3 [W].slp", expectedLength: 3, expectedScore: [2, 1], expectedMode: "ranked", connectCode: "PRML#682", expectedScene: LiveStatsScene.PostSet, setBestOf: undefined },

        { file: "unranked-set-1/Replay 1 [L].slp", expectedLength: 1, expectedScore: [1, 0], expectedMode: "unranked", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostGame, setBestOf: BestOf.BestOf3 },
        { file: "unranked-set-1/Replay 2 [W].slp", expectedLength: 2, expectedScore: [1, 1], expectedMode: "unranked", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostGame, setBestOf: undefined },
        { file: "unranked-set-1/Replay 3 [L].slp", expectedLength: 3, expectedScore: [2, 1], expectedMode: "unranked", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostSet, setBestOf: undefined },
        { file: "unranked-set-1/Replay 4 [W].slp", expectedLength: 4, expectedScore: [2, 2], expectedMode: "unranked", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostSet, setBestOf: undefined },
        { file: "unranked-set-1/Replay 5 [W].slp", expectedLength: 5, expectedScore: [2, 3], expectedMode: "unranked", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostSet, setBestOf: undefined },

        { file: "direct-set-1/Replay 1 [W].slp", expectedLength: 1, expectedScore: [0, 1], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostGame, setBestOf: BestOf.BestOf5 },
        { file: "direct-set-1/Replay 2 [W].slp", expectedLength: 2, expectedScore: [0, 2], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostGame, setBestOf: undefined },
        { file: "direct-set-1/Replay 3 [L].slp", expectedLength: 3, expectedScore: [1, 2], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostGame, setBestOf: undefined },
        { file: "direct-set-1/Replay 4 [W].slp", expectedLength: 4, expectedScore: [1, 3], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostSet, setBestOf: undefined },

        { file: "direct-set-2/Replay 1 [W].slp", expectedLength: 1, expectedScore: [0, 1], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostGame, setBestOf: BestOf.BestOf3 },
        { file: "direct-set-2/Replay 2 [W].slp", expectedLength: 2, expectedScore: [0, 2], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostSet, setBestOf: undefined },

        { file: "direct-set-3/Replay 1 [W].slp", expectedLength: 1, expectedScore: [0, 1], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostGame, setBestOf: BestOf.BestOf5 },
        { file: "direct-set-3/Replay 2 [W].slp", expectedLength: 2, expectedScore: [0, 2], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostGame, setBestOf: undefined },
        { file: "direct-set-3/Replay 3 [W].slp", expectedLength: 3, expectedScore: [0, 3], expectedMode: "direct", connectCode: "FLCD#507", expectedScene: LiveStatsScene.PostSet, setBestOf: undefined },

        { file: "direct-set-4/Replay 1 [L].slp", expectedLength: 1, expectedScore: [1, 0], expectedMode: "direct", connectCode: "YBRD#855", expectedScene: LiveStatsScene.PostGame, setBestOf: BestOf.BestOf5 },
        { file: "direct-set-4/Replay 2 [W].slp", expectedLength: 2, expectedScore: [1, 1], expectedMode: "direct", connectCode: "YBRD#855", expectedScene: LiveStatsScene.PostGame, setBestOf: undefined },
        { file: "direct-set-4/Replay 3 [L].slp", expectedLength: 3, expectedScore: [2, 1], expectedMode: "direct", connectCode: "YBRD#855", expectedScene: LiveStatsScene.PostGame, setBestOf: undefined },
        { file: "direct-set-4/Replay 4 [L].slp", expectedLength: 4, expectedScore: [3, 1], expectedMode: "direct", connectCode: "YBRD#855", expectedScene: LiveStatsScene.PostSet, setBestOf: undefined },
        // TODO: Add local games with different port positions
    ]

    beforeAll(() => {
        store = new Store({ cwd: `${__dirname}/..` })
        store.delete("player")
        store.delete("stats")

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

    // TODO: Include local games - different port
    // TODO: All tests in one loop
    test('Is New Game The Same As Recent Game', async () => {
        for (const gameTest of rankedGameTest) {
            connectCode = gameTest.connectCode
            storeLiveStats.setBestOf(gameTest.setBestOf)
            const game = new SlippiGame(`${__dirname}/../sample-games/${gameTest.file}`)
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

    test('Is Post Game Scene As Expected', async () => {
        for (const gameTest of rankedGameTest) {
            connectCode = gameTest.connectCode
            const game = new SlippiGame(`${__dirname}/../sample-games/${gameTest.file}`)
            const currentGameEnd = game.getGameEnd();
            const currentGameSettings = game.getSettings();
            if (!currentGameEnd || !currentGameSettings) return;
            await statsDisplay.handleGameStart(currentGameSettings)
            await statsDisplay.handleGameEnd(currentGameEnd, currentGameSettings)
            const liveScene = storeLiveStats.getStatsScene();
            expect(liveScene).toStrictEqual(gameTest.expectedScene);
        }
    })

    test('Is Returned Match Games Length As Expected', async () => {
        for (const test of rankedGameTest) {
            connectCode = test.connectCode
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
            connectCode = test.connectCode
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
            connectCode = test.connectCode
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

    test('Game Mode As Expected', async () => {
        for (const test of rankedGameTest) {
            connectCode = test.connectCode
            const game = new SlippiGame(`${__dirname}/../sample-games/${test.file}`)
            const currentGameEnd = game.getGameEnd();
            const currentGameSettings = game.getSettings();
            if (!currentGameEnd || !currentGameSettings) return;
            await statsDisplay.handleGameStart(currentGameSettings)
            await statsDisplay.handleGameEnd(currentGameEnd, currentGameSettings)
            const recentGame = electronGamesStore.getRecentGames()?.at(0)
            expect(recentGame?.settings?.matchInfo.mode).toStrictEqual(test.expectedMode)
        }
    })

    // TODO: Test current player controller port

    // TODO: Test analyzed match stats
});