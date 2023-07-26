<script lang="ts">
	import {
		AnimationTrigger,
		ElementPauseOption,
		InGameState,
		Transition,
	} from '$lib/models/enum';
	import type { GridContentItem } from '$lib/models/types';
	import { fade, fly, scale, slide, blur } from 'svelte/transition';
	import { COL, ROW } from '$lib/models/const';
	import { gameState } from '$lib/utils/store.svelte';
	import AnimationLayer from './element/animations/AnimationLayer.svelte';
	import { CreateElementAnimation } from './element/animations/AnimationExport.svelte';
	import GridElements from '$lib/components/custom/GridElements.svelte';
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';

	export let additionalDelay: number = 0;
	export let boardHeight: number | undefined = undefined;
	export let boardWidth: number | undefined = undefined;
	export let dataItem: GridContentItem | undefined = undefined;
	export let demoItem: GridContentItem | undefined = undefined;
	export let duration: number = 250;
	export let edit: boolean = false;
	export let preview: boolean = false;
	export let selectedId: string | undefined = undefined;
	export let transition: Transition = Transition.None;

	function updateDemoData() {
		if (demoItem) dataItem = demoItem;
	}

	$: demoItem, updateDemoData();
	$: isTriggerVisible = dataItem?.data.animation.trigger === AnimationTrigger.Visibility;

	const animation = (node: any, delay: number = 0) => {
		if (!dataItem) return;
		const y = getRelativePixelSize(
			((dataItem[COL]?.y + dataItem[COL]?.h / 2 - ROW / 2) / ROW) * 50,
			boardWidth ?? innerWidth,
			boardHeight ?? innerHeight,
		);
		const x = getRelativePixelSize(
			((dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) / COL) * 50,
			boardWidth ?? innerWidth,
			boardHeight ?? innerHeight,
		);
		switch (transition) {
			case Transition.None:
				return;
			case Transition.Fade:
				return fade(node, { duration: duration, delay: delay });
			case Transition.Fly:
				return fly(node, { duration: duration, x: x, y: y, delay: delay });
			case Transition.Scale:
				return scale(node, { duration: duration, delay: delay });
			case Transition.Slide:
				return slide(node, { duration: duration, delay: delay });
			case Transition.Blur:
				return blur(node, { duration: duration, delay: delay });
		}
	};

	const animateIn = (node: Element) => {
		if (edit || !dataItem || isTriggerVisible) return;
		const delay =
			dataItem[COL]?.y +
				Math.abs(dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) +
				additionalDelay ?? 0;
		return animation(node, delay);
	};

	const animateOut = (node: Element) => {
		if (edit || !dataItem || isTriggerVisible) return;
		return animation(node);
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

{#if dataItem && display}
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
							CreateElementAnimation(
								node,
								dataItem?.data.animation.in,
								boardHeight ?? innerHeight,
								boardWidth ?? innerWidth,
							)}
						animationOut={(node) =>
							CreateElementAnimation(
								node,
								dataItem?.data.animation.out,
								boardHeight ?? innerHeight,
								boardWidth ?? innerWidth,
							)}
						animationTrigger={dataItem.data.animation.trigger}
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
