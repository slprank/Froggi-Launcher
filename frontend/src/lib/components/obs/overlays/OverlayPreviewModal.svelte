<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import NonInteractiveIFrame from './preview/NonInteractiveIFrame.svelte';
	import {
		urls,
		isElectron,
		statsScene,
		isMobile,
		electronEmitter,
	} from '$lib/utils/store.svelte';
	import SceneSelect from './selector/SceneSelect.svelte';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';
	import {
		deleteOverlay,
		duplicateOverlay,
		notifyDisabledScene,
	} from './edit/OverlayHandler.svelte';
	import { goto } from '$app/navigation';
	import type { Overlay } from '$lib/models/types/overlay';
	import EmbedModal from './edit/EmbedModal.svelte';
	import { tooltip } from 'svooltip';

	export let open = false;
	export let overlay: Overlay | undefined;

	$: isHorizontal = (overlay?.aspectRatio.width ?? 0) > (overlay?.aspectRatio.height ?? 0);
	let deleteOverlayModalOpen = false;
	let isEmbedModalOpen = false;

	$: url = $isElectron ? $urls?.local : $urls.external;
	$: src = `${url}/obs/overlay/${overlay?.id}/layers`;

	function downloadOverlay() {
		if (!overlay) return;
		$electronEmitter.emit('OverlayDownload', overlay.id);
	}

	const createDuplicateOverlay = () => {
		if (!overlay) return;
		duplicateOverlay(overlay);
		open = false;
	};

	const handleDelete = () => {
		deleteOverlay(overlay?.id);
		open = false;
	};

	$: notifyDisabledScene(overlay, $statsScene);

	const availableClass =
		'transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-36 h-20 my-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-secondary';
	const unavailableInfo =
		'Cannot perform this action on a demo overlay, try duplicating it first.';

	let parentDiv: HTMLElement | undefined;
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="min-w-[80vw] min-h-[80vh] max-w-[80vw] max-h-[95vh] overflow-y-scroll flex flex-col gap-4 justify-between items-center bg-cover bg-center border-secondary rounded-md p-4 background-primary-color color-secondary"
	>
		<div>
			<h1 class="font-bold text-3xl">{overlay?.title}</h1>
		</div>
		<div
			class={`max-h-full max-w-full w-full h-full border-secondary`}
			style={`aspect-ratio: ${overlay?.aspectRatio.width}/${overlay?.aspectRatio.height}`}
			bind:this={parentDiv}
		>
			{#if url}
				<NonInteractiveIFrame {src} title="overlay" />
			{/if}
		</div>
		<SceneSelect />
		<div class="flex gap-2">
			{#if $isElectron}
				<button
					class={availableClass}
					disabled={overlay?.isDemo}
					use:tooltip={overlay?.isDemo
						? {
								content: `<p>${unavailableInfo}</p>`,
								html: true,
								placement: 'top',
								delay: [250, 0],
								offset: 25,
						  }
						: {}}
					on:click={() => {
						goto(`/obs/overlay/${overlay?.id}`);
					}}
				>
					Edit
				</button>
			{/if}
			{#if !$isElectron}
				<button
					class={availableClass}
					on:click={() => {
						goto(`/obs/overlay/${overlay?.id}`);
					}}
				>
					View
				</button>
			{/if}
			{#if $isElectron}
				<button class={availableClass} on:click={createDuplicateOverlay}>Duplicate</button>
			{/if}
			{#if $isElectron}
				<button class={availableClass} on:click={() => (isEmbedModalOpen = true)}>
					Embed
				</button>
			{/if}
			{#if $isElectron}
				<button
					class={availableClass}
					disabled={overlay?.isDemo}
					use:tooltip={overlay?.isDemo
						? {
								content: `<p>${unavailableInfo}</p>`,
								html: true,
								placement: 'top',
								delay: [250, 0],
								offset: 25,
						  }
						: {}}
					on:click={downloadOverlay}
				>
					Save
				</button>
			{/if}
			{#if !$isElectron}
				<button
					class={availableClass}
					disabled={overlay?.isDemo}
					use:tooltip={overlay?.isDemo
						? {
								content: `<p>${unavailableInfo}</p>`,
								html: true,
								placement: 'top',
								delay: [250, 0],
								offset: 25,
						  }
						: {}}
					on:click={() => {
						goto(`/obs/overlay/${overlay?.id}/layers/external`);
					}}
				>
					Edit Preview
				</button>
			{/if}
			{#if $isElectron}
				<button
					disabled={overlay?.isDemo}
					class={availableClass}
					use:tooltip={overlay?.isDemo
						? {
								content: `<p>${unavailableInfo}</p>`,
								html: true,
								placement: 'top',
								delay: [250, 0],
								offset: 25,
						  }
						: {}}
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
