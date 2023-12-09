<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import NonInteractiveIFrame from './preview/NonInteractiveIFrame.svelte';
	import { urls, isElectron, statsScene } from '$lib/utils/store.svelte';
	import SceneSelect from './selector/SceneSelect.svelte';
	import ConfirmModal from '../ConfirmModal.svelte';
	import {
		deleteOverlay,
		duplicateOverlay,
		notifyDisabledScene,
	} from './edit/OverlayHandler.svelte';
	import { goto } from '$app/navigation';
	import type { Overlay } from '$lib/models/types/overlay';
	import EmbedModal from './edit/EmbedModal.svelte';

	export let open = false;
	export let overlay: Overlay | undefined;

	let deleteOverlayModalOpen = false;
	let isEmbedModalOpen = false;

	$: url = `${$isElectron ? $urls?.local : $urls.external}/obs/overlay/${overlay?.id}/layers`;

	const createDuplicateOverlay = () => {
		if (!overlay) return;
		duplicateOverlay(overlay);
		open = false;
	};

	const handleDelete = () => {
		deleteOverlay(overlay?.id);
		open = false;
	};

	$: $statsScene, notifyDisabledScene(overlay, $statsScene);
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="min-w-[80vw] min-h-[80vh] max-w-[95vw] max-h-[95vh] overflow-scroll flex flex-col gap-4 justify-between items-center bg-cover bg-center rounded-md border border-zinc-700 p-4"
		style="background-image: url('/image/backgrounds/MeleeMenuGreen.png')"
	>
		<div>
			<h1 class="font-bold text-3xl text-white">{overlay?.title}</h1>
		</div>
		<div class="aspect-video max-h-full max-w-[600px] w-full border-2 border-gray-500">
			<NonInteractiveIFrame src={url} title="overlay" />
		</div>
		<div>
			<SceneSelect />
		</div>
		<div class="flex gap-2">
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-36 h-20 my-4"
				on:click={() => {
					goto(`/obs/overlay/${overlay?.id}`);
				}}
			>
				Open
			</button>
			{#if $isElectron}
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-36 h-20 my-4"
					on:click={createDuplicateOverlay}
				>
					Duplicate
				</button>
			{/if}
			{#if $isElectron}
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-36 h-20 my-4"
					on:click={() => (isEmbedModalOpen = true)}
				>
					Embed
				</button>
			{/if}
			{#if !$isElectron}
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-36 h-18 my-4"
					on:click={() => {
						goto(`/obs/overlay/${overlay?.id}/layers/external`);
					}}
				>
					Edit Preview
				</button>
			{/if}
			{#if $isElectron}
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-36 h-20 my-4"
					on:click={() => {
						deleteOverlayModalOpen = true;
					}}
				>
					Delete
				</button>
			{/if}
		</div>
	</div>
	<ConfirmModal bind:open={deleteOverlayModalOpen} on:confirm={handleDelete}>
		Delete Overlay?
	</ConfirmModal>
	<EmbedModal overlayId={overlay?.id} bind:open={isEmbedModalOpen} />
</Modal>
