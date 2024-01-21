//@ts-nocheck

import type { StageData } from "../types/slippiData";

export const STAGE_DATA: { [stageId: number]: StageData } = {
    2: {
        name: "Fountain of Dreams",
        leftXBoundary: -198.75,
        rightXBoundary: 198.75,
        upperYBoundary: 202.5,
        lowerYBoundary: -146.25,
        mainPlatformHeight: 0, // grassy sides are raised at 0.6214
        sidePlatformHeight: 27.375, // moves up and down
        topPlatformHeight: 42.75,
        leftLedgeX: -63.35,
        rightLedgeX: 63.35,
    },
    3: {
        name: "Pokemon Stadium", // transforms, no top
        leftXBoundary: -230,
        rightXBoundary: 230,
        upperYBoundary: 180,
        lowerYBoundary: -111,
        mainPlatformHeight: 0, // just a good guess
        sidePlatformHeight: 25,
        leftLedgeX: -87.75,
        rightLedgeX: 87.75,
    },
    8: {
        name: "Yoshi's Story",
        leftXBoundary: -175.7,
        rightXBoundary: 173.6,
        upperYBoundary: 168,
        lowerYBoundary: -91,
        mainPlatformHeight: 0, // has slopes
        sidePlatformHeight: 23.45,
        topPlatformHeight: 42,
        leftLedgeX: -56,
        rightLedgeX: 56,
    },
    28: {
        name: "Dream Land N64",
        leftXBoundary: -255,
        rightXBoundary: 255,
        upperYBoundary: 250,
        lowerYBoundary: -123,
        mainPlatformHeight: 0.01,
        sidePlatformHeight: 30.2425,
        topPlatformHeight: 51.4264,
        leftLedgeX: -77.27,
        rightLedgeX: 77.27,
    },
    31: {
        name: "Battlefield",
        leftXBoundary: -224,
        rightXBoundary: 224,
        upperYBoundary: 200,
        lowerYBoundary: -108.8,
        mainPlatformHeight: 0,
        sidePlatformHeight: 27.2,
        topPlatformHeight: 54.4,
        leftLedgeX: -68.4,
        rightLedgeX: 68.4,
    },
    32: {
        name: "Final Destination", // no side/top
        leftXBoundary: -246,
        rightXBoundary: 246,
        upperYBoundary: 188,
        lowerYBoundary: -140,
        mainPlatformHeight: 0,
        leftLedgeX: -85.5606,
        rightLedgeX: 85.5606,
    },
};

