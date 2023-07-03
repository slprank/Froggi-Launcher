<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import BoardEdit from '$lib/components/custom/edit/BoardEdit.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import Preview from './Preview.svelte';
	import NewElementModal from '$lib/components/custom/edit/NewElementModal.svelte';
	import SelectedEditor from './SelectedEditor.svelte';
	import type { Overlay } from '$lib/models/types';
	import LayerEdit from '$lib/components/custom/edit/LayerEdit.svelte';
	import SceneSelect from '../selector/SceneSelect.svelte';
	import SceneEditModal from './SceneEditModal.svelte';

	const overlayId = $page.params.overlay;

	let selectedLayer: number | undefined = 0;
	let selectedId: string | undefined = undefined;
	let overlay: Overlay;

	let isElementModalOpen = false;
	let isSceneModalOpen = false;

	$: innerWidth = 400;
	$: boardWidthEdit = Math.floor(((innerWidth - 160) / 3) * 2);
	$: boardHeightEdit = Math.floor((boardWidthEdit / 16) * 9);
	$: boardWidthPreview = Math.floor((innerWidth - 160) / 3);
	$: boardHeightPreview = Math.floor((boardWidthPreview / 16) * 9);

	function resetSelectedLayer() {
		selectedLayer = 0;
	}
	$: $statsScene, resetSelectedLayer();

	async function refreshOverlay() {
		overlay = await getOverlayById(overlayId);
	}
	$: $obs, isElementModalOpen, refreshOverlay();

	function downloadOverlay() {
		$eventEmitter.emit('electron', 'download-overlay', overlayId);
	}

	// TODO: Display overlay name
	// TODO: If overlay doesn't exist - redirect
</script>

<svelte:window bind:innerWidth />

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	{#if overlay}
		<div class="w-full h-full grid grid-cols-3 px-16 min-w-2xl justify-center">
			<div class="w-full h-full col-span-1 grid justify-center content-center">
				<Preview
					bind:boardWidth={boardWidthPreview}
					bind:boardHeight={boardHeightPreview}
				/>
			</div>

			<div class={`w-full h-full col-span-2 grid gap-2 justify-center content-center`}>
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
					style={`width: ${boardWidthEdit}px; height: ${boardHeightEdit}px`}
					class={`w-[${boardWidthEdit}px] h-[${boardHeightEdit}px] outline outline-4 outline-zinc-700 overflow-hidden shadow-md`}
				>
					<BoardEdit
						bind:boardHeight={boardHeightEdit}
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
