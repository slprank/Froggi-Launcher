<script lang="ts" context="module">
	import { fly, blur, type EasingFunction, fade, scale, slide } from 'svelte/transition';
	import * as transitionFunctions from 'svelte/transition';
	import * as easingFunctions from 'svelte/easing';
	import type { AnimationSettings, AnimationOptions } from '$lib/models/types';
	import { Animation } from '$lib/models/enum';
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';
	import type { AnimationConfig } from 'svelte/animate';

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

	const emptyAnimation = (node: any, delay: number): AnimationConfig => {
		// TODO: Optional start value
		return fly(node, { delay: delay, duration: 0 });
	};

	const getEasing = (easing: string): EasingFunction => {
		console.log('easing', easing);
		return easingFunctions[easing];
	};

	const getTransition = (
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
	): AnimationConfig => {
		console.log('animation', animation);

		const transition = getTransition(animation?.type);
		if (transition)
			return transition(node, {
				...animation?.options,
				x: getRelativePixelSize(animation?.options.x ?? 0, windowHeight, windowWidth),
				y: getRelativePixelSize(animation?.options.y ?? 0, windowHeight, windowWidth),
				delay: (animation?.options.delay ?? 0) + additionalDelay,
				easing: getEasing(animation?.options.easing ?? ''),
			});

		switch (animation?.type) {
			case Animation.FlyRandom:
				return animationFlyRandom(
					node,
					animation.options,
					additionalDelay,
					windowHeight,
					windowWidth,
				);
			default:
				return emptyAnimation(node, additionalDelay + 5);
		}
	};
</script>
