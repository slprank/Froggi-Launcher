<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import type { Layer } from '$lib/models/types';
	import { obs, statsScene } from '$lib/utils/store.svelte';

	$: overlayId = $page.params.overlay;
	let layers: Layer[] = [];

	const getOverlay = async () => {
		const overlay = await getOverlayById(overlayId);
		const layerIds = overlay[$statsScene]?.previewLayers;
		layers = overlay[$statsScene].layers.filter((layer) => layerIds.includes(layer.id));
	};
	$: overlayId, $statsScene, $obs, getOverlay();
</script>

<MainOverlay bind:layers preview={true} />

<style>
	:global(body) {
		background: transparent;
	}
</style>
