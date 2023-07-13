<script lang="ts">
	import type { Layer, Overlay } from '$lib/models/types';
	import { fly } from 'svelte/transition';
	import NonInteractiveIFrame from './NonInteractiveIFrame.svelte';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import {
		getOverlayById,
		getOverlayIndexById,
		updateOverlay,
	} from '../edit/OverlayHandler.svelte';

	export let curOverlay: Overlay;
	export let layer: Layer;
	export let layerIndex: number;
	export let previewLayers: string[];
	export let src: string;

	let isChecked = previewLayers?.includes(layer.id) ?? false;

	const changeEditLayer = (layerIndex: number) => {
		$eventEmitter.emit('electron', 'edit_layer_preview', layerIndex);
	};

	async function moveLayerUp(layerIndex: number) {
		let tempOverlay = await getOverlayById(curOverlay.id);
		if (layerIndex === undefined || layerIndex === 0) return;
		[
			tempOverlay[$statsScene].layers[layerIndex],
			tempOverlay[$statsScene].layers[layerIndex - 1],
		] = [
			tempOverlay[$statsScene].layers[layerIndex - 1],
			tempOverlay[$statsScene].layers[layerIndex],
		];
		const index = await getOverlayIndexById(curOverlay.id);
		$obs.overlays[index] = tempOverlay;
		updateOverlay(tempOverlay);
		changeEditLayer(layerIndex - 1);
	}

	async function moveLayerDown(layerIndex: number) {
		if (!curOverlay) return;
		let tempOverlay = await getOverlayById(curOverlay.id);
		if (layerIndex >= tempOverlay[$statsScene].layers.length - 1) return;
		[
			tempOverlay[$statsScene].layers[layerIndex],
			tempOverlay[$statsScene].layers[layerIndex + 1],
		] = [
			tempOverlay[$statsScene].layers[layerIndex + 1],
			tempOverlay[$statsScene].layers[layerIndex],
		];
		const index = await getOverlayIndexById(curOverlay.id);
		$obs.overlays[index] = tempOverlay;
		updateOverlay(tempOverlay);
		changeEditLayer(layerIndex + 1);
	}

	async function deleteLayer(layerIndex: number) {
		let tempOverlay = await getOverlayById(curOverlay.id);
		if (!tempOverlay) return;
		tempOverlay[$statsScene].layers.splice(layerIndex, 1);
		const index = await getOverlayIndexById(curOverlay.id);
		$obs.overlays[index] = tempOverlay;
		updateOverlay(tempOverlay);
		changeEditLayer(0);
	}

	const handleChecked = () => {
		if (isChecked) curOverlay[$statsScene].previewLayers.push(layer.id);
		if (!isChecked) {
			curOverlay[$statsScene].previewLayers = curOverlay[$statsScene].previewLayers.filter(
				(layerId) => layerId !== layer.id,
			);
		}
		updateOverlay(curOverlay);
	};

	const updateCheck = () => {
		isChecked = previewLayers?.includes(layer.id) ?? false;
	};
	$: $statsScene, previewLayers, updateCheck();
</script>

{#if layer}
	<div
		class="w-full h-22 border-b-1 border-gray-500 gap-2 p-2 grid grid-flow-col grid-cols-6 justify-between items-center bg-black"
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
			<button class="w-full h-full" on:click={() => changeEditLayer(layerIndex)}>
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
			class="w-full h-full col-span-1 grid justify-center text-lg font-bold text-white shadow-md no-w"
			on:click={() => changeEditLayer(layerIndex)}
		>
			<div class="w-full h-full grid justify-center items-center text-[1.5em]">
				{layerIndex + 1}
			</div>
		</button>
		<div
			class="w-full h-full col-span-1 grid justify-center text-lg font-bold text-white shadow-md no-w"
		>
			<button
				class="w-8 h-12 grid justify-center text-lg font-bold text-white shadow-md no-w hover:scale-[1.05]"
				on:click={async () => await moveLayerUp(layerIndex)}
			>
				<img src="/image/button-icons/up.png" alt="up" style="filter: invert(1)" />
			</button>
			<button
				class="w-8 h-12 grid justify-center text-lg font-bold text-white shadow-md no-w hover:scale-[1.05]"
				on:click={async () => await moveLayerDown(layerIndex)}
			>
				<div class="w-full h-full grid justify-center items-center text-[0.5em]">
					<img src="/image/button-icons/down.png" alt="down" style="filter: invert(1)" />
				</div>
			</button>
		</div>
		<div
			class="w-full h-full col-span-1 grid justify-center items-center text-lg font-bold text-white shadow-md no-w"
		>
			<button
				class="w-6 h-10 grid justify-center items-center text-lg font-bold text-white shadow-md no-w hover:scale-[1.05]"
				on:click={async () => await deleteLayer(layerIndex)}
			>
				<img
					src="/image/button-icons/remove.png"
					alt="remove"
					style="filter: invert(0.5)"
				/>
			</button>
		</div>
	</div>
{/if}
