<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, Scene } from '$lib/models/types/overlay';
	import { fly, type TransitionConfig } from 'svelte/transition';
	import { COL } from '$lib/models/const';
	import AnimationLayer from './element/animations/AnimationLayer.svelte';
	import { createAnimation } from './element/animations/Animations.svelte';
	import GridElements from '$lib/components/obs/overlays/GridElements.svelte';
	import VisibilityAnimationLayer from './element/animations/VisibilityAnimationLayer.svelte';

	export let additionalDelay: number = 0;
	export let curScene: Scene | undefined = undefined;
	export let dataItem: GridContentItem | undefined = undefined;
	export let demoItem: GridContentItem | undefined = undefined;
	export let edit: boolean = false;
	export let preview: boolean = false;

	function updateDemoData() {
		if (demoItem) dataItem = demoItem;
	}
	$: demoItem, updateDemoData();

	const animateIn = (node: Element): TransitionConfig => {
		if (edit || !dataItem || !curScene) return fly(node, { duration: 0 });
		const delay =
			dataItem[COL]?.y +
			Math.abs(dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) +
			(additionalDelay ?? 0);
		return createAnimation(
			node,
			curScene.animation.in,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
			delay,
			dataItem,
		);
	};

	const animateOut = (node: Element): TransitionConfig => {
		if (edit || !curScene) return fly(node, { duration: 0 });
		return createAnimation(
			node,
			curScene.animation.out,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
			0,
			dataItem,
		);
	};

	let div: HTMLElement | undefined;
	let parent: HTMLElement | undefined;
	$: boardWidth = div?.clientWidth ?? 0;
	$: boardHeight = div?.clientHeight ?? 0;
</script>

<svelte:window />

{#if dataItem}
	<div class="h-full w-full" bind:this={div}>
		{#if div}
			<div
				style={`${dataItem?.data.advancedStyling ? dataItem?.data.css.customParent : ''};`}
				class={`h-full w-full ${edit ? 'bg-white' : 'text-white'} bg-opacity-50 relative`}
			>
				{#if edit}
					<GridElements {dataItem} {edit} />
					<h1
						class="text-white text-sm absolute top-0 left-0"
						style={`filter: drop-shadow(1.2px 1.2px 0.8px black `}
					>
						{CustomElement[dataItem?.elementId] ?? ''}
					</h1>
				{:else}
					<div class="w-full h-full" in:animateIn out:animateOut bind:this={parent}>
						<VisibilityAnimationLayer
							animationIn={(node) =>
								createAnimation(
									node,
									dataItem?.data.visibility.in,
									parent?.clientHeight ?? 0,
									parent?.clientWidth ?? 0,
									0,
									dataItem,
								)}
							animationOut={(node) =>
								createAnimation(
									node,
									dataItem?.data.visibility.out,
									parent?.clientHeight ?? 0,
									parent?.clientWidth ?? 0,
									0,
									dataItem,
								)}
							{dataItem}
							{edit}
							{preview}
						>
							<AnimationLayer
								animationIn={(node) =>
									createAnimation(
										node,
										dataItem?.data.animationTrigger.in,
										boardHeight,
										boardWidth,
										0,
										dataItem,
									)}
								animationOut={(node) =>
									createAnimation(
										node,
										dataItem?.data.animationTrigger.out,
										boardHeight,
										boardWidth,
										0,
										dataItem,
									)}
								{dataItem}
								{edit}
							>
								<GridElements {dataItem} {preview} />
							</AnimationLayer>
						</VisibilityAnimationLayer>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}
