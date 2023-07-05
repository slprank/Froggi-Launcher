<script lang="ts">
	import { page } from '$app/stores';
	import { COL, ROW, MIN } from '$lib/models/const';
	import type { Overlay } from '$lib/models/types';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import NewElementModal from '$lib/components/custom/edit/NewElementModal.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import { updateOverlay } from '$lib/components/custom/edit/OverlayHandler.svelte';

	const overlayId = $page.params.overlay;

	export let selectedId: string | undefined;
	export let selectedLayer: number | undefined;
	let selectedItem: any;
	let selectedItemIndex: number;

	let isElementModalOpen = false;

	$: curOverlay = $obs?.overlays?.find((overlay) => overlay.id === overlayId) ?? undefined;

	function getItemById() {
		if (!curOverlay || selectedLayer === undefined || selectedId === undefined) return;
		selectedItemIndex = curOverlay[$statsScene]?.layers[selectedLayer]
			.map((i) => i.id)
			.indexOf(selectedId);
		selectedItem = curOverlay[$statsScene]?.layers[selectedLayer][selectedItemIndex];
	}
	$: selectedId, getItemById();

	function clearItem() {
		selectedId = undefined;
		selectedItem = undefined;
	}
	$: selectedLayer, $statsScene, clearItem();

	function handleOverflow() {
		if (selectedItem[COL].x < 0) selectedItem[COL].x = 0;
		if (selectedItem[COL].y < 0) selectedItem[COL].y = 0;
		if (selectedItem[COL].x >= COL) selectedItem[COL].x = COL - MIN;
		if (selectedItem[COL].y >= ROW) selectedItem[COL].y = ROW - MIN;
		if (selectedItem[COL].x + selectedItem[COL].w > COL)
			selectedItem[COL].w = COL - selectedItem[COL].x;
		if (selectedItem[COL].y + selectedItem[COL].h > ROW)
			selectedItem[COL].h = ROW - selectedItem[COL].y;
	}

	function deleteElement() {
		if (!curOverlay || selectedLayer === undefined) return;
		curOverlay[$statsScene]?.layers[selectedLayer].splice(selectedItemIndex, 1);
		selectedId = undefined;
		selectedItem = undefined;
		selectedItemIndex = 0;

		updateOverlay(curOverlay);
	}

	function updateSelectItem() {
		if (!curOverlay || selectedLayer === undefined || selectedId === undefined) return;

		handleOverflow();

		curOverlay[$statsScene].layers[selectedLayer][selectedItemIndex] = selectedItem;
		updateOverlay(curOverlay);
	}
	$: selectedItem, updateSelectItem();

	let lockOut = false;

	setInterval(() => (lockOut = false), 100);

	function handleKeydown(e: KeyboardEvent) {
		if (lockOut || !selectedId) return;
		if (e.shiftKey) {
			if (e.key === 'ArrowDown') {
				selectedItem[COL].h += 1;
			}
			if (e.key === 'ArrowUp') {
				selectedItem[COL].h -= 1;
			}
			if (e.key === 'ArrowLeft') {
				selectedItem[COL].w -= 1;
			}
			if (e.key === 'ArrowRight') {
				selectedItem[COL].w += 1;
			}
			return;
		}
		if (e.key === 'ArrowDown') {
			selectedItem[COL].y += 1;
		}
		if (e.key === 'ArrowUp') {
			selectedItem[COL].y -= 1;
		}
		if (e.key === 'ArrowLeft') {
			selectedItem[COL].x -= 1;
		}
		if (e.key === 'ArrowRight') {
			selectedItem[COL].x += 1;
		}
		lockOut = true;
	}

	// TODO: Add horizontal center button
</script>

<svelte:window on:keydown={handleKeydown} />

{#if selectedItem !== undefined}
	<h1 class="text-gray-500 text-lg font-medium text-shadow" in:fly={{ duration: 250, y: 50 }}>
		Selected element
	</h1>
	<div class="w-full flex gap-2">
		<div in:fly={{ duration: 250, y: 50 }}>
			<NumberInput bind:value={selectedItem[COL].x} max={COL} label={`X - ${COL}`} />
		</div>
		<div in:fly={{ duration: 250, y: 50, delay: 50 }}>
			<NumberInput bind:value={selectedItem[COL].y} max={ROW} label={`Y - ${ROW}`} />
		</div>
		<div in:fly={{ duration: 250, y: 50, delay: 100 }}>
			<NumberInput bind:value={selectedItem[COL].h} max={ROW} label={`H`} />
		</div>
		<div in:fly={{ duration: 250, y: 50, delay: 150 }}>
			<NumberInput bind:value={selectedItem[COL].w} max={COL} label={`W`} />
		</div>
		<div class="w-24 flex items-end" in:fly={{ duration: 250, y: 50, delay: 200 }}>
			<button
				class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				on:click={() => (isElementModalOpen = true)}
			>
				Edit
			</button>
		</div>
		<div class="w-24 flex items-end" in:fly={{ duration: 250, y: 50, delay: 250 }}>
			<button
				class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				on:click={deleteElement}
			>
				Delete
			</button>
		</div>
	</div>
	{#key isElementModalOpen}
		{#key selectedId}
			<NewElementModal
				bind:open={isElementModalOpen}
				bind:layer={selectedLayer}
				bind:selectedId
			/>
		{/key}
	{/key}
{/if}