export enum Stage {
    FOUNTAIN_OF_DREAMS = 2,
    POKEMON_STADIUM = 3,
    PEACHS_CASTLE = 4,
    KONGO_JUNGLE = 5,
    BRINSTAR = 6,
    CORNERIA = 7,
    YOSHIS_STORY = 8,
    ONETT = 9,
    MUTE_CITY = 10,
    RAINBOW_CRUISE = 11,
    JUNGLE_JAPES = 12,
    GREAT_BAY = 13,
    HYRULE_TEMPLE = 14,
    BRINSTAR_DEPTHS = 15,
    YOSHIS_ISLAND = 16,
    GREEN_GREENS = 17,
    FOURSIDE = 18,
    MUSHROOM_KINGDOM = 19,
    MUSHROOM_KINGDOM_2 = 20,
    VENOM = 22,
    POKE_FLOATS = 23,
    BIG_BLUE = 24,
    ICICLE_MOUNTAIN = 25,
    ICETOP = 26,
    FLAT_ZONE = 27,
    DREAMLAND = 28,
    YOSHIS_ISLAND_N64 = 29,
    KONGO_JUNGLE_N64 = 30,
    BATTLEFIELD = 31,
    FINAL_DESTINATION = 32,
    TARGET_TEST_MARIO = 33,
    TARGET_TEST_CAPTAIN_FALCON = 34,
    TARGET_TEST_YOUNG_LINK = 35,
    TARGET_TEST_DONKEY_KONG = 36,
    TARGET_TEST_DR_MARIO = 37,
    TARGET_TEST_FALCO = 38,
    TARGET_TEST_FOX = 39,
    TARGET_TEST_ICE_CLIMBERS = 40,
    TARGET_TEST_KIRBY = 41,
    TARGET_TEST_BOWSER = 42,
    TARGET_TEST_LINK = 43,
    TARGET_TEST_LUIGI = 44,
    TARGET_TEST_MARTH = 45,
    TARGET_TEST_MEWTWO = 46,
    TARGET_TEST_NESS = 47,
    TARGET_TEST_PEACH = 48,
    TARGET_TEST_PICHU = 49,
    TARGET_TEST_PIKACHU = 50,
    TARGET_TEST_JIGGLYPUFF = 51,
    TARGET_TEST_SAMUS = 52,
    TARGET_TEST_SHEIK = 53,
    TARGET_TEST_YOSHI = 54,
    TARGET_TEST_ZELDA = 55,
    TARGET_TEST_GAME_AND_WATCH = 56,
    TARGET_TEST_ROY = 57,
    TARGET_TEST_GANONDORF = 58,
    RACE_TO_THE_FINISH = 82,
    GRAB_THE_TROPHIES = 83,
    HOME_RUN_CONTEST = 84,
    ALL_STAR_LOBBY = 85,
    EVENT_ONE = 202,
    EVENT_EIGHTEEN = 203,
    EVENT_THREE = 204,
    EVENT_FOUR = 205,
    EVENT_FIVE = 206,
    EVENT_SIX = 207,
    EVENT_SEVEN = 208,
    EVENT_EIGHT = 209,
    EVENT_NINE = 210,
    EVENT_TEN_PART_ONE = 211,
    EVENT_ELEVEN = 212,
    EVENT_TWELVE = 213,
    EVENT_THIRTEEN = 214,
    EVENT_FOURTEEN = 215,
    EVENT_THIRTY_SEVEN = 216,
    EVENT_SIXTEEN = 217,
    EVENT_SEVENTEEN = 218,
    EVENT_TWO = 219,
    EVENT_NINETEEN = 220,
    EVENT_TWENTY_PART_ONE = 221,
    EVENT_TWENTY_ONE = 222,
    EVENT_TWENTY_TWO = 223,
    EVENT_TWENTY_SEVEN = 224,
    EVENT_TWENTY_FOUR = 225,
    EVENT_TWENTY_FIVE = 226,
    EVENT_TWENTY_SIX = 227,
    EVENT_TWENTY_THREE = 228,
    EVENT_TWENTY_EIGHT = 229,
    EVENT_TWENTY_NINE = 230,
    EVENT_THIRTY_PART_ONE = 231,
    EVENT_THIRTY_ONE = 232,
    EVENT_THIRTY_TWO = 233,
    EVENT_THIRTY_THREE = 234,
    EVENT_THIRTY_FOUR = 235,
    EVENT_FORTY_EIGHT = 236,
    EVENT_THIRTY_SIX_PART_ONE = 237,
    EVENT_FIFTEEN = 238,
    EVENT_THIRTY_EIGHT = 239,
    EVENT_THIRTY_NINE = 240,
    EVENT_FORTY_PART_ONE = 241,
    EVENT_FORTY_ONE = 242,
    EVENT_FORTY_TWO = 243,
    EVENT_FORTY_THREE = 244,
    EVENT_FORTY_FOUR = 245,
    EVENT_FORTY_FIVE = 246,
    EVENT_FORTY_SIX = 247,
    EVENT_FORTY_SEVEN = 248,
    EVENT_THIRTY_FIVE = 249,
    EVENT_FORTY_NINE_PART_ONE = 250,
    EVENT_FIFTY = 251,
    EVENT_FIFTY_ONE = 252,
    EVENT_TEN_PART_TWO = 253,
    EVENT_TEN_PART_THREE = 254,
    EVENT_TEN_PART_FOUR = 255,
    EVENT_TEN_PART_FIVE = 256,
    EVENT_TWENTY_PART_TWO = 257,
    EVENT_TWENTY_PART_THREE = 258,
    EVENT_TWENTY_PART_FOUR = 259,
    EVENT_TWENTY_PART_FIVE = 260,
    EVENT_THIRTY_PART_TWO = 261,
    EVENT_THIRTY_PART_THREE = 262,
    EVENT_THIRTY_PART_FOUR = 263,
    EVENT_FORTY_PART_TWO = 264,
    EVENT_FORTY_PART_THREE = 265,
    EVENT_FORTY_PART_FOUR = 266,
    EVENT_FORTY_PART_FIVE = 267,
    EVENT_FORTY_NINE_PART_TWO = 268,
    EVENT_FORTY_NINE_PART_THREE = 269,
    EVENT_FORTY_NINE_PART_FOUR = 270,
    EVENT_FORTY_NINE_PART_FIVE = 271,
    EVENT_FORTY_NINE_PART_SIX = 272,
    EVENT_THIRTY_SIX_PART_TWO = 273,
    MULTI_MAN_MELEE = 285
}



