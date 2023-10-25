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
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';
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
		node: any,
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

	const emptyAnimation = (node: any, delay: number): AnimationConfig => {
		return fly(node, { delay: delay, duration: 0 });
	};

	const getEasing = (easing: string): EasingFunction => {
		return easingFunctions[easing];
	};

	const getTransition: Function = (
		transitionName: string | Animation | undefined,
	): transitionFunctions.TransitionConfig | undefined => {
		if (!transitionName) return;
		return transitionFunctions[transitionName];
	};

	export const createAnimation = (
		node: any,
		animation: AnimationSettings | undefined,
		windowHeight: number,
		windowWidth: number,
		additionalDelay: number = 0,
		dataItem: GridContentItem | undefined = undefined,
	): AnimationConfig => {
		const transition = getTransition(animation?.type);
		if (transition)
			return transition(node, {
				...animation?.options,
				x: getRelativePixelSize(animation?.options.x ?? 0, windowHeight, windowWidth),
				y: getRelativePixelSize(animation?.options.y ?? 0, windowHeight, windowWidth),
				scale: 0,
				delay: (animation?.options.delay ?? 0) + additionalDelay,
				easing: getEasing(animation?.options.easing ?? ''),
			});

		// Custom Transitions
		switch (animation?.type) {
			case Animation.FlyRandom:
				return animationFlyRandom(
					node,
					animation.options,
					additionalDelay,
					windowHeight,
					windowWidth,
				);

			case Animation.FlyAutomatic:
				return animationFlyAutomatic(node, animation.options, additionalDelay, dataItem);

			default:
				return emptyAnimation(node, animation?.options.delay ?? 0);
		}
	};
</script>
