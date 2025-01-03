<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '$lib/Logo.svelte';
</script>

<main
	class="fixed flex w-screen h-screen justify-center items-center background-primary-color"
	in:fade={{ delay: 50, duration: 150 }}
	out:fade={{ duration: 300 }}
>
	<Logo />
</main>
