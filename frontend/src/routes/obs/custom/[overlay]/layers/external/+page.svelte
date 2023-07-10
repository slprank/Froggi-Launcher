<script lang="ts">
	import { page } from '$app/stores';
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import LayerToggle from '$lib/components/custom/preview/LayerToggle.svelte';
	import NonInteractiveIFrame from '$lib/components/custom/preview/NonInteractiveIFrame.svelte';
	import { isElectron, urls } from '$lib/utils/store.svelte';

	const overlayId: string | undefined = $page.params.overlay;

	let innerWidth: number;
	let innerHeight: number;
	$: isVerticalScreen = innerHeight > innerWidth;
	$: isHorizontalScreen = !isVerticalScreen;

	$: src = `${$isElectron ? $urls?.external : $urls?.local}/obs/custom/${overlayId}/layers`;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if isVerticalScreen}
	<div class="grid grid-flow-row">
		<div class="w-full aspect-video">
			<NonInteractiveIFrame {src} title="preview" class="w-full h-full" />
		</div>
		<div class="w-full h-full pb-10">
			<LayerToggle {src} />
		</div>
	</div>
{/if}

<style>
	:global(body) {
		background: transparent;
	}
</style>
