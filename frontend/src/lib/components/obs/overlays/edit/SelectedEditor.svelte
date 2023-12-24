<script lang="ts">
	import { page } from '$app/stores';
	import { COL, ROW, MIN } from '$lib/models/const';
	import {
		currentOverlayEditor,
		localEmitter,
		obs,
		overlays,
		statsScene,
	} from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import ElementModal from '$lib/components/obs/overlays/edit/ElementModal.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import {
		generateNewItem,
		updateOverlay,
	} from '$lib/components/obs/overlays/edit/OverlayHandler.svelte';

	const overlayId = $page.params.overlay;
	export let selectedItemId: string | undefined;

	let selectedItem: any;
	let selectedItemIndex: number;

	let isElementModalOpen = false;

	$: curOverlay = $overlays?.find((overlay) => overlay.id === overlayId) ?? undefined;
	$: selectedLayer = $currentOverlayEditor?.layerIndex;

	function getItemById() {
		if (!curOverlay || selectedLayer === undefined || selectedItemId === undefined) return;
		selectedItemIndex = curOverlay[$statsScene]?.layers[selectedLayer].items
			.map((i) => i.id)
			.indexOf(selectedItemId);
		selectedItem = curOverlay[$statsScene]?.layers[selectedLayer].items[selectedItemIndex];
	}
	$: selectedItemId, getItemById();

	function clearItem() {
		selectedItemId = undefined;
		selectedItem = undefined;
	}
	$: selectedLayer, $statsScene, clearItem();

	function handleOverflow() {
		if (!selectedItem) return;
		if (selectedItem[COL].x < 0) selectedItem[COL].x = 0;
		if (selectedItem[COL].y < 0) selectedItem[COL].y = 0;
		if (selectedItem[COL].x >= COL) selectedItem[COL].x = COL - MIN;
		if (selectedItem[COL].y >= ROW) selectedItem[COL].y = ROW - MIN;
		if (selectedItem[COL].x + selectedItem[COL].w > COL)
			selectedItem[COL].w = COL - selectedItem[COL].x;
		if (selectedItem[COL].y + selectedItem[COL].h > ROW)
			selectedItem[COL].h = ROW - selectedItem[COL].y;
	}

	function copyElement() {
		if (!curOverlay || selectedLayer === undefined) return;
		const items = curOverlay[$statsScene]?.layers[selectedLayer].items;
		const item = items[selectedItemIndex];
		const newItem = generateNewItem(item.elementId, item.data, items);

		curOverlay[$statsScene]?.layers[selectedLayer].items.push(newItem);
		selectedItemId = undefined;
		selectedItem = undefined;
		selectedItemIndex = 0;

		updateOverlay(curOverlay);
	}

	function deleteElement() {
		if (!curOverlay || selectedLayer === undefined) return;
		curOverlay[$statsScene]?.layers[selectedLayer].items.splice(selectedItemIndex, 1);
		selectedItemId = undefined;
		selectedItem = undefined;
		selectedItemIndex = 0;

		updateOverlay(curOverlay);
	}

	function updateSelectItem() {
		if (!curOverlay || selectedLayer === undefined || selectedItemId === undefined) return;

		handleOverflow();

		curOverlay[$statsScene].layers[selectedLayer].items[selectedItemIndex] = selectedItem;
		updateOverlay(curOverlay);
	}
	$: selectedItem, updateSelectItem();

	let lockOut = false;

	function handleKeydown(e: KeyboardEvent) {
		if (lockOut || !selectedItemId || !selectedItem) return;
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
		if (e.ctrlKey) {
			if (e.key === 'c') {
				copyElement();
			}
			if (e.key === 'Backspace') {
				deleteElement();
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
		if (e.key === 'Del') {
			deleteElement();
		}
		lockOut = true;
		setTimeout(() => (lockOut = false), 100);
	}

	$localEmitter.on('LayerPreviewChange', (layerIndex: number) => {
		selectedLayer = layerIndex;
	});

	// TODO: Add horizontal center button
</script>

<svelte:window on:keydown={handleKeydown} />

<h1 class="text-gray-500 text-lg font-medium text-shadow" transition:fly={{ duration: 250, y: 50 }}>
	Selected element
</h1>
<div class="h-16">
	{#if selectedItem !== undefined}
		<div class="w-full flex gap-2">
			<div transition:fly={{ duration: 250, y: 30 }}>
				<NumberInput bind:value={selectedItem[COL].x} max={COL} label={`X - ${COL}`} />
			</div>
			<div transition:fly={{ duration: 250, y: 30, delay: 30 }}>
				<NumberInput bind:value={selectedItem[COL].y} max={ROW} label={`Y - ${ROW}`} />
			</div>
			<div transition:fly={{ duration: 250, y: 30, delay: 100 }}>
				<NumberInput bind:value={selectedItem[COL].h} max={ROW} label={`H`} />
			</div>
			<div transition:fly={{ duration: 250, y: 30, delay: 150 }}>
				<NumberInput bind:value={selectedItem[COL].w} max={COL} label={`W`} />
			</div>
			<div class="w-24 flex items-end" transition:fly={{ duration: 250, y: 30, delay: 200 }}>
				<button
					class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={() => (isElementModalOpen = true)}
				>
					Edit
				</button>
			</div>
			<div class="w-24 flex items-end" transition:fly={{ duration: 250, y: 30, delay: 250 }}>
				<button
					class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={copyElement}
				>
					Copy
				</button>
			</div>
			<div class="w-24 flex items-end" transition:fly={{ duration: 250, y: 30, delay: 250 }}>
				<button
					class="w-full transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={deleteElement}
				>
					Delete
				</button>
			</div>
		</div>
		{#key isElementModalOpen}
			{#key selectedItemId}
				<ElementModal
					bind:open={isElementModalOpen}
					bind:layer={selectedLayer}
					{selectedItemId}
				/>
			{/key}
		{/key}
	{/if}
</div>
