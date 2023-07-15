<script lang="ts">
	import { page } from '$app/stores';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { getOverlayById } from './OverlayHandler.svelte';
	import type { Overlay } from '$lib/models/types';
	import { isElectron, urls } from '$lib/utils/store.svelte';
	import NonInteractiveIFrame from '../preview/NonInteractiveIFrame.svelte';

	export let boardHeight: number;
	export let boardWidth: number;

	let timeout: NodeJS.Timeout;
	let keyTrigger: number;

	const overlayId = $page.params.overlay;
	$: src = `${$isElectron ? $urls?.local : $urls?.external}/obs/custom/${overlayId}/layers`;

	let currentOverlay: Overlay;

	async function getOverlay() {
		currentOverlay = await getOverlayById(overlayId);
	}
	getOverlay();

	const refreshTrigger = () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			keyTrigger = Math.random();
		}, 1500);
	};
	$: boardWidth, refreshTrigger();
</script>

<div class="w-full h-full">
	{#if currentOverlay}
		<TextFitMulti
			class="h-16 w-full text-gray-500 text-md font-medium text-shadow justify-center underline"
		>
			{currentOverlay.title}
		</TextFitMulti>
	{/if}
	<div
		style={`width: ${boardWidth}px; height: ${boardHeight}px`}
		class={`outline outline-zinc-700 overflow-hidden shadow-md my-2`}
	>
		{#key keyTrigger}
			<NonInteractiveIFrame {src} title="preview" class="w-full h-full" />
		{/key}
	</div>
</div>
