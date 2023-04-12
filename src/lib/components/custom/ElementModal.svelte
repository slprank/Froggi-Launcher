<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Select from '$lib/components/Select.svelte';
	import type { Scene } from '$lib/types/types';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { generateNewItem } from '$lib/components/custom/DefaultScene.svelte';
	import type { CustomElement } from '$lib/types/enum';

	const sceneId = parseInt($page.params.scene);
	const COL = 256;

	export let open: boolean;
	export let layer: number;

	let selectedElement: CustomElement;

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
			<div class="w-full h-full p-2">
				<div class="w-40 h-12">
					<Select bind:selected={selectedElement}>
						<option selected value={0}>Layer 1</option>
						<option value={1}>Layer 2</option>
						<option value={2}>Layer 3</option>
					</Select>
				</div>
			</div>
		</div>
	</Modal>
</div>
