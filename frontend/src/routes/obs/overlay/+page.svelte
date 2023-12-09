<script lang="ts">
	import { isElectron, isMobile, overlays } from '$lib/utils/store.svelte';
	import { fade, fly } from 'svelte/transition';
	import OverlayModal from '$lib/components/custom/OverlayModal.svelte';
	import OverlayPreviewModal from '$lib/components/custom/OverlayPreviewModal.svelte';
	import type { Overlay } from '$lib/models/types/overlay';
	import { getOverlayById } from '$lib/components/custom/edit/OverlayHandler.svelte';

	let newOverlayModalOpen = false;
	let overlayPreviewOpen = false;

	const openPreview = async (overlayId: string) => {
		selectedOverlay = await getOverlayById(overlayId);
		overlayPreviewOpen = true;
	};

	let selectedOverlay: Overlay | undefined = undefined;
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div
		class={`w-full h-full py-8 px-2 gap-4 md:px-18 flex flex-col justify-between items-center ${
			$isMobile && 'pb-18'
		}`}
	>
		<div>
			<h1 class="text-4xl font-bold text-white shadow-md">Overlays</h1>
		</div>
		<div
			class="flex-1 flex flex-wrap gap-4 w-full items-center justify-evenly overflow-auto py-4 border border-gray-500 rounded-md p-4"
		>
			{#each $overlays.sort((a, b) => a.title.localeCompare(b.title)) ?? [] as overlay, i}
				<div in:fly={{ duration: 250, y: 50, delay: i * 50 }}>
					<button
						class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 min-h-[5rem] my-4"
						on:click={() => {
							openPreview(overlay.id);
						}}
					>
						{overlay.title}
					</button>
				</div>
			{/each}
		</div>
		<div>
			{#if $isElectron}
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 text-3xl font-semibold text-white text-md whitespace-nowrap p-4 border border-white rounded"
					on:click={() => (newOverlayModalOpen = true)}
				>
					Add new
				</button>
			{/if}
		</div>
	</div>
	{#if selectedOverlay}
		<OverlayPreviewModal bind:open={overlayPreviewOpen} overlay={selectedOverlay} />
	{/if}

	<OverlayModal bind:open={newOverlayModalOpen} />
</main>
