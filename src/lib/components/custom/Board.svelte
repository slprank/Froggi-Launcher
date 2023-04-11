<script lang="ts">
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { Scene } from '$lib/types/types';
	import { LiveStatsScene } from '$lib/types/enum';

	export let height: number | undefined = undefined;

	const COL = 256;
	const sceneId = parseInt($page.params.scene);
	$: liveScene = '';

	$: curScene = $obs.scenes.find((scene) => scene.id === sceneId) ?? ({} as Scene);
	$: curPage = curScene[liveScene];

	$: console.log('board', curScene);
	$: console.log('page', curPage);
	$: console.log('scene', $statsScene);
	$: console.log('live', liveScene);

	$: backgroundImage = curPage?.backgroundImage ?? '';
	$: backgroundColor = curPage?.backgroundColor ?? '';
	$: layer1 = curPage?.layer1 ?? [];
	$: layer2 = curPage?.layer2 ?? [];
	$: layer3 = curPage?.layer3 ?? [];

	$: layer1?.forEach((item: any) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});
	$: layer2?.forEach((item: any) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});
	$: layer3?.forEach((item: any) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});

	function getLiveScene() {
		if ($statsScene === LiveStatsScene.PreGame) liveScene = 'preGame';
		if ($statsScene === LiveStatsScene.InGame) liveScene = 'inGame';
		if ($statsScene === LiveStatsScene.PostGame) liveScene = 'postGame';
		if ($statsScene === LiveStatsScene.RankChange) liveScene = 'rankChange';
		if (!liveScene) return;
		curPage = curScene[liveScene];
		backgroundImage = curPage?.backgroundImage ?? '';
		backgroundColor = curPage?.backgroundColor ?? '';
		layer1 = curPage?.layer1 ?? [];
		layer2 = curPage?.layer2 ?? [];
		layer3 = curPage?.layer3 ?? [];

		layer1?.forEach((item: any) => {
			item[COL].draggable = false;
			item[COL].resizable = false;
		});
		layer2?.forEach((item: any) => {
			item[COL].draggable = false;
			item[COL].resizable = false;
		});
		layer3?.forEach((item: any) => {
			item[COL].draggable = false;
			item[COL].resizable = false;
		});
	}

	$: $statsScene, getLiveScene();

	let innerHeight: number;

	// TODO: Include color, image and opacity
	// TODO: Display waiting dolphin component
</script>

<svelte:window bind:innerHeight />

{#key height}
	<!-- TODO: Render window based on LiveStatScene global store -->
	<div class="w-full h-full overflow-hidden relative">
		<div
			class="w-full h-full bg-cover bg-center absolute z-0"
			style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
			in:fade={{ delay: 50, duration: 150 }}
			out:fade={{ duration: 300 }}
		/>
		<div
			class="w-full h-full z-1 absolute"
			style="background: #FF00040C"
			in:fade={{ delay: 50, duration: 150 }}
			out:fade={{ duration: 300 }}
		/>
		<div class="w-full h-full z-2 absolute">
			<Grid
				bind:items={layer1}
				rowHeight={(height ?? innerHeight) / (COL + 2)}
				gap={[0, 0]}
				let:dataItem
				cols={[[COL, COL]]}
				fastStart={true}
			>
				<GridContent {dataItem} />
			</Grid>
		</div>
		<div class="w-full h-full z-4 absolute">
			<Grid
				bind:items={layer2}
				rowHeight={(height ?? innerHeight) / (COL + 2)}
				gap={[0, 0]}
				let:dataItem
				cols={[[COL, COL]]}
				fastStart={true}
			>
				<GridContent {dataItem} />
			</Grid>
		</div>
		<div class="w-full h-full z-6 absolute">
			<Grid
				bind:items={layer3}
				rowHeight={(height ?? innerHeight) / (COL + 2)}
				gap={[0, 0]}
				let:dataItem
				cols={[[COL, COL]]}
				fastStart={true}
			>
				<GridContent {dataItem} />
			</Grid>
		</div>
		<div class="w-full h-full z-8 absolute" />
	</div>
{/key}
