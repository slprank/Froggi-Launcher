<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class={`w-full h-full  px-2 gap-4 flex flex-col justify-between items-center`}>
		<div>
			<h1 class="text-4xl font-bold text-white shadow-md">Settings</h1>
		</div>
		<div
			class="flex-1 flex flex-col flex-wrap gap-4 w-full items-center justify-start overflow-auto py-4 border border-gray-500 rounded-md p-4"
		>
			<h1 class="text-xl font-bold text-white shadow-md">Authentication</h1>
			<h1 class="text-xl font-bold text-white shadow-md">Scene Switching</h1>
			<h1 class="text-xl font-bold text-white shadow-md">Controller Commands</h1>
		</div>
	</div>
</main>

<style>
</style>
