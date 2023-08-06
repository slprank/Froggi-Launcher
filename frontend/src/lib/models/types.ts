import type {
	GameEndType,
	GameStartType,
	PlayerType,
	StatsType,
} from '@slippi/slippi-js';
import type { Animation, AnimationTrigger, CustomElement, Easing, ElementPauseOption, LiveStatsScene, SceneBackground } from './enum';
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
	defaultScene: LiveStatsScene;
	description: string;
	id: string;
	title: string;
	[LiveStatsScene.WaitingForDolphin]: Scene;
	[LiveStatsScene.PreGame]: Scene;
	[LiveStatsScene.InGame]: Scene;
	[LiveStatsScene.PostGame]: Scene;
	[LiveStatsScene.PostSet]: Scene;
	[LiveStatsScene.RankChange]: Scene;
}

export interface Scene {
	animation: SceneAnimation;
	background: Background;
	font: Font;
	previewLayers: string[];
	layers: Layer[];
}

export interface Layer {
	items: GridContentItem[]
	id: string;
}

export interface Background {
	animation: Animations
	color: string | undefined;
	customImage: Image;
	image: Image;
	opacity: number;
	type: SceneBackground;
}

export interface GridContentItem {
	[COL]: any;
	elementId: CustomElement;
	data: ElementPayload;
	id: string;
}

export interface GridContentItemStyle {
	cssValue: string;
	classValue: string;
	shadow: string;
	stroke: string;
}

export interface ElementPayload {
	advancedStyling: boolean;
	animation: Animations;
	class: Class;
	css: Css;
	description: string;
	font: Font
	pauseOption: ElementPauseOption;
	percent: Percent
	shadow: Shadow;
	stroke: Stroke;
	image: Image;
	string: string | undefined;
}

export interface Percent {
	startColor: string;
	endColor: string;
}

export interface Animations {
	in: AnimationSettings
	out: AnimationSettings
	trigger: AnimationTrigger
}

export interface SceneAnimation extends Animations {
	duration: number;
	layerRenderDelay: number;
}

export interface AnimationSettings {
	type: Animation;
	options: AnimationOptions;
}

export interface AnimationOptions {
	delay: number;
	duration: number;
	easing: Easing;
	start: number;
	x: number;
	y: number;
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
	border: string | undefined;
	rounded: string | undefined;
	alignment: string | undefined;
	textShadow: string | undefined;
	boxShadow: string | undefined;
}

export interface Css {
	background: string | undefined;
	borderColor: string | undefined;
	color: string | undefined;
	customParent: string | undefined;
	customBox: string | undefined;
	customText: string | undefined;
	customImage: string | undefined;
	opacity: string;
	rotate: string | undefined;
	scale: string | undefined;
}
export interface Shadow {
	x: number;
	y: number;
	spread: number;
	color: string;
}

export interface Stroke {
	size: number;
	color: string;
}

export type GameStartMode = "ranked" | "unranked" | "direct" | ""; // TODO: Verify these types


export interface Player extends PlayerType {
	rankedNetplayProfile: RankedNetplayProfile | undefined;
}

export interface CurrentPlayer extends Player {
	newRankedNetplayProfile: RankedNetplayProfile | undefined;
}

export interface GameStats {
	settings: GameStartType;
	gameEnd: GameEndType;
	postGameStats: StatsType | null;
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
