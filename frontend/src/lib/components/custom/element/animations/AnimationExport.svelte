<script lang="ts" context="module">
	import { flip } from 'svelte/animate';
	import { fly, type EasingFunction } from 'svelte/transition';
	import { sineOut, bounceIn, bounceOut, bounceInOut, backInOut } from 'svelte/easing';
	import type { ElementAnimation } from '$lib/models/types';
	import { Animation, Easing } from '$lib/models/enum';

	const PercentShake = (node: any, options: ElementAnimation | any) => {
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

	const getEasing = (easing: Easing): EasingFunction | undefined => {
		switch (easing) {
			case Easing.None:
				return undefined;
			case Easing.BackInOut:
				return backInOut;
		}
	};

	export const CreateElementAnimation = (node: any, elementAnimation: ElementAnimation) => {
		switch (elementAnimation.animationType) {
			case Animation.Shake:
				return PercentShake(node, elementAnimation.options);
			default:
				return undefined;
		}
	};
</script>
