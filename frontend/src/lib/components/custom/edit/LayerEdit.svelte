<script lang="ts">
	import type { Overlay } from '$lib/models/types';
	import Select from '$lib/components/input/Select.svelte';
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import { getContext } from 'svelte';
	import {
		getOverlayById,
		getOverlayIndexById,
		updateOverlay,
	} from '$lib/components/custom/edit/OverlayHandler.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';

	export let overlay: Overlay;
	export let selectedLayer: number | undefined;
	$: curScene = overlay[$statsScene];

	// TODO: Add confirm on remove

	async function newLayer() {
		let tempOverlay = await getOverlayById(overlay.id);
		if (!tempOverlay) return;
		tempOverlay[$statsScene].layers.push([]);
		const index = await getOverlayIndexById(overlay.id);
		$obs.overlays[index] = tempOverlay;
		setTimeout(() => {
			selectedLayer = tempOverlay[$statsScene].layers.length - 1;
		});
		updateOverlay(tempOverlay);
	}

	async function moveLayerUp() {
		let tempOverlay = await getOverlayById(overlay.id);
		if (
			selectedLayer === undefined ||
			selectedLayer >= tempOverlay[$statsScene].layers.length - 1
		)
			return;
		[
			tempOverlay[$statsScene].layers[selectedLayer],
			tempOverlay[$statsScene].layers[selectedLayer + 1],
		] = [
			tempOverlay[$statsScene].layers[selectedLayer + 1],
			tempOverlay[$statsScene].layers[selectedLayer],
		];
		const index = await getOverlayIndexById(overlay.id);
		$obs.overlays[index] = tempOverlay;
		selectedLayer += 1;
		updateOverlay(tempOverlay);
	}

	async function moveLayerDown() {
		let tempOverlay = await getOverlayById(overlay.id);
		if (selectedLayer === undefined || selectedLayer === 0) return;
		[
			tempOverlay[$statsScene].layers[selectedLayer],
			tempOverlay[$statsScene].layers[selectedLayer - 1],
		] = [
			tempOverlay[$statsScene].layers[selectedLayer - 1],
			tempOverlay[$statsScene].layers[selectedLayer],
		];
		const index = await getOverlayIndexById(overlay.id);
		$obs.overlays[index] = tempOverlay;
		selectedLayer -= 1;
		updateOverlay(tempOverlay);
	}

	async function deleteLayer() {
		let tempOverlay = await getOverlayById(overlay.id);
		if (!tempOverlay || selectedLayer === undefined) return;
		tempOverlay[$statsScene].layers.splice(selectedLayer, 1);
		const index = await getOverlayIndexById(overlay.id);
		$obs.overlays[index] = tempOverlay;
		selectedLayer -= 1;
		updateOverlay(tempOverlay);
	}
</script>

<h1 class="text-gray-500 text-lg font-medium text-shadow">Layers</h1>
<div class="w-full flex gap-2">
	<div class="w-24">
		<Select bind:selected={selectedLayer}>
			{#each curScene.layers as _, i}
				<option selected={i === 0} value={i}>Layer {i + 1}</option>
			{/each}
		</Select>
	</div>
	<div>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 w-16 lg:w-20 xl:w-auto px-2 xl:text-xl border border-white rounded"
			on:click={newLayer}
		>
			<TextFitMulti>New layer</TextFitMulti>
		</button>
	</div>
	<div>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 w-16 lg:w-20 xl:w-auto px-2 xl:text-xl border border-white rounded"
			on:click={moveLayerUp}
		>
			<TextFitMulti>Move up</TextFitMulti>
		</button>
	</div>
	<div>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 w-16 lg:w-20 xl:w-auto px-2 xl:text-xl border border-white rounded"
			on:click={moveLayerDown}
		>
			<TextFitMulti>Move down</TextFitMulti>
		</button>
	</div>
	{#if curScene?.layers?.length > 1}
		<div transition:fly={{ duration: 250, y: -25 }}>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 w-16 lg:w-20 xl:w-auto px-2 xl:text-xl border border-white rounded"
				on:click={deleteLayer}
			>
				<TextFitMulti>Delete layer</TextFitMulti>
			</button>
		</div>
	{/if}
</div>
