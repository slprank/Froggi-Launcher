<script lang="ts" context="module">
	import { flip } from 'svelte/animate';
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
	import type { ElementAnimation, ElementAnimationOptions } from '$lib/models/types';
	import { Animation, Easing } from '$lib/models/enum';

	const animationFlyRandom = (node: any, option: ElementAnimationOptions | any) => {
		const multiplierX = Math.random() < 0.5 ? -1 : 1;
		const multiplierY = Math.random() < 0.5 ? -1 : 1;
		const x = multiplierX * Math.floor(Math.random() * option.x);
		const y = multiplierY * Math.floor(Math.random() * option.y);
		return fly(node, {
			delay: option.delay,
			duration: option.duration,
			y: y,
			x: x,
			easing: getEasing(option.easing),
		});
	};
	const animationBlur = (node: any, option: ElementAnimationOptions | any) => {
		return blur(node, {
			delay: option.delay,
			duration: option.duration,
		});
	};
	const animationFade = (node: any, option: ElementAnimationOptions | any) => {
		return fade(node, {
			delay: option.delay,
			duration: option.duration,
			easing: getEasing(option.easing),
		});
	};
	const animationFly = (node: any, option: ElementAnimationOptions | any) => {
		return fly(node, {
			delay: option.delay,
			duration: option.duration,
			y: option.y,
			x: option.x,
			easing: getEasing(option.easing),
		});
	};
	const animationScale = (node: any, option: ElementAnimationOptions | any) => {
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
	const animationSlide = (node: any, option: ElementAnimationOptions | any) => {
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

	export const CreateElementAnimation = (
		node: any,
		elementAnimation: ElementAnimation | undefined,
	) => {
		switch (elementAnimation?.animationType) {
			case Animation.Blur:
				return animationBlur(node, elementAnimation.options);
			case Animation.Fade:
				return animationFade(node, elementAnimation.options);
			case Animation.Fly:
				return animationFly(node, elementAnimation.options);
			case Animation.Scale:
				return animationScale(node, elementAnimation.options);
			case Animation.FlyRandom:
				return animationFlyRandom(node, elementAnimation.options);
			case Animation.Slide:
				return animationSlide(node, elementAnimation.options);
			default:
				return undefined;
		}
	};
</script>
