<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import { LiveStatsScene } from '$lib/types/enum';
	import BoardEdit from '$lib/components/custom/edit/BoardEdit.svelte';
	import Select from '$lib/components/Select.svelte';
	import { generateNewItem, getNewScene } from './CreateScene.svelte';
	import Preview from './Preview.svelte';
	import NewElementModal from '$lib/components/custom/edit/NewElementModal.svelte';
	import SelectedEditor from './SelectedEditor.svelte';
	import type { Scene } from '$lib/types/types';
	import LayerEdit from '$lib/components/custom/edit/LayerEdit.svelte';
	import { setContext } from 'svelte';
	import SceneEdit from './SceneEdit.svelte';
	import SceneSelect from './SceneSelect.svelte';

	setContext('layer', { newLayer, moveLayerDown, moveLayerUp, deleteLayer });

	const sceneId = parseInt($page.params.scene);

	let selectedLayer: number | undefined = 0;
	let selectedId: string | undefined = undefined;
	let isElementModalOpen = false;
	let scene: Scene = getCurrentScene();

	let boardHeight: number;
	let innerWidth: number;

	$: console.log('layers', getCurrentScene()[$statsScene].layers);

	function createNewScene() {
		if (scene) return;
		const newId = Math.max(...$obs.scenes.map((s) => s.id)) ?? 1;
		$obs.scenes.push(getNewScene(newId));
		//$obs.scenes[0] = getNewScene(1); // Remove this
		$eventEmitter.emit('electron', 'update-custom-components', $obs);
	}
	createNewScene();

	$: calculateBoardHeight(innerWidth);

	function getCurrentScene(): Scene {
		return $obs.scenes.find((scene) => scene.id === sceneId) ?? ({} as Scene);
	}

	function getCurrentSceneIndex(): number {
		let curScene = getCurrentScene();
		return $obs.scenes.indexOf(curScene);
	}

	function updateScene() {
		scene = getCurrentScene();
	}
	$: $obs, updateScene();

	function updateObs() {
		$eventEmitter.emit('electron', 'update-custom-components', $obs);
	}

	function newLayer() {
		let tempScene = getCurrentScene();
		if (!tempScene) return;
		tempScene[$statsScene].layers.push([]);
		const index = getCurrentSceneIndex();
		$obs.scenes[index] = tempScene;
		updateObs();
	}
	function moveLayerUp() {
		let tempScene = getCurrentScene();
		if (
			selectedLayer === undefined ||
			selectedLayer === tempScene[$statsScene].layers.length - 1
		)
			return;
		[
			tempScene[$statsScene].layers[selectedLayer],
			tempScene[$statsScene].layers[selectedLayer + 1],
		] = [
			tempScene[$statsScene].layers[selectedLayer + 1],
			tempScene[$statsScene].layers[selectedLayer],
		];
		const index = getCurrentSceneIndex();
		$obs.scenes[index] = tempScene;
		selectedLayer += 1;
		updateObs();
	}

	function moveLayerDown() {
		let tempScene = getCurrentScene();
		if (selectedLayer === undefined || selectedLayer === 0) return;
		[
			tempScene[$statsScene].layers[selectedLayer],
			tempScene[$statsScene].layers[selectedLayer - 1],
		] = [
			tempScene[$statsScene].layers[selectedLayer - 1],
			tempScene[$statsScene].layers[selectedLayer],
		];
		const index = getCurrentSceneIndex();
		$obs.scenes[index] = tempScene;
		selectedLayer -= 1;
		updateObs();
	}

	function deleteLayer() {
		let tempScene = getCurrentScene();
		if (!tempScene || selectedLayer === undefined) return;
		tempScene[$statsScene].layers.splice(selectedLayer, 1);
		const index = getCurrentSceneIndex();
		$obs.scenes[index] = tempScene;
		selectedLayer = 0;
		updateObs();
	}

	// TODO: Display scene name
	// TODO: If scene doesn't exist - redirect

	function calculateBoardHeight(value: number) {
		boardHeight = 225;
		if (value > 1280) boardHeight = 280;
		if (value > 1536) boardHeight = 340;
		if (value > 1800) boardHeight = 390;
		if (value > 2000) boardHeight = 450;
		if (value > 2200) boardHeight = 505;
	}
</script>

<svelte:window bind:innerWidth />

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-full grid grid-cols-2 px-16">
		<div class="w-full h-full col-span-1 grid justify-center content-center">
			<Preview bind:boardHeight />
		</div>

		<div class="w-[400px] xl:w-[500px] 2xl:w-full h-full grid justify-center content-center">
			<div class="grid gap-2 mb-4">
				<SceneEdit />
				<LayerEdit bind:scene bind:selectedLayer />
				<SelectedEditor bind:selectedId bind:selectedLayer />
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={() => {
						isElementModalOpen = true;
					}}
				>
					Add new element
				</button>
			</div>
			<div
				class={`w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] border-4 border-zinc-700 overflow-hidden`}
			>
				<BoardEdit bind:height={boardHeight} bind:layer={selectedLayer} bind:selectedId />
			</div>
			<SceneSelect />
		</div>
	</div>
	<NewElementModal bind:open={isElementModalOpen} bind:layer={selectedLayer} />
</main>
