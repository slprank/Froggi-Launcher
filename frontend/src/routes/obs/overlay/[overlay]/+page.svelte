<script lang="ts">
	import MainOverlay from '$lib/components/custom/MainOverlay.svelte';
	import SecondaryOverlay from '$lib/components/custom/SecondaryOverlay.svelte';
	import { isElectron } from '$lib/utils/store.svelte';
</script>

{#if $isElectron}
	<MainOverlay />
{:else}
	<SecondaryOverlay />
{/if}
