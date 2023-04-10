<script lang="ts">
	import { obs } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { Scene } from '$lib/types/types';

	export let height: number | undefined = undefined;

	const COL = 32;
	const sceneId = parseInt($page.params.scene);

	$: curScene = $obs.scenes.find((scene) => scene.id === sceneId) ?? ({} as Scene);

	$: console.log('board', curScene);

	// TODO: Get gamePage rather than every sub element
	$: backgroundImage = curScene?.preGame.backgroundImage;
	$: backgroundColor = curScene?.preGame.backgroundColor;
	$: layer1 = curScene?.preGame.layer1 ?? [];
	$: layer2 = curScene?.preGame.layer2 ?? [];
	$: layer3 = curScene?.preGame.layer3 ?? [];

	$: layer1?.forEach((item) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});
	$: layer2?.forEach((item) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});
	$: layer3?.forEach((item) => {
		item[COL].draggable = false;
		item[COL].resizable = false;
	});

	let innerHeight: number;

	// TODO: Include color and Image
</script>

<svelte:window bind:innerHeight />

{#key height}
	<!-- TODO: Render window based on LiveStatScene global store -->
	<div class="w-full h-full overflow-hidden relative">
		<div
			class="w-full h-full bg-cover bg-center z-1 absolute"
			style="background-image: url('/image/backgrounds/MeleeMenuPurple.png')"
			in:fade={{ delay: 50, duration: 150 }}
			out:fade={{ duration: 300 }}
		/>
		<div class="w-full h-full z-1 absolute" style="background: #FF00040C" />
		<div class="w-full h-full z-2 absolute">
			<Grid
				bind:items={layer1}
				rowHeight={(height ?? innerHeight) / (COL + 2)}
				gap={[0, 0]}
				let:dataItem
				cols={[[32, 32]]}
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
				cols={[[32, 32]]}
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
				cols={[[32, 32]]}
				fastStart={true}
			>
				<GridContent {dataItem} />
			</Grid>
		</div>
		<div class="w-full h-full z-8 absolute" />
	</div>
{/key}
