<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { electronEmitter, localEmitter, overlays, statsScene } from '$lib/utils/store.svelte';
	import BoardEdit from '$lib/components/obs/overlays/edit/BoardEdit.svelte';
	import { getOverlayById } from '$lib/components/obs/overlays/edit/OverlayHandler.svelte';
	import Preview from './Preview.svelte';
	import ElementModal from '$lib/components/obs/overlays/edit/ElementModal.svelte';
	import SelectedEditor from './SelectedEditor.svelte';
	import type { Overlay } from '$lib/models/types/overlay';
	import LayerEdit from '$lib/components/obs/overlays/edit/LayerEdit.svelte';
	import SceneSelect from '../selector/SceneSelect.svelte';
	import SceneEditModal from './SceneEditModal.svelte';
	import LayerToggle from '../preview/LayerToggle.svelte';
	import PreviewModal from './PreviewModal.svelte';
	import EmbedModal from './EmbedModal.svelte';
	import { newId } from '$lib/utils/helper';

	const overlayId = $page.params.overlay;

	let selectedLayer: number = 0;
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

	let innerWidth: number;
	let innerHeight: number;
	$: displayPreview = innerWidth > 1024;

	$: isVertical = (overlay?.aspectRatio.height ?? 0) > (overlay?.aspectRatio.width ?? 0);
	$: horizontalWidth = Math.floor(innerWidth - (displayPreview ? 580 : 144));
	$: horizontalHeight = Math.floor((horizontalWidth / 16) * 9);

	$: verticalHeight = innerHeight - (displayPreview ? 320 : 400);
	$: verticalWidth =
		(verticalHeight * (overlay?.aspectRatio.width ?? 0)) / (overlay?.aspectRatio.height ?? 0);

	$: boardWidth = isVertical ? verticalWidth : horizontalWidth;
	$: boardHeight = isVertical ? verticalHeight : horizontalHeight;

	$: console.log({ boardWidth, horizontalHeight, verticalWidth });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
>
	{#if overlay && boardHeight && boardWidth}
		<div class={`w-full h-full justify-center flex gap-4`}>
			{#if displayPreview}
				<div
					class="h-[96vh] p-2[rem] flex flex-col justify-start items-center gap-4 overflow-hidden"
				>
					<div
						class="flex"
						style={`min-height: ${
							((isVertical ? 350 : 400) * (overlay?.aspectRatio.height ?? 0)) /
							(overlay?.aspectRatio.width ?? 0)
						}px; min-width: ${isVertical ? 350 : 400}px`}
					>
						<Preview />
					</div>
					<div
						class="w-full border-2 border-zinc-700 bg-black bg-opacity-20 flex-1 overflow-hidden"
					>
						<LayerToggle />
					</div>
				</div>
			{/if}

			<div
				class={`max-w-full max-h-full flex-1 flex flex-col gap-2 justify-start items-center py-2 overflow-scroll`}
			>
				<div class="flex flex-col items-center">
					<h1 class="text-gray-500 text-lg font-medium text-shadow">Overlay</h1>
					<div class="flex gap-2 justify-center items-center">
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
					<SelectedEditor bind:selectedItemId />
				</div>
				<div
					style={`min-width: ${
						isVertical ? verticalWidth : boardWidth
					}px; min-height: ${boardHeight}px;`}
					class={`border-2 border-zinc-700 shadow-md`}
				>
					<BoardEdit bind:borderHeight={boardHeight} bind:selectedItemId />
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
