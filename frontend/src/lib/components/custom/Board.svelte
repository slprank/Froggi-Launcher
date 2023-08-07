<script lang="ts">
	import { isElectron, obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import type { Layer, Overlay, Scene } from '$lib/models/types';
	import { COL, ROW, SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { LiveStatsScene } from '$lib/models/enum';
	import BoardContainer from '$lib/components/custom/BoardContainer.svelte';
	import { addFont } from './CustomFontHandler.svelte';

	export let curOverlay: Overlay;
	export let layerIds: string[] | undefined;
	export let preview: boolean = false;

	let curScene: Scene | undefined;
	function updateCurrentScene(statsScene: LiveStatsScene): Scene | undefined {
		if (!curOverlay) return;
		if (preview) {
			curScene = curOverlay[statsScene];
		} else {
			let tempSceneIndex = curOverlay?.activeScenes?.includes(statsScene)
				? statsScene
				: curOverlay?.defaultScene ?? LiveStatsScene.PreGame;
			curScene = curOverlay[tempSceneIndex];
		}
		updateFixedLayerItems(curScene.layers);
	}
	$: $statsScene, $obs, updateCurrentScene($statsScene);

	let fixedLayers: Layer[] = [];
	function updateFixedLayerItems(layers: Layer[]) {
		console.log('Scene layers', layers);
		console.log('Visible Ids', layerIds);
		fixedLayers = layers
			?.filter((layer) => layerIds?.includes(layer.id) ?? true)
			.map((layer) => {
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

	$: console.log('Fixed layers', fixedLayers);

	let innerHeight = 0;
	let innerWidth = 0;
	$: rowHeight = innerHeight / ROW;

	const updateFont = async () => {
		if (!curScene) return;
		await addFont(curScene.font?.base64);
	};
	updateFont();

	const refreshExternal = async () => {
		if (!$isElectron) location.reload();
	};

	$: console.log('scene', curScene);
</script>

<svelte:window bind:innerHeight bind:innerWidth on:resize={refreshExternal} />

{#if curScene && rowHeight && fixedLayers}
	{#await updateFont() then}
		<div
			class="w-full h-full overflow-hidden relative"
			style={`font-family: ${curScene?.font?.family};`}
		>
			<BoardContainer
				scene={curScene}
				bind:boardHeight={innerHeight}
				bind:boardWidth={innerWidth}
			/>
			{#each fixedLayers as layer, i}
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
							{curScene}
							additionalDelay={SCENE_TRANSITION_DELAY +
								curScene.animation.layerRenderDelay * i}
						/>
					</Grid>
				</div>
			{/each}
			<div class="w-full h-full z-8 absolute" />
		</div>
	{/await}
{/if}
