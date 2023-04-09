<script lang="ts">
	import { obs } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';

	const COL = 32;

	export let height: number | undefined = undefined;
	export let sceneId: number | undefined;

	$: curScene = $obs.scenes.find((scene) => scene.id === sceneId);

	$: console.log('board', curScene);

	$: layer1 = curScene?.preGame.layer1 ?? [];
	$: layer2 = curScene?.preGame.layer2 ?? [];
	$: layer3 = curScene?.preGame.layer3 ?? [];

	layer1?.forEach((item) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});
	layer2?.forEach((item) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});
	layer3?.forEach((item) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});

	let innerHeight: number;
</script>

<svelte:window bind:innerHeight />

{#key height}
	<!-- TODO: Add conditional layers -->
	<!-- TODO: Render window based on global store -->
	<div class="w-full h-full overflow-hidden">
		<div class="w-full h-full z-2">
			<Grid
				bind:items={layer1}
				rowHeight={(height ?? innerHeight) / (COL + 2)}
				gap={[0, 0]}
				let:item
				cols={[[32, 32]]}
				fastStart={true}
			>
				<GridContent {item} />
			</Grid>
		</div>
		<div class="w-full h-full z-4">
			<Grid
				bind:items={layer2}
				rowHeight={(height ?? innerHeight) / (COL + 2)}
				gap={[0, 0]}
				let:item
				cols={[[32, 32]]}
				fastStart={true}
			>
				<GridContent {item} />
			</Grid>
		</div>
	</div>
{/key}
