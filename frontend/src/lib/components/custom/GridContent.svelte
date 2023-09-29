<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { Animation } from '$lib/models/enum';
	import type { GridContentItem, Scene } from '$lib/models/types';
	import { fly, type TransitionConfig } from 'svelte/transition';
	import { COL, ROW } from '$lib/models/const';
	import AnimationLayer from './element/animations/AnimationLayer.svelte';
	import { createAnimation } from './element/animations/Animations.svelte';
	import GridElements from '$lib/components/custom/GridElements.svelte';
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';
	import VisibilityAnimationLayer from './element/animations/VisibilityAnimationLayer.svelte';

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

	const flyAutomatic = (node: any, delay: number = 0, duration: number): TransitionConfig => {
		if (!dataItem) return fly(node, { duration: 0 });
		const y = getRelativePixelSize(
			((dataItem[COL]?.y + dataItem[COL]?.h / 2 - ROW / 2) / ROW) * 50,
			innerWidth,
			innerHeight,
		);
		const x = getRelativePixelSize(
			((dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) / COL) * 50,
			innerWidth,
			innerHeight,
		);
		return fly(node, { duration: duration, x: x, y: y, delay: delay });
	};

	const animateIn = (node: Element): TransitionConfig => {
		if (edit || !dataItem || !curScene) return fly(node, { duration: 0 });
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

	const animateOut = (node: Element): TransitionConfig => {
		if (edit || !curScene) return fly(node, { duration: 0 });
		if (curScene.animation.out.type === Animation.FlyAutomatic)
			return flyAutomatic(node, 0, curScene.animation.out.options.duration);
		return createAnimation(
			node,
			curScene.animation.out,
			boardHeight ?? innerHeight,
			boardWidth ?? innerWidth,
		);
	};

	$: strokeSize = getRelativePixelSize(1, innerHeight, innerWidth);
	$: stroke = `-webkit-text-stroke-width: ${strokeSize}px;
						-webkit-text-stroke-color: white;`;

	let div: HTMLElement;
	$: boardWidth = div?.clientWidth ?? 0;
	$: boardHeight = div?.clientHeight ?? 0;
</script>

<svelte:window />

{#if dataItem}
	<div class="h-full w-full" bind:this={div}>
		{#if div}
			<div
				style={`${dataItem?.data.advancedStyling ? dataItem?.data.css.customParent : ''};`}
				class={`h-full w-full ${edit ? 'bg-white' : 'text-white'} ${
					selectedId && selectedId === dataItem?.id ? 'outline outline-red-500' : ''
				} bg-opacity-50`}
			>
				{#if edit}
					<GridElements {dataItem} {edit} />
					<h1
						class="text-black text-lg"
						style={`filter: drop-shadow(1.2px 1.2px 0.8px white `}
					>
						{CustomElement[dataItem?.elementId] ?? ''}
					</h1>
				{:else}
					<div class="w-full h-full" in:animateIn out:animateOut>
						<VisibilityAnimationLayer
							animationIn={(node) =>
								createAnimation(
									node,
									dataItem?.data.visibility.in,
									boardHeight,
									boardWidth,
								)}
							animationOut={(node) =>
								createAnimation(
									node,
									dataItem?.data.visibility.out,
									boardHeight,
									boardWidth,
									20,
								)}
							{dataItem}
							{edit}
							{preview}
						>
							<AnimationLayer
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
