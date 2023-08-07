<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import type { Layer } from '$lib/models/types';
	import { obs, statsScene } from '$lib/utils/store.svelte';

	$: overlayId = $page.params.overlay;
	let layerIds: string[] = [];

	const getOverlay = async () => {
		const overlay = await getOverlayById(overlayId);
		if (!overlay) return;
		layerIds = overlay[$statsScene].layers.map((layer) => layer.id);
	};
	$: overlayId, $statsScene, $obs, getOverlay();
</script>

<MainOverlay bind:layerIds preview={true} />

<style>
	:global(body) {
		background: transparent;
	}
</style>
