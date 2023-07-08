<script lang="ts">
	import { isElectron, obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { page } from '$app/stores';
	import type { Layer, Scene } from '$lib/models/types';
	import { COL, ROW, SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { LiveStatsScene } from '$lib/models/enum';
	import BoardContainer from '$lib/components/custom/BoardContainer.svelte';
	import { tick } from 'svelte';

	export let boardHeight: number | undefined = undefined;
	export let isLayerSpecific: boolean = false;
	let curSceneIndex: LiveStatsScene | undefined = undefined;

	const overlayId: string | undefined = $page.params.overlay;
	const layerId: string | undefined = $page.params.layerId;

	$: curOverlay = $obs.overlays.find((overlay) => overlay.id === overlayId);
	let curScene = getCurrentScene($statsScene);

	const curSceneTrigger = () => {
		curScene = getCurrentScene($statsScene);
	};
	$: $statsScene, curSceneTrigger();

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

	// TODO: Utilize this
	function getSceneLayers(): Layer[] {
		return layerId
			? [curScene?.layers.find((layer) => layer.id === layerId)!]
			: curScene?.layers.filter((layer) => curScene?.previewLayers.includes(layer.id)) ?? [];
	}

	function getFixedLayerItems(layers: Layer[]): Layer[] {
		return layers?.map((layer) => {
			return {
				...layer,
				items: [
					...layer?.items.map((item) => {
						return {
							...item,
							[COL]: {
								...item[COL],
								customResizer: true,
							},
						};
					}),
				],
			};
		});
	}

	let innerHeight = 0;
	$: rowHeight = (boardHeight ?? innerHeight) / ROW;

	const refreshExternal = async () => {
		await tick();
		if (!$isElectron) location.reload();
	};
</script>

<svelte:window bind:innerHeight on:resize={refreshExternal} />

{#if curScene && rowHeight}
	{#key rowHeight}
		{#key $statsScene}
			<div
				style={`font-family: ${curScene?.font?.family};`}
				class="w-full h-full overflow-hidden relative"
			>
				<BoardContainer scene={curScene} />

				{#each getFixedLayerItems(isLayerSpecific ? getSceneLayers() : curScene?.layers ?? []) as layer, i}
					<div class="w-full h-full z-2 absolute">
						<Grid
							items={layer.items}
							bind:rowHeight
							gap={[0, 0]}
							let:dataItem
							cols={[[COL, COL]]}
							fastStart={true}
						>
							<GridContent
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
{/if}
