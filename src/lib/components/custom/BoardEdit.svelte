<script lang="ts">
	import { page } from '$app/stores';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from '$lib/components/custom/GridContent.svelte';
	import { fade } from 'svelte/transition';
	import type { Scene } from '$lib/types/types';
	import { LiveStatsScene } from '$lib/types/enum';

	const COL = 256;
	const sceneId = parseInt($page.params.scene);

	export let height: number | undefined = undefined;
	export let layer: number | undefined = undefined;

	let curScene = $obs?.scenes?.find((scene) => scene.id === sceneId) ?? ({} as Scene);
	let items: any[] = [];
	let tempItems: any = undefined;

	$: items?.forEach((item: any) => {
		item[COL].draggable = true;
		item[COL].resizable = true;
	});

	function updateScene() {
		items
			.map((item: any) => item[COL])
			.filter((item: any) => item.y + item.h > COL + 1)
			.forEach((item: any) => {
				item.h = COL - item.y;
			});
		items = items.filter((item: any) => item[COL].y < COL + 1);
		tempItems = items;
	}

	function getLiveScene() {
		if (layer === undefined) return;
		curScene = $obs?.scenes?.find((scene) => scene.id === sceneId) ?? ({} as Scene);
		items = curScene[$statsScene].layers[layer] ?? [];
		console.log('items', items);
		items?.forEach((item: any) => {
			item[COL].draggable = true;
			item[COL].resizable = true;
		});
	}
	$: $statsScene || layer, getLiveScene();

	setInterval(() => {
		if (!tempItems || layer === undefined || curScene[$statsScene].layers[layer] == tempItems)
			return;
		curScene[$statsScene].layers[layer] = tempItems;

		let scene = $obs.scenes.find((scene) => scene.id === sceneId);
		const index = $obs.scenes.indexOf(scene);
		$obs.scenes[index] = curScene;

		$eventEmitter.emit('electron', 'update-custom-components', $obs);
		tempItems = undefined;
	}, 200);

	let innerHeight: number;

	// TODO: Include color, image and opacity
	// TODO: Save and update history on mouseUp to undo actions
</script>

<svelte:window bind:innerHeight />

{#key height}
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
				bind:items
				rowHeight={(height ?? innerHeight) / (COL + 2)}
				gap={[0, 0]}
				let:dataItem
				cols={[[COL, COL]]}
				fastStart={true}
				on:change={updateScene}
			>
				<GridContent edit={true} {dataItem} />
			</Grid>
		</div>
	</div>
{/key}
