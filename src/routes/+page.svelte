<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '$lib/Logo.svelte';
	import { goto } from '$app/navigation';
	import { isElectron } from '$lib/utils/store.svelte';

	const agent = $isElectron ? 'Electron' : 'Browser';
</script>

<main
	class="fixed h-screen w-screen place-items-center bg-cover bg-center"
	style="background-image: url('./background/MeleeWallpaper.png')"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="fixed place-items-center grid h-screen w-screen bg-gradient-to-t from-black z-40">
		<Logo />
	</div>
</main>

<style>
	main {
		text-align: center;
	}
</style>
