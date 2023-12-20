<script lang="ts">
	import { fade } from 'svelte/transition';
	import { isAuthorized } from '$lib/utils/store.svelte';

</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class={`w-full h-full  px-2 gap-4 flex flex-col justify-between items-center`}>
		<div>
			<h1 class="text-4xl font-bold text-white shadow-md">OBS - Settings</h1>
		</div>
		<div
			class="flex-1 flex flex-col flex-wrap gap-4 w-full items-center justify-start overflow-auto py-4 border border-gray-500 rounded-md p-4"
		>
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-bold text-white shadow-md text-center">Scene Switching</h1>
			<div class="flex justify-between gap-8">
				<h1 class="text-xl text-white">Slippi - Scene</h1>
				<h1 class="text-xl text-white">Waiting</h1>
			</div>
			<div class="flex justify-between gap-2">
				<h1 class="text-xl text-white">Scene</h1>
				<h1 class="text-xl text-white">None</h1>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-bold text-white shadow-md">Controller Commands</h1>
			<div class="flex justify-between">
				<h1 class="text-xl text-white">a/b/x/y/z/l/r/du/dd/dl/dr</h1>
				<h1 class="text-xl text-white">second</h1>
			</div>
		</div>
	</div>
</main>

<style>
</style>
