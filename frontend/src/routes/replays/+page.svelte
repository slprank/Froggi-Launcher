<script lang="ts">
	import { localEmitter } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<h6>Replays</h6>
</main>

<style>
</style>
