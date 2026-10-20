<script lang="ts">
	import type { GridContentItem } from '$lib/models/types/overlay';
	import AnimationLayer from './AnimationLayer.svelte';
	import { createAnimation } from './Animations.svelte';
	import { triggerAnimations } from '$lib/utils/elementTriggers';

	// One AnimationLayer per trigger animation of the element (animation 1 outermost), nested so they
	// can play at the same time; the element content sits in the innermost one.
	export let dataItem: GridContentItem;
	export let boardHeight: number;
	export let boardWidth: number;
	export let edit: boolean = false;
	export let isDemo: boolean = false;
	export let preview: boolean = false;
	export let overlayId: string | undefined = undefined;
	export let index: number = 0;

	$: animations = triggerAnimations(dataItem.data);
	$: trigger = animations[index];
	const animationIn = (node: Parameters<typeof createAnimation>[0]) => createAnimation(node, trigger.in, boardHeight, boardWidth, 0, dataItem);
	const animationOut = (node: Parameters<typeof createAnimation>[0]) => createAnimation(node, trigger.out, boardHeight, boardWidth, 0, dataItem);
</script>

{#if trigger}
	<AnimationLayer
		{trigger}
		{animationIn}
		{animationOut}
		{dataItem}
		{edit}
		{preview}
		{overlayId}
		{isDemo}
	>
		{#if index + 1 < animations.length}
			<svelte:self {dataItem} {boardHeight} {boardWidth} {edit} {isDemo} {preview} {overlayId} index={index + 1}><slot /></svelte:self>
		{:else}
			<slot />
		{/if}
	</AnimationLayer>
{:else}
	<slot />
{/if}
