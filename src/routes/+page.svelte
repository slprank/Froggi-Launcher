<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '$lib/Logo.svelte';
	import { goto } from '$app/navigation';
	import { isElectron } from '$lib/utils/store.svelte';

	const agent = $isElectron ? 'Electron' : 'Browser';
</script>

<main
	class="h-screen w-screen place-items-center bg-cover bg-center"
	style="background-image: url('./background/MeleeWallpaper.png')"
	in:fade={{ delay: 150, duration: 150 }}
	out:fade={{ duration: 150 }}
>
	<div class="fixed place-items-center grid h-screen w-screen bg-gradient-to-t from-black z-40">
		<Logo />

		<h1>Hello {agent}!</h1>
	</div>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background-color: black;
	}

	main {
		text-align: center;
	}
</style>
