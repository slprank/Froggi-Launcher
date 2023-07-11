<script lang="ts">
	import { page } from '$app/stores';
	import { eventEmitter, isElectron, obs, statsScene, urls } from '$lib/utils/store.svelte';
	import { fly, blur, fade } from 'svelte/transition';
	import LayerDisplayRow from './LayerDisplayRow.svelte';

	const overlayId: string | undefined = $page.params.overlay;
	$: src = `${$isElectron ? $urls?.local : $urls.local}/obs/custom/${overlayId}/layers`;

	$: curOverlay = $obs?.overlays.find((overlay) => overlay.id === overlayId);
	$: layers = curOverlay ? curOverlay[$statsScene].layers : undefined;
	$: previewLayers = curOverlay ? curOverlay[$statsScene].previewLayers : undefined;
</script>

{#if layers && previewLayers && curOverlay}
	<div
		class="w-full h-full outline outline-zinc-700 overflow-y-scroll
			[&>*:nth-child(odd)]:bg-black [&>*:nth-child(odd)]:bg-opacity-25
			[&>*:nth-child(even)]:bg-black [&>*:nth-child(even)]:bg-opacity-50"
	>
		<div
			class="w-full h-12 border-b-1 border-gray-500 gap-2 p-2 grid grid-flow-col grid-cols-10 justify-between items-center bg-black"
		>
			<div
				class="col-span-3 grid justify-center"
				in:fly|local={{ duration: 750, x: 150, delay: 100 }}
			>
				<h1 class="text-lg font-bold text-white text-shadow-md no-w">Visible</h1>
			</div>

			<div
				class="col-span-4 grid justify-center"
				in:fly|local={{ duration: 750, x: 150, delay: 100 }}
			>
				<h1 class="text-lg font-bold text-white text-shadow-md no-w">Preview</h1>
			</div>
			<div
				class="col-span-3 grid justify-center"
				in:fly|local={{ duration: 750, x: 150, delay: 100 }}
			>
				<h1 class="text-lg font-bold text-white text-shadow-md no-w">Layer</h1>
			</div>
		</div>
		{#each layers as layer, layerIndex}
			<LayerDisplayRow {curOverlay} {src} {layer} {layerIndex} {previewLayers} />
		{/each}
	</div>
{/if}
