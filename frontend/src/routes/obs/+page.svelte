<script lang="ts">
	import { goto } from '$app/navigation';
	import { electronEmitter } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-full grid justify-center content-center md:px-18 p-8">
		<div class="grid justify-center content-center grid-flow-row h-full w-full">
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
			>
				Getting started
			</button>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
				on:click={() => goto('/obs/custom')}
			>
				Custom components
			</button>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
				on:click={() => goto('/obs/ui')}
			>
				Custom UI
			</button>
		</div>
	</div>
</main>

<style>
</style>
