<script lang="ts" context="module">
	import { CustomElement, LiveStatsScene, SceneBackground, Transition } from '$lib/types/enum';
	import type { Obs, Overlay } from '$lib/types/types';

	import { COL, MIN } from '$lib/types/const';

	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { eventEmitter, obs } from '$lib/utils/store.svelte';

	function newId() {
		return `${Math.random().toString(36).slice(-8)}`;
	}

	// TODO: Add complete overlays
	// TODO: Add complete scenes

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
				backgroundOpacity: 100,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				font: undefined,
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
				backgroundOpacity: 100,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				font: undefined,
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
				backgroundOpacity: 100,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				font: undefined,
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
				backgroundOpacity: 100,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				font: undefined,
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
				backgroundOpacity: 100,
				backgroundTransition: Transition.None,
				backgroundType: SceneBackground.None,
				elementDuration: 250,
				elementTransition: Transition.None,
				font: undefined,
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

	export async function getOverlayById(overlayId: string): Promise<Overlay> {
		return await new Promise<Overlay>((resolve) => {
			obs?.subscribe((obs) =>
				resolve(
					obs.overlays?.find((overlay: Overlay) => overlay.id === overlayId) ??
						({} as Overlay),
				),
			);
		});
	}

	export async function getOverlayIndexById(overlayId: string): Promise<number> {
		let curOverlay = await getOverlayById(overlayId);
		return await new Promise<number>((resolve) =>
			obs?.subscribe((obs) => resolve(obs.overlays.indexOf(curOverlay))),
		);
	}

	export async function updateOverlay(overlay: Overlay) {
		await new Promise(() =>
			eventEmitter.subscribe((eventEmitter) =>
				eventEmitter.emit('electron', 'update-custom-overlay', overlay),
			),
		);
	}

	export async function deleteOverlay(overlayId: string | undefined) {
		if (!overlayId) return;
		await new Promise(() =>
			eventEmitter.subscribe((eventEmitter) =>
				eventEmitter.emit('electron', 'delete-custom-overlay', overlayId),
			),
		);
	}
</script>
