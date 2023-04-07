<script lang="ts">
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import BackButton from '$lib/components/navbar/BackButton.svelte';
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
	<div class="w-full h-full pt-8 px-2 md:px-18 grid justify-center content-center">
		<h1 class="text-white text-1xl">List of custom scenes</h1>
	</div>
</main>

<style>
</style>
