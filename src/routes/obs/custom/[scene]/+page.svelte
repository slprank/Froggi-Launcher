<script lang="ts">
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	const scene = $page.params.scene;

	// TODO: List all custom made components
	// Clicking on an element should direct to a preview
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<h6 class="text-white text-6xl">List of custom scenes</h6>
</main>

<style>
</style>
