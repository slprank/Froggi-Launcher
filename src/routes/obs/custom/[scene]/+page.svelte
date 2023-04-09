<script lang="ts">
	import { eventEmitter, isElectron } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
	import Edit from '$lib/components/custom/Edit.svelte';
	import Board from '$lib/components/custom/Board.svelte';

	// TODO: Use the scene Id to display custom scene component
	// Electron should display a preview with URL to OBS
	// Everything else should fullscreen the component
	let innerHeight: number;
</script>

<svelte:window bind:innerHeight />

<main
	class="fixed h-screen w-screen bg-cover bg-center bg-transparent"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	{#if $isElectron}
		<Edit />
	{:else}
		<Board bind:height={innerHeight} />
	{/if}
</main>

<style>
</style>
