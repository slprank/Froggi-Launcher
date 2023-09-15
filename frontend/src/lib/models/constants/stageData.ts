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