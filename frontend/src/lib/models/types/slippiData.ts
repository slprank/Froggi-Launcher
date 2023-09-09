import type { GameEndType, GameStartType, PlayerType, StatsType } from "@slippi/slippi-js";

export type GameStartMode = "ranked" | "unranked" | "direct" | "local"; // TODO: Verify these types


export interface Player extends PlayerType {
    rank: Rank | undefined;
}

export interface CurrentPlayer extends Player {
    game: PlayerGame
    rank: CurrentPlayerRank
}

export type PlayerGame = {
    [mode in GameStartMode]: { [matchId: string]: GameStats[] };
}

export interface Rank {
    current: RankedNetplayProfile | undefined;
}

export interface CurrentPlayerRank extends Rank {
    prev: RankedNetplayProfile | undefined;
    new: RankedNetplayProfile | undefined;
    history: RankHistory;
}

export interface RankHistory { }

export type Sets = {
    [Mode in GameStartMode]: GameStats[];
};

export interface GameStats {
    settings: GameStartType;
    gameEnd: GameEndType;
    postGameStats: StatsType | null;
    timestamp: Date;
    score: number[];
    mode: GameStartMode;
}

export type GameStartTypeExtended = GameStartType & {
    matchInfo: MatchInfoExtended;
}

export type MatchInfoExtended = {
    matchId: string | null;
    gameNumber: number | null;
    tiebreakerNumber: number | null;
    mode: GameStartMode | undefined;
}

export interface RankedNetplaySeason {
    continent: string | undefined;
    continentInitials: string | undefined;
    characters: Character[];
    leaderboardPlacement: number | undefined;
    dailyGlobalPlacement: number;
    dailyRegionalPlacement: number;
    losses: number;
    wins: number;
    ratingOrdinal: number;
    rank: string;
}

export interface RankedNetplayProfile {
    connectCode: string;
    continent: string | undefined;
    continentInitials: string | undefined;
    characters: Character[];
    displayName: string;
    leaderboardPlacement: number | undefined;
    dailyGlobalPlacement: number;
    dailyRegionalPlacement: number;
    losses: number;
    lossesPercent: number;
    rating: number;
    rank: string;
    seasons: RankedNetplaySeason[];
    totalGames: number;
    totalSets: number;
    wins: number;
    winsPercent: number;
}

export interface Session {
    startRankStats: RankedNetplayProfile,
    startTime: Date,
    currentRankStats: RankedNetplayProfile,
    latestUpdate: Date
};

export interface SlippiLauncherSettings {
    appDataPath: string | undefined;
    isoPath: string | undefined;
    useMonthlySubfolders: boolean | undefined;
    rootSlpPath: string | undefined;
    spectateSlpPath: string | undefined;
}

export interface Character {
    characterName: string;
    characterId: number;
    characterColorId: number | undefined;
    gameCount: number;
    gameCountPercent: number;
}

export interface PlayKey {
    uid: string;
    playKey: string;
    connectCode: string;
    displayName: string;
    latestVersion?: string;
}

