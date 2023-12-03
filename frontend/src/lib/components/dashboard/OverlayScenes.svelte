<script lang="ts">
	import ObsCommandModal from './Modals/ObsCommandModal.svelte';

	let isSceneObsModalOpen = false;
	let isSceneOverlayModalOpen = false;

	const openChangeObsSceneModal = () => {
		isSceneObsModalOpen = true;
	};
</script>

<div class="flex flex-col gap-2">
	<div class="flex gap-2 justify-center items-center">
		<h1 class="text-white text-3xl font-semibold">OBS Commands</h1>
	</div>
	<div class="flex flex-col gap-2">
		<button
			class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-[1.02] font-semibold text-white text-lg whitespace-nowrap h-10 px-2 xl:text-xl border rounded`}
			on:click={openChangeObsSceneModal}
		>
			OBS
		</button>
	</div>
</div>

<ObsCommandModal bind:open={isSceneObsModalOpen} />
