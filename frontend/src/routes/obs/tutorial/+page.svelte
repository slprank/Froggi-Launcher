<script lang="ts">
	import { goto } from '$app/navigation';
	import { isAuthorized } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
</script>

<main
	class="fixed h-screen w-screen bg-cover bg-center"
	style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="w-full h-full flex flex-col justify-center items-center p-8">
		<div>
			<h1 class="text-white font-bold text-4xl">Tutorial</h1>
		</div>
		<div class="flex-1 flex flex-col justify-center items-center h-full w-full">
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
				on:click={() => goto('/obs/tutorial/new-overlay')}
			>
				Create a new overlay
			</button>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
				on:click={() => goto('/obs/tutorial/integrate-obs')}
			>
				Integrate with OBS
			</button>
			<button
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 font-semibold text-white text-xl py-2 px-4 border border-white rounded w-40 h-20 my-4"
				on:click={() => goto('/obs/tutorial/remote-obs')}
			>
				Remote control OBS
			</button>
		</div>
	</div>
</main>
