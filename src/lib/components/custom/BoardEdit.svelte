<script lang="ts">
	import { page } from '$app/stores';
	import { obs } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from '$lib/components/custom/GridContent.svelte';
	import { fade } from 'svelte/transition';

	const COL = 32;

	const sceneId = parseInt($page.params.scene);

	export let height: number | undefined = undefined;
	export let window: string = 'preGame'; // TODO: Update in parent - use global store
	export let layer: string = 'layer1'; // TODO: Update in parent

	let curScene = $obs.scenes.find((scene) => scene.id === sceneId);
	let items = curScene[window][layer] ?? [];
	let tempItems: any;

	$: items?.forEach((item: any) => {
		item[COL].draggable = true;
		item[COL].resizable = true;
	});

	$: console.log('edit', curScene[window]);

	function updateScene() {
		items
			.map((item: any) => item[COL])
			.filter((item: any) => item.y + item.h > COL + 1)
			.forEach((item: any) => {
				item.h = COL + 1 - item.y;
			});
		tempItems = items;
	}

	setInterval(() => {
		if (curScene[window][layer] == tempItems) return;
		curScene[window][layer] = tempItems;

		// TODO: Update $Obs object in electron store
		$obs.scenes[0] = curScene; // Replace this
	}, 200);

	updateScene();

	let innerHeight: number;

	// TODO: Include color, image and opacity
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
		<div class="w-full h-full z-1 absolute" style="background: #FF00040C" />
		<div class="w-full h-full z-2 absolute">
			<Grid
				bind:items
				rowHeight={(height ?? innerHeight) / (COL + 2)}
				gap={[0, 0]}
				let:dataItem
				cols={[[32, 32]]}
				fastStart={true}
				on:change={updateScene}
			>
				<GridContent edit={true} {dataItem} />
			</Grid>
		</div>
	</div>
{/key}
