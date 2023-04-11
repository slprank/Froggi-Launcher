<script lang="ts" context="module">
	import { LiveStatsScene } from '$lib/types/enum';
	import type { Obs, Scene } from '$lib/types/types';
	import { obs } from '$lib/utils/store.svelte';

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
					preGame: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layer1: [
							{
								32: gridHelp.item({
									x: 0,
									y: 0,
									w: 4,
									h: 4,
									min: { w: 2, h: 2 },
									max: { y: 32, h: 33 },
								}),
								id: id(),
							},

							{
								32: gridHelp.item({
									x: 12,
									y: 12,
									w: 4,
									h: 4,
									min: { w: 2, h: 2 },
									max: { y: 32, h: 33 },
								}),
								id: id(),
								data: 'damn',
							},
						],
						layer2: [],
						layer3: [],
					},
					inGame: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layer1: [],
						layer2: [],
						layer3: [],
					},
					postGame: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layer1: [],
						layer2: [],
						layer3: [],
					},
					rankChange: {
						backgroundColor: 'white',
						backgroundImage: undefined,
						layer1: [],
						layer2: [],
						layer3: [],
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
			preGame: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layer1: [
					{
						32: gridHelp.item({
							x: 0,
							y: 0,
							w: 4,
							h: 4,
							min: { w: 2, h: 2 },
							max: { y: 32, h: 33 },
						}),
						id: id(),
					},

					{
						32: gridHelp.item({
							x: 12,
							y: 12,
							w: 4,
							h: 4,
							min: { w: 2, h: 2 },
							max: { y: 32, h: 33 },
						}),
						id: id(),
						data: 'damn',
					},
				],
			},
			inGame: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layer1: {},
				layer2: {},
				layer3: {},
			},
			postGame: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layer1: {},
				layer2: {},
				layer3: {},
			},
			rankChange: {
				backgroundColor: 'white',
				backgroundImage: undefined,
				layer1: {},
				layer2: {},
				layer3: {},
			},
		} as Scene;
	}
</script>
