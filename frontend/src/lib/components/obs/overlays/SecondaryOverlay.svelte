<script lang="ts">
	import { overlays, statsScene } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
	import Board from '$lib/components/obs/overlays/Board.svelte';
	import { page } from '$app/stores';
	import { addFont } from '$lib/components/obs/overlays/CustomFontHandler.svelte';

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
		<div
			class="fixed h-full w-full bg-cover bg-center"
			style="margin: 0; padding: 0"
			in:fade={{ delay: 50, duration: 150 }}
			out:fade={{ duration: 300 }}
		>
			<Board bind:curOverlay bind:layerIds {preview} />
		</div>
	{/if}
{/await}
