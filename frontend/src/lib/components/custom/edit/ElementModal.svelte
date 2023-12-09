<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type {
		ElementPayload,
		GridContentItem,
		GridContentItemConfig,
		Overlay,
	} from '$lib/models/types/overlay';
	import { electronEmitter, obs, overlays, statsScene } from '$lib/utils/store.svelte';
	import {
		generateNewItem,
		getDefaultElementPayload,
	} from '$lib/components/custom/edit/OverlayHandler.svelte';
	import StylingSelect from '$lib/components/custom/selector/StylingSelect.svelte';
	import { fade, fly } from 'svelte/transition';
	import GridContent from '../GridContent.svelte';
	import { COL } from '$lib/models/const';
	import ElementSelect from '../selector/ElementSelect.svelte';
	import type { CustomElement } from '$lib/models/constants/customElement';
	import { fixTransition } from './fixTransition';

	const overlayId = $page.params.overlay;

	export let open: boolean;
	export let layer: number | undefined;
	export let selectedId: string | undefined = undefined;

	let selectedElementId: CustomElement;
	let payload: ElementPayload = getDefaultElementPayload();
	$: isNewElement = !getCurrentItems().some((item) => item.id === selectedId);

	$: demoItem = {
		[COL]: {} as GridContentItemConfig,
		elementId: selectedElementId,
		data: payload,
		id: 'demo',
	};

	function updateOverlay() {
		$electronEmitter.emit('OverlayUpdate', getCurrentOverlay());
	}

	function getCurrentOverlay() {
		return $overlays?.find((overlay) => overlay.id === overlayId) ?? ({} as Overlay);
	}

	function getCurrentOverlayIndex() {
		const overlay = getCurrentOverlay();
		return $overlays.indexOf(overlay);
	}

	function getCurrentItems() {
		let curOverlay = getCurrentOverlay();
		return curOverlay[$statsScene]?.layers[layer ?? 0].items ?? [];
	}

	function add() {
		let items = getCurrentItems();
		let newItem = generateNewItem(selectedElementId, payload);

		newItem = fixTransition(newItem);

		items = [...items, newItem];

		const overlayIndex = getCurrentOverlayIndex();
		$overlays[overlayIndex][$statsScene].layers[layer ?? 0].items = items;

		updateOverlay();
		open = false;
	}

	function update() {
		let items = getCurrentItems();
		let prevItem = items.find((item) => item.id === selectedId);

		if (!prevItem) {
			add();
			return;
		}

		let newItem = {
			elementId: selectedElementId,
			id: selectedId,
			data: payload,
			[COL]: {
				...prevItem![COL],
			},
		} as GridContentItem;

		newItem = fixTransition(newItem);

		items = items.filter((item) => item.id != selectedId);
		items = [...items, newItem];

		const overlayIndex = getCurrentOverlayIndex();
		$overlays[overlayIndex][$statsScene].layers[layer ?? 0].items = items;

		updateOverlay();
		open = false;
	}

	// TODO: Save prev selectedId
	// If matching same type - string/box/image
	// Keep payload
	function updatePayload() {
		if (!selectedId) return;
		let items = getCurrentItems();
		let item = items.find((item) => item.id === selectedId); //
		if (!item) return;
		payload = { ...payload, ...item.data };
		selectedElementId = item.elementId;
	}
	updatePayload();
</script>

<Modal bind:open class="rounded-lg" on:close={() => (open = false)}>
	<div
		class="w-[80vw] h-[80vh] min-w-lg place-items-start bg-cover bg-center rounded-md border border-zinc-700"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="w-full h-full p-4 px-8 grid grid-cols-7">
			<div class="w-full h-full col-span-4 overflow-scroll scroll enable-scrollbar">
				<ElementSelect bind:selectedElementId />
				{#if selectedElementId}
					<div class="w-full">
						{#if payload && selectedId}
							<StylingSelect bind:selectedElementId bind:payload bind:selectedId />
						{/if}
					</div>
					<button
						transition:fly={{ duration: 250, x: 150 }}
						class="transition w-24 bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
						on:click={update}
					>
						{isNewElement ? 'Add' : 'Update'}
					</button>
				{/if}
			</div>
			<div class="w-full h-full col-span-3 grid justify-center content-center gap-12">
				<!-- Set array to 2 if you want drag/drop preview-->
				{#each [...Array(2).keys()] as i}
					<div
						class="w-[30vw] max-w-full max-h-[30vh] aspect-video bg-cover bg-center border z-0 flex items-center justify-center relative"
						style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
						in:fade={{ delay: 50, duration: 150 }}
						out:fade={{ duration: 300 }}
					>
						<div
							class={`w-full h-[50%] border bg-${i ? 'black' : 'white'} 'absolute'`}
							style={`font-family: ${getCurrentOverlay()[$statsScene]?.font?.family}`}
						>
							<GridContent bind:demoItem preview={true} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Modal>
