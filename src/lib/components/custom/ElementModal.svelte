<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { CustomOptions, ElementPayload, Scene } from '$lib/types/types';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { generateNewItem } from '$lib/components/custom/DefaultScene.svelte';
	import ElementSelect from './ElementSelect.svelte';
	import Select from '$lib/components/Select.svelte';
	import StylingSelect from './StylingSelect.svelte';

	const sceneId = parseInt($page.params.scene);
	const COL = 256;

	export let open: boolean;
	export let layer: number;

	let selectedElement: CustomOptions;
	let payload: ElementPayload = {} as ElementPayload;

	//$: console.log('element', selectedElement);
	//$: console.log('payload', payload);

	function add(elementId: number, data: any) {
		let curScene = $obs?.scenes?.find((scene) => scene.id === sceneId) ?? ({} as Scene);
		let items = curScene[$statsScene].layers[layer];
		console.log(curScene);
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
</script>

<div>
	<Modal bind:open class="w-[80%] h-[80%] min-w-72 rounded-lg" on:close={() => (open = false)}>
		<div
			class="w-full h-full min-w-lg place-items-center bg-cover bg-center rounded-md border border-zinc-700"
			style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
		>
			<div class="w-full h-full p-2 grid grid-cols-2">
				<div class="w-full h-full col-span-1 overflow-auto">
					<ElementSelect bind:selectedElement />
					<div class="w-full">
						<StylingSelect bind:selectedElement bind:payload />
					</div>
					<button
						class="transition w-24 bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
						on:click={() => {
							add(selectedElement.element, payload);
						}}
					>
						Add
					</button>
				</div>
				<div class="w-full h-full col-span-1">
					<h1 class="text-white">Preview</h1>
				</div>
			</div>
		</div>
	</Modal>
</div>
