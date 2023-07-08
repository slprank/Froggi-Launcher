<script lang="ts">
	import { page } from '$app/stores';
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import LayerDisplayRow from './LayerDisplayRow.svelte';

	export let src: string;
	const overlayId: string | undefined = $page.params.overlay;

	$: curOverlay = $obs.overlays.find((overlay) => overlay.id === overlayId);
	$: layers = curOverlay ? curOverlay[$statsScene].layers : undefined;
	$: previewLayers = curOverlay ? curOverlay[$statsScene].previewLayers : undefined;
</script>

{#if layers && previewLayers && curOverlay}
	<div
		class="w-full h-full max-h-48 outline outline-zinc-700 overflow-y-scroll
			[&>*:nth-child(odd)]:bg-black [&>*:nth-child(odd)]:bg-opacity-25
			[&>*:nth-child(even)]:bg-black [&>*:nth-child(even)]:bg-opacity-50"
	>
		<div
			class="w-full h-12 border-b-1 border-gray-500 gap-2 p-2 grid grid-flow-col grid-cols-3 justify-between items-center bg-black"
			in:fly={{ duration: 750, x: 150, delay: 100 }}
		>
			<div class="col-span-1 grid justify-center">
				<h1 class="text-lg font-bold text-white shadow-md no-w">Visible</h1>
			</div>

			<div class="col-span-1 grid justify-center">
				<h1 class="text-lg font-bold text-white shadow-md no-w">Preview</h1>
			</div>
			<div class="col-span-1 grid justify-center">
				<h1 class="text-lg font-bold text-white shadow-md no-w">Layer</h1>
			</div>
		</div>
		{#each layers as layer, i}
			<LayerDisplayRow {curOverlay} {src} {layer} layerNumber={i + 1} {previewLayers} />
		{/each}
	</div>
{/if}
