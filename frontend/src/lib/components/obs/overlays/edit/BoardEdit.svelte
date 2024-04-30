<script lang="ts">
	import { page } from '$app/stores';
	import {
		currentOverlayEditor,
		electronEmitter,
		overlays,
		statsScene,
	} from '$lib/utils/store.svelte';
	// @ts-ignore
	import Grid from 'svelte-grid';
	import GridContent from '$lib/components/obs/overlays/GridContent.svelte';
	import type { GridContentItem, Overlay } from '$lib/models/types/overlay';
	import { COL, ROW } from '$lib/models/const';
	import BoardContainer from '../BoardContainer.svelte';
	import { addFont } from '../CustomFontHandler.svelte';
	import { asyncForEach } from '$lib/utils/helper';
	import { notifyDisabledScene } from './OverlayHandler.svelte';
	import BoardGrid from './BoardGrid.svelte';

	const overlayId = $page.params.overlay;

	export let borderHeight: number | undefined = undefined;
	export let selectedItemId: string | undefined = undefined;

	let curOverlay =
		$overlays?.find((overlay: Overlay) => overlay.id === overlayId) ?? ({} as Overlay);
	let items: GridContentItem[] = [];
	let tempItems: GridContentItem[] | undefined = undefined;

	function updateScene() {
		items
			.map((item: any) => item[COL])
			.filter((item: any) => item.y + item.h > ROW + 1)
			.forEach((item: any) => {
				item.h = ROW - item.y;
			});
		items = items.filter((item: any) => item[COL].y < ROW + 1);
		tempItems = items;
	}

	function updateLiveScene() {
		if ($currentOverlayEditor?.layerIndex === undefined) return;
		curOverlay = $overlays?.find((overlay) => overlay.id === overlayId) ?? ({} as Overlay);
		items = curOverlay[$statsScene]?.layers[$currentOverlayEditor?.layerIndex]?.items ?? [];
		items?.forEach((item: any) => {
			item[COL].draggable = true;
			item[COL].resizable = true;
		});
	}
	$: $statsScene || $currentOverlayEditor || $overlays, updateLiveScene();

	function updateOverlay() {
		console.log(curOverlay);
		if (
			!tempItems ||
			$currentOverlayEditor?.layerIndex === undefined ||
			curOverlay[$statsScene]?.layers[$currentOverlayEditor?.layerIndex].items == tempItems
		)
			return;

		curOverlay[$statsScene].layers[$currentOverlayEditor?.layerIndex].items = tempItems.reduce(
			(acc: GridContentItem[], item: GridContentItem) => {
				const exists = acc.some((existingItem) => existingItem.id === item.id);
				if (!exists) {
					acc.push(item);
				}
				return acc;
			},
			[],
		);

		$electronEmitter.emit('OverlayUpdate', curOverlay);
		tempItems = undefined;
		floatElements();
	}

	function fixElements() {
		items.forEach((item) => {
			item[COL].fixed = true;
		});
	}

	function floatElements() {
		items.forEach((item) => {
			item[COL].fixed = false;
		});
	}

	$: $statsScene, notifyDisabledScene(curOverlay, $statsScene);

	const updateFont = async () => {
		await addFont(curOverlay[$statsScene]?.font?.base64);
		await asyncForEach(items, async (item: GridContentItem) => {
			await addFont(item.data.font.base64, item.id);
		});
		await document.fonts.ready;
	};
	updateFont();

	let innerHeight: number;
	$: rowHeight =
		((borderHeight ?? 0) * (curOverlay.aspectRatio.width / curOverlay.aspectRatio.width) ??
			innerHeight) / ROW;
</script>

<svelte:window bind:innerHeight on:mousedown={fixElements} on:mouseup={updateOverlay} />

{#await updateFont() then}
	{#key $statsScene}
		{#key rowHeight}
			<div
				style={`font-family: ${curOverlay[$statsScene]?.font?.family};`}
				class="w-full h-full overflow-hidden relative"
			>
				<BoardGrid
					rows={curOverlay.aspectRatio.height * 2}
					cols={curOverlay.aspectRatio.width * 2}
				/>
				<BoardContainer bind:scene={curOverlay[$statsScene]} edit={true} />
				<div class="w-full h-full z-2 absolute">
					<Grid
						bind:items
						bind:rowHeight
						gap={[0, 0]}
						let:dataItem
						let:resizePointerDown
						cols={[[COL, COL]]}
						fastStart={true}
						on:change={updateScene}
						on:pointerup={(e) => {
							selectedItemId = undefined;
							setTimeout(() => (selectedItemId = e.detail.id), 20);
						}}
					>
						<div class="w-full h-full relative">
							<div
								class={`w-full h-full absolute ${
									selectedItemId === dataItem?.id ? 'outline outline-red-500' : ''
								}`}
							>
								<GridContent edit={true} {dataItem} />
							</div>
							<div
								class="bottom-0 right-0 w-[5%] h-[5%] max-w-[0.8em] max-h-[0.8em] absolute cursor-se-resize overflow-hidden z-5"
								on:pointerdown={resizePointerDown}
							/>
						</div>
					</Grid>
				</div>
			</div>
		{/key}
	{/key}
{/await}
