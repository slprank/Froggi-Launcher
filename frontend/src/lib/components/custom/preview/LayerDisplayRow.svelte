<script lang="ts">
	import type { Layer, Overlay } from '$lib/models/types';
	import { fly } from 'svelte/transition';
	import NonInteractiveIFrame from './NonInteractiveIFrame.svelte';
	import { eventEmitter, statsScene } from '$lib/utils/store.svelte';

	export let curOverlay: Overlay;
	export let layer: Layer;
	export let layerNumber: number;
	export let previewLayers: string[];
	export let src: string;

	let isChecked = previewLayers?.includes(layer.id) ?? false;

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
	$: $statsScene, updateCheck();
</script>

{#if layer}
	<div
		class="w-full h-20 border-b-1 border-gray-500 gap-2 p-2 grid grid-flow-col grid-cols-3 justify-between items-center bg-black"
		in:fly={{ duration: 750, delay: 100 * layerNumber, x: 150 }}
	>
		<div class="col-span-1 grid justify-center">
			<input
				type="checkbox"
				class="w-12 h-12"
				bind:checked={isChecked}
				on:change={handleChecked}
			/>
		</div>

		<div class="col-span-1 grid justify-center">
			<div class="h-16 aspect-video rounded-sm border border-zinc-700">
				<NonInteractiveIFrame
					class="h-16 w-full"
					src={`${src}/${layer.id}`}
					title={`layer-${layer.id}`}
				/>
			</div>
		</div>
		<div class="col-span-1 grid justify-center">
			<h1 class="text-lg font-bold text-white shadow-md no-w">
				{layerNumber}
			</h1>
		</div>
	</div>
{/if}
