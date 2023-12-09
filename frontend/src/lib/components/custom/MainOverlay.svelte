<script lang="ts">
	import { overlays, statsScene } from '$lib/utils/store.svelte';
	import Edit from '$lib/components/custom/edit/Edit.svelte';
	import { page } from '$app/stores';
	import { addFont } from '$lib/components/custom/CustomFontHandler.svelte';
	import { fade } from 'svelte/transition';

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
			class="fixed h-full w-full bg-cover bg-center bg-transparent"
			in:fade={{ delay: 50, duration: 150 }}
			out:fade={{ duration: 300 }}
		>
			<Edit />
		</div>
	{/if}
{/await}
