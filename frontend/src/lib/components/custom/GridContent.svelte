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
	import { gameState, isElectron } from '$lib/utils/store.svelte';
	import AnimationLayer from './element/animations/AnimationLayer.svelte';
	import { CreateElementAnimation } from './element/animations/AnimationExport.svelte';
	import GridElements from '$lib/components/custom/GridElements.svelte';

	export let additionalDelay: number = 0;
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
		const y = ((dataItem[COL]?.y + dataItem[COL]?.h / 2 - ROW / 2) / ROW) * 50;
		const x = ((dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) / COL) * 50;
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

		// Currently using max scene transition duration as addition delay
		// TODO: Get longest scene transition and apply that instead
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

	// TODO: Add remaining components
	// TODO: Add fallback to unknown player - img, name, etc
</script>

{#if dataItem && display}
	<div class="custom-font h-full w-full relative">
		<div
			style={`${dataItem?.data.advancedStyling ? dataItem?.data.css.customParent : ''};`}
			class={`custom-font absolute h-full w-full ${edit ? 'bg-white' : 'text-white'} ${
				selectedId && selectedId === dataItem?.id ? 'outline outline-red-500' : ''
			} bg-opacity-50`}
		>
			{#if edit}
				<GridElements {dataItem} {edit} />
			{:else}
				<div class="w-full h-full" in:animateIn out:animateOut>
					<AnimationLayer
						animationIn={(node) =>
							CreateElementAnimation(node, dataItem?.data.animation.in)}
						animationOut={(node) =>
							CreateElementAnimation(node, dataItem?.data.animation.out)}
						animationTrigger={dataItem.data.animation.trigger}
						{edit}
					>
						<GridElements {dataItem} {preview} />
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
