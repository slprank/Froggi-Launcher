<script lang="ts" context="module">
	import { Animation, LiveStatsScene, SceneBackground } from '$lib/models/enum';
	import type { CustomElement } from '$lib/models/constants/customElement';
	import type {
		AnimationSettings,
		AspectRatio,
		ElementPayload,
		GridContentItem,
		Layer,
		Overlay,
		Scene,
	} from '$lib/models/types/overlay';

	import { COL, MIN, SCENE_TRANSITION_DELAY } from '$lib/models/const';

	//@ts-ignore
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { electronEmitter, overlays } from '$lib/utils/store.svelte';
	import type { SelectedAnimationTriggerOption } from '$lib/models/types/animationOption';
	import { getOverlays } from '$lib/utils/fetchSubscriptions.svelte';
	import isNil from 'lodash/isNil';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import FontSelect from '../selector/FontSelect.svelte';

	export function newId() {
		return `c${Math.random().toString(36).slice(-8)}`;
	}

	const getDefaultScene = (sceneId: string, active: boolean = true): Scene => {
		return {
			active: active,
			animation: {
				duration: 250,
				in: getDefaultAnimations(SCENE_TRANSITION_DELAY),
				out: getDefaultAnimations(),
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
				},
			},
			fallback: LiveStatsScene.Menu,
			font: {
				family: 'sans-serif',
				base64: undefined,
			},
			layers: [
				{
					id: sceneId,
					items: [],
					preview: true,
				},
			],
		};
	};

	export function getNewOverlay(aspect: AspectRatio = { width: 16, height: 9 }): Overlay {
		const id = newId();
		return {
			id: id,
			title: `New Overlay - ${id}`,
			description: 'Scene Description',
			defaultScene: LiveStatsScene.Menu,
			aspectRatio: aspect,
			[LiveStatsScene.WaitingForDolphin]: getDefaultScene(newId()),
			[LiveStatsScene.Menu]: getDefaultScene(newId()),
			[LiveStatsScene.InGame]: getDefaultScene(newId()),
			[LiveStatsScene.PostGame]: getDefaultScene(newId()),
			[LiveStatsScene.PostSet]: getDefaultScene(newId(), false),
			[LiveStatsScene.RankChange]: getDefaultScene(newId()),
		} as Overlay;
	}

	export function generateNewItem(
		elementId: CustomElement,
		payload: ElementPayload,
		items: GridContentItem[] | undefined = undefined,
	) {
		const newItem = {
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
			data: payload,
		};
		console.log(items);
		if (isNil(items)) return newItem;

		const findPosition = gridHelp.findSpace(newItem, items, COL);
		return {
			...newItem,
			[COL]: {
				...newItem[COL],
				...findPosition,
			},
		};
	}

	export async function getOverlayById(
		overlayId: string | undefined,
	): Promise<Overlay | undefined> {
		return await new Promise<Overlay | undefined>((resolve) => {
			overlays?.subscribe((overlays) =>
				resolve(overlays?.find((overlay: Overlay) => overlay.id === overlayId)),
			);
		});
	}

	export async function getOverlayIndexById(overlayId: string): Promise<number | undefined> {
		let curOverlay = await getOverlayById(overlayId);
		return await new Promise<number | undefined>((resolve) =>
			overlays?.subscribe((overlays) =>
				resolve(overlays.indexOf(curOverlay ?? ({} as Overlay))),
			),
		);
	}

	export async function updateOverlay(overlay: Overlay) {
		await new Promise(() =>
			electronEmitter.subscribe((electronEmitter) =>
				electronEmitter.emit('OverlayUpdate', overlay),
			),
		);
	}

	export async function duplicateOverlay(overlay: Overlay) {
		await new Promise(() =>
			electronEmitter.subscribe((electronEmitter) =>
				electronEmitter.emit('OverlayDuplicate', overlay.id),
			),
		);
	}

	export async function deleteOverlay(overlayId: string | undefined) {
		if (!overlayId) return;
		await new Promise(() =>
			electronEmitter.subscribe((electronEmitter) =>
				electronEmitter.emit('OverlayDelete', overlayId),
			),
		);
	}

	export function getDefaultElementPayload(): ElementPayload {
		return {
			advancedStyling: false,
			animationTrigger: {
				in: getDefaultAnimations(SCENE_TRANSITION_DELAY),
				out: getDefaultAnimations(),
				selectedOptions: {} as SelectedAnimationTriggerOption,
			},
			class: {
				rounded: '',
				alignment: 'justify-center',
			},
			css: {
				background: '#ffffff00',
				borderLeft: '0rem',
				borderRight: '0rem',
				borderTop: '0rem',
				borderBottom: '0rem',
				borderColor: '#ffffffff',
				color: '#ffffffff',
				customParent: undefined,
				customBox: undefined,
				customText: undefined,
				customImage: undefined,
				opacity: 1,
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
				objectFit: 'contain',
			},
			visibility: {
				in: getDefaultAnimations(SCENE_TRANSITION_DELAY),
				out: getDefaultAnimations(),
				selectedOptions: [],
			},
			shadow: {
				x: 0,
				y: 0,
				spread: 0,
				color: '#000000ff',
			},
			string: '',
			stroke: {
				size: 0,
				color: '#000000ff',
			},
			transform: {
				translate: {
					x: 0,
					y: 0,
				},
			},
		};
	}

	export function getDefaultAnimations(delay: number = 0): AnimationSettings {
		return {
			options: {
				delay: delay,
				duration: 0,
				easing: '',
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
		const newLayerId = newId();

		const index = await getOverlayIndexById(overlayId);
		const overlays = await getOverlays();

		if (index === undefined) return 0;
		const overlay = overlays[index];
		const layersLength = overlay[statsScene]?.layers.length;
		overlay[statsScene]?.layers.splice(indexPlacement ?? layersLength, 0, {
			id: newLayerId,
			items: [],
			preview: true,
		});
		updateOverlay(overlay);

		return overlay![statsScene]?.layers.length - 1;
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
		if (isNil(index) || isNil(updatedOverlay)) return 0;
		updateOverlay(updatedOverlay);

		return selectedLayer + 1;
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
		if (isNil(index) || isNil(updatedOverlay)) return 0;
		updateOverlay(updatedOverlay);

		return selectedLayer - 1;
	}

	export async function duplicateLayer(
		overlayId: string,
		statsScene: LiveStatsScene,
		selectedLayerIndex: number,
	): Promise<number> {
		let overlay = await getOverlayById(overlayId);
		if (isNil(overlay) || overlay?.[statsScene].layers.length <= 1) return selectedLayerIndex;

		console.log(selectedLayerIndex);

		const duplicatedLayer: Layer = {
			...overlay[statsScene].layers[selectedLayerIndex],
			id: newId(),
		};

		const layers: Layer[] = [...overlay[statsScene].layers];
		overlay[statsScene].layers = [
			...layers.slice(0, selectedLayerIndex),
			duplicatedLayer,
			...layers.slice(selectedLayerIndex),
		];

		updateOverlay(overlay);

		return selectedLayerIndex + 1;
	}

	export async function deleteLayer(
		overlayId: string,
		statsScene: LiveStatsScene,
		selectedLayerIndex: number,
	): Promise<number> {
		let overlay = await getOverlayById(overlayId);
		if (isNil(overlay) || overlay?.[statsScene].layers.length <= 1) return selectedLayerIndex;

		overlay[statsScene].layers.splice(selectedLayerIndex, 1);
		updateOverlay(overlay);

		return selectedLayerIndex - 1;
	}

	export async function notifyDisabledScene(
		curOverlay: Overlay | undefined,
		statsScene: LiveStatsScene,
	) {
		if (curOverlay?.[statsScene]?.active) return;
		notifications.warning('Selected scene is disabled', 5000);
	}
</script>
