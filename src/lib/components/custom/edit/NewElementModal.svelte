<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { ElementPayload, GridContentItem, Scene } from '$lib/types/types';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { generateNewItem } from '$lib/components/custom/edit/CreateScene.svelte';
	import ElementSelect from '$lib/components/custom/input/ElementSelect.svelte';
	import StylingSelect from '$lib/components/custom/edit/StylingSelect.svelte';
	import { fade } from 'svelte/transition';
	import GridContent from '../GridContent.svelte';
	import { COL } from '$lib/types/const';

	const sceneId = parseInt($page.params.scene);

	export let open: boolean;
	export let layer: number | undefined;
	export let selectedId: string | undefined = undefined;

	let selectedElementId: number;
	let payload: ElementPayload = {
		string: '',
		image: '',
		class: '',
		css: '',
	};

	let testItem: GridContentItem;
	$: testItem = {
		elementId: selectedElementId,
		data: payload,
		id: 'test',
	};

	function handleElement() {
		if (selectedId) edit();
		if (!selectedId) add();
	}

	function getCurrentScene() {
		return $obs?.scenes?.find((scene) => scene.id === sceneId) ?? ({} as Scene);
	}

	function getCurrentSceneIndex() {
		const scene = getCurrentScene();
		return $obs.scenes.indexOf(scene);
	}

	function getCurrentItems() {
		let curScene = getCurrentScene();
		return curScene[$statsScene].layers[layer ?? 0] ?? [];
	}

	function add() {
		let items = getCurrentItems();
		let newItem = generateNewItem(selectedElementId, payload);
		let findOutPosition = gridHelp.findSpace(newItem, items, COL);

		newItem = {
			...newItem,
			[COL]: {
				...newItem[COL],
				...findOutPosition,
			},
		};

		items = [...items, ...[newItem]];

		const index = getCurrentSceneIndex();
		$obs.scenes[index][$statsScene].layers[layer ?? 0] = items;

		$eventEmitter.emit('electron', 'update-custom-components', $obs);

		open = false;
	}

	function edit() {
		let items = getCurrentItems();
		let prevItem = items.find((item) => item.id === selectedId);

		let newItem = {
			elementId: selectedElementId,
			id: selectedId,
			data: payload,
			[COL]: {
				...prevItem[COL],
			},
		};

		items = items.filter((item) => item.id != selectedId);
		items = [...items, ...[newItem]];

		const index = getCurrentSceneIndex();
		$obs.scenes[index][$statsScene].layers[layer ?? 0] = items;

		$eventEmitter.emit('electron', 'update-custom-components', $obs);
		open = false;
	}

	function updatePayload() {
		if (!selectedId) return;
		let items = getCurrentItems();
		let item = items.find((item) => item.id === selectedId);
		payload = item.data;
		selectedElementId = item.elementId;
		console.log('payload parent', payload);
	}
	updatePayload();
	// TODO: Display scroll
</script>

<Modal bind:open class="w-[80%] h-[80%] min-w-72 rounded-lg" on:close={() => (open = false)}>
	<div
		class=" w-full h-full min-w-lg place-items-center bg-cover bg-center rounded-md border border-zinc-700"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="w-full h-full p-4 px-8 grid grid-cols-2 overflow-scroll scroll">
			<div class="w-full h-full col-span-1">
				<ElementSelect bind:selectedElementId />
				<div class="w-full">
					<StylingSelect bind:selectedElementId bind:payload />
				</div>
				<button
					class="transition w-24 bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={handleElement}
				>
					{selectedId ? 'Update' : 'Add'}
				</button>
			</div>
			<div class="w-full h-full col-span-1 grid justify-center content-center gap-12">
				{#each [...Array(2).keys()] as i}
					<div
						class="w-[376px] h-[210px] xl:w-[450px] xl:h-[250px] bg-cover bg-center border z-0 flex items-center justify-center"
						style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
						in:fade={{ delay: 50, duration: 150 }}
						out:fade={{ duration: 300 }}
					>
						<div class="w-full h-[50%] border">
							<GridContent bind:testItem edit={!i} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Modal>

<style>
</style>
