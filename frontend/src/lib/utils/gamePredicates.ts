import type { GameStats } from "../../lib/models/types/slippiData";
import type { GameEndType } from "@slippi/slippi-js";
import { isNil } from "lodash";

// TODO: Figure out how tied game placements look
export const getWinnerIndex = (gameEnd: GameEndType | undefined): number | undefined => {
    if (!gameEnd) return;
    const lrasIndex = gameEnd.lrasInitiatorIndex ?? -1
    if (lrasIndex >= 0) return lrasIndex === 0 ? 1 : 0

    const placements = gameEnd.placements;
    if (placements.filter(placement => placement.position === 0).length >= 2) return
    return placements.find(placement => placement.position === 0)?.playerIndex
}

export const isTiedGame = (game: GameStats | undefined | null) => {
    if (!game) return false
    const players = Object.entries(game.lastFrame.players).map(([_, player]) => player)
    if (players.every((player) => isNil(player) || player.post.stocksRemaining === 0)) return true
    if (players.every(player => {
        const reference = players[0];
        if (!reference) return;
        return reference.post.stocksRemaining === player?.post.stocksRemaining && Math.floor(reference.post.percent ?? 0) === Math.floor(player?.post.percent ?? -1)
    })) return true
    return false
}