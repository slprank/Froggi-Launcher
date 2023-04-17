<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { CustomOptions, ElementPayload, GridContentItem, Scene } from '$lib/types/types';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { generateNewItem } from '$lib/components/custom/edit/CreateScene.svelte';
	import ElementSelect from '$lib/components/custom/input/ElementSelect.svelte';
	import StylingSelect from '$lib/components/custom/edit/StylingSelect.svelte';
	import { fade } from 'svelte/transition';
	import GridContent from '../GridContent.svelte';

	const sceneId = parseInt($page.params.scene);
	const COL = 256;

	export let open: boolean;
	export let layer: number;

	let selectedElement: CustomOptions;
	let payload: ElementPayload = {
		string: '',
		image: '',
		class: '',
		css: '',
	};

	let testItem: GridContentItem;
	$: testItem = {
		elementId: selectedElement?.elementId,
		data: payload,
		id: 'test',
	};

	function add(elementId: number, data: any) {
		let curScene = $obs?.scenes?.find((scene) => scene.id === sceneId) ?? ({} as Scene);
		let items = curScene[$statsScene].layers[layer] ?? [];
		let newItem = generateNewItem(elementId, data);
		let findOutPosition = gridHelp.findSpace(newItem, items, COL);

		newItem = {
			...newItem,
			[COL]: {
				...newItem[COL],
				...findOutPosition,
			},
		};

		items = [...items, ...[newItem]];

		let scene = $obs.scenes.find((scene) => scene.id === sceneId) ?? ({} as Scene);
		const index = $obs.scenes.indexOf(scene);
		$obs.scenes[index][$statsScene].layers[layer] = items;

		$eventEmitter.emit('electron', 'update-custom-components', $obs);

		open = false;
	}

	// TODO: Display scroll
</script>

<Modal bind:open class="w-[80%] h-[80%] min-w-72 rounded-lg" on:close={() => (open = false)}>
	<div
		class=" w-full h-full min-w-lg place-items-center bg-cover bg-center rounded-md border border-zinc-700"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="w-full h-full p-2 grid grid-cols-2 overflow-scroll scroll">
			<div class="w-full h-full col-span-1 overflow-auto">
				<ElementSelect bind:selectedElement />
				<div class="w-full">
					<StylingSelect bind:selectedElement bind:payload />
				</div>
				<button
					class="transition w-24 bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={() => {
						add(selectedElement.elementId, payload);
					}}
				>
					Add
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
						{#if selectedElement?.stringSettings}
							<div class="w-full h-[50%] border">
								<GridContent bind:testItem edit={!i} />
							</div>
						{/if}
						{#if selectedElement?.boxSettings}
							<div class="w-40 h-40 ">
								<GridContent bind:testItem edit={!i} />
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</Modal>

<style>
</style>
