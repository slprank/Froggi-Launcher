<script lang="ts">
	import { bmcOpen } from '$lib/components/bmc/BuyMeACoffeeModal.svelte';

	// Small yellow Buy Me a Coffee button for the sidebar — opens the shared modal.
</script>

<button class="bmc bmc-nav" on:click={() => bmcOpen.set(true)} aria-label="Buy me a coffee">
	<img src="/image/icons/bmc-cup.svg" alt="" />
</button>

<style>
	.bmc-nav {
		width: 2.5rem; height: 2.5rem; border-radius: 1rem; cursor: pointer;
		display: flex; align-items: center; justify-content: center;
	}
	.bmc-nav img { height: 1.35rem; }
</style>
