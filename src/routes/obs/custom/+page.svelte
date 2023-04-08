<script lang="ts">
	import { eventEmitter, obs } from '$lib/utils/store.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	const scene = $page.params.scene;

	// TODO: List all custom made components
	// Clicking on an element should direct to a preview
	// Components should be received from the global store
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-full pt-8 px-2 md:px-18 grid justify-center content-center">
		<button
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
			on:click={() => goto(`/obs/custom/${1}`)}
		>
			Scene 1
		</button>
		{#each $obs?.scenes ?? [] as scene}
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
				on:click={() => goto(`/obs/custom/${scene.id}`)}
			>
				{scene.title}
			</button>
		{/each}
	</div>
</main>

<style>
</style>
