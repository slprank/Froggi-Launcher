<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import SecondaryOverlay from '$lib/components/custom/SecondaryOverlay.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import { overlays, statsScene } from '$lib/utils/store.svelte';

	$: overlayId = $page.params.overlay;
	let layerIds: string[] = [];

	const getOverlay = async () => {
		const overlay = await getOverlayById(overlayId);
		if (!overlay) return;
		layerIds = overlay[$statsScene].layers
			.filter((layer) => layer.preview)
			.map((layer) => layer.id);
	};
	$: $statsScene, $overlays, getOverlay();
</script>

<SecondaryOverlay bind:layerIds preview={true} />
