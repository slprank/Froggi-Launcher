import { STAGE_DATA, Stage } from "$lib/models/constants/stageData";
import type { GameStartMode, GameStats } from "../../lib/models/types/slippiData";
import type { FrameEntryType, GameStartType } from "@slippi/slippi-js";
import { isNil } from "lodash";

// TODO: Figure out how tied game placements look
export const getWinnerIndex = (game: GameStats | undefined): number | undefined => {
    if (!game) return;
    if (isTiedGame(game)) return
    const lrasIndex = game.gameEnd.lrasInitiatorIndex ?? -1
    if (lrasIndex >= 0) return lrasIndex === 0 ? 1 : 0

    const placements = game.gameEnd.placements;
    if (placements.filter(placement => placement.position === 0).length >= 2) return
    return placements.find(placement => placement.position === 0)?.playerIndex
}

export const isTiedGame = (game: GameStats | undefined | null) => {
    if (!game) return false
    if (hasGameBombRain(game)) return true
    const players = Object.values(game.lastFrame?.players ?? {})
    if (players.every((player) => isNil(player) || player.post.stocksRemaining === 0)) return true
    if (players.every(player => {
        const reference = players[0];
        if (!reference) return;
        return reference.post.stocksRemaining === player?.post.stocksRemaining && Math.floor(reference.post.percent ?? 0) === Math.floor(player?.post.percent ?? -1)
    })) return true
    return false
}

export const getGameScore = (recentGames: GameStats[][]) => {
    const gameScore = recentGames?.map(recentGame => recentGame.at(-1))
        .reduce((score: number[], game: GameStats | undefined) => {
            if (!game) return score

            if (isTiedGame(game)) return score

            const winnerIndex = getWinnerIndex(game)
            if (isNil(winnerIndex)) return score
            score[winnerIndex] += 1
            return score
        }, [0, 0]) ?? [0, 0]
    return gameScore
}

export const getGameMode = (settings: GameStartType): GameStartMode => {
    return settings?.matchInfo?.matchId?.match(/mode\.(\w+)/)?.at(1) as GameStartMode ?? "local";
}


export const getComboCount = (frame: FrameEntryType | null | undefined, playerIndex: number) => {
    return frame?.players[playerIndex]?.post.currentComboCount ?? 0;
};

export const hasStocksRemaining = (
    frame: FrameEntryType | null | undefined,
    playerIndex: number,
    stocks: number,
) => {
    return (frame?.players?.[playerIndex]?.post.stocksRemaining ?? 0) >= stocks;
};

export const isPlayerAlive = (
    frame: FrameEntryType | null | undefined,
    playerIndex: number,
) => {
    return (frame?.players?.[playerIndex]?.post.actionStateId ?? 0) <= 10;
};

export const hasGameBombRain = (game: GameStats): boolean => {
    if (game.settings?.gameInfoBlock?.bombRainEnabled) return true
    return false
}

export const getBlastZone = (stage: Stage) => {
    const stageData = STAGE_DATA[stage];
    if (!stageData) return;
    const lines = [
        [stageData.leftXBoundary, stageData.lowerYBoundary],
        [stageData.rightXBoundary, stageData.upperYBoundary],
    ]
    return [
        [lines[0][0], lines[0][1]],
        [lines[1][0], lines[1][1]],
    ];
};

export const getOffStageZone = (stage: Stage) => {
    const lines = getBlastZone(stage);
    if (!lines) return;
    const multiplier = 5;
    const width = (lines[1][0] - lines[0][0]);
    const height = (lines[1][1] - lines[0][1]);
    return [
        [lines[0][0] + width / multiplier, lines[0][1] + height / multiplier],
        [lines[1][0] - width / multiplier, lines[1][1] - height / multiplier],
    ];
};