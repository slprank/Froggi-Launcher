<script lang="ts">
	import { isElectron, obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { page } from '$app/stores';
	import type { Layer, Scene } from '$lib/models/types';
	import { COL, ROW, SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { LiveStatsScene } from '$lib/models/enum';
	import BoardContainer from '$lib/components/custom/BoardContainer.svelte';
	import CustomFontHandler from './CustomFontHandler.svelte';

	export let boardHeight: number | undefined = undefined;
	export let layers: Layer[];
	export let preview: boolean = false;
	let curSceneIndex: LiveStatsScene | undefined = undefined;
	let itemFontsLoaded: boolean[] = layers?.map((layer) => layer.items).map(() => false) ?? [];
	$: isItemFontsLoaded = itemFontsLoaded.every((x) => x);
	$: console.log('item fonts:', itemFontsLoaded);

	const overlayId: string | undefined = $page.params.overlay;

	$: curOverlay = $obs?.overlays.find((overlay) => overlay.id === overlayId);
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
		if (!$isElectron) location.reload();
	};
</script>

<svelte:window bind:innerHeight on:resize={refreshExternal} />

{#if curScene && rowHeight && isItemFontsLoaded}
	{#key rowHeight}
		{#key $statsScene}
			{#key isItemFontsLoaded}
				<div
					class="w-full h-full overflow-hidden relative"
					style={`font-family: ${curScene?.font?.family};`}
				>
					<BoardContainer scene={curScene} />
					{#each getFixedLayerItems(layers || (curScene?.layers ?? [])) as layer, i}
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

{#each layers as layer}
	{#each layer.items as item, i}
		<CustomFontHandler
			bind:ready={itemFontsLoaded[i]}
			base64={item.data.font.base64}
			fontId={item.id}
		/>
	{/each}
{/each}
