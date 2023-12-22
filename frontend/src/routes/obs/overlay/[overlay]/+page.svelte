<script lang="ts">
	import MainOverlay from '$lib/components/obs/overlays/MainOverlay.svelte';
	import SecondaryOverlay from '$lib/components/obs/overlays/SecondaryOverlay.svelte';
	import { isElectron } from '$lib/utils/store.svelte';
</script>

{#if $isElectron}
	<MainOverlay />
{:else}
	<SecondaryOverlay />
{/if}
