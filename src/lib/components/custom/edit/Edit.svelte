<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import { LiveStatsScene } from '$lib/types/enum';
	import BoardEdit from '$lib/components/custom/edit/BoardEdit.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import { generateNewItem, getNewOverlay } from './CreateOverlay.svelte';
	import Preview from './Preview.svelte';
	import NewElementModal from '$lib/components/custom/edit/NewElementModal.svelte';
	import SelectedEditor from './SelectedEditor.svelte';
	import type { Overlay } from '$lib/types/types';
	import LayerEdit from '$lib/components/custom/edit/LayerEdit.svelte';
	import { setContext } from 'svelte';
	import SceneSelect from '../selector/SceneSelect.svelte';
	import SceneEditModal from './SceneEditModal.svelte';

	setContext('layer', { newLayer, moveLayerDown, moveLayerUp, deleteLayer });
	setContext('custom-obs', { updateObs, refreshOverlay });

	const overlayId = parseInt($page.params.overlay);

	let selectedLayer: number | undefined = 0;
	let selectedId: string | undefined = undefined;
	let overlay: Overlay = getCurrentOverlay();

	console.log('overlay', overlay);

	let isElementModalOpen = false;
	let isSceneModalOpen = false;

	let boardHeight: number;
	let innerWidth: number;

	function createNewOverlay() {
		if (overlay) return;
		const newId = Math.max(...$obs.overlays.map((s) => s.id)) ?? 1;
		$obs.overlays.push(getNewOverlay(newId));
		// $obs.overlays[0] = getNewOverlay(1); // Remove this
		$eventEmitter.emit('electron', 'update-custom-components', $obs);
	}
	createNewOverlay();

	$: calculateBoardHeight(innerWidth);

	function getCurrentOverlay(): Overlay {
		return $obs.overlays.find((overlay) => overlay.id === overlayId) ?? ({} as Overlay);
	}

	function getCurrentOverlayIndex(): number {
		let curOverlay = getCurrentOverlay();
		return $obs.overlays.indexOf(curOverlay);
	}

	function refreshOverlay() {
		overlay = getCurrentOverlay();
	}
	$: $obs, isElementModalOpen, refreshOverlay();

	function updateObs() {
		$eventEmitter.emit('electron', 'update-custom-components', $obs);
	}

	function newLayer() {
		let tempOverlay = getCurrentOverlay();
		if (!tempOverlay) return;
		tempOverlay[$statsScene].layers.push([]);
		const index = getCurrentOverlayIndex();
		$obs.overlays[index] = tempOverlay;
		selectedLayer = tempOverlay[$statsScene].layers.length - 1;
		updateObs();
	}

	function moveLayerUp() {
		let tempOverlay = getCurrentOverlay();
		if (
			selectedLayer === undefined ||
			selectedLayer >= tempOverlay[$statsScene].layers.length - 1
		)
			return;
		[
			tempOverlay[$statsScene].layers[selectedLayer],
			tempOverlay[$statsScene].layers[selectedLayer + 1],
		] = [
			tempOverlay[$statsScene].layers[selectedLayer + 1],
			tempOverlay[$statsScene].layers[selectedLayer],
		];
		const index = getCurrentOverlayIndex();
		$obs.overlays[index] = tempOverlay;
		selectedLayer += 1;
		updateObs();
	}

	function moveLayerDown() {
		let tempOverlay = getCurrentOverlay();
		if (selectedLayer === undefined || selectedLayer === 0) return;
		[
			tempOverlay[$statsScene].layers[selectedLayer],
			tempOverlay[$statsScene].layers[selectedLayer - 1],
		] = [
			tempOverlay[$statsScene].layers[selectedLayer - 1],
			tempOverlay[$statsScene].layers[selectedLayer],
		];
		const index = getCurrentOverlayIndex();
		$obs.overlays[index] = tempOverlay;
		selectedLayer -= 1;
		updateObs();
	}

	function deleteLayer() {
		let tempOverlay = getCurrentOverlay();
		if (!tempOverlay || selectedLayer === undefined) return;
		tempOverlay[$statsScene].layers.splice(selectedLayer, 1);
		const index = getCurrentOverlayIndex();
		$obs.overlays[index] = tempOverlay;
		selectedLayer = 0;
		updateObs();
	}

	// TODO: Display overlay name
	// TODO: If overlay doesn't exist - redirect

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

		<div
			class="w-[400px] xl:w-[500px] 2xl:w-full h-full grid gap-2 justify-center content-center"
		>
			<div class="grid gap-2">
				<h1 class="text-gray-500 text-lg font-medium text-shadow">Overlay</h1>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
					on:click={() => {
						isSceneModalOpen = true;
					}}
				>
					Edit
				</button>
				<LayerEdit bind:overlay bind:selectedLayer />
				<SelectedEditor bind:selectedId bind:selectedLayer />
			</div>
			<div
				class={`w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] outline outline-4 outline-zinc-700 overflow-hidden shadow-md`}
			>
				<BoardEdit bind:height={boardHeight} bind:layer={selectedLayer} bind:selectedId />
			</div>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				on:click={() => {
					isElementModalOpen = true;
				}}
			>
				Add new element
			</button>
			<SceneSelect />
		</div>
	</div>
	<NewElementModal bind:open={isElementModalOpen} bind:layer={selectedLayer} />
	<SceneEditModal bind:open={isSceneModalOpen} bind:overlay />
</main>
