<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { electronEmitter } from '$lib/utils/store.svelte';
	import { getNewOverlay } from '$lib/components/custom/edit/OverlayHandler.svelte';

	function importOverlay() {
		$electronEmitter.emit('OverlayUpload');
		open = false;
	}

	function createBlankOverlay() {
		const overlay = getNewOverlay();
		$electronEmitter.emit('OverlayUpdate', overlay);
		open = false;
	}

	// TODO: Create button for pre-made overlays

	export let open = false;
</script>

<Modal bind:open on:close={() => (open = false)} class="w-56 h-96 min-w-72 rounded-lg">
	<div
		class="w-full h-full min-w-lg flex flex-col justify-between bg-cover bg-center rounded-md border border-zinc-700 p-4"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<h1 class="text-center text-white text-2xl font-semibold text-shadow">New overlay</h1>
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
			on:click={createBlankOverlay}
		>
			Create Blank
		</button>

		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
			on:click={importOverlay}
			data-tooltip="Import overlay"
		>
			Import
		</button>
	</div>
</Modal>
