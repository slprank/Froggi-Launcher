<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { electronEmitter, localEmitter, obs, statsScene, urls } from '$lib/utils/store.svelte';
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
	let selectedId: string | undefined = undefined;
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
	$: $obs, refreshOverlay();

	function downloadOverlay() {
		$electronEmitter.emit('ObsCustomOverlayDownload', overlayId);
	}

	$localEmitter.on('LayerPreviewChange', (layerIndex: number) => {
		selectedLayer = layerIndex;
	});

	$: displayPreview = innerWidth > 1100;
	$: gridCols = displayPreview ? 3 : 2;

	$: innerWidth = 400;
	$: boardWidthEdit = Math.floor(((innerWidth - 160) / gridCols) * 2);
	$: boardHeightEdit = Math.floor((boardWidthEdit / 16) * 9);
	$: boardWidthPreview = Math.floor((innerWidth - 160) / gridCols);
	$: boardHeightPreview = Math.floor((boardWidthPreview / 16) * 9);
</script>

<svelte:window bind:innerWidth />

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
>
	{#if overlay && boardHeightEdit && boardWidthEdit}
		<div
			class={`w-full h-full grid px-16 justify-center`}
			style={`grid-template-columns: repeat(${gridCols}, minmax(0, 1fr));`}
		>
			{#if displayPreview}
				<div class="w-full h-full col-span-1 grid justify-center content-center px-1">
					<div class="w-full h-full grid">
						<Preview
							bind:boardWidth={boardWidthPreview}
							bind:boardHeight={boardHeightPreview}
						/>
						<div class="w-full h-80">
							<LayerToggle />
						</div>
					</div>
				</div>
			{/if}

			<div
				class={`w-full h-full col-span-2 grid gap-2 justify-center content-center py-2 overflow-x-scroll`}
			>
				<div class="grid gap-2">
					<h1 class="text-gray-500 text-lg font-medium text-shadow">Overlay</h1>
					<div class="flex gap-2">
						<button
							class="transition bg-black bg-opacity-30 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={() => {
								isSceneModalOpen = true;
							}}
						>
							Edit
						</button>
						<button
							class="transition bg-black bg-opacity-30 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={downloadOverlay}
						>
							Share
						</button>
						<button
							class="transition bg-black bg-opacity-30 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={() => (isPreviewModalOpen = true)}
						>
							Preview
						</button>
						<button
							class="transition bg-black bg-opacity-30 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={() => (isEmbedModalOpen = true)}
						>
							Embed
						</button>
					</div>
					{#if !displayPreview}
						<LayerEdit bind:overlay bind:selectedLayer />
					{/if}
					<SelectedEditor bind:selectedId bind:selectedLayer />
				</div>
				<div
					style={`width: ${boardWidthEdit}px; height: ${boardHeightEdit}px;`}
					class={`outline outline-zinc-700 overflow-hidden shadow-md`}
				>
					<BoardEdit
						bind:boardHeight={boardHeightEdit}
						bind:layer={selectedLayer}
						bind:selectedId
					/>
				</div>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
					on:click={() => {
						selectedId = newId();
						isElementModalOpen = true;
					}}
				>
					Add new element
				</button>
				<SceneSelect />
			</div>
		</div>
		<ElementModal bind:open={isElementModalOpen} bind:layer={selectedLayer} {selectedId} />
		<SceneEditModal bind:open={isSceneModalOpen} bind:overlay />
	{/if}
	<PreviewModal bind:open={isPreviewModalOpen} />
	<EmbedModal bind:open={isEmbedModalOpen} />
</main>
