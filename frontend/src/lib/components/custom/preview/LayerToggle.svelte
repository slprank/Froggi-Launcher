<script lang="ts">
	import { page } from '$app/stores';
	import { isElectron, obs, statsScene, urls } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import LayerDisplayRow from '$lib/components/custom/preview/LayerDisplayRow.svelte';
	import { newLayer } from '$lib/components/custom/edit/OverlayHandler.svelte';

	const overlayId: string | undefined = $page.params.overlay;

	let selectedLayer: number | undefined;

	$: src = `${$isElectron ? $urls?.local : $urls?.external}/obs/custom/${overlayId}/layers`;

	$: curOverlay = $obs?.overlays.find((overlay) => overlay.id === overlayId);
	$: layers = curOverlay ? curOverlay[$statsScene].layers : undefined;
	$: previewLayers = curOverlay ? curOverlay[$statsScene]?.previewLayers : undefined;
</script>

{#if layers && previewLayers && curOverlay}
	<div
		class={`w-full h-full outline outline-zinc-700 overflow-y-scroll 
			[&>*:nth-child(odd)]:bg-black [&>*:nth-child(odd)]:bg-opacity-25
			[&>*:nth-child(even)]:bg-black [&>*:nth-child(even)]:bg-opacity-50`}
	>
		<div
			class="w-full h-12 border-b-1 border-zinc-700 gap-2 p-2 grid grid-flow-col grid-cols-6 justify-between bg-black"
		>
			<div
				class="col-span-1 grid justify-center"
				in:fly|local={{ duration: 750, x: 150, delay: 100 }}
			>
				<h1 class="text-lg font-bold text-white text-shadow-md no-w">Visible</h1>
			</div>

			<div
				class="col-span-2 grid justify-center"
				in:fly|local={{ duration: 750, x: 150, delay: 100 }}
			>
				<h1 class="text-lg font-bold text-white text-shadow-md no-w">Preview</h1>
			</div>
			<div
				class="col-span-1 grid justify-center"
				in:fly|local={{ duration: 750, x: 150, delay: 100 }}
			>
				<h1 class="text-lg font-bold text-white text-shadow-md no-w">Layer</h1>
			</div>
			<div
				class="col-span-1 grid justify-center"
				in:fly|local={{ duration: 750, x: 150, delay: 100 }}
			>
				<h1 class="text-lg font-bold text-white text-shadow-md no-w">Move</h1>
			</div>
			<div
				class="col-span-1 grid justify-center"
				in:fly|local={{ duration: 750, x: 150, delay: 100 }}
			>
				<h1 class="text-lg font-bold text-white text-shadow-md no-w">Del</h1>
			</div>
		</div>
		<div class="w-full h-22 items-center border-b-1 border-zinc-700">
			<button
				class="w-full h-full justify-center hover:scale-110 block hover:bg-white hover:bg-opacity-20"
				on:click={async () => await newLayer(overlayId, $statsScene, 0)}
			>
				<h1 class="text-white text-shadow-md">+</h1>
			</button>
		</div>
		{#each layers as layer, layerIndex}
			<LayerDisplayRow
				{curOverlay}
				{src}
				{layer}
				{layerIndex}
				{previewLayers}
				bind:selectedLayer
			/>
		{/each}
	</div>
{/if}
