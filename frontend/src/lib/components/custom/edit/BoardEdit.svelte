<script lang="ts">
	import { page } from '$app/stores';
	import { electronEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	// @ts-ignore
	import Grid from 'svelte-grid';
	import GridContent from '$lib/components/custom/GridContent.svelte';
	import type { GridContentItem, Overlay } from '$lib/models/types/overlay';
	import { COL, ROW } from '$lib/models/const';
	import BoardContainer from '../BoardContainer.svelte';
	import { addFont } from '../CustomFontHandler.svelte';
	import { asyncForEach } from '$lib/utils/helper';
	import { notifyDisabledScene } from './OverlayHandler.svelte';

	const overlayId = $page.params.overlay;

	export let boardHeight: number | undefined;
	export let layer: number | undefined = undefined;
	export let selectedId: string | undefined = undefined;

	let curOverlay =
		$obs?.overlays?.find((overlay: Overlay) => overlay.id === overlayId) ?? ({} as Overlay);
	let items: GridContentItem[] = [];
	let tempItems: any = undefined;

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
		if (layer === undefined) return;
		curOverlay = $obs?.overlays?.find((overlay) => overlay.id === overlayId) ?? ({} as Overlay);
		items = curOverlay[$statsScene]?.layers[layer]?.items ?? [];
		items?.forEach((item: any) => {
			item[COL].draggable = true;
			item[COL].resizable = true;
		});
	}
	$: $statsScene || layer || $obs, updateLiveScene();

	function updateOverlay() {
		if (
			!tempItems ||
			layer === undefined ||
			curOverlay[$statsScene]?.layers[layer].items == tempItems
		)
			return;
		curOverlay[$statsScene].layers[layer].items = tempItems;

		$electronEmitter.emit('ObsCustomOverlayUpdate', curOverlay);
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
	$: rowHeight = (boardHeight ?? innerHeight) / ROW;
</script>

<svelte:window bind:innerHeight on:mousedown={fixElements} on:mouseup={updateOverlay} />

{#await updateFont() then}
	{#key $statsScene}
		{#key rowHeight}
			<div
				style={`font-family: ${curOverlay[$statsScene]?.font?.family};`}
				class="w-full h-full overflow-hidden relative"
			>
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
							selectedId = undefined;
							setTimeout(() => (selectedId = e.detail.id), 20);
						}}
					>
						<div class="w-full h-full relative">
							<div class="w-full h-full absolute">
								<GridContent edit={true} {dataItem} bind:selectedId />
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
