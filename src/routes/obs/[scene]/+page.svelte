<script lang="ts">
	import { eventEmitter } from '$lib/utils/store.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	console.log($page.params);
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<h6>Scene</h6>
</main>

<style>
</style>
