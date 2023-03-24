<script lang="ts">
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';

	// TODO add filter dropdowns
	// Add and generate 500 lines of dummy data
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('./background/MeleeMenuGreen.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-full place-items-start grid grid-cols-12 grid-rows-6 gap-2 px-2 md:px-20">
		<div class="w-full grid grid-cols-12 col-span-12 row-span-1 h-full gap-x-2">
			<div class="h-full border col-span-3" />
			<div class="h-full border col-span-3" />
			<div class="h-full border col-span-3" />
		</div>
		<div class="w-full h-full row-span-5 col-span-12 border">
			<div class="w-full h-12 border">Player</div>
		</div>
	</div>
</main>

<style>
</style>
