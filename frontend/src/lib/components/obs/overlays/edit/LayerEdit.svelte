<script lang="ts">
	import type { Overlay } from '$lib/models/types/overlay';
	import Select from '$lib/components/input/Select.svelte';
	import { electronEmitter, statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import {
		deleteLayer,
		moveLayerDown,
		moveLayerUp,
		newLayer,
	} from '$lib/components/obs/overlays/edit/OverlayHandler.svelte';
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';

	export let overlay: Overlay;
	export let selectedLayer: number = 0;

	const changeLayer = () => {
		$electronEmitter.emit('LayerPreviewChange', selectedLayer);
	};

	$: curScene = overlay[$statsScene];
</script>

<h1 class="color-secondary text-lg font-medium">Layers</h1>
<div class="w-full flex gap-2">
	<div class="w-24">
		<Select bind:selected={selectedLayer} on:change={changeLayer}>
			{#each curScene?.layers as _, i}
				<option selected={i === 0} value={i}>Layer {i + 1}</option>
			{/each}
		</Select>
	</div>
	<div>
		<button
			class="transition background-color-primary bg-opacity-25 hover:bg-opacity-40 font-semibold text-secondary-color text-md whitespace-nowrap h-10 lg:w-22 xl:w-auto px-2 xl:text-xl border border-white rounded"
			on:click={async () => (selectedLayer = await newLayer(overlay.id, $statsScene))}
		>
			<TextFitMulti>New layer</TextFitMulti>
		</button>
	</div>
	<div>
		<button
			class="transition background-color-primary bg-opacity-25 hover:bg-opacity-40 font-semibold text-secondary-color text-md whitespace-nowrap h-10 lg:w-22 xl:w-auto px-2 xl:text-xl border border-white rounded"
			on:click={async () =>
				(selectedLayer = await moveLayerUp(overlay.id, $statsScene, selectedLayer))}
		>
			<TextFitMulti>Move up</TextFitMulti>
		</button>
	</div>
	<div>
		<button
			class="transition background-color-primary bg-opacity-25 hover:bg-opacity-40 font-semibold text-secondary-color text-md whitespace-nowrap h-10 lg:w-22 xl:w-auto px-2 xl:text-xl border border-white rounded"
			on:click={async () =>
				(selectedLayer = await moveLayerDown(overlay.id, $statsScene, selectedLayer))}
		>
			<TextFitMulti>Move down</TextFitMulti>
		</button>
	</div>
	{#if curScene?.layers?.length > 1}
		<div transition:fly={{ duration: 250, y: -25 }}>
			<button
				class="transition background-color-primary bg-opacity-25 hover:bg-opacity-40 font-semibold text-secondary-color text-md whitespace-nowrap h-10 lg:w-22 xl:w-auto px-2 xl:text-xl border border-white rounded"
				on:click={async () =>
					(selectedLayer = await deleteLayer(overlay.id, $statsScene, selectedLayer))}
			>
				<TextFitMulti>Delete layer</TextFitMulti>
			</button>
		</div>
	{/if}
</div>
