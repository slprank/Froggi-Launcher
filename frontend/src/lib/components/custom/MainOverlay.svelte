<script lang="ts">
	import { isElectron, obs, statsScene } from '$lib/utils/store.svelte';
	import { fade } from 'svelte/transition';
	import Edit from '$lib/components/custom/edit/Edit.svelte';
	import Board from '$lib/components/custom/Board.svelte';
	import { page } from '$app/stores';
	import { addFont } from '$lib/components/custom/CustomFontHandler.svelte';
	import type { Layer } from '$lib/models/types';

	export let layers: Layer[] | undefined = undefined;
	export let preview: boolean = false;

	const overlayId = $page.params.overlay;
	$: curOverlay = $obs?.overlays.find((overlay) => overlay.id === overlayId);

	const updateFont = async () => {
		if (!curOverlay) return;
		await addFont(curOverlay[$statsScene].font.base64);
		layers
			?.map((layer) => layer.items)
			.flat()
			.map(async (item) => await addFont(item.data.font.base64, item.id))
			.every((x) => x);
		await document.fonts.ready;
	};
	updateFont();

	let keySceneUpdate: number;
	let prevStatsScene = $statsScene;
	const updateScene = () => {
		if (!curOverlay) return;
		const nonDefaultActiveScenes = curOverlay.activeScenes.filter(
			(scene) => scene !== curOverlay?.defaultScene,
		);
		console.log(nonDefaultActiveScenes);
		if (
			(nonDefaultActiveScenes.includes(prevStatsScene) &&
				!nonDefaultActiveScenes.includes($statsScene)) ||
			[prevStatsScene, $statsScene].every(
				(scene) => curOverlay?.activeScenes.includes(scene) || preview,
			)
		)
			keySceneUpdate = Math.random();
		prevStatsScene = $statsScene;
	};
	$: $statsScene, updateScene();

	$: console.log('UPDATED', keySceneUpdate);
</script>

{#await updateFont() then}
	{#if curOverlay}
		<main
			class="fixed h-full w-full bg-cover bg-center bg-transparent"
			in:fade={{ delay: 50, duration: 150 }}
			out:fade={{ duration: 300 }}
		>
			{#if $isElectron}
				<Edit />
			{:else}
				{#key keySceneUpdate}
					<Board bind:curOverlay bind:layers bind:preview />
				{/key}
			{/if}
		</main>
	{/if}
{/await}
