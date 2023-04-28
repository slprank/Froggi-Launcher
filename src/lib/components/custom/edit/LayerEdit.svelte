<script lang="ts">
	import type { Overlay } from '$lib/types/types';
	import Select from '$lib/components/input/Select.svelte';
	import { statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import { getContext } from 'svelte';

	export let overlay: Overlay;
	export let selectedLayer: number | undefined;

	// TODO: Add confirm on remove

	const { newLayer, moveLayerDown, moveLayerUp, deleteLayer } = getContext('layer');
</script>

<h1 class="text-gray-500 text-lg font-medium text-shadow">Layers</h1>
<div class="w-full flex gap-2">
	<div class="w-24">
		{#if overlay}
			<Select bind:selected={selectedLayer}>
				{#each overlay[$statsScene].layers as _, i}
					<option selected={i === 0} value={i}>Layer {i + 1}</option>
				{/each}
			</Select>
		{/if}
	</div>
	<div>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
			on:click={newLayer}
		>
			New layer
		</button>
	</div>
	<div>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
			on:click={moveLayerUp}
		>
			Move up
		</button>
	</div>
	<div>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
			on:click={moveLayerDown}
		>
			Move down
		</button>
	</div>
	{#if overlay[$statsScene].layers.length > 1}
		<div transition:fly={{ duration: 250, y: -25 }}>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				on:click={deleteLayer}
			>
				Delete layer
			</button>
		</div>
	{/if}
</div>
