<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import BoardEdit from '$lib/components/custom/edit/BoardEdit.svelte';
	import {
		getNewOverlay,
		getOverlayById,
	} from '$lib/components/custom/edit/OverlayHandler.svelte';
	import Preview from './Preview.svelte';
	import NewElementModal from '$lib/components/custom/edit/NewElementModal.svelte';
	import SelectedEditor from './SelectedEditor.svelte';
	import type { Overlay } from '$lib/types/types';
	import LayerEdit from '$lib/components/custom/edit/LayerEdit.svelte';
	import SceneSelect from '../selector/SceneSelect.svelte';
	import SceneEditModal from './SceneEditModal.svelte';

	const overlayId = $page.params.overlay;

	let selectedLayer: number | undefined = 0;
	let selectedId: string | undefined = undefined;
	let overlay: Overlay;

	let isElementModalOpen = false;
	let isSceneModalOpen = false;

	let boardHeight: number;
	let innerWidth: number;

	$: calculateBoardHeight(innerWidth);

	function resetSelectedLayer() {
		selectedLayer = 0;
	}
	$: $statsScene, resetSelectedLayer();

	async function refreshOverlay() {
		console.log('here');
		overlay = await getOverlayById(overlayId);
		console.log(overlay, 'after');
	}
	$: $obs, isElementModalOpen, refreshOverlay();

	function downloadOverlay() {
		$eventEmitter.emit('electron', 'download-overlay', overlayId);
	}

	$: console.log(overlay, overlayId);

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
	{#if overlay}
		<div class="w-full h-full grid grid-cols-2 px-16">
			<div class="w-full h-full col-span-1 grid justify-center content-center">
				<Preview bind:boardHeight />
			</div>

			<div
				class="w-[400px] xl:w-[500px] 2xl:w-full h-full grid gap-2 justify-center content-center"
			>
				<div class="grid gap-2">
					<h1 class="text-gray-500 text-lg font-medium text-shadow">Overlay</h1>
					<div class="flex gap-2">
						<button
							class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={() => {
								isSceneModalOpen = true;
							}}
						>
							Edit
						</button>
						<button
							class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={downloadOverlay}
						>
							Share
						</button>
					</div>
					<LayerEdit bind:overlay bind:selectedLayer />
					<SelectedEditor bind:selectedId bind:selectedLayer />
				</div>
				<div
					class={`w-[400px] h-[225px] xl:w-[500px] xl:h-[280px] 2xl:w-[600px] 2xl:h-[340px] 3xl:w-[700px] 3xl:h-[390px] 4xl:w-[800px] 4xl:h-[450px] 5xl:w-[900px] 5xl:h-[505px] outline outline-4 outline-zinc-700 overflow-hidden shadow-md`}
				>
					<BoardEdit
						bind:height={boardHeight}
						bind:layer={selectedLayer}
						bind:selectedId
					/>
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
	{/if}
</main>
