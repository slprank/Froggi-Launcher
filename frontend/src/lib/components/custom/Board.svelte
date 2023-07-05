<script lang="ts">
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { page } from '$app/stores';
	import type { Scene } from '$lib/models/types';
	import { COL, ROW, SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { LiveStatsScene } from '$lib/models/enum';
	import BoardContainer from '$lib/components/custom/BoardContainer.svelte';
	import { fly } from 'svelte/transition';

	export let boardHeight: number | undefined = undefined;
	export let preview: boolean = true;
	let curSceneIndex: LiveStatsScene | undefined = undefined;

	const overlayId = $page.params.overlay;

	$: curOverlay = $obs.overlays.find((overlay) => overlay.id === overlayId);
	let curScene = getCurrentScene($statsScene);

	$: curScene?.layers.forEach((layer: any) => {
		layer.forEach((item: any) => {
			item[COL].draggable = false;
			item[COL].resizable = false;
		});
	});

	const test = () => {
		curScene = getCurrentScene($statsScene);
	};
	$: $statsScene, test();

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

	// TODO: Make scene transition delay dynamic based on previous scene
</script>

<svelte:window bind:innerHeight />

{#if curScene}
	{#key $statsScene}
		{#key boardHeight}
			{#key innerHeight}
				<div
					style={`font-family: ${curScene?.font?.family};`}
					class="w-full h-full overflow-hidden relative"
				>
					<BoardContainer scene={curScene} {preview} />
					{#each curScene?.layers ?? [] as layer, i}
						<div class="w-full h-full z-2 absolute">
							<Grid
								items={layer}
								rowHeight={(boardHeight ?? innerHeight) / ROW}
								gap={[0, 0]}
								let:dataItem
								cols={[[COL, COL]]}
								fastStart={true}
							>
								<GridContent
									{preview}
									{dataItem}
									transition={curScene?.element.transition}
									additionalDelay={SCENE_TRANSITION_DELAY +
										curScene.layerRenderDelay * i}
									duration={curScene.element.duration ?? 250}
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
