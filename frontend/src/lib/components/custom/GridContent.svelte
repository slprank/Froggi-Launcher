<script lang="ts">
	import { AnimationTrigger, ElementPauseOption, InGameState, Animation } from '$lib/models/enum';
	import type { GridContentItem, Scene } from '$lib/models/types';
	import { fly } from 'svelte/transition';
	import { COL, ROW } from '$lib/models/const';
	import { gameFrame, gameState, isElectron } from '$lib/utils/store.svelte';
	import AnimationLayer from './element/animations/AnimationLayer.svelte';
	import { createAnimation } from './element/animations/Animations.svelte';
	import GridElements from '$lib/components/custom/GridElements.svelte';
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';

	export let additionalDelay: number = 0;
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

	const flyAutomatic = (node: any, delay: number = 0, duration: number) => {
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
		return fly(node, { duration: duration, x: x, y: y, delay: delay });
	};

	const animateIn = (node: Element) => {
		if (edit || !dataItem || !curScene) return;
		const delay =
			dataItem[COL]?.y +
				Math.abs(dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) +
				additionalDelay ?? 0;
		if (curScene.animation.in.type === Animation.FlyAutomatic)
			return flyAutomatic(node, delay, curScene.animation.in.options.duration);
		return createAnimation(
			node,
			curScene.animation.in,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
			delay,
		);
	};

	const animateOut = (node: Element) => {
		if (edit || !curScene) return;
		if (curScene.animation.out.type === Animation.FlyAutomatic)
			return flyAutomatic(node, 0, curScene.animation.out.options.duration);
		return createAnimation(
			node,
			curScene.animation.out,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
		);
	};

	let key: any = undefined;
	const updateKeyValue = () => {
		if (!dataItem) return;
		switch (dataItem.data.animation.trigger) {
			case AnimationTrigger.Player1Percent:
				key = $gameFrame?.players[0]?.pre.percent;
				return;
			case AnimationTrigger.Player2Percent:
				key = $gameFrame?.players[1]?.pre.percent;
				return;
			case AnimationTrigger.Player1StockLost:
				key = $gameFrame?.players[0]?.post.stocksRemaining;
				return;
			case AnimationTrigger.Player2StockLost:
				key = $gameFrame?.players[1]?.post.stocksRemaining;
				return;
		}
	};
	$: $gameFrame, updateKeyValue();

	$: isGameRunning = $gameState === InGameState.Running;
	$: isGamePaused = $gameState === InGameState.Paused;

	$: display =
		edit ||
		preview ||
		dataItem?.data.pauseOption === ElementPauseOption.Always ||
		(isGameRunning && dataItem?.data.pauseOption === ElementPauseOption.OnlyActive) ||
		(isGamePaused && dataItem?.data.pauseOption === ElementPauseOption.OnlyPaused);

	let div: HTMLElement;
	$: boardWidth = div?.clientWidth ?? 0;
	$: boardHeight = div?.clientHeight ?? 0;
</script>

<svelte:window />

{#if dataItem}
	<div class="h-full w-full relative" bind:this={div}>
		{#if div}
			<div
				style={`${dataItem?.data.advancedStyling ? dataItem?.data.css.customParent : ''};`}
				class={`h-full w-full ${edit ? 'bg-white' : 'text-white'} ${
					selectedId && selectedId === dataItem?.id ? 'outline outline-red-500' : ''
				} bg-opacity-50`}
			>
				{#if edit}
					<GridElements {dataItem} {edit} />
					<h1 class="top-0 left-0 absolute">{dataItem.data.description ?? ''}</h1>
				{:else}
					<div class="w-full h-full relative" in:animateIn out:animateOut>
						<AnimationLayer
							animationTrigger={dataItem.data.animation.trigger}
							animationIn={(node) =>
								createAnimation(
									node,
									dataItem?.data.animation.in,
									boardHeight,
									boardWidth,
								)}
							animationOut={(node) =>
								createAnimation(
									node,
									dataItem?.data.animation.out,
									boardHeight,
									boardWidth,
								)}
							{display}
							{edit}
							bind:key
						>
							<GridElements {dataItem} {preview} />
						</AnimationLayer>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{/if}
