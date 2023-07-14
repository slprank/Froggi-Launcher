<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import type { Layer } from '$lib/models/types';
	import { statsScene } from '$lib/utils/store.svelte';

	$: overlayId = $page.params.overlay;
	$: layerId = $page.params.layerId;
	let layers: Layer[];

	const getOverlay = async () => {
		const overlay = await getOverlayById(overlayId);
		layers = overlay[$statsScene].layers.filter((layer) => layerId === layer.id);
	};
	$: overlayId, layerId, $statsScene, getOverlay();
</script>

{#if overlayId}
	{#if layerId}
		<MainOverlay bind:layers />
	{/if}
{/if}

<style>
	:global(body) {
		background: transparent;
	}
</style>
