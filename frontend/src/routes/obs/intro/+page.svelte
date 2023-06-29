<script lang="ts">
	import { electronEmitter } from '$lib/utils/store.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	// TODO: Create intro on how to create and apply custom components in OBS
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-72 grid grid-cols-2 justify-center content-center">
		<div class="col-span-1 grid justify-center content-center">
			<h1 class="text-white">Left</h1>
		</div>
		<div class="col-span-1 grid justify-center content-center">
			<h1 class="text-white">right</h1>
		</div>
	</div>
</main>

<style>
</style>
