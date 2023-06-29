<script lang="ts" context="module">
	import { flip } from 'svelte/animate';
	import { fly, blur, type EasingFunction, fade, scale, slide } from 'svelte/transition';
	import { sineOut, bounceIn, bounceOut, bounceInOut, backInOut } from 'svelte/easing';
	import type { ElementAnimation } from '$lib/models/types';
	import { Animation, Easing } from '$lib/models/enum';

	const animationFlyRandom = (node: any, options: ElementAnimation | any) => {
		const multiplierX = Math.random() < 0.5 ? -1 : 1;
		const multiplierY = Math.random() < 0.5 ? -1 : 1;
		const x = multiplierX * Math.floor(Math.random() * options.x);
		const y = multiplierY * Math.floor(Math.random() * options.y);
		return fly(node, {
			duration: options.duration,
			y: y,
			x: x,
			easing: getEasing(options.easing),
		});
	};
	const animationBlur = (node: any, options: ElementAnimation | any) => {
		return blur(node, {
			duration: options.duration,
			easing: getEasing(options.easing),
		});
	};
	const animationFade = (node: any, options: ElementAnimation | any) => {
		return fade(node, {
			duration: options.duration,
			easing: getEasing(options.easing),
		});
	};
	const animationFly = (node: any, options: ElementAnimation | any) => {
		return fly(node, {
			duration: options.duration,
			y: options.y,
			x: options.x,
			easing: getEasing(options.easing),
		});
	};
	const animationScale = (node: any, options: ElementAnimation | any) => {
		// TODO: Optional start value
		return scale(node, {
			duration: options.duration,
			easing: getEasing(options.easing),
		});
	};
	const animationSlide = (node: any, options: ElementAnimation | any) => {
		// TODO: Optional start value
		return slide(node, {
			duration: options.duration,
			easing: getEasing(options.easing),
		});
	};

	const getEasing = (easing: Easing): EasingFunction | undefined => {
		switch (easing) {
			case Easing.None:
				return undefined;
			case Easing.BackInOut:
				return backInOut;
			case Easing.BounceIn:
				return bounceIn;
			case Easing.BounceInOut:
				return bounceInOut;
			case Easing.BounceOut:
				return bounceOut;
			case Easing.SineOut:
				return sineOut;
		}
	};

	export const CreateElementAnimation = (node: any, elementAnimation: ElementAnimation) => {
		switch (elementAnimation.animationType) {
			case Animation.Blur:
				return animationBlur(node, elementAnimation.options);
			case Animation.Fade:
				return animationFade(node, elementAnimation.options);
			case Animation.Fly:
				return animationFly(node, elementAnimation.options);
			case Animation.Scale:
				return animationScale(node, elementAnimation.options);
			case Animation.Shake:
				return animationFlyRandom(node, elementAnimation.options);
			case Animation.Slide:
				return animationSlide(node, elementAnimation.options);
			default:
				return undefined;
		}
	};
</script>
