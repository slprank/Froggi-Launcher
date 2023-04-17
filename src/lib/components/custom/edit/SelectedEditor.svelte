<script lang="ts">
	import { page } from '$app/stores';
	import type { Scene } from '$lib/types/types';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';

	const sceneId = parseInt($page.params.scene);

	export let selectedId: number | undefined;
	export let selectedLayer: number | undefined;
	let selectedItem: any;
	let selectedItemIndex: number;

	$: curScene = $obs?.scenes?.find((scene) => scene.id === sceneId) ?? undefined;

	function getItemById() {
		if (!curScene || selectedLayer === undefined || selectedId === undefined) return;
		selectedItemIndex = curScene[$statsScene]?.layers[selectedLayer]
			.map((i) => i.id)
			.indexOf(selectedId);
		selectedItem = curScene[$statsScene]?.layers[selectedLayer][selectedItemIndex];

		console.log(selectedItem, selectedItemIndex);
	}
	$: selectedId, getItemById();

	function updateObs() {
		if (!curScene || selectedLayer === undefined || selectedId === undefined) return;

		curScene[$statsScene].layers[selectedLayer][selectedItemIndex] = selectedItem;

		let scene = $obs.scenes.find((scene) => scene.id === sceneId) ?? ({} as Scene);
		const index = $obs.scenes.indexOf(scene);
		$obs.scenes[index] = curScene;

		$eventEmitter.emit('electron', 'update-custom-components', $obs);
	}

	// TODO: Add inputs to change x/y/w/h values
</script>

<div class="w-full flex" />
