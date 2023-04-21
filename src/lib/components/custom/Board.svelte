<script lang="ts">
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { Scene } from '$lib/types/types';
	import { COL, ROW } from '$lib/types/const';

	export let height: number | undefined = undefined;

	const sceneId = parseInt($page.params.scene);

	$: curScene = $obs.scenes.find((scene) => scene.id === sceneId) ?? ({} as Scene);
	$: curPage = curScene[$statsScene];

	$: curPage.layers.forEach((layer: any) => {
		layer.forEach((item: any) => {
			item[COL].draggable = false;
			item[COL].resizable = false;
		});
	});

	function updatePage() {
		curPage = curScene[$statsScene];
		curPage.layers.forEach((layer: any) => {
			layer.forEach((item: any) => {
				item[COL].draggable = false;
				item[COL].resizable = false;
			});
		});
	}

	$: $statsScene, updatePage();

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
		{#each curPage?.layers ?? [] as layer}
			<div class="w-full h-full z-2 absolute" in:fly={{ delay: 50 }}>
				<Grid
					bind:items={layer}
					rowHeight={(height ?? innerHeight) / ROW}
					gap={[0, 0]}
					let:dataItem
					cols={[[COL, COL]]}
					fastStart={true}
				>
					<GridContent {dataItem} />
				</Grid>
			</div>
		{/each}
		<div class="w-full h-full z-8 absolute" />
	</div>
{/key}
