<script lang="ts">
	import { page } from '$app/stores';
	import SecondaryOverlay from '$lib/components/obs/overlays/SecondaryOverlay.svelte';
	import { getOverlayById } from '$lib/components/obs/overlays/edit/OverlayHandler.svelte';
	import { overlays, statsScene } from '$lib/utils/store.svelte';

	$: overlayId = $page.params.overlay;
	$: layerId = $page.params.layer;
	let layerIds: string[] = [];

	const getOverlay = async () => {
		const overlay = await getOverlayById(overlayId);
		if (!overlay) return;
		layerIds = overlay[$statsScene].layers
			.filter((layer) => layerId === layer.id)
			.map((layer) => layer.id);
	};
	$: layerId, $statsScene, $overlays, getOverlay();
</script>

<SecondaryOverlay bind:layerIds preview={true} />
