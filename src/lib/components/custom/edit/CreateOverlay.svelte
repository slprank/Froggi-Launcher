<script lang="ts" context="module">
	import { CustomElement, LiveStatsScene, SceneBackground, Transition } from '$lib/types/enum';
	import type { Obs, Overlay } from '$lib/types/types';

	import { COL, MIN } from '$lib/types/const';

	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	const id = () => '_' + Math.random().toString(36);

	// TODO: Add complete overlays
	// TODO: Add complete scenes

	export function getDefaultOverlays(): Obs {
		return {
			overlays: [
				{
					id: 1,
					title: 'main',
					description: 'main description',
					default: LiveStatsScene.PreGame,
					[LiveStatsScene.WaitingForDolphin]: {
						background: SceneBackground.None,
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
						opacity: 1,
						transition: Transition.None,
					},
					[LiveStatsScene.PreGame]: {
						background: SceneBackground.None,
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
						opacity: 1,
						transition: Transition.None,
					},

					[LiveStatsScene.InGame]: {
						background: SceneBackground.None,
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
						opacity: 1,
						transition: Transition.None,
					},
					[LiveStatsScene.PostGame]: {
						background: SceneBackground.None,
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
						opacity: 1,
						transition: Transition.None,
					},
					[LiveStatsScene.RankChange]: {
						background: SceneBackground.None,
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
						opacity: 1,
						transition: Transition.None,
					},
				},
			],
		};
	}

	export function getNewOverlay(newId: number): Overlay {
		return {
			id: newId,
			title: 'New Title',
			description: 'Scene Description',
			default: LiveStatsScene.PreGame,
			[LiveStatsScene.WaitingForDolphin]: {
				background: SceneBackground.None,
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
				opacity: 1,
				transition: Transition.None,
			},
			[LiveStatsScene.PreGame]: {
				background: SceneBackground.None,
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
				opacity: 1,
				transition: Transition.None,
			},
			[LiveStatsScene.InGame]: {
				background: SceneBackground.None,
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
				opacity: 1,
				transition: Transition.None,
			},
			[LiveStatsScene.PostGame]: {
				background: SceneBackground.None,
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
				opacity: 1,
				transition: Transition.None,
			},
			[LiveStatsScene.RankChange]: {
				background: SceneBackground.None,
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
				opacity: 1,
				transition: Transition.None,
			},
		} as Overlay;
	}

	export function generateNewItem(elementId: CustomElement, data: any) {
		return {
			[COL]: gridHelp.item({
				w: 24,
				h: 24,
				x: 0,
				y: 0,
				min: { w: MIN, h: MIN },
				max: { y: COL - MIN, h: COL + 1 },
			}),
			id: id(),
			elementId: elementId,
			data: data,
		};
	}
</script>
