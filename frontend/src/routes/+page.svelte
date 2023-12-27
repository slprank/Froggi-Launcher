<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '$lib/Logo.svelte';
	import { gameFrame, memoryReadController } from '$lib/utils/store.svelte';
</script>

<main
	class="fixed h-screen w-screen place-items-center bg-black bg-cover bg-center text-center"
	style="background-image: url('/image/backgrounds/MeleeWallpaper.png'); padding: 0"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="grid grid-flow-row gap-4 justify-center">
		<h1>Memory:</h1>
		<div class="w-[80vw]">
			{JSON.stringify({ ...$memoryReadController[0], buttons: undefined })}
		</div>
		<div class="w-[80vw]">
			{JSON.stringify($memoryReadController[0]?.buttons)}
		</div>
		<h1>Player 1 - Slippi-Js</h1>
		<div class="w-[80vw]">
			{JSON.stringify($gameFrame?.players)}
		</div>
	</div>
	<div class="fixed place-items-center grid h-screen w-screen bg-gradient-to-t from-black z-40">
		<Logo />
	</div>
</main>
