<script lang="ts">
	import { overlays, statsScene } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
	import Board from '$lib/components/obs/overlays/Board.svelte';
	import { page } from '$app/stores';

	export let layerIds: string[] | undefined = undefined;
	export let preview: boolean = false;

	const overlayId = $page.params.overlay;
	$: curOverlay = $overlays[overlayId];
</script>

{#if curOverlay}
	<div
		class="fixed h-full w-full bg-cover bg-center"
		style="margin: 0; padding: 0"
		in:fade={{ delay: 50, duration: 150 }}
		out:fade={{ duration: 300 }}
	>
		<Board bind:curOverlay bind:layerIds {preview} />
	</div>
{/if}
