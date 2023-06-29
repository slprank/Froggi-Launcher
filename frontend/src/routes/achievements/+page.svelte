<script lang="ts">
	import { electronEmitter } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<h6>Achievements</h6>
</main>

<style>
</style>
