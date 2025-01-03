<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '$lib/Logo.svelte';
	import { gameState } from '$lib/utils/store.svelte';
</script>

<main
	class="fixed h-screen w-screen place-items-center bg-black bg-cover bg-center text-center background-primary-color"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<div class="fixed place-items-center grid h-screen w-screen z-40">
		<Logo />
	</div>
</main>
