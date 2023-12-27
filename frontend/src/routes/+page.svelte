<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '$lib/Logo.svelte';
	import { gameState, memoryReadController } from '$lib/utils/store.svelte';
</script>

<main
	class="fixed h-screen w-screen place-items-center bg-black bg-cover bg-center text-center"
	style="background-image: url('/image/backgrounds/MeleeWallpaper.png'); padding: 0"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="grid grid-flow-row gap-4 justify-center">
		Game State: {$gameState}
	</div>
	<div class="fixed place-items-center grid h-screen w-screen bg-gradient-to-t from-black z-40">
		<Logo />
	</div>
</main>
