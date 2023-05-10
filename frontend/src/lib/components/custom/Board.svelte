<script lang="ts">
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { page } from '$app/stores';
	import type { Overlay, Scene } from '$lib/types/types';
	import { COL, ROW } from '$lib/types/const';
	import { LiveStatsScene, SceneBackground, Transition } from '$lib/types/enum';
	import BoardContainer from './BoardContainer.svelte';

	export let boardHeight: number | undefined = undefined;
	export let preview: boolean = true;
	let curSceneIndex: number | undefined = undefined;

	const overlayId = $page.params.overlay;

	$: curOverlay = $obs.overlays.find((overlay) => overlay.id === overlayId) ?? ({} as Overlay);
	let curScene = getCurrentScene($statsScene);

	$: curScene?.layers.forEach((layer: any) => {
		layer.forEach((item: any) => {
			item[COL].draggable = false;
			item[COL].resizable = false;
		});
	});

	function updateScene() {
		if (!curOverlay || curSceneIndex === undefined) return;
		curScene = curOverlay[curSceneIndex as LiveStatsScene];
	}
	$: curOverlay, updateScene();

	function getCurrentScene(statsScene: LiveStatsScene): Scene | undefined {
		if (!curOverlay) return;
		let tempSceneIndex = curOverlay?.activeScenes?.includes(statsScene)
			? statsScene
			: curOverlay?.default ?? LiveStatsScene.PreGame;
		if (tempSceneIndex === curSceneIndex) return;
		curSceneIndex = tempSceneIndex;
		curScene = curOverlay[curSceneIndex as LiveStatsScene];
	}
	$: curOverlay, getCurrentScene($statsScene);

	let innerHeight: number;
</script>

<svelte:window bind:innerHeight />

{#if curScene}
	{#key curSceneIndex}
		{#key boardHeight}
			{#key innerHeight}
				<div class="w-full h-full overflow-hidden relative">
					<BoardContainer bind:scene={curScene} bind:preview />
					{#each curScene?.layers ?? [] as layer, i}
						<div class="w-full h-full z-2 absolute">
							<Grid
								bind:items={layer}
								rowHeight={(boardHeight ?? innerHeight) / ROW}
								gap={[0, 0]}
								let:dataItem
								cols={[[COL, COL]]}
								fastStart={true}
							>
								<GridContent
									bind:preview
									{dataItem}
									transition={curScene?.elementTransition}
									additionalDelay={128 * i}
									duration={curScene?.elementDuration ?? 250}
								/>
							</Grid>
						</div>
					{/each}
					<div class="w-full h-full z-8 absolute" />
				</div>
			{/key}
		{/key}
	{/key}
{/if}
