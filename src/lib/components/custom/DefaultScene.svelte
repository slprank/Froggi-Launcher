<script lang="ts" context="module">
	import { LiveStatsScene } from '$lib/types/enum';
	import type { Obs, Scene } from '$lib/types/types';
	import { obs } from '$lib/utils/store.svelte';

	const COL = 256;
	const MIN = 8;

	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	const id = () => '_' + Math.random().toString(36).substr(2, 9);

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
						layers: [],
					},
					[LiveStatsScene.PreGame]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [
							{
								[COL]: gridHelp.item({
									x: 0,
									y: 0,
									w: 16,
									h: 16,
									min: { w: MIN, h: MIN },
									max: { y: COL - MIN, h: COL + 1 },
								}),
								id: id(),
							},

							{
								[COL]: gridHelp.item({
									x: 12,
									y: 12,
									w: 4,
									h: 4,
									min: { w: MIN, h: MIN },
									max: { y: COL - MIN, h: COL + 1 },
								}),
								id: id(),
								data: 'damn',
							},
						],
					},

					[LiveStatsScene.InGame]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [],
					},
					[LiveStatsScene.PostGame]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [],
					},
					[LiveStatsScene.RankChange]: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layers: [],
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
				layers: [],
			},
			[LiveStatsScene.PreGame]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [
					[
						{
							[COL]: gridHelp.item({
								x: 0,
								y: 0,
								w: 16,
								h: 16,
								min: { w: MIN, h: MIN },
								max: { y: COL - MIN, h: COL + 1 },
							}),
							id: id(),
						},

						{
							[COL]: gridHelp.item({
								x: 12,
								y: 12,
								w: 16,
								h: 16,
								min: { w: MIN, h: MIN },
								max: { y: COL - MIN, h: COL + 1 },
							}),
							id: id(),
							data: 'damn',
						},
					],
					[
						{
							[COL]: gridHelp.item({
								x: 56,
								y: 128,
								w: 16,
								h: 16,
								min: { w: MIN, h: MIN },
								max: { y: COL - MIN, h: COL + 1 },
							}),
							id: id(),
						},

						{
							[COL]: gridHelp.item({
								x: 200,
								y: 200,
								w: 16,
								h: 16,
								min: { w: MIN, h: MIN },
								max: { y: COL - MIN, h: COL + 1 },
							}),
							id: id(),
							data: 'damn',
						},
					],
				],
			},
			[LiveStatsScene.InGame]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [],
			},
			[LiveStatsScene.PostGame]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [],
			},
			[LiveStatsScene.RankChange]: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layers: [],
			},
		} as Scene;
	}
</script>
