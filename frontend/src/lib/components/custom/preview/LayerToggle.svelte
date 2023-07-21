<script lang="ts">
	import { page } from '$app/stores';
	import { isElectron, obs, statsScene, urls } from '$lib/utils/store.svelte';
	import { crossfade, fly } from 'svelte/transition';
	import LayerDisplayRow from '$lib/components/custom/preview/LayerDisplayRow.svelte';
	import { newLayer } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import { flip } from 'svelte/animate';

	const overlayId: string | undefined = $page.params.overlay;

	let selectedLayer: number | undefined;

	$: src = `${$isElectron ? $urls?.local : $urls?.external}/obs/custom/${overlayId}/layers`;

	$: curOverlay = $obs?.overlays.find((overlay) => overlay.id === overlayId);
	$: layers = curOverlay ? curOverlay[$statsScene].layers : undefined;
	$: previewLayers = curOverlay ? curOverlay[$statsScene]?.previewLayers : undefined;

	let scrollElement: HTMLElement;
	const scrollToBottom = () => {
		scrollElement.scrollBy({ behavior: 'smooth', top: 1000 });
	};
</script>

{#if layers && previewLayers && curOverlay}
	<div class="w-full h-full border-1 flex flex-col border-zinc-700">
		<div
			class="w-full h-12 border-b-1 border-t-1 border-zinc-700 gap-2 p-2 grid grid-flow-col grid-cols-6 justify-between bg-black bg-opacity-50"
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
		<div class={`w-full h-full overflow-y-scroll`} bind:this={scrollElement}>
			<div class="w-full h-6 items-center">
				<button
					class="w-full h-full justify-center bg-black hover:scale-110 bg-opacity-40 hover:bg-opacity-60"
					on:click={async () => {
						await newLayer(overlayId, $statsScene, 0);
					}}
				>
					<h1 class="text-white text-shadow-md">+</h1>
				</button>
			</div>

			{#each layers as layer, layerIndex (layer.id)}
				<div class="w-full" animate:flip={{ duration: 250 }} id={layer.id}>
					<LayerDisplayRow
						{curOverlay}
						{src}
						{layer}
						{layerIndex}
						{previewLayers}
						{scrollToBottom}
						bind:selectedLayer
					/>
				</div>
			{/each}
		</div>
	</div>
{/if}
