<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { getNewOverlay } from '$lib/components/custom/edit/OverlayHandler.svelte';

	function uploadOverlay() {
		$eventEmitter.emit('CustomOverlayUpload');
		open = false;
	}

	function createBlankOverlay() {
		const overlay = getNewOverlay();
		$eventEmitter.emit('CustomOverlayUpdate', overlay);
		open = false;
	}

	// TODO: Create button for pre-made overlays

	export let open = false;
</script>

<Modal bind:open on:close={() => (open = false)} class="w-56 h-96 min-w-72 rounded-lg">
	<div
		class="w-full h-full min-w-lg grid justify-center bg-cover bg-center rounded-md border border-zinc-700"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<div class="w-32 grid justify-center gap-4 py-4">
			<h1 class="text-center text-white text-xl font-medium text-shadow">New overlay</h1>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
				on:click={createBlankOverlay}
			>
				Create Blank
			</button>

			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
				on:click={uploadOverlay}
				data-tooltip="Upload a shared overlay"
			>
				Upload
			</button>
		</div>
	</div>
</Modal>
