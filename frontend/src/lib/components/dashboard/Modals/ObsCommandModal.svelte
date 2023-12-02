<script lang="ts">
	import SceneSelect from '$lib/components/custom/selector/SceneSelect.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	export let open: boolean;
</script>

<Modal
	bind:open
	on:close={() => (open = false)}
	class="w-[95vw] max-w-[600px] min-w-72 flex justify-center"
>
	<div
		class="w-full h-full min-w-lg flex flex-col justify-between gap-8 bg-cover bg-center rounded-md border border-zinc-700 p-8"
		style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	>
		<div class="flex flex-col gap-2">
			<div class="flex gap-2 justify-center items-center">
				<h1 class="text-white text-3xl font-semibold">Obs Scenes</h1>
			</div>
			<div class="flex gap-2 justify-center items-center">
				<h1 class="text-white text-xl font-semibold">
					Disable Automatic Scene Switching: ??
				</h1>
			</div>
			<div class="flex flex-col gap-2">
				<h1 class="text-white text-xl font-semibold">Change Scene</h1>
				<SceneSelect />
			</div>
			<div class="flex flex-col gap-2">
				<h1 class="text-white text-xl font-semibold">Volume Control</h1>
			</div>
			<div class="flex flex-col gap-2">
				<h1 class="text-white text-xl font-semibold">Webcam Control</h1>
			</div>
		</div>
	</div>
</Modal>
