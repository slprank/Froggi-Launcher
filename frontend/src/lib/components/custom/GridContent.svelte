<script lang="ts">
	import { AnimationTrigger, ElementPauseOption, InGameState, Animation } from '$lib/models/enum';
	import type { GridContentItem, Scene } from '$lib/models/types';
	import { fade, fly, scale, slide, blur } from 'svelte/transition';
	import { COL, ROW, SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { gameState } from '$lib/utils/store.svelte';
	import AnimationLayer from './element/animations/AnimationLayer.svelte';
	import { createAnimation } from './element/animations/AnimationExport.svelte';
	import GridElements from '$lib/components/custom/GridElements.svelte';

	export let additionalDelay: number = 0;
	export let boardHeight: number | undefined = undefined;
	export let boardWidth: number | undefined = undefined;
	export let curScene: Scene | undefined = undefined;
	export let dataItem: GridContentItem | undefined = undefined;
	export let demoItem: GridContentItem | undefined = undefined;
	export let edit: boolean = false;
	export let preview: boolean = false;
	export let selectedId: string | undefined = undefined;

	function updateDemoData() {
		if (demoItem) dataItem = demoItem;
	}

	$: demoItem, updateDemoData();
	$: isTriggerVisible = dataItem?.data.animation.trigger === AnimationTrigger.Visibility;

	const animateIn = (node: Element) => {
		if (edit || !dataItem || isTriggerVisible || !curScene) return;
		const delay =
			dataItem[COL]?.y +
				Math.abs(dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) +
				additionalDelay ?? 0;
		console.log('animate in');
		return createAnimation(
			node,
			curScene.animation.in,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
			delay,
		);
	};

	const animateOut = (node: Element) => {
		if (edit || isTriggerVisible || !curScene) return;
		return createAnimation(
			node,
			curScene.animation.out,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
		);
	};

	$: isGameRunning = $gameState === InGameState.Running;
	$: isGamePaused = $gameState === InGameState.Paused;

	$: display =
		edit ||
		preview ||
		dataItem?.data.pauseOption === ElementPauseOption.Always ||
		(isGameRunning && dataItem?.data.pauseOption === ElementPauseOption.OnlyActive) ||
		(isGamePaused && dataItem?.data.pauseOption === ElementPauseOption.OnlyPaused);

	let innerWidth = 0;
	let innerHeight = 0;
</script>

<svelte:window bind:innerHeight bind:innerWidth />

{#if dataItem}
	<div class="h-full w-full relative">
		<div
			style={`${dataItem?.data.advancedStyling ? dataItem?.data.css.customParent : ''};`}
			class={`absolute h-full w-full ${edit ? 'bg-white' : 'text-white'} ${
				selectedId && selectedId === dataItem?.id ? 'outline outline-red-500' : ''
			} bg-opacity-50`}
		>
			{#if edit}
				<GridElements {dataItem} {edit} />
			{:else}
				<div class="w-full h-full" in:animateIn out:animateOut>
					<AnimationLayer
						animationIn={(node) =>
							createAnimation(
								node,
								dataItem?.data.animation.in,
								boardHeight ?? innerHeight,
								boardWidth ?? innerWidth,
							)}
						animationOut={(node) =>
							createAnimation(
								node,
								dataItem?.data.animation.out,
								boardHeight ?? innerHeight,
								boardWidth ?? innerWidth,
							)}
						animationTrigger={dataItem.data.animation.trigger}
						{display}
						{edit}
					>
						<GridElements {dataItem} {preview} bind:boardHeight bind:boardWidth />
					</AnimationLayer>
				</div>
			{/if}
		</div>
		{#if edit}
			<div class="h-full w-full absolute">
				<h1 class="top-0 left-0 absolute">{dataItem.data.description ?? ''}</h1>
			</div>
		{/if}
	</div>
{/if}
