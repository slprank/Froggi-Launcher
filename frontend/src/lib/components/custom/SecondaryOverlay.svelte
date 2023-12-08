<script lang="ts">
	import { overlays, statsScene } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
	import Board from '$lib/components/custom/Board.svelte';
	import { page } from '$app/stores';
	import { addFont } from '$lib/components/custom/CustomFontHandler.svelte';

	export let layerIds: string[] | undefined = undefined;
	export let preview: boolean = false;

	const overlayId = $page.params.overlay;
	$: curOverlay = $overlays.find((overlay) => overlay.id === overlayId);

	const updateFont = async () => {
		if (!curOverlay) return;
		await addFont(curOverlay[$statsScene].font.base64);
		curOverlay[$statsScene].layers
			?.map((layer) => layer.items)
			.flat()
			.map(async (item) => await addFont(item.data.font.base64, item.id))
			.every((x) => x);
		await document.fonts.ready;
	};
	updateFont();
</script>

{#await updateFont() then}
	{#if curOverlay}
		<main
			class="fixed h-full w-full bg-cover bg-center"
			in:fade={{ delay: 50, duration: 150 }}
			out:fade={{ duration: 300 }}
		>
			<Board bind:curOverlay bind:layerIds {preview} />
		</main>
	{/if}
{/await}
