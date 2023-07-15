<script lang="ts" context="module">
	import { CustomElement, LiveStatsScene, SceneBackground, Transition } from '$lib/models/enum';
	import type { Font, Obs, Overlay } from '$lib/models/types';

	import { COL, MIN } from '$lib/models/const';

	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { eventEmitter, obs, statsScene } from '$lib/utils/store.svelte';

	export function newId() {
		return `${Math.random().toString(36).slice(-8)}`;
	}

	// TODO: Add complete overlays
	// TODO: Add complete scenes

	export function getNewOverlay(): Overlay {
		const waitingForDolphinLayerId = newId();
		const preGameId = newId();
		const inGameId = newId();
		const postGameId = newId();
		const rankChangeId = newId();
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
				background: {
					color: 'white',
					customImage: {
						src: undefined,
						name: undefined,
						objectFit: undefined,
					},
					duration: 250,
					image: { src: undefined, name: undefined, objectFit: undefined },
					opacity: 100,
					transition: Transition.None,
					type: SceneBackground.None,
				},
				element: {
					duration: 250,
					transition: Transition.None,
				},
				font: {} as Font,
				layerRenderDelay: 128,
				layers: [
					{
						id: waitingForDolphinLayerId,
						items: [],
					},
				],
				previewLayers: [waitingForDolphinLayerId],
			},
			[LiveStatsScene.PreGame]: {
				background: {
					color: 'white',
					customImage: {
						src: undefined,
						name: undefined,
						objectFit: undefined,
					},
					duration: 250,
					image: { src: undefined, name: undefined, objectFit: undefined },
					opacity: 100,
					transition: Transition.None,
					type: SceneBackground.None,
				},
				element: {
					duration: 250,
					transition: Transition.None,
				},
				font: {} as Font,
				layerRenderDelay: 128,
				layers: [
					{
						id: preGameId,
						items: [],
					},
				],
				previewLayers: [preGameId],
			},
			[LiveStatsScene.InGame]: {
				background: {
					color: 'white',
					customImage: {
						src: undefined,
						name: undefined,
						objectFit: undefined,
					},
					duration: 250,
					image: { src: undefined, name: undefined, objectFit: undefined },
					opacity: 100,
					transition: Transition.None,
					type: SceneBackground.None,
				},
				element: {
					duration: 250,
					transition: Transition.None,
				},
				font: {} as Font,
				layerRenderDelay: 128,
				layers: [
					{
						id: inGameId,
						items: [],
					},
				],
				previewLayers: [inGameId],
			},
			[LiveStatsScene.PostGame]: {
				background: {
					color: 'white',
					customImage: {
						src: undefined,
						name: undefined,
						objectFit: undefined,
					},
					duration: 250,
					image: { src: undefined, name: undefined, objectFit: undefined },
					opacity: 100,
					transition: Transition.None,
					type: SceneBackground.None,
				},
				element: {
					duration: 250,
					transition: Transition.None,
				},
				font: {} as Font,
				layerRenderDelay: 128,
				layers: [
					{
						id: postGameId,
						items: [],
					},
				],
				previewLayers: [postGameId],
			},
			[LiveStatsScene.RankChange]: {
				background: {
					color: 'white',
					customImage: {
						src: undefined,
						name: undefined,
						objectFit: undefined,
					},
					duration: 250,
					image: { src: undefined, name: undefined, objectFit: undefined },
					opacity: 100,
					transition: Transition.None,
					type: SceneBackground.None,
				},
				element: {
					duration: 250,
					transition: Transition.None,
				},
				font: {} as Font,
				layerRenderDelay: 128,
				layers: [
					{
						id: rankChangeId,
						items: [],
					},
				],
				previewLayers: [rankChangeId],
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
					obs?.overlays?.find((overlay: Overlay) => overlay.id === overlayId) ??
						({} as Overlay),
				),
			);
		});
	}

	export async function getOverlayIndexById(overlayId: string): Promise<number> {
		let curOverlay = await getOverlayById(overlayId);
		return await new Promise<number>((resolve) =>
			obs?.subscribe((obs) => resolve(obs?.overlays.indexOf(curOverlay))),
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

	export async function newLayer(overlayId: string, statsScene: LiveStatsScene): Promise<number> {
		let overlay = await getOverlayById(overlayId);
		const newLayerId = newId();

		const index = await getOverlayIndexById(overlayId);
		obs.update((obs) => {
			let overlay = obs.overlays[index];
			overlay[statsScene]?.layers.push({ id: newLayerId, items: [] });
			overlay[statsScene]?.previewLayers.push(newLayerId);
			updateOverlay(overlay);
			return obs;
		});
		return new Promise<number>((resolve) =>
			setTimeout(() => {
				resolve(overlay[statsScene].layers.length - 1);
			}),
		);
	}

	export async function moveLayerDown(
		overlayId: string,
		statsScene: LiveStatsScene,
		selectedLayer: number,
	): Promise<number> {
		let updatedOverlay = await getOverlayById(overlayId);
		if (
			selectedLayer === undefined ||
			selectedLayer >= updatedOverlay[statsScene].layers.length - 1
		)
			return 0;
		[
			updatedOverlay[statsScene].layers[selectedLayer],
			updatedOverlay[statsScene].layers[selectedLayer + 1],
		] = [
			updatedOverlay[statsScene].layers[selectedLayer + 1],
			updatedOverlay[statsScene].layers[selectedLayer],
		];
		const index = await getOverlayIndexById(overlayId);
		obs.update((obs) => {
			obs.overlays[index] = updatedOverlay;
			return obs;
		});
		updateOverlay(updatedOverlay);

		return new Promise<number>((resolve) =>
			setTimeout(() => {
				resolve(selectedLayer + 1);
			}),
		);
	}

	export async function moveLayerUp(
		overlayId: string,
		statsScene: LiveStatsScene,
		selectedLayer: number,
	): Promise<number> {
		let updatedOverlay = await getOverlayById(overlayId);
		if (selectedLayer === undefined || selectedLayer === 0) return 0;
		[
			updatedOverlay[statsScene].layers[selectedLayer],
			updatedOverlay[statsScene].layers[selectedLayer - 1],
		] = [
			updatedOverlay[statsScene].layers[selectedLayer - 1],
			updatedOverlay[statsScene].layers[selectedLayer],
		];
		const index = await getOverlayIndexById(overlayId);
		obs.update((obs) => {
			obs.overlays[index] = updatedOverlay;
			return obs;
		});
		updateOverlay(updatedOverlay);
		return new Promise<number>((resolve) =>
			setTimeout(() => {
				resolve(selectedLayer - 1);
			}),
		);
	}

	export async function deleteLayer(
		overlayId: string,
		statsScene: LiveStatsScene,
		selectedLayer: number,
	): Promise<number> {
		let updatedOverlay = await getOverlayById(overlayId);
		if (!updatedOverlay || selectedLayer === undefined) return 0;
		updatedOverlay[statsScene].layers.splice(selectedLayer, 1);

		const index = await getOverlayIndexById(overlayId);
		obs.update((obs) => {
			obs.overlays[index] = updatedOverlay;
			return obs;
		});
		updateOverlay(updatedOverlay);
		return new Promise<number>((resolve) =>
			setTimeout(() => {
				resolve(selectedLayer - 1);
			}),
		);
	}
</script>
