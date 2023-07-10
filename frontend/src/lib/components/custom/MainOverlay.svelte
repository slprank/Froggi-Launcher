<script lang="ts">
	import { isElectron, obs, statsScene } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
	import Edit from '$lib/components/custom/edit/Edit.svelte';
	import Board from '$lib/components/custom/Board.svelte';
	import { page } from '$app/stores';
	import CustomFontHandler from '$lib/components/custom/CustomFontHandler.svelte';

	export let isLayerSpecific: boolean = false;

	let isFontLoaded: boolean = false;
	const overlayId = $page.params.overlay;
	$: curOverlay = $obs?.overlays.find((overlay) => overlay.id === overlayId);
</script>

{#if curOverlay && isFontLoaded}
	<main
		class="fixed h-full w-full bg-cover bg-center bg-transparent"
		in:fade={{ delay: 50, duration: 150 }}
		out:fade={{ duration: 300 }}
	>
		{#if $isElectron}
			<Edit />
		{:else}
			{#key $statsScene}
				<Board {isLayerSpecific} />
			{/key}
		{/if}
	</main>
{/if}
{#if curOverlay}
	{#key curOverlay[$statsScene]?.font}
		<CustomFontHandler
			bind:base64={curOverlay[$statsScene].font.base64}
			bind:ready={isFontLoaded}
		/>
	{/key}
{/if}