function Dreamland() {
    const mainStage = [
        "-76.5, -11",
        "-77.25, 0",
        "77.25, 0",
        "76.5, -11",
        "76.5, -11",
        "65.75, -36",
        "-65.75, -36",
        "-76.5, -11",
    ];
    const platforms = [
        ["-61.393, 30.142", "-31.725, 30.142"],
        ["31.704, 30.243", "63.075, 30.243"],
        ["-19.018, 51.425", "19.017, 51.425"],
    ];
    const blastzones = [
        [-255, -123],
        [255, 250],
    ];

}

function FinalDestination() {
    const mainStage = [
        "-85.6, 0",
        "85.6, 0",
        "85.6, -10",
        "65, -20",
        "65, -30",
        "60, -47",
        "50, -55",
        "45, -56",
        "-45, -56",
        "-50, -55",
        "-60, -47",
        "-65, -30",
        "-65, -20",
        "-85.6, -10",
        "-85.6, 0",
    ];
    const blastzones = [
        [-246, -140],
        [246, 188],
    ];

}

function YoshisStory() {
    const mainStage = [
        "-54, -91",
        "-54, -47",
        "-53, -46",
        "-53, -31",
        "-54, -30",
        "-54, -28",
        "-53, -27",
        "-53, -12",
        "-53, -12",
        "-54, -11",
        "-55, -8",
        "-56, -7",
        "-56, -3.5",
        "-39, 0",
        "39, 0",
        "56, -3.5",
        "56, -7",
        "55, -8",
        "54, -11",
        "53, -12",
        "53, -27",
        "54, -28",
        "54, -30",
        "53, -31",
        "53, -46",
        "54, -47",
        "54, -91",
        "-54, -91",
    ];
    const platforms = [
        ["-59.5, 23.45", "-28, 23.45"],
        ["28, 23.45", "59.5, 23.45"],
        ["-15.75, 42", "15.75, 42"],
    ];
    const randall = createMemo(() => {
        const cornerPositions: {
            [frameCount: number]: [y: number, xLeft: number];
        } = {
            416: [-33.184478759765625, 89.75263977050781],
            417: [-33.04470443725586, 90.07878112792969],
            418: [-32.904930114746094, 90.40492248535156],
            419: [-32.76515197753906, 90.73107147216797],
            420: [-32.49260711669922, 90.92455291748047],
            421: [-32.16635513305664, 91.06437683105469],
            422: [-31.84010314941406, 91.20419311523438],
            423: [-31.513851165771484, 91.3440170288086],
            469: [-15.1948881149292, 91.3371353149414],
            470: [-14.868742942810059, 91.1973648071289],
            471: [-14.542601585388184, 91.05758666992188],
            472: [-14.216456413269043, 90.91781616210938],
            473: [-13.967143058776855, 90.71036529541016],
            474: [-13.869664192199707, 90.36917877197266],
            475: [-13.772183418273926, 90.02799224853516],
            476: [-13.674698829650879, 89.68680572509766],
            1069: [-31.59004211425781, -103.554931640625],
            1070: [-31.907413482666016, -103.39625549316406],
            1071: [-32.22478485107422, -103.23756408691406],
            1072: [-32.54215621948242, -103.07887268066406],
            1073: [-32.7216796875, -102.77439880371094],
            1074: [-32.89775085449219, -102.46626281738281],
            1075: [-33.07382583618164, -102.15814208984375],
            1016: [-13.679760932922363, -101.919677734375],
            1017: [-13.819535255432129, -102.24581909179688],
            1018: [-13.959305763244629, -102.57196044921875],
            1019: [-14.099089622497559, -102.8981018066406],
            1020: [-14.320136070251465, -103.1476135253906],
            1021: [-14.6375150680542, -103.3063049316406],
            1022: [-14.954894065856934, -103.4649963378906],
        };
        // return frameNumber to -123 based.
        const frameInLap = (replayStore.frame - 123 + 1200) % 1200;
        const randallWidth = 11.9;

        if (frameInLap > 476 && frameInLap < 1016) {
            const start = 101.235443115234;
            const speed = -0.35484;
            const frameInSection = frameInLap - 477;
            const y = -13.64989;
            const left = [start - randallWidth + speed * frameInSection, y];
            const right = [start + speed * frameInSection, y];
            return [left, right];
        }
        if (frameInLap > 1022 && frameInLap < 1069) {
            const start = -15.2778692245483;
            const speed = -0.354839325;
            const frameInSection = frameInLap - 1023;
            const y = start + speed * frameInSection;
            const left = [-103.6, y];
            const right = [-91.7, y];
            return [left, right];
        }
        if (frameInLap > 1075 || frameInLap < 416) {
            const start = -101.850006103516;
            const speed = 0.35484;
            const frameInSection = frameInLap + (frameInLap < 416 ? 125 : -1076);
            const y = -33.2489;
            const left = [start + speed * frameInSection, y];
            const right = [start + randallWidth + speed * frameInSection, y];
            return [left, right];
        }
        if (frameInLap > 423 && frameInLap < 469) {
            const start = -31.16023254394531;
            const speed = 0.354839325;
            const frameInSection = frameInLap - 424;
            const y = start + speed * frameInSection;
            const left = [91.35, y];
            const right = [103.25, y];
            return [left, right];
        }

        const position = cornerPositions[frameInLap];
        const y = position[0];
        const left = [position[1], y];
        const right = [position[1] + randallWidth, y];
        return [left, right];
    });
    const blastzones = [
        [-175.7, -91],
        [173.6, 169],
    ];
}

