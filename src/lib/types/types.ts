import type {
	ActionCountsType,
	ComboType,
	ConversionType,
	FrameEntryType,
	GameEndType,
	GameStartType,
	OverallType,
	StatsType,
	StockType,
} from '@slippi/slippi-js';
import type { CustomElement, LiveStatsScene } from './enum';

export interface Url {
	external: string;
	local: string;
}

export interface Obs {
	scenes: Scene[];
}

export interface Scene {
	id: number;
	title: string;
	description: string;
	default: LiveStatsScene;
	[LiveStatsScene.WaitingForDolphin]: Content;
	[LiveStatsScene.PreGame]: Content;
	[LiveStatsScene.InGame]: Content;
	[LiveStatsScene.PostGame]: Content;
	[LiveStatsScene.RankChange]: Content;
}

export interface Content {
	backgroundColor: string | undefined;
	backgroundImage: string | undefined;
	layers: any[][];
}

export interface GridContentItem {
	elementId: CustomElement;
	data: ElementPayload;
	id: string;
}

export interface ElementPayload {
	string: string | undefined;
	image: string | undefined;
	class: string;
	css: string;
}

// Old types
export interface Player {
	connectCode: string;
	displayName: string;
	rankedNetplayProfile: RankedNetplayProfile;
	stats: PlayerStatsType | undefined;
	totalGames: number;
	character: Character;
}

export interface slpPlayer {
	characters: Character[];
	continent: string;
	dailyGlobalPlacement: number;
	dailyRegionalPlacement: number;
	displayName: string;
	losses: number;
	wins: number;
	rank: string;
	rating: number;
}

export interface PlayerStatsType {
	gameComplete: boolean;
	stocks: StockType[];
	conversions: ConversionType[];
	combos: ComboType[];
	actionCounts: ActionCountsType;
	overall: OverallType;
}

export interface Options {
	automaticSessionReset: boolean;
	playerDisplayName: boolean;
	playerConnectCode: boolean;
	playerRating: boolean;
	playerPlacement: boolean;
	playerWinLoss: boolean;
	playerCharacters: boolean;
	playerRankIcon: boolean;
	playerRankText: boolean;
	slippiStats: boolean;
	displayOpponent: boolean;
	statsDamageOpening: boolean;
	statsDigitalInputsMin: boolean;
	statsInputsMin: boolean;
	statsLCancel: boolean;
	statsNeutralWins: boolean;
	statsOpeningsKill: boolean;
	statsRank: boolean;
	statsRolls: boolean;
	statsSpotDodges: boolean;
	statsStocks: boolean;
	statsTotalDamage: boolean;
	session: boolean;
	currentGameCharacters: boolean;
}

export interface PlayerSessionStats {
	displayName: string;
	connectCode: string;
	currentPlayerIndex: number;
	opponentPlayerIndex: number;
	rating: number;
	rank: string;
	regionalPlacement: number;
	globalPlacement: number;
	wins: number;
	losses: number;
	timestamp: string | undefined;
	characters: (Character | undefined)[];
	stageId: number;
	players: string[]; // Use player interface
	scores: number[];
}

interface RankedNetplayProfile {
	continent: string;
	continentInitials: string;
	characters: Character[];
	leaderboardPlacement: number;
	dailyGlobalPlacement: number;
	dailyRegionalPlacement: number;
	losses: number;
	wins: number;
	ratingOrdinal: number;
	rank: string;
}

export interface Character {
	character: string;
	characterName: string | undefined;
	characterId: number;
	characterColorId: number;
	gameCount: number;
	icon: string;
}
