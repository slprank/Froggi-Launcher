import { GameEndType, PlacementType } from "@slippi/slippi-js";

// TODO: Figure out how tied game placements look
export const getWinnerIndex = (gameEnd: GameEndType): number | undefined => {
    const lrasIndex = gameEnd.lrasInitiatorIndex ?? -1
    if (lrasIndex >= 0) return lrasIndex === 0 ? 1 : 0

    return gameEnd.placements
        .filter((p: PlacementType) => (p.position ?? -1) >= 0)
        .sort((a: PlacementType, b: PlacementType) => a.playerIndex - b.playerIndex)
        .findIndex(p => p.position === 0);
}