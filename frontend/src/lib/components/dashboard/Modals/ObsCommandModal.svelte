<script lang="ts">
	import SceneSelect from '$lib/components/obs/overlays/selector/SceneSelect.svelte';
	import ObsSceneSelect from '$lib/components/dashboard/ObsCommands/ObsSceneSelect.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import ObsItemControl from '../ObsCommands/ObsItemControl.svelte';
	import ObsVolumeControl from '../ObsCommands/ObsVolumeControl.svelte';

	export let open: boolean;
</script>

<Modal
	bind:open
	on:close={() => (open = false)}
	class="w-[95vw] max-w-[600px] min-w-72 flex justify-center"
>
	<div
		class="w-full h-full max-h-[80vh] min-w-lg flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8"
		style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	>
		<div class="flex gap-2 justify-center items-center">
			<h1 class="text-white text-3xl font-semibold shadow-md">Obs Settings</h1>
		</div>
		<div class="flex flex-col gap-8 overflow-scroll">
			<div class="flex flex-col gap-2">
				<h1 class="text-white text-xl font-semibold shadow-md">Change Overlay Scene:</h1>
				<SceneSelect />
				<h1 class="text-gray-700 text-xl font-semibold">
					Disable Automatic Scene Switching: Todo
				</h1>
			</div>
			<div>
				<h1 class="text-white text-xl font-semibold shadow-md">Change OBS Scene:</h1>
				<ObsSceneSelect />
			</div>
			<div class="flex flex-col gap-2">
				<h1 class="text-white text-xl font-semibold shadow-md">Scene Items Control:</h1>
				<ObsItemControl />
			</div>
			<div class="flex flex-col gap-2">
				<h1 class="text-white text-xl font-semibold shadow-md">Volume Control:</h1>
				<ObsVolumeControl />
			</div>
		</div>
	</div>
</Modal>
