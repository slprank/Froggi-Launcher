<script lang="ts">
	import AnimationLayer from '$lib/components/custom/element/AnimationLayer.svelte';
	import { backInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let animationType: Animation;
	export let edit: boolean = false;
	export let key: any | undefined = undefined;
</script>

<AnimationLayer
	{key}
	enableTransition={edit}
	animationIn={(node) =>
		fly(node, {
			duration: 20,
			delay: 71,
			easing: backInOut,
		})}
	animationOut={(node) => {
		const multiplierX = Math.random() < 0.5 ? -1 : 1;
		const multiplierY = Math.random() < 0.5 ? -1 : 1;
		const x = multiplierX * Math.floor(Math.random() * 50);
		const y = multiplierY * Math.floor(Math.random() * 50);
		return fly(node, {
			duration: 70,
			y: y,
			x: x,
			easing: backInOut,
		});
	}}
>
	<slot />
</AnimationLayer>
