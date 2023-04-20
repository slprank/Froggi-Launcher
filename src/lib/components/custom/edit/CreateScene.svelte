<script lang="ts" context="module">
	import { CustomElement, LiveStatsScene } from '$lib/types/enum';
	import type { Obs, Scene } from '$lib/types/types';

	import { COL, MIN } from '$lib/types/const';

	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	const id = () => '_' + Math.random().toString(36);

	// TODO: Add complete overlays
	// TODO: Add complete scenes

	export function getDefaultScenes(): Obs {
		return {
			scenes: [
				{
					id: 1,
					title: 'main',
					description: 'main description',
					default: LiveStatsScene.PreGame,
					[LiveStatsScene.WaitingForDolphin]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
					},
					[LiveStatsScene.PreGame]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
					},

					[LiveStatsScene.InGame]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
					},
					[LiveStatsScene.PostGame]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
					},
					[LiveStatsScene.RankChange]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [[]],
					},
				},
			],
		};
	}

	export function getNewScene(newId: number): Scene {
		return {
			id: newId,
			title: 'New Title',
			description: 'Scene Description',
			default: LiveStatsScene.PreGame,
			[LiveStatsScene.WaitingForDolphin]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
			},
			[LiveStatsScene.PreGame]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
			},
			[LiveStatsScene.InGame]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
			},
			[LiveStatsScene.PostGame]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
			},
			[LiveStatsScene.RankChange]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [[]],
			},
		} as Scene;
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
