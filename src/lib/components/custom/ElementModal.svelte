<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { Scene } from '$lib/types/types';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { generateNewItem } from '$lib/components/custom/DefaultScene.svelte';

	const sceneId = parseInt($page.params.scene);
	const COL = 256;

	export let open: boolean;
	export let layer: number;

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

		console.log(items);

		let scene = $obs.scenes.find((scene) => scene.id === sceneId);
		const index = $obs.scenes.indexOf(scene);
		$obs.scenes[index][$statsScene].layers[layer] = items;

		$eventEmitter.emit('electron', 'update-custom-components', $obs);

		open = false;
	}
</script>

<div>
	<Modal
		bind:open
		class="w-[90%] h-72 min-w-72 max-w-[612px] rounded-lg"
		on:close={() => (open = false)}
	>
		<button on:click={() => add(1, 'hheh')}>Hheh</button>
	</Modal>
</div>
