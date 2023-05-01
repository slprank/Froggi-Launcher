<script lang="ts">
	import { eventEmitter, obs } from '$lib/utils/store.svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import NewOverlayModal from '$lib/components/custom/NewOverlayModal.svelte';
	import ConfirmModal from '$lib/components/ConfirmModal.svelte';

	let deleteOverlayModalOpen = false;
	let newOverlayModalOpen = false;

	let overlayId: string | undefined = undefined;

	$: console.log('yupp', $obs);

	function deleteOverlay() {
		if (!overlayId) return;
		$eventEmitter.emit('electron', 'delete-custom-overlay', overlayId);
	}
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-full pt-8 px-2 md:px-18 grid justify-center content-center">
		{#each $obs?.overlays ?? [] as overlay}
			<div class="flex gap-2" in:fly={{ duration: 250, y: 50 }}>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
					on:click={() => goto(`/obs/custom/${overlay.id}`)}
				>
					{overlay.title}
				</button>
				<button
					class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
					on:click={() => {
						deleteOverlayModalOpen = true;
						overlayId = overlay.id;
					}}
				>
					Delete
				</button>
			</div>
		{/each}
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-24 h-10 px-2 xl:text-xl border border-white rounded"
			on:click={() => (newOverlayModalOpen = true)}
		>
			Add new
		</button>
	</div>
	<ConfirmModal bind:open={deleteOverlayModalOpen} on:confirm={deleteOverlay} />
	<NewOverlayModal bind:open={newOverlayModalOpen} />
</main>
