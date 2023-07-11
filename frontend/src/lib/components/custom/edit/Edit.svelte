<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { eventEmitter, obs, statsScene, urls } from '$lib/utils/store.svelte';
	import BoardEdit from '$lib/components/custom/edit/BoardEdit.svelte';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';
	import Preview from './Preview.svelte';
	import NewElementModal from '$lib/components/custom/edit/NewElementModal.svelte';
	import SelectedEditor from './SelectedEditor.svelte';
	import type { Overlay } from '$lib/models/types';
	import LayerEdit from '$lib/components/custom/edit/LayerEdit.svelte';
	import SceneSelect from '../selector/SceneSelect.svelte';
	import SceneEditModal from './SceneEditModal.svelte';
	import Clipboard from 'svelte-clipboard';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import LayerToggle from '../preview/LayerToggle.svelte';
	import PreviewModal from './PreviewModal.svelte';

	const overlayId = $page.params.overlay;

	let selectedLayer: number | undefined = 0;
	let selectedId: string | undefined = undefined;
	let overlay: Overlay;

	let isElementModalOpen = false;
	let isSceneModalOpen = false;
	let isPreviewModalOpen = false;

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

	$: localUrl = `${$urls?.local}/obs/custom/${overlayId}`;
	$: externalUrl = `${$urls?.external}/obs/custom/${overlayId}`;

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
	{#if overlay}
		<div
			class={`w-full h-full grid px-16 justify-center`}
			style={`grid-template-columns: repeat(${gridCols}, minmax(0, 1fr));`}
		>
			{#if displayPreview}
				<div class="w-full h-full col-span-1 grid justify-center content-center">
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
						<button
							class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
							on:click={() => (isPreviewModalOpen = true)}
						>
							Preview
						</button>
						<div class="grid grid-flow-row">
							<div class="flex items-center gap-2">
								<h1 class="text-gray-500 text-sm font-medium text-shadow">
									External Url
								</h1>
								<Clipboard
									text={`${externalUrl}/preview`}
									let:copy
									on:copy={() => {
										notifications.success('Copied to clipboard!', 2000);
									}}
								>
									<button
										on:click={copy}
										class="w-5 h-5 invert transition hover:scale-110"
									>
										<img src="/image/button-icons/copy.png" alt="copy" />
									</button>
								</Clipboard>
							</div>
							<div class="flex items-center gap-2">
								<h1 class="text-gray-500 text-sm font-medium text-shadow">
									Local Url
								</h1>
								<Clipboard
									text={`${localUrl}/preview`}
									let:copy
									on:copy={() => {
										notifications.success('Copied to clipboard!', 2000);
									}}
								>
									<button
										on:click={copy}
										class="w-5 h-5 invert transition hover:scale-110"
									>
										<img src="/image/button-icons/copy.png" alt="copy" />
									</button>
								</Clipboard>
							</div>
						</div>
					</div>
					<LayerEdit bind:overlay bind:selectedLayer />
					<SelectedEditor bind:selectedId bind:selectedLayer />
				</div>
				<div
					style={`width: ${boardWidthEdit}px; height: ${boardHeightEdit}px;`}
					class={`border-2 border-zinc-700 overflow-hidden shadow-md`}
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
	<PreviewModal bind:open={isPreviewModalOpen} />
</main>
