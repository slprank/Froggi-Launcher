import type {
	GameStartType,
	PlayerType,
} from '@slippi/slippi-js';
import type { CustomElement, LiveStatsScene, SceneBackground, Transition } from './enum';
import type { COL } from './const';

export interface Url {
	external: string;
	local: string;
}

export interface Obs {
	overlays: Overlay[];
}

export interface Overlay {
	activeScenes: LiveStatsScene[];
	default: LiveStatsScene;
	description: string;
	id: string;
	title: string;
	[LiveStatsScene.WaitingForDolphin]: Scene;
	[LiveStatsScene.PreGame]: Scene;
	[LiveStatsScene.InGame]: Scene;
	[LiveStatsScene.PostGame]: Scene;
	[LiveStatsScene.RankChange]: Scene;
}

export interface Scene {
	backgroundColor: string | undefined;
	backgroundCustomImage: Image;
	backgroundDuration: number;
	backgroundImage: Image;
	backgroundTransition: Transition;
	backgroundType: SceneBackground;
	backgroundOpacity: number;
	elementDuration: number;
	elementTransition: Transition;
	font: Font;
	layers: GridContentItem[][];
}

export interface GridContentItem {
	[COL]: any;
	elementId: CustomElement;
	data: ElementPayload;
	id: string;
}

export interface ElementPayload {
	advancedStyling: boolean;
	class: Class;
	css: Css;
	shadow: Shadow;
	image: Image;
	string: string | undefined;
}

export interface Image {
	name: string | undefined;
	src: string | undefined;
	objectFit: string | undefined;
}

export interface Font {
	family: string | undefined;
	base64: string | undefined;
}

export interface Class {
	border: string;
	rounded: string;
	alignment: string;
	textShadow: string;
	boxShadow: string;
}

export interface Css {
	background: string;
	borderColor: string;
	color: string;
	customParent: string;
	customBox: string;
	customText: string;
	customImage: string;
	opacity: number;
}
export interface Shadow {
	x: number;
	y: number;
	spread: number;
	color: string;
}

export type GameStartMode = "ranked" | "unranked" | ""; // TODO: Verify these types


export interface Player extends PlayerType {
	rankedNetplayProfile: RankedNetplayProfile | undefined;
}

export interface CurrentPlayer extends Player {
	newRankedNetplayProfile: RankedNetplayProfile | undefined;
}

export interface GameStats extends GameStartType {
	timestamp: Date;
	score: number[];
	mode: GameStartMode;
}

export interface RankedNetplayProfile {
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
	character: string;
	characterName: string | undefined;
	characterId: number;
	characterColorId: number;
	gameCount: number;
	icon: string;
}
