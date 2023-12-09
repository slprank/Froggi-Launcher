<script lang="ts" context="module">
	import { fly, type EasingFunction } from 'svelte/transition';
	import * as transitionFunctions from 'svelte/transition';
	import * as easingFunctions from 'svelte/easing';
	import type {
		AnimationSettings,
		AnimationOptions,
		GridContentItem,
	} from '$lib/models/types/overlay';
	import { Animation } from '$lib/models/enum';
	import { getRelativePixelSize } from '$lib/utils/helper';
	import type { AnimationConfig } from 'svelte/animate';
	import { COL, ROW } from '$lib/models/const';

	const animationFlyRandom = (
		node: any,
		option: AnimationOptions | any,
		additionalDelay = 0,
		windowHeight: number,
		windowWidth: number,
	) => {
		const multiplierX = Math.random() < 0.5 ? -1 : 1;
		const multiplierY = Math.random() < 0.5 ? -1 : 1;
		const x = getRelativePixelSize(
			multiplierX * Math.floor(Math.random() * option.x),
			windowWidth,
			windowHeight,
		);
		const y = getRelativePixelSize(
			multiplierY * Math.floor(Math.random() * option.x),
			windowWidth,
			windowHeight,
		);
		return fly(node, {
			delay: option.delay + additionalDelay,
			duration: option.duration,
			y: y,
			x: x,
			easing: getEasing(option.easing),
		});
	};

	const animationFlyAutomatic = (
		node: Element,
		option: AnimationOptions | any,
		additionalDelay: number,
		dataItem: GridContentItem | undefined,
	): transitionFunctions.TransitionConfig => {
		if (!dataItem) return fly(node, { duration: 0 });
		const delay =
			dataItem[COL]?.y +
				option.delay +
				Math.abs(dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) +
				additionalDelay ?? 0;
		const y = getRelativePixelSize(
			((dataItem[COL]?.y + dataItem[COL]?.h / 2 - ROW / 2) / ROW) * 50,
			innerWidth,
			innerHeight,
		);
		const x = getRelativePixelSize(
			((dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) / COL) * 50,
			innerWidth,
			innerHeight,
		);
		return fly(node, { duration: option.duration, x: x, y: y, delay: delay });
	};

	function roundaboutTransform(
		t: number,
		startAngle: number,
		angleIncrement: number,
		radius: number,
		rotation: number,
		windowWidth: number,
		windowHeight: number,
	) {
		const currentAngle = startAngle + angleIncrement * t;
		const distance = t < 0.5 ? t * radius * 2 : (1 - t) * radius * 2;
		const x = Math.cos(currentAngle + rotation) * distance;
		const y = Math.sin(currentAngle + rotation) * distance;

		return `translate(${getRelativePixelSize(
			x,
			windowHeight,
			windowWidth,
		)}px, ${getRelativePixelSize(y, windowHeight, windowWidth)}px)`;
	}

	function animationRoundabout(
		node: Element,
		option: AnimationOptions | any,
		windowHeight: number,
		windowWidth: number,
	) {
		const startAngle = Math.random() * 2 * Math.PI; // Random starting angle
		const radius = Math.min(windowWidth, windowHeight) / 4; // Adjust the radius as needed
		const angleIncrement = (2 * Math.PI) / 100; // Number of steps for a full circle
		const multiplier = Math.random() < 0.5 ? -1 : 1;

		return {
			delay: option.delay,
			duration: option.duration,
			easing: getEasing(option.easing),
			css: (t) => {
				const transformed = roundaboutTransform(
					t,
					startAngle,
					angleIncrement,
					radius,
					multiplier * t,
					windowWidth,
					windowHeight,
				);
				return `transform: ${transformed};`;
			},
		};
	}

	const emptyAnimation = (node: Element, delay: number): AnimationConfig => {
		return fly(node, { delay: delay, duration: 0 });
	};

	const getEasing = (easing: string): EasingFunction => {
		return easingFunctions[easing];
	};

	const getTransition = (
		transitionName: string | Animation | undefined,
	): transitionFunctions.TransitionConfig | undefined => {
		if (!transitionName) return;
		return transitionFunctions[transitionName];
	};

	export const createAnimation = (
		node: Element,
		animation: AnimationSettings | undefined,
		height: number,
		width: number,
		additionalDelay: number = 0,
		dataItem: GridContentItem | undefined = undefined,
	): AnimationConfig => {
		const transition = getTransition(animation?.type);
		if (transition)
			return transition(node, {
				...animation?.options,
				x: getRelativePixelSize(animation?.options.x ?? 0, height, width),
				y: getRelativePixelSize(animation?.options.y ?? 0, height, width),
				scale: 0,
				delay: (animation?.options.delay ?? 0) + additionalDelay,
				easing: getEasing(animation?.options.easing ?? ''),
			});

		// Custom Transitions

		switch (animation?.type) {
			case Animation.FlyRandom:
				return animationFlyRandom(node, animation.options, additionalDelay, height, width);

			case Animation.FlyAutomatic:
				return animationFlyAutomatic(node, animation.options, additionalDelay, dataItem);

			case Animation.Percent:
				return animationRoundabout(node, animation.options, height, width);

			default:
				return emptyAnimation(node, animation?.options.delay ?? 0);
		}
	};
</script>
