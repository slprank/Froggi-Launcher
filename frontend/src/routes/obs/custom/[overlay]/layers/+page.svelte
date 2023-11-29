<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import { obs, statsScene } from '$lib/utils/store.svelte';

	$: overlayId = $page.params.overlay;
	let layerIds: string[] = [];

	const getOverlay = async () => {
		const overlay = await getOverlayById(overlayId);
		if (!overlay) return;
		layerIds = overlay[$statsScene].layers
			.filter((layer) => layer.preview)
			.map((layer) => layer.id);
	};
	$: $statsScene, $obs, getOverlay();
</script>

<MainOverlay bind:layerIds preview={true} />

<style>
	:global(body) {
		background: transparent;
	}
</style>
