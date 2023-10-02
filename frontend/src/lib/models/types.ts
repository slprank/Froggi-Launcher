import type { Animation, AnimationTrigger, AutoUpdaterStatus, Easing, LiveStatsScene, SceneBackground } from './enum';
import type { COL } from './const';
import type { CustomElement } from './constants/customElement';
import type { SelectedVisibilityOption } from './types/animationOption';

export interface AutoUpdater {
	progress: number | undefined;
	status: AutoUpdaterStatus;
	version: string | undefined;
}

export interface Url {
	external: string;
	local: string;
}

export interface Obs {
	overlays: Overlay[];
}

export interface Overlay {
	activeScenes: { [key in LiveStatsScene]: boolean };
	defaultScene: LiveStatsScene;
	description: string;
	id: string;
	title: string;
	[LiveStatsScene.WaitingForDolphin]: Scene;
	[LiveStatsScene.Menu]: Scene;
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
	visibility: VisibilityAnimations;
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

export interface VisibilityAnimations {
	in: AnimationSettings
	out: AnimationSettings
	selectedOptions: SelectedVisibilityOption[] // TODO: rename
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
	borderLeft: string | undefined;
	borderRight: string | undefined;
	borderTop: string | undefined;
	borderBottom: string | undefined;
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
