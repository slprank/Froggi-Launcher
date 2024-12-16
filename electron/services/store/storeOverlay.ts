import Store from 'electron-store';
import type { GridContentItem, Overlay, OverlayEditor, Scene } from '../../../frontend/src/lib/models/types/overlay';
import { delay, inject, singleton } from 'tsyringe';
import type { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { newId } from '../../utils/functions';
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';
import { BrowserWindow, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import { LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import { isNil } from 'lodash';

@singleton()
export class ElectronOverlayStore {
	constructor(
		@inject('BrowserWindow') private mainWindow: BrowserWindow,
		@inject('ElectronLog') private log: ElectronLog,
		@inject('ElectronStore') private store: Store,
		@inject('ClientEmitter') private clientEmitter: TypedEmitter,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {
		this.log.info('Initializing Obs Overlay Store');
		this.initListeners();
		this.initSvelteListeners();
		this.initDemoOverlays();
	}

	getOverlays(): Record<string, Overlay> {
		return (this.store.get('obs.layout.overlays') ?? {}) as Record<string, Overlay>
	}

	setOverlay(value: Overlay) {
		if (!value) return;
		this.store.set(`obs.layout.overlays.${value.id}`, value);
		const overlays = this.getOverlays();
		this.messageHandler.sendMessage('Overlays', overlays);
	}

	getScene(overlayId: string, statsScene: string): Scene {
		return this.store.get(`obs.layout.overlays.${overlayId}.${statsScene}`) as Scene
	}

	setScene(overlayId: string, statsScene: LiveStatsScene, scene: Scene) {
		this.store.set(`obs.layout.overlays.${overlayId}.${statsScene}`, scene)
		this.messageHandler.sendMessage('SceneUpdate', overlayId, statsScene, scene)
	}

	getOverlayById(overlayId: string): Overlay | undefined {
		return this.store.get(`obs.layout.overlays.${overlayId}`) as Overlay;
	}

	removeDuplicateItems(overlays: Overlay[]): Overlay[] {
		overlays.forEach(this.removeDuplicateOverlayItems)
		return overlays;
	}

	removeDuplicateOverlayItems(overlay: Overlay): Overlay {
		Object.keys(LiveStatsScene)
			.filter(key => isNaN(Number(key)))
			.forEach(key => {
				const statsScene = LiveStatsScene[key as keyof typeof LiveStatsScene]
				overlay[statsScene].layers.forEach(layer => {
					layer.items.reduce((acc: GridContentItem[], currentItem) => {
						const existingItem = acc.find((item) => item.id === currentItem.id);

						if (!existingItem) {
							acc.push(currentItem);
						}

						return acc;
					}, []);
				});
			});
		return overlay;
	}

	updateOverlay(overlay: Overlay): void {
		if (!overlay || overlay.isDemo) return;
		this.setOverlay(overlay)
	}

	duplicateOverlay(overlayId: string): void {
		const overlay = this.getOverlayById(overlayId);
		if (isNil(overlay)) return;
		this.setOverlay({ ...overlay, id: newId(), title: `${overlay.title} - copy`, isDemo: false });
	}

	uploadOverlay(overlay: Overlay, overlayId: string | undefined = undefined): void {
		overlay.id = overlayId ?? newId();
		this.setOverlay(overlay)
	}

	deleteOverlay(overlayId: string): void {
		this.store.delete(`obs.layout.overlays.${overlayId}`)
	}

	setCurrentLayoutIndex(index: number) {
		this.store.set('obs.layout.current.layerIndex', index);
	}

	setCurrentItemId(itemId: string) {
		this.store.set('obs.layout.current.itemId', itemId);
	}

	initListeners() {
		this.store.onDidChange('obs.layout.current', (value) => {
			this.messageHandler.sendMessage('CurrentOverlayEditor', value as OverlayEditor);
		});
	}

	private initSvelteListeners() {
		this.clientEmitter.on('OverlayUpdate', async (overlay) => {
			this.updateOverlay(overlay);
		});

		this.clientEmitter.on('SceneUpdate', async (overlayId, statsScene, scene) => {
			this.setScene(overlayId, statsScene, scene)
		})

		this.clientEmitter.on('OverlayDuplicate', async (overlayId) => {
			this.duplicateOverlay(overlayId);
		});

		this.clientEmitter.on('OverlayDelete', (overlayId) => {
			this.deleteOverlay(overlayId);
		});

		this.clientEmitter.on('SelectedItemChange', (itemId) => {
			this.setCurrentItemId(itemId);
		});

		this.clientEmitter.on('LayerPreviewChange', (layerIndex) => {
			this.setCurrentLayoutIndex(layerIndex);
		});

		this.clientEmitter.on('OverlayDownload', async (overlayId) => {
			const overlay = this.getOverlayById(overlayId);
			if (!overlay) return;
			const { canceled, filePath } = await dialog.showSaveDialog(this.mainWindow, {
				filters: [{ name: 'json', extensions: ['json'] }],
				nameFieldLabel: overlay.title,
			});
			if (canceled || !filePath) return;
			fs.writeFileSync(filePath, JSON.stringify(overlay), 'utf-8');
		});

		this.clientEmitter.on('OverlayUpload', async () => {
			const { canceled, filePaths } = await dialog.showOpenDialog(this.mainWindow, {
				properties: ['openFile'],
				filters: [{ name: 'json', extensions: ['json'] }],
			});
			if (canceled) return;
			const overlay = fs.readFileSync(filePaths[0], 'utf8');
			this.uploadOverlay(JSON.parse(overlay));
		});
	}

	private initDemoOverlays() {
		const overlayFiles = fs.readdirSync(path.join(__dirname, "/../../demo-overlays"));

		overlayFiles.forEach((file) => {
			const overlayRaw = fs.readFileSync(path.join(__dirname, "/../../demo-overlays", file), 'utf8');
			const overlay: Overlay = { ...JSON.parse(overlayRaw), isDemo: true } as Overlay;
			const demoId = file.replace(/\s+|\.json$/g, '');
			this.uploadOverlay(overlay, demoId);
		});

	}
}
