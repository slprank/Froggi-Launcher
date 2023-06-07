<script lang="ts">
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { page } from '$app/stores';
	import type { Overlay, Scene } from '$lib/models/types';
	import { COL, ROW } from '$lib/models/const';
	import { LiveStatsScene, SceneBackground, Transition } from '$lib/models/enum';
	import BoardContainer from '$lib/components/custom/BoardContainer.svelte';
	import LoadCustomFont from '$lib/components/custom/LoadCustomFont.svelte';

	export let boardHeight: number | undefined = undefined;
	export let preview: boolean = true;
	let curSceneIndex: number | undefined = undefined;

	const overlayId = $page.params.overlay;

	$: curOverlay = $obs.overlays.find((overlay) => overlay.id === overlayId);
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
				<div
					style={`font-family: ${curScene?.font?.family};`}
					class="w-full h-full overflow-hidden relative"
				>
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
{#if curScene?.font}
	{#key curScene?.font}
		<LoadCustomFont bind:base64={curScene.font.base64} />
	{/key}
{/if}
