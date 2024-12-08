<script lang="ts">
	import { page } from '$app/stores';
	import SecondaryOverlay from '$lib/components/obs/overlays/SecondaryOverlay.svelte';
	import { getOverlayById } from '$lib/components/obs/overlays/edit/OverlayHandler.svelte';
	import { COL, ROW, SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { Layer, Overlay, Scene } from '$lib/models/types/overlay';
	import { overlays, statsScene } from '$lib/utils/store.svelte';
	import GridContent from '../GridContent.svelte';
	import Grid from 'svelte-grid';

	export let overlayId: string;
	export let layerId: string;
	let overlay: Overlay | undefined;
	let layer: Layer | undefined;
	let scene: Scene | undefined;
	let rowHeight: number;

	const getOverlay = async () => {
		overlay = await getOverlayById(overlayId);
		if (!overlay) return;
		layer = overlay[$statsScene].layers.filter((layer) => layerId === layer.id).at(0);
		scene = overlay[$statsScene];
	};
	$: layerId, $statsScene, $overlays, getOverlay();

	$: rowHeight =
		((windowHeight ?? 0) *
			((overlay?.aspectRatio.width ?? 16) / (overlay?.aspectRatio.width ?? 9))) /
		ROW;

	let windowWidth: number;
	let windowHeight: number;
</script>

{#if layer && scene}
	<div
		class="w-full h-full relative"
		bind:clientWidth={windowWidth}
		bind:clientHeight={windowHeight}
	>
		{#if windowHeight && rowHeight}
			<div class="w-full h-full absolute">
				<Grid
					items={layer.items}
					{rowHeight}
					gap={[0, 0]}
					let:dataItem
					cols={[[COL, COL]]}
					fastStart={true}
				>
					<GridContent preview={true} {dataItem} curScene={scene} />
				</Grid>
			</div>
			<div class="w-full h-full absolute" />
		{/if}
	</div>
{/if}
