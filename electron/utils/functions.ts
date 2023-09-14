import { GameStartType } from "@slippi/slippi-js";
import { GameStartMode } from "../../frontend/src/lib/models/types/slippiData";

export const newId = () => `e${Math.random().toString(36).slice(-8)}`;

export const dateTimeNow = (): Date => {
    var utcSeconds = Date.now() / 1000;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d;
}

export const getGameMode = (settings: GameStartType | null): GameStartMode => {
    const regex = /mode\.(\w+)/;
    if (!settings) return "local"
    return settings.matchInfo?.matchId?.match(regex)?.at(1) as GameStartMode ?? "local"
}