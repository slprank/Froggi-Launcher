<script lang="ts">
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import Grid from 'svelte-grid';
	import GridContent from './GridContent.svelte';
	import { fade, fly, scale, slide, blur } from 'svelte/transition';
	import { page } from '$app/stores';
	import type { Overlay } from '$lib/types/types';
	import { COL, ROW } from '$lib/types/const';
	import { SceneBackground, Transition } from '$lib/types/enum';
	import BoardContainer from './edit/BoardContainer.svelte';

	export let height: number | undefined = undefined;
	export let preview: boolean = true;

	const overlayId = parseInt($page.params.overlay);

	$: curOverlay = $obs.overlays.find((overlay) => overlay.id === overlayId) ?? ({} as Overlay);
	$: curScene = curOverlay[$statsScene];

	$: curScene?.layers.forEach((layer: any) => {
		layer.forEach((item: any) => {
			item[COL].draggable = false;
			item[COL].resizable = false;
		});
	});

	function updatePage() {
		curScene = curOverlay[$statsScene];
		curScene.layers.forEach((layer: any) => {
			layer.forEach((item: any) => {
				item[COL].draggable = false;
				item[COL].resizable = false;
			});
		});
	}
	$: $statsScene, updatePage();

	const animate = (node: Element) => {
		if (!preview) return;
		switch (curScene.transitionBackground) {
			case Transition.None:
				return;
			case Transition.Fade:
				return fade(node, { duration: curScene.durationBackground });
			case Transition.Fly:
				return fly(node, { duration: curScene.durationBackground, y: -50 });
			case Transition.Scale:
				return scale(node, { duration: curScene.durationBackground });
			case Transition.Slide:
				return slide(node, { duration: curScene.durationBackground });
			case Transition.Blur:
				return blur(node, { duration: curScene.durationBackground });
		}
	};

	let innerHeight: number;

	// TODO: Include color, image and opacity
	// TODO: Display waiting dolphin component
</script>

<svelte:window bind:innerHeight />

{#key $statsScene}
	{#key height}
		<div class="w-full h-full overflow-hidden relative">
			<div in:animate>
				<BoardContainer bind:scene={curScene} />
			</div>
			{#each curScene?.layers ?? [] as layer}
				<div class="w-full h-full z-2 absolute" in:fly={{ delay: 50 }}>
					<Grid
						bind:items={layer}
						rowHeight={(height ?? innerHeight) / ROW}
						gap={[0, 0]}
						let:dataItem
						cols={[[COL, COL]]}
						fastStart={true}
					>
						<GridContent
							bind:preview
							{dataItem}
							transition={curScene.transition}
							duration={curScene.duration ?? 250}
						/>
					</Grid>
				</div>
			{/each}
			<div class="w-full h-full z-8 absolute" />
		</div>
	{/key}
{/key}
