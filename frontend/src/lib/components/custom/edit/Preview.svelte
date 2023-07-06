<script lang="ts">
	import { page } from '$app/stores';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import Board from '$lib/components/custom/Board.svelte';
	import { statsScene } from '$lib/utils/store.svelte';
	import { getOverlayById } from './OverlayHandler.svelte';
	import type { Overlay } from '$lib/models/types';

	const overlayId = $page.params.overlay;
	export let boardHeight: number;
	export let boardWidth: number;
	export let src: string;
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
		class={`outline outline-4 outline-zinc-700 overflow-hidden shadow-md my-2 relative`}
	>
		{#key boardWidth}
			<div class="absolute w-full h-full">
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
