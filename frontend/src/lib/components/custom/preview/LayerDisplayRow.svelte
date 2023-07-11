<script lang="ts">
	import type { Layer, Overlay } from '$lib/models/types';
	import { fly } from 'svelte/transition';
	import NonInteractiveIFrame from './NonInteractiveIFrame.svelte';
	import { eventEmitter, statsScene } from '$lib/utils/store.svelte';

	export let curOverlay: Overlay;
	export let layer: Layer;
	export let layerIndex: number;
	export let previewLayers: string[];
	export let src: string;

	let isChecked = previewLayers?.includes(layer.id) ?? false;

	const changeEditLayer = (layerIndex: number) => {
		$eventEmitter.emit('electron', 'edit_layer_preview', layerIndex);
	};

	const updateOverlay = () => {
		$eventEmitter.emit('electron', 'update-custom-overlay', curOverlay);
	};

	const handleChecked = () => {
		if (isChecked) curOverlay[$statsScene].previewLayers.push(layer.id);
		if (!isChecked) {
			curOverlay[$statsScene].previewLayers = curOverlay[$statsScene].previewLayers.filter(
				(layerId) => layerId !== layer.id,
			);
		}
		updateOverlay();
	};

	const updateCheck = () => {
		isChecked = previewLayers?.includes(layer.id) ?? false;
	};
	$: $statsScene, previewLayers, updateCheck();
</script>

{#if layer}
	<div
		class="w-full h-22 border-b-1 border-gray-500 gap-2 p-2 grid grid-flow-col grid-cols-10 justify-between items-center bg-black"
	>
		<div
			class="col-span-3 grid justify-center"
			in:fly={{ duration: 750, delay: 100 * (layerIndex + 1), x: 150 }}
		>
			<input
				type="checkbox"
				class="w-12 h-12"
				bind:checked={isChecked}
				on:change={handleChecked}
			/>
		</div>

		<div
			class="col-span-4 grid justify-center"
			in:fly={{ duration: 750, delay: 100 * (layerIndex + 1), x: 150 }}
		>
			<div class="h-16 aspect-video rounded-sm">
				<NonInteractiveIFrame
					class="h-16 w-full border border-zinc-700"
					src={`${src}/${layer.id}`}
					title={`layer-${layer.id}`}
				/>
			</div>
		</div>
		<button
			class="w-full h-full col-span-3 grid justify-center text-lg font-bold text-white shadow-md no-w"
			on:click={() => changeEditLayer(layerIndex)}
		>
			<div class="w-full h-full grid justify-center items-center text-[1.5em]">
				{layerIndex + 1}
			</div>
		</button>
	</div>
{/if}
