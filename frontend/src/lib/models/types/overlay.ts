import type { Animation, AutoUpdaterStatus, LiveStatsScene, SceneBackground } from '../enum';
import type { COL } from '../const';
import type { CustomElement } from '../constants/customElement';
import type { SelectedAnimationTriggerOption, SelectedVisibilityOption } from './animationOption';

export interface AutoUpdater {
	progress: number | undefined;
	status: AutoUpdaterStatus;
	version: string | undefined;
}

export interface Animations {
	in: AnimationSettings
	out: AnimationSettings
}

export interface AnimationSettings {
	type: Animation;
	options: AnimationOptions;
}

export interface AnimationOptions {
	delay: number;
	duration: number;
	easing: string;
	start: number;
	x: number;
	y: number;
}

export interface AspectRatio {
	width: number;
	height: number;
}

export interface Background {
	animation: Animations
	color: string | undefined;
	customImage: Image;
	image: Image;
	opacity: number;
	type: SceneBackground;
}

export interface Class {
	rounded: string | undefined;
	alignment: string | undefined;
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
	opacity: number;
	rotate: string | undefined;
	scale: string | undefined;
}

export interface CssTransform {
	translate: Position
}

export interface ElementPayload {
	advancedStyling: boolean;
	animationTrigger: TriggerAnimation;
	class: Class;
	css: Css;
	description: string;
	font: Font
	image: Image;
	percent: Percent
	shadow: Shadow;
	string: string | undefined;
	stroke: Stroke;
	transform: CssTransform;
	visibility: VisibilityAnimations;
}

export interface Font {
	family: string | undefined;
	base64: string | undefined;
}

export interface GridContentItem {
	[COL]: GridContentItemConfig;
	elementId: CustomElement;
	data: ElementPayload;
	id: string;
}

export interface GridContentItemConfig {
	customDragger: boolean;
	customResizer: boolean;
	draggable: boolean;
	fixed: boolean;
	resizable: boolean;
	max: {
		y: number; h: number;
	};
	min: {
		w: number; h: number;
	};
	id: string;
	h: number;
	w: number;
	x: number;
	y: number;
}

export interface GridContentItemStyle {
	cssValue: string;
	classValue: string;
	shadow: string;
	stroke: string;
	transform: string;
}

export interface Image {
	name: string | undefined;
	src: string | undefined;
	objectFit: string | undefined;
}

export interface Layer {
	items: GridContentItem[]
	id: string;
	preview: boolean;
}

export interface OverlayEditor {
	layerIndex: number | undefined;
	itemId: string | undefined;
}

export interface OverlayLayout {
	overlays: Overlay[]
	current: OverlayEditor
}

export interface Overlay {
	aspectRatio: AspectRatio;
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

export interface Percent {
	startColor: string;
	endColor: string;
}

export interface Position {
	x: number | null;
	y: number | null;
}


export interface VisibilityAnimations {
	in: AnimationSettings
	out: AnimationSettings
	selectedOptions: SelectedVisibilityOption[]
}

export interface TriggerAnimation {
	in: AnimationSettings
	out: AnimationSettings
	selectedOptions: SelectedAnimationTriggerOption
}

export interface SceneAnimation extends Animations {
	duration: number;
	layerRenderDelay: number;
}


export interface Scene {
	active: boolean;
	animation: SceneAnimation;
	background: Background;
	fallback: LiveStatsScene;
	font: Font;
	layers: Layer[];
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

export interface Url {
	external: string;
	local: string;
}
