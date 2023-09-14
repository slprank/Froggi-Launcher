import type { GameEndType, GameStartType, OverallType, PlayerType, StatsType } from "@slippi/slippi-js";

export interface Character {
    characterName: string;
    characterId: number;
    characterColorId: number | undefined;
    gameCount: number;
    gameCountPercent: number;
}

export interface CurrentPlayer extends Player {
    game: PlayerGame
    rank: CurrentPlayerRank
}

export interface CurrentPlayerRank extends Rank {
    prev: RankedNetplayProfile | undefined;
    new: RankedNetplayProfile | undefined;
    history: RankHistory;
}

export interface EdgeGuard {
    totalAttempts: number;
    successfulAttempts: number;
    unsuccessfulAttempts: number;
    successfulAttemptsPercent: number
    unsuccessfulAttemptsPercent: number
}

export interface Recovery {
    totalRecoveries: number;
    successfulRecoveries: number;
    unsuccessfulRecoveries: number;
    successfulRecoveriesPercent: number;
    unsuccessfulRecoveriesPercent: number;
}

export interface PlayKey {
    uid: string;
    playKey: string;
    connectCode: string;
    displayName: string;
    latestVersion?: string;
}

export interface Player extends PlayerType {
    rank: Rank | undefined;
}


export type PlayerGame = {
    [mode in GameStartMode]: { [matchId: string]: GameStats[] };
}

export interface Rank {
    current: RankedNetplayProfile | undefined;
}

export interface RankHistory { }

export type Sets = {
    [Mode in GameStartMode]: GameStats[];
};

export type StatsTypeExtended = StatsType | {
    overall: OverallTypeExtended[]
}

export interface GameStats {
    settings: GameStartType;
    gameEnd: GameEndType;
    postGameStats: StatsTypeExtended | null;
    timestamp: Date;
    score: number[];
    mode: GameStartMode;
}

export interface OverallTypeExtended extends OverallType {
    edgeGuard: EdgeGuard | undefined;
    recovery: Recovery | undefined;
}


export type GameStartTypeExtended = GameStartType & {
    matchInfo: MatchInfoExtended;
}

export type GameStartMode = "ranked" | "unranked" | "direct" | "local"; // TODO: Verify these types

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

export interface StageData {
    name: string;
    leftXBoundary: number;
    rightXBoundary: number;
    upperYBoundary: number;
    lowerYBoundary: number;
    mainPlatformHeight: number;
    sidePlatformHeight?: number;
    topPlatformHeight?: number;
    leftLedgeX: number;
    rightLedgeX: number;
}

