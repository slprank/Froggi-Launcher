<script lang="ts" context="module">
	import { fly, blur, type EasingFunction, fade, scale, slide } from 'svelte/transition';
	import {
		sineOut,
		bounceIn,
		bounceOut,
		bounceInOut,
		backInOut,
		elasticOut,
		elasticIn,
		elasticInOut,
	} from 'svelte/easing';
	import type { AnimationSettings, AnimationOptions } from '$lib/models/types';
	import { Animation, Easing } from '$lib/models/enum';
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';

	const animationFlyRandom = (
		node: any,
		option: AnimationOptions | any,
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
			delay: option.delay,
			duration: option.duration,
			y: y,
			x: x,
			easing: getEasing(option.easing),
		});
	};
	const animationBlur = (node: any, option: AnimationOptions | any) => {
		return blur(node, {
			delay: option.delay,
			duration: option.duration,
		});
	};
	const animationFade = (node: any, option: AnimationOptions | any) => {
		return fade(node, {
			delay: option.delay,
			duration: option.duration,
			easing: getEasing(option.easing),
		});
	};
	const animationFly = (
		node: any,
		option: AnimationOptions | any,
		windowHeight: number,
		windowWidth: number,
	) => {
		return fly(node, {
			delay: option.delay,
			duration: option.duration,
			y: getRelativePixelSize(option.y, windowHeight, windowWidth),
			x: getRelativePixelSize(option.x, windowHeight, windowWidth),
			easing: getEasing(option.easing),
		});
	};
	const animationScale = (node: any, option: AnimationOptions | any) => {
		// TODO: Optional start value
		return {
			delay: option.delay,
			duration: option.duration,
			css: (t) => {
				const eased = getEasing(option.easing)(t);
				return `opacity: ${eased}; transform: scale(${eased})`;
			},
		};
	};
	const animationSlide = (node: any, option: AnimationOptions | any) => {
		// TODO: Optional start value
		return slide(node, {
			delay: option.delay,
			duration: option.duration,
			easing: getEasing(option.easing),
		});
	};

	const getEasing = (easing: Easing): EasingFunction => {
		switch (easing) {
			case Easing.BackInOut:
				return backInOut;
			case Easing.BounceIn:
				return bounceIn;
			case Easing.BounceInOut:
				return bounceInOut;
			case Easing.BounceOut:
				return bounceOut;
			case Easing.ElasticInOut:
				return elasticInOut;
			case Easing.ElasticIn:
				return elasticIn;
			case Easing.ElasticOut:
				return elasticOut;
			case Easing.SineOut:
				return sineOut;
			default:
				return elasticOut;
		}
	};

	export const createElementAnimation = (
		node: any,
		animation: AnimationSettings | undefined,
		windowHeight: number,
		windowWidth: number,
	) => {
		console.log('window', windowHeight, windowWidth);
		switch (animation?.type) {
			case Animation.Blur:
				return animationBlur(node, animation.options);
			case Animation.Fade:
				return animationFade(node, animation.options);
			case Animation.Fly:
				return animationFly(node, animation.options, windowHeight, windowWidth);
			case Animation.Scale:
				return animationScale(node, animation.options);
			case Animation.FlyRandom:
				return animationFlyRandom(node, animation.options, windowHeight, windowWidth);
			case Animation.Slide:
				return animationSlide(node, animation.options);
			default:
				return undefined;
		}
	};
</script>
