import type { GameEndType } from "@slippi/slippi-js";

// TODO: Figure out how tied game placements look
export const getWinnerIndex = (gameEnd: GameEndType | undefined): number | undefined => {
    if (!gameEnd) return;
    const lrasIndex = gameEnd.lrasInitiatorIndex ?? -1
    if (lrasIndex >= 0) return lrasIndex === 0 ? 1 : 0

    const placements = gameEnd.placements;
    if (placements.filter(placement => placement.position === 0).length >= 2) return
    return placements.find(placement => placement.position === 0)?.playerIndex
}