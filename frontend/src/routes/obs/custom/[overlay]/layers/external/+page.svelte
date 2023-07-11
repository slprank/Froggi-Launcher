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

	$: src = `${$isElectron ? $urls?.local : $urls?.external}/obs/custom/${overlayId}/layers`;
	$: console.log('src', src);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if isVerticalScreen}
	<div class="grid grid-flow-row h-screen items-start">
		<div class="w-full aspect-video border-2">
			<NonInteractiveIFrame {src} title="preview" class="w-full h-full" />
		</div>
		<div class="w-full full">
			<LayerToggle />
		</div>
	</div>
{/if}

<style>
	:global(body) {
		background: transparent;
	}
</style>
