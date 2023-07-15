<script lang="ts">
	import type { Layer, Overlay } from '$lib/models/types';
	import { fly } from 'svelte/transition';
	import NonInteractiveIFrame from './NonInteractiveIFrame.svelte';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import {
		deleteLayer,
		moveLayerDown,
		moveLayerUp,
		newLayer,
		updateOverlay,
	} from '$lib/components/custom/edit/OverlayHandler.svelte';

	export let curOverlay: Overlay;
	export let layer: Layer;
	export let layerIndex: number;
	export let previewLayers: string[];
	export let selectedLayer: number | undefined = undefined;
	export let src: string;

	let isChecked = previewLayers?.includes(layer.id) ?? false;
	$: isSelected = selectedLayer === layerIndex;

	const changeEditLayer = (layerIndex: number) => {
		$eventEmitter.emit('electron', 'edit_layer_preview', layerIndex);
		selectedLayer = layerIndex;
	};

	const handleChecked = () => {
		if (!curOverlay) return;
		if (isChecked) curOverlay[$statsScene].previewLayers.push(layer.id);
		if (!isChecked) {
			curOverlay[$statsScene].previewLayers = curOverlay[$statsScene]?.previewLayers.filter(
				(layerId) => layerId !== layer.id,
			);
		}
		updateOverlay(curOverlay);
	};

	const updateCheck = () => {
		isChecked = previewLayers.includes(layer.id) ?? false;
	};
	$: $statsScene, previewLayers, updateCheck();
</script>

{#if layer}
	<div
		class={`w-full h-22 border-b-1 border-zinc-700 gap-2 p-2 grid grid-flow-col grid-cols-6 justify-between items-center`}
		style={`${isSelected && 'background-color: rgba(255, 255, 255, 0.10);'}`}
	>
		<div
			class="col-span-1 grid justify-center"
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
			class="col-span-2 grid justify-center"
			in:fly={{ duration: 750, delay: 100 * (layerIndex + 1), x: 150 }}
		>
			<button
				class="w-full h-full transition hover:scale-110"
				on:click={() => changeEditLayer(layerIndex)}
			>
				<div class="h-16 aspect-video rounded-sm">
					<NonInteractiveIFrame
						class="h-16 w-full border border-zinc-700"
						src={`${src}/${layer.id}`}
						title={`layer-${layer.id}`}
					/>
				</div>
			</button>
		</div>
		<button
			class="w-full h-full col-span-1 grid justify-center text-lg font-bold text-white shadow-md transition hover:scale-110"
			on:click={() => changeEditLayer(layerIndex)}
		>
			<div class="w-full h-full grid justify-center items-center text-[1.5em]">
				{layerIndex + 1}
			</div>
		</button>
		<div
			class="w-full h-full col-span-1 grid justify-center text-lg font-bold text-white shadow-md"
		>
			<button
				class="w-8 h-12 grid justify-center text-lg font-bold text-white shadow-md hover:scale-[1.05]"
				on:click={async () => {
					changeEditLayer(await moveLayerUp(curOverlay.id, $statsScene, layerIndex));
				}}
			>
				<img src="/image/button-icons/up.png" alt="up" style="filter: invert(1)" />
			</button>
			<button
				class="w-8 h-12 grid justify-center text-lg font-bold text-white shadow-md hover:scale-[1.05]"
				on:click={async () => {
					changeEditLayer(await moveLayerDown(curOverlay.id, $statsScene, layerIndex));
				}}
			>
				<div class="w-full h-full grid justify-center items-center text-[0.5em]">
					<img src="/image/button-icons/down.png" alt="down" style="filter: invert(1)" />
				</div>
			</button>
		</div>
		<div
			class="w-full h-full col-span-1 grid justify-center items-center text-lg font-bold text-white shadow-md"
		>
			<button
				class="w-6 h-10 grid justify-center items-center text-lg font-bold text-white shadow-md hover:scale-[1.05]"
				on:click={async () => {
					changeEditLayer(await deleteLayer(curOverlay.id, $statsScene, layerIndex));
				}}
			>
				<img
					src="/image/button-icons/remove.png"
					alt="remove"
					style="filter: invert(0.5)"
				/>
			</button>
		</div>
	</div>
	<div class="w-full h-22 items-center border-b-1 border-zinc-700">
		<button
			class="w-full h-full justify-center hover:scale-110 block hover:bg-white hover:bg-opacity-20"
			on:click={async () => await newLayer(curOverlay.id, $statsScene, layerIndex + 1)}
		>
			<h1 class="text-white text-shadow-md">+</h1>
		</button>
	</div>
{/if}
