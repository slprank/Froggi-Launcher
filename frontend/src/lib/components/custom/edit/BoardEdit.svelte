<script lang="ts">
	import { page } from '$app/stores';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from '$lib/components/custom/GridContent.svelte';
	import type { Overlay } from '$lib/types/types';
	import { COL, ROW } from '$lib/types/const';
	import BoardContainer from '../BoardContainer.svelte';
	import { notifications } from '$lib/components/notification/Notifications.svelte';

	const overlayId = $page.params.overlay;

	export let boardHeight: number | undefined = undefined;
	export let layer: number | undefined = undefined;
	export let selectedId: string | undefined = undefined;

	let curOverlay =
		$obs?.overlays?.find((overlay: Overlay) => overlay.id === overlayId) ?? ({} as Overlay);
	let items: any[] = [];
	let tempItems: any = undefined;

	$: items?.forEach((item: any) => {
		item[COL].draggable = true;
		item[COL].resizable = true;
	});

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
		items = curOverlay[$statsScene].layers[layer] ?? [];
		items?.forEach((item: any) => {
			item[COL].draggable = true;
			item[COL].resizable = true;
		});
	}
	$: $statsScene || layer || $obs, updateLiveScene();

	function updateOverlay() {
		if (!tempItems || layer === undefined || curOverlay[$statsScene].layers[layer] == tempItems)
			return;
		curOverlay[$statsScene].layers[layer] = tempItems;

		$eventEmitter.emit('electron', 'update-custom-overlay', curOverlay);
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

	function notifyDisabledScene() {
		if (curOverlay.activeScenes.includes($statsScene)) return;
		notifications.warning('Selected scene is disabled', 5000);
	}
	$: $statsScene, notifyDisabledScene();

	let innerHeight: number;
</script>

<svelte:window bind:innerHeight on:mousedown={fixElements} on:mouseup={updateOverlay} />

{#key boardHeight}
	{#key $statsScene}
		<div class="w-full h-full overflow-hidden relative">
			<BoardContainer bind:scene={curOverlay[$statsScene]} />
			<div class="w-full h-full z-2 absolute">
				<Grid
					bind:items
					rowHeight={(boardHeight ?? innerHeight) / ROW}
					gap={[0, 0]}
					let:dataItem
					cols={[[COL, COL]]}
					fastStart={true}
					on:change={updateScene}
					on:pointerup={(e) => {
						selectedId = undefined;
						setTimeout(() => (selectedId = e.detail.id), 20);
					}}
				>
					<GridContent edit={true} {dataItem} bind:selectedId />
				</Grid>
			</div>
		</div>
	{/key}
{/key}
