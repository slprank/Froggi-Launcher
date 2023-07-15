<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import type { Layer } from '$lib/models/types';
	import { obs, statsScene } from '$lib/utils/store.svelte';

	$: overlayId = $page.params.overlay;
	$: layerId = $page.params.layer;
	let layers: Layer[] = [];

	const getOverlay = async () => {
		const overlay = await getOverlayById(overlayId);
		layers = overlay[$statsScene].layers.filter((layer) => layerId === layer.id);
	};
	$: overlayId, layerId, $statsScene, $obs, getOverlay();
</script>

{#if layerId}
	<MainOverlay bind:layers />
{/if}

<style>
	:global(body) {
		background: transparent;
	}
</style>
