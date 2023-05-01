<script lang="ts" context="module">
	import { CustomElement, LiveStatsScene, SceneBackground, Transition } from '$lib/types/enum';
	import type { Obs, Overlay } from '$lib/types/types';

	import { COL, MIN } from '$lib/types/const';

	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	function newId() {
		return '_' + Math.random().toString(36);
	}

	// TODO: Add complete overlays
	// TODO: Add complete scenes

	export function getDefaultOverlays(): Obs {
		return {
			overlays: [
				{
					activeScenes: [
						LiveStatsScene.WaitingForDolphin,
						LiveStatsScene.PreGame,
						LiveStatsScene.InGame,
						LiveStatsScene.PostGame,
						LiveStatsScene.RankChange,
					],
					default: LiveStatsScene.PreGame,
					description: 'main description',
					id: newId(),
					title: 'main',
					[LiveStatsScene.WaitingForDolphin]: {
						backgroundColor: 'white',
						backgroundCustomImage: {
							src: undefined,
							name: undefined,
							objectFit: undefined,
						},
						backgroundDuration: 250,
						backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
						backgroundOpacity: 1,
						backgroundTransition: Transition.None,
						backgroundType: SceneBackground.None,
						elementDuration: 250,
						elementTransition: Transition.None,
						layers: [[]],
					},
					[LiveStatsScene.PreGame]: {
						backgroundColor: 'white',
						backgroundCustomImage: {
							src: undefined,
							name: undefined,
							objectFit: undefined,
						},
						backgroundDuration: 250,
						backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
						backgroundOpacity: 1,
						backgroundTransition: Transition.None,
						backgroundType: SceneBackground.None,
						elementDuration: 250,
						elementTransition: Transition.None,
						layers: [[]],
					},

					[LiveStatsScene.InGame]: {
						backgroundColor: 'white',
						backgroundCustomImage: {
							src: undefined,
							name: undefined,
							objectFit: undefined,
						},
						backgroundDuration: 250,
						backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
						backgroundOpacity: 1,
						backgroundTransition: Transition.None,
						backgroundType: SceneBackground.None,
						elementDuration: 250,
						elementTransition: Transition.None,
						layers: [[]],
					},
					[LiveStatsScene.PostGame]: {
						backgroundColor: 'white',
						backgroundCustomImage: {
							src: undefined,
							name: undefined,
							objectFit: undefined,
						},
						backgroundDuration: 250,
						backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
						backgroundOpacity: 1,
						backgroundTransition: Transition.None,
						backgroundType: SceneBackground.None,
						elementDuration: 250,
						elementTransition: Transition.None,
						layers: [[]],
					},
					[LiveStatsScene.RankChange]: {
						backgroundColor: 'white',
						backgroundCustomImage: {
							src: undefined,
							name: undefined,
							objectFit: undefined,
						},
						backgroundDuration: 250,
						backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
						backgroundOpacity: 1,
						backgroundTransition: Transition.None,
						backgroundType: SceneBackground.None,
						elementDuration: 250,
						elementTransition: Transition.None,
						layers: [[]],
					},
				},
			],
		};
	}

	export function getNewOverlay(): Overlay {
		return {
			activeScenes: [
				LiveStatsScene.WaitingForDolphin,
				LiveStatsScene.PreGame,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.RankChange,
			],
			id: newId(),
			title: 'New Title',
			description: 'Scene Description',
			default: LiveStatsScene.PreGame,
			[LiveStatsScene.WaitingForDolphin]: {
				backgroundColor: 'white',
				backgroundCustomImage: {
					src: undefined,
					name: undefined,
					objectFit: undefined,
				},
				backgroundDuration: 250,
				backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
				backgroundOpacity: 1,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				layers: [[]],
			},
			[LiveStatsScene.PreGame]: {
				backgroundColor: 'white',
				backgroundCustomImage: {
					src: undefined,
					name: undefined,
					objectFit: undefined,
				},
				backgroundDuration: 250,
				backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
				backgroundOpacity: 1,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				layers: [[]],
			},
			[LiveStatsScene.InGame]: {
				backgroundColor: 'white',
				backgroundCustomImage: {
					src: undefined,
					name: undefined,
					objectFit: undefined,
				},
				backgroundDuration: 250,
				backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
				backgroundOpacity: 1,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				layers: [[]],
			},
			[LiveStatsScene.PostGame]: {
				backgroundColor: 'white',
				backgroundCustomImage: {
					src: undefined,
					name: undefined,
					objectFit: undefined,
				},
				backgroundDuration: 250,
				backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
				backgroundOpacity: 1,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				layers: [[]],
			},
			[LiveStatsScene.RankChange]: {
				backgroundColor: 'white',
				backgroundCustomImage: {
					src: undefined,
					name: undefined,
					objectFit: undefined,
				},
				backgroundDuration: 250,
				backgroundImage: { src: undefined, name: undefined, objectFit: undefined },
				backgroundOpacity: 1,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				layers: [[]],
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
			id: newId(),
			elementId: elementId,
			data: data,
		};
	}
</script>
