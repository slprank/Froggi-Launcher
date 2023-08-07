<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import type { Layer } from '$lib/models/types';
	import { obs, statsScene } from '$lib/utils/store.svelte';

	$: overlayId = $page.params.overlay;
	$: layerId = $page.params.layer;
	let layerIds: string[] = [];

	const getOverlay = async () => {
		const overlay = await getOverlayById(overlayId);
		layerIds = overlay[$statsScene].layers
			.filter((layer) => layerId === layer.id)
			.map((layer) => layer.id);
	};
	$: overlayId, layerId, $statsScene, $obs, getOverlay();
</script>

<MainOverlay bind:layerIds preview={true} />

<style>
	:global(body) {
		background: transparent;
	}
</style>
