<script lang="ts">
	import { obs } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';

	const COL = 32;

	export let editable = false;
	export let height: number | undefined = undefined;
	export let sceneId: number | undefined;

	$: curScene = $obs.scenes.find((scene) => scene.id === sceneId);

	$: console.log('board', curScene);

	$: layer1 = curScene?.preGame.layer1 ?? [];
	$: layer2 = curScene?.preGame.layer2 ?? [];
	$: layer3 = curScene?.preGame.layer3 ?? [];

	layer1?.forEach((item) => {
		item[COL].draggable = editable;
		item[COL].resizable = editable;
	});
	layer2?.forEach((item) => {
		item[COL].draggable = editable;
		item[COL].resizable = editable;
	});
	layer3?.forEach((item) => {
		item[COL].draggable = editable;
		item[COL].resizable = editable;
	});

	const cols = [[32, 32]];

	let innerHeight: number;
</script>

<svelte:window bind:innerHeight />

{#key height}
	<!-- TODO: Add conditional layers -->
	<!-- TODO: Render window based on global store -->
	<div class="w-full h-full overflow-hidden">
		<Grid
			bind:items={layer1}
			rowHeight={(height ?? innerHeight) / (COL + 2)}
			gap={[0, 0]}
			let:item
			let:dataItem
			{cols}
			fastStart={true}
		>
			<div
				class={`h-full w-full flex justify-center items-center ${
					editable ? 'bg-white' : 'text-white'
				}`}
			>
				{dataItem?.data ?? 'hmm'}
			</div>
		</Grid>
	</div>
{/key}
