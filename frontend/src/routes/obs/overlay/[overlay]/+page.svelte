<script lang="ts">
	import MainOverlay from '$lib/components/obs/overlays/MainOverlay.svelte';
	import SecondaryOverlay from '$lib/components/obs/overlays/SecondaryOverlay.svelte';
	import { electronEmitter, isElectron } from '$lib/utils/store.svelte';
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		if (!$isElectron) return;
		$electronEmitter.emit('CleanupCustomResources');
	});
</script>

{#if $isElectron}
	<MainOverlay />
{:else}
	<SecondaryOverlay />
{/if}
