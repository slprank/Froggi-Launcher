<script lang="ts">
	import {
		electronEmitter,
		isElectron,
		obs,
		overlays,
		statsScene,
	} from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import type { Layer, Overlay, Scene } from '$lib/models/types/overlay';
	import { COL, ROW, SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { LiveStatsScene } from '$lib/models/enum';
	import BoardContainer from '$lib/components/obs/overlays/BoardContainer.svelte';
	import { updateFont } from './CustomFontHandler.svelte';
	import { debounce } from 'lodash';

	export let curOverlay: Overlay;
	export let layerIds: string[] | undefined;
	export let preview: boolean = false;

	let ready = false;

	let curStatsScene: LiveStatsScene;
	function updateCurrentScene(): Scene | undefined {
		if (preview) {
			updateFixedLayerItems(curOverlay[$statsScene].layers);
			curStatsScene = $statsScene;
			return;
		}
		curStatsScene = curOverlay?.[$statsScene].active
			? $statsScene
			: curOverlay?.[$statsScene].fallback ?? LiveStatsScene.Menu;
		updateFixedLayerItems(curOverlay[curStatsScene].layers);
	}
	$: layerIds, $statsScene, $overlays, updateCurrentScene();

	let fixedLayers: Layer[] = [];
	function updateFixedLayerItems(layers: Layer[]) {
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
									fixed: true,
									resizable: false,
								},
							};
						}),
					],
				};
			});
	}

	const initializeFonts = async () => {
		await updateFont(curOverlay);
		setTimeout(() => (ready = true));
	};

	initializeFonts();

	let innerHeight = 0;
	let innerWidth = 0;
	$: rowHeight = innerHeight / ROW;
	$: curScene = curOverlay[curStatsScene];

	const handleError = (e: ErrorEvent) => {
		$electronEmitter.emit('Log', e.message, e.type);
		$electronEmitter.emit('CleanupCustomResources');
		$electronEmitter.emit('RemoveDuplicateItems');
		setTimeout(() => {
			refreshExternal();
		});
	};

	const refreshExternal = async () => {
		// @ts-ignore
		if (!$isElectron) location.reload();
	};
</script>

<svelte:window
	bind:innerHeight
	bind:innerWidth
	on:resize={debounce(refreshExternal, 16)}
	on:error={handleError}
/>

{#if curScene && rowHeight && fixedLayers && ready}
	<div class="w-full h-full overflow-hidden relative origin-top-left">
		{#key curScene && curStatsScene}
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
		{/key}
		<div class="w-full h-full z-8 absolute" />
	</div>
{/if}
