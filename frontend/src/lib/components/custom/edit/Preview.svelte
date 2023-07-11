<script lang="ts">
	import { page } from '$app/stores';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import { getOverlayById } from './OverlayHandler.svelte';
	import type { Overlay } from '$lib/models/types';
	import { isElectron, urls } from '$lib/utils/store.svelte';

	export let boardHeight: number;
	export let boardWidth: number;

	const overlayId = $page.params.overlay;
	$: src = `${$isElectron ? $urls?.local : $urls?.external}/obs/custom/${overlayId}/layers`;

	let currentOverlay: Overlay;

	async function getOverlay() {
		currentOverlay = await getOverlayById(overlayId);
	}
	getOverlay();
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
		class={`outline outline-zinc-700 overflow-hidden shadow-md my-2 relative`}
	>
		{#key boardWidth}
			<div class="w-full h-full absolute">
				<iframe
					allowtransparency={true}
					{src}
					title="preview"
					style="width: 100%; height: 100%;"
				/>
			</div>
		{/key}
		<div class="w-full h-full z-2 absolute" />
	</div>
</div>
