import type { StageData } from "./types/slippiData";

export const COL = 512;
export const ROW = Math.floor((COL * 9) / 16);
export const MIN = Math.floor(COL / 100);

export const WEBSOCKET_PORT = 3100;

export const SCENE_TRANSITION_DELAY = 1000


interface CharacterMap {
    [key: string | number]: string | number
}
export const CHARACTERS: CharacterMap = {
    "captain falcon": 0,
    0: "Captain Falcon",
    "donkey kong": 1,
    1: "Donkey Kong",
    "fox": 2,
    2: "Fox",
    "game and watch": 3,
    3: "Game And Watch",
    "kirby": 4,
    4: "Kirby",
    "bowser": 5,
    5: "Bowser",
    "link": 6,
    6: "Link",
    "luigi": 7,
    7: "Luigi",
    "mario": 8,
    8: "Mario",
    "marth": 9,
    9: "Marth",
    "mewtwo": 10,
    10: "Mewtwo",
    "ness": 11,
    11: "Ness",
    "peach": 12,
    12: "Peach",
    "pikachu": 13,
    13: "Pikachu",
    "ice climbers": 14,
    14: "Ice Climbers",
    "jigglypuff": 15,
    15: "Jigglypuff",
    "samus": 16,
    16: "Samus",
    "yoshi": 17,
    17: "Yoshi",
    "zelda": 18,
    18: "Zelda",
    "sheik": 19,
    19: "Sheik",
    "falco": 20,
    20: "Falco",
    "young link": 21,
    21: "Young Link",
    "dr mario": 22,
    22: "Dr Mario",
    "roy": 23,
    23: "Roy",
    "pichu": 24,
    24: "Pichu",
    "ganondorf": 25,
    25: "Ganondorf"
}

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