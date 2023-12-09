<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import {
		currentOverlayEditor,
		electronEmitter,
		localEmitter,
		overlays,
		statsScene,
	} from '$lib/utils/store.svelte';
	import BoardEdit from '$lib/components/custom/edit/BoardEdit.svelte';
	import { getOverlayById, newId } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import Preview from './Preview.svelte';
	import ElementModal from '$lib/components/custom/edit/ElementModal.svelte';
	import SelectedEditor from './SelectedEditor.svelte';
	import type { Overlay } from '$lib/models/types/overlay';
	import LayerEdit from '$lib/components/custom/edit/LayerEdit.svelte';
	import SceneSelect from '../selector/SceneSelect.svelte';
	import SceneEditModal from './SceneEditModal.svelte';
	import LayerToggle from '../preview/LayerToggle.svelte';
	import PreviewModal from './PreviewModal.svelte';
	import EmbedModal from './EmbedModal.svelte';

	const overlayId = $page.params.overlay;

	$: selectedLayer = 0;
	let selectedItemId: string | undefined = undefined;
	let overlay: Overlay | undefined;

	let isElementModalOpen = false;
	let isSceneModalOpen = false;
	let isPreviewModalOpen = false;
	let isEmbedModalOpen = false;

	function resetSelectedLayer() {
		selectedLayer = 0;
	}
	$: $statsScene, resetSelectedLayer();

	async function refreshOverlay() {
		overlay = await getOverlayById(overlayId);
	}
	$: $overlays, refreshOverlay();

	function downloadOverlay() {
		$electronEmitter.emit('OverlayDownload', overlayId);
	}

	$localEmitter.on('LayerPreviewChange', (layerIndex: number) => {
		selectedLayer = layerIndex;
	});

	let innerWidth: number;
	$: displayPreview = innerWidth > 1024;

	$: boardWidthEdit = Math.floor(innerWidth - (displayPreview ? 560 : 144));
	$: boardHeightEdit = Math.floor(
		(boardWidthEdit / (overlay?.aspectRatio.width ?? 0)) * (overlay?.aspectRatio.height ?? 0),
	);
</script>

<svelte:window bind:innerWidth />

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
>
	{#if overlay && boardHeightEdit && boardWidthEdit}
		<div class={`w-full h-full justify-center flex gap-4`}>
			{#if displayPreview}
				<div class="h-[95vh] flex flex-col justify-center content-center w-[400px] gap-4">
					<div
						class="w-full"
						style={`aspect-ratio: ${overlay?.aspectRatio.width}/${overlay?.aspectRatio.height}`}
					>
						<Preview />
					</div>
					<div class="w-full flex-1">
						<LayerToggle />
					</div>
				</div>
			{/if}

			<div
				class={`w-full h-full flex-1 flex flex-col gap-2 justify-center items-center py-2 overflow-scroll`}
			>
				<div class="grid gap-2">
					<h1 class="text-gray-500 text-lg font-medium text-shadow">Overlay</h1>
					<div class="flex gap-2">
						<button
							class="transition bg-black bg-opacity-30 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={() => {
								isSceneModalOpen = true;
							}}
						>
							Edit
						</button>
						<button
							class="transition bg-black bg-opacity-30 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={downloadOverlay}
						>
							Share
						</button>
						<button
							class="transition bg-black bg-opacity-30 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={() => (isPreviewModalOpen = true)}
						>
							Preview
						</button>
						<button
							class="transition bg-black bg-opacity-30 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={() => (isEmbedModalOpen = true)}
						>
							Embed
						</button>
					</div>
					{#if !displayPreview}
						<LayerEdit bind:overlay bind:selectedLayer />
					{/if}
					<SelectedEditor bind:selectedItemId bind:selectedLayer />
				</div>
				<div
					style={`width: ${boardWidthEdit}px; height: ${boardHeightEdit}px;`}
					class={`border-2 border-zinc-700 overflow-hidden shadow-md`}
				>
					<BoardEdit
						bind:borderHeight={boardHeightEdit}
						bind:layer={selectedLayer}
						bind:selectedItemId
					/>
				</div>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={() => {
						selectedItemId = newId();
						isElementModalOpen = true;
					}}
				>
					Add new element
				</button>
				<SceneSelect />
			</div>
		</div>
		<ElementModal bind:open={isElementModalOpen} bind:layer={selectedLayer} {selectedItemId} />
		<SceneEditModal bind:open={isSceneModalOpen} bind:overlay />
	{/if}
	<PreviewModal bind:open={isPreviewModalOpen} />
	<EmbedModal bind:open={isEmbedModalOpen} />
</main>