function FountainOfDreams() {
    const mainStage = [
        "-63.33, 0.62",
        "-53.5, 0.62",
        "-51, 0",
        "51, 0",
        "53.5, 0.62",
        "63.33, 0.62",
        "63.35, 0.62",
        "63.35, -4.5",
        "59.33, -15",
        "56.9, -19.5",
        "55, -27",
        "52, -32",
        "48, -38",
        "41, -42",
        "19, -49.5",
        "13, -54.5",
        "10, -62",
        "8.8, -72",
        "8.8, -150",
        "-8.8, -150",
        "-8.8, -72",
        "-10, -62",
        "-13, -54.5",
        "-19, -49.5",
        "-41, -42",
        "-48, -38",
        "-52, -32",
        "-55, -27",
        "-56.9, -19.5",
        "-59.33, -15",
        "-63.35, -4.5",
        "-63.35, 0.62",
        "-63.35, -4.5",
        "-63.33, 0.62",
    ];
    const platforms = [
        ["-49.5, 16.125", "-21, 16.125"],
        ["21, 22.125", "49.5, 22.125"],
        ["-14.25, 42.75", "14.25, 42.75"],
    ];
    const blastzones = [
        [-198.75, -146.25],
        [198.75, 202.5],
    ];
}


function PokemonStadium() {
    const mainStage = [
        "87.75, 0",
        "87.75, -4",
        "73.75, -15",
        "73.75, -17.75",
        "60, -17.75",
        "60, -38",
        "15, -60",
        "15, -112",
        "-15, -112",
        "-15, -60",
        "-60, -38",
        "-60, -17.75",
        "-73.75, -17.75",
        "-73.75, -15",
        "-87.75, -4",
        "-87.75, 0",
        "87.75, 0",
    ];
    const platforms = [
        ["-55, 25", "-25, 25"],
        ["25, 25", "55, 25"],
    ];
    const blastzones = [
        [-230, -111],
        [230, 180],
    ];
}