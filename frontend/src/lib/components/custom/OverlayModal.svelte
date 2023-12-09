<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import { electronEmitter } from '$lib/utils/store.svelte';
	import { getNewOverlay } from '$lib/components/custom/edit/OverlayHandler.svelte';

	function importOverlay() {
		$electronEmitter.emit('OverlayUpload');
		open = false;
	}

	function createHorizontalOverlay() {
		const overlay = getNewOverlay();
		$electronEmitter.emit('OverlayUpdate', overlay);
		open = false;
	}

	function createVerticalOverlay() {
		const overlay = getNewOverlay({ width: 9, height: 16 });
		$electronEmitter.emit('OverlayUpdate', overlay);
		open = false;
	}

	// TODO: Create button for pre-made overlays

	export let open = false;
</script>

<Modal bind:open on:close={() => (open = false)}>
	<div
		class="w-[400px] min-w-lg flex flex-col gap-4 justify-between bg-cover bg-center rounded-md border border-zinc-700 p-4"
		style="background-image: url('/image/backgrounds/MeleeMenuAll.png')"
	>
		<h1 class="text-center text-white text-2xl font-semibold text-shadow">New overlay</h1>
		<div class="flex flex-col flex-1 gap-4">
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				on:click={createHorizontalOverlay}
			>
				Create Blank - Horizontal
			</button>

			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				on:click={createVerticalOverlay}
			>
				Create Blank - Vertical
			</button>

			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
				on:click={importOverlay}
				data-tooltip="Import overlay"
			>
				Import
			</button>
		</div>
	</div>
</Modal>
