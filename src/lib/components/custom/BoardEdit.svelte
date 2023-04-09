<script lang="ts">
	import { page } from '$app/stores';
	import type { Scene } from '$lib/types/types';
	import { obs } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import GridContent from './GridContent.svelte';

	const COL = 32;

	const sceneId = parseInt($page.params.scene);

	export let height: number | undefined = undefined;
	export let window: string = 'preGame'; // TODO: Update in parent - use global store
	export let layer: string = 'layer1'; // TODO: Update in parent

	let curScene = $obs.scenes.find((scene) => scene.id === sceneId);

	$: console.log('edit', curScene[window]);

	let items = curScene[window][layer] ?? [];

	items?.forEach((item: any) => {
		item[COL].draggable = true;
		item[COL].resizable = true;
	});

	function updateScene() {
		curScene[window][layer] = items;
		$obs.scenes[0] = curScene;
		// TODO: Update `$obs` in electron-store
	}

	const cols = [[32, 32]];

	let innerHeight: number;
</script>

<svelte:window bind:innerHeight />

{#key height}
	<div class="w-full h-full overflow-hidden">
		<Grid
			bind:items
			rowHeight={(height ?? innerHeight) / (COL + 2)}
			gap={[0, 0]}
			let:item
			{cols}
			fastStart={true}
			on:change={updateScene}
		>
			<GridContent {item} />
		</Grid>
	</div>
{/key}
