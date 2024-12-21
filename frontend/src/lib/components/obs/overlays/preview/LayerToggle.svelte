<script lang="ts">
	import { page } from '$app/stores';
	import {
		isElectron,
		localEmitter,
		obs,
		overlays,
		statsScene,
		urls,
	} from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import LayerDisplayRow from '$lib/components/obs/overlays/preview/LayerDisplayRow.svelte';
	import { newLayer } from '$lib/components/obs/overlays/edit/OverlayHandler.svelte';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';

	const overlayId: string | undefined = $page.params.overlay;

	let selectedLayerIndex: number = 0;

	$: curOverlay = $overlays[overlayId];
	$: layers = curOverlay && $statsScene in curOverlay ? curOverlay[$statsScene].layers : [];

	onMount(() => {
		$localEmitter.on('LayerPreviewChange', (layerIndex: number) => {
			selectedLayerIndex = layerIndex;
		});
		return () => {
			$localEmitter.on('LayerPreviewChange', () => {});
		};
	});

	let scrollElement: HTMLElement;
	const scrollToBottom = () => {
		scrollElement.scrollBy({ behavior: 'smooth', top: 1000 });
	};

	const updateSelectedLayer = () => {
		selectedLayerIndex = 0;
	};
	$: $statsScene, updateSelectedLayer();
</script>

{#if layers && curOverlay}
	<div class="h-full border-1 flex flex-col border-zinc-700">
		<div
			class="w-full h-12 border-b-1 border-zinc-700 gap-2 p-2 grid grid-flow-col grid-cols-6 justify-between bg-black bg-opacity-50"
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
		<div class={`w-full max-h-full overflow-auto flex-1`} bind:this={scrollElement}>
			<div class="w-full h-6 items-center overflow-hidden">
				<button
					class="w-full h-full justify-center bg-black bg-opacity-40 hover:bg-opacity-60"
					on:click={async () => {
						await newLayer(overlayId, $statsScene, 0);
					}}
				>
					<h1 class="text-white text-shadow-md">+</h1>
				</button>
			</div>
			{#each layers as layer, layerIndex (layerIndex)}
				<div class="w-full visible" animate:flip={{ duration: 250 }} id={layer.id}>
					<LayerDisplayRow
						{curOverlay}
						{layerIndex}
						{scrollToBottom}
						bind:selectedLayerIndex
					/>
				</div>
			{/each}
		</div>
	</div>
{/if}
