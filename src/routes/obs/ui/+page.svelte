<script lang="ts">
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	// TODO: Create list of UI elements to preview
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-full grid justify-center content-center">
		<h1 class="text-white text-xl">Custom UI Elements</h1>
	</div>
</main>

<style>
</style>
