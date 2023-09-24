<script lang="ts" context="module">
	import {
		Animation,
		AnimationTrigger,
		CustomElement,
		Easing,
		ElementPauseOption,
		LiveStatsScene,
		SceneBackground,
	} from '$lib/models/enum';
	import type { AnimationSettings, ElementPayload, Overlay, Scene } from '$lib/models/types';

	import { COL, MIN, SCENE_TRANSITION_DELAY } from '$lib/models/const';

	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { eventEmitter, obs } from '$lib/utils/store.svelte';

	export function newId() {
		return `c${Math.random().toString(36).slice(-8)}`;
	}

	const getDefaultScene = (sceneId: string): Scene => {
		return {
			animation: {
				duration: 250,
				in: getDefaultAnimations(SCENE_TRANSITION_DELAY),
				out: getDefaultAnimations(),
				trigger: AnimationTrigger.None,
				layerRenderDelay: 250,
			},
			background: {
				color: '#000000',
				customImage: {
					src: undefined,
					name: undefined,
					objectFit: undefined,
				},
				image: { src: undefined, name: undefined, objectFit: undefined },
				opacity: 100,
				type: SceneBackground.None,
				animation: {
					in: getDefaultAnimations(SCENE_TRANSITION_DELAY),
					out: getDefaultAnimations(),
					trigger: AnimationTrigger.None,
				},
			},
			font: {
				family: undefined,
				base64: undefined,
			},
			layers: [
				{
					id: sceneId,
					items: [],
				},
			],
			previewLayers: [sceneId],
		};
	};

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
			defaultScene: LiveStatsScene.PreGame,
			[LiveStatsScene.WaitingForDolphin]: getDefaultScene(newId()),
			[LiveStatsScene.PreGame]: getDefaultScene(newId()),
			[LiveStatsScene.InGame]: getDefaultScene(newId()),
			[LiveStatsScene.PostGame]: getDefaultScene(newId()),
			[LiveStatsScene.PostSet]: getDefaultScene(newId()),
			[LiveStatsScene.RankChange]: getDefaultScene(newId()),
		} as Overlay;
	}

	export function generateNewItem(
		elementId: CustomElement,
		payload: ElementPayload,
		id: string | undefined = undefined,
	) {
		return {
			[COL]: gridHelp.item({
				w: 24,
				h: 24,
				x: 0,
				y: 0,
				min: { w: MIN, h: MIN },
				max: { y: COL - MIN, h: COL + 1 },
			}),
			id: id ?? newId(),
			elementId: elementId,
			data: payload,
		};
	}

	export async function getOverlayById(overlayId: string): Promise<Overlay | undefined> {
		return await new Promise<Overlay | undefined>((resolve) => {
			obs?.subscribe((obs) =>
				resolve(obs?.overlays?.find((overlay: Overlay) => overlay.id === overlayId)),
			);
		});
	}

	export async function getOverlayIndexById(overlayId: string): Promise<number | undefined> {
		let curOverlay = await getOverlayById(overlayId);
		return await new Promise<number | undefined>((resolve) =>
			obs?.subscribe((obs) => resolve(obs?.overlays.indexOf(curOverlay ?? ({} as Overlay)))),
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

	export function getDefaultElementPayload(): ElementPayload {
		return {
			advancedStyling: false,
			animation: {
				in: getDefaultAnimations(SCENE_TRANSITION_DELAY),
				out: getDefaultAnimations(),
				trigger: AnimationTrigger.None,
			},
			class: {
				border: undefined,
				rounded: undefined,
				alignment: undefined,
				textShadow: undefined,
				boxShadow: undefined,
			},
			css: {
				background: undefined,
				borderLeft: '0rem',
				borderRight: '0rem',
				borderTop: '0rem',
				borderBottom: '0rem',
				borderColor: undefined,
				color: '#ffffff',
				customParent: undefined,
				customBox: undefined,
				customText: undefined,
				customImage: undefined,
				opacity: '1',
				rotate: undefined,
				scale: undefined,
			},
			description: '',
			percent: {
				startColor: '#ffffff',
				endColor: '#6f1622',
			},
			font: {
				family: undefined,
				base64: undefined,
			},
			image: {
				name: undefined,
				src: undefined,
				objectFit: undefined,
			},
			pauseOption: ElementPauseOption.Always,
			shadow: {
				x: 0,
				y: 0,
				spread: 0,
				color: '#000000',
			},
			string: '',
			stroke: {
				size: 0,
				color: '#000000',
			},
		};
	}

	export function getDefaultAnimations(delay: number = 0): AnimationSettings {
		return {
			options: {
				delay: delay,
				duration: 0,
				easing: Easing.None,
				start: 0,
				x: 0,
				y: 0,
			},
			type: Animation.None,
		};
	}

	export async function newLayer(
		overlayId: string,
		statsScene: LiveStatsScene,
		indexPlacement: number | undefined = undefined,
	): Promise<number> {
		let overlay = await getOverlayById(overlayId);
		const newLayerId = newId();

		const index = await getOverlayIndexById(overlayId);
		obs.update((obs) => {
			if (index === undefined) return obs;
			let overlay = obs.overlays[index];
			const layersLength = overlay[statsScene]?.layers.length;
			overlay[statsScene]?.layers.splice(indexPlacement ?? layersLength, 0, {
				id: newLayerId,
				items: [],
			});
			overlay[statsScene]?.previewLayers.push(newLayerId);
			updateOverlay(overlay);
			return obs;
		});
		return new Promise<number>((resolve) =>
			setTimeout(() => {
				resolve(overlay![statsScene]?.layers.length - 1);
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
			selectedLayer >= updatedOverlay![statsScene]?.layers.length - 1
		)
			return 0;
		[
			updatedOverlay![statsScene].layers[selectedLayer],
			updatedOverlay![statsScene].layers[selectedLayer + 1],
		] = [
			updatedOverlay![statsScene].layers[selectedLayer + 1],
			updatedOverlay![statsScene].layers[selectedLayer],
		];
		const index = await getOverlayIndexById(overlayId);
		obs.update((obs) => {
			if (!index || !updatedOverlay) return obs;
			obs.overlays[index] = updatedOverlay;
			updateOverlay(updatedOverlay);
			return obs;
		});

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
			updatedOverlay![statsScene].layers[selectedLayer],
			updatedOverlay![statsScene].layers[selectedLayer - 1],
		] = [
			updatedOverlay![statsScene].layers[selectedLayer - 1],
			updatedOverlay![statsScene].layers[selectedLayer],
		];
		const index = await getOverlayIndexById(overlayId);
		obs.update((obs) => {
			if (!index || !updatedOverlay) return obs;
			obs.overlays[index] = updatedOverlay;
			updateOverlay(updatedOverlay);
			return obs;
		});
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
			if (!index || !updatedOverlay) return obs;
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
