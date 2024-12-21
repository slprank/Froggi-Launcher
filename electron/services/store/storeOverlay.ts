import Store from 'electron-store';
import type { GridContentItem, Layer, Overlay, OverlayEditor, Scene, SharedOverlay } from '../../../frontend/src/lib/models/types/overlay';
import { delay, inject, singleton } from 'tsyringe';
import type { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { newId } from '../../utils/functions';
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';
import { BrowserWindow, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import { LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import { cloneDeep, isNil, kebabCase } from 'lodash';
import { findFilesStartingWith, getCustomFiles, saveCustomFiles } from '../../utils/fileHandler';

@singleton()
export class ElectronOverlayStore {
	constructor(
		@inject('AppDir') private appDir: string,
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
		this.emitOverlayUpdate()
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

	cleanupCustomResources() {
		const overlays = this.getOverlays()
		Object.values(overlays).forEach(overlay => {
			const itemsKebabId = Object.values(LiveStatsScene).map(statsScene => {
				return overlay[statsScene].layers?.map((layer: Layer) => layer.items).flat()
			}).flat()
				.map(item => kebabCase(item.id))
			const customFileEntry = path.join(this.appDir, "public", "custom", overlay.id)
			if (!fs.existsSync(customFileEntry)) {
				this.log.info("Path:", customFileEntry, "does not exist")
				return;
			}
			const storedCustomTypes = fs.readdirSync(customFileEntry, { withFileTypes: true })
				.filter(dirent => dirent.isDirectory())
				.map(dirent => dirent.name);
			storedCustomTypes.forEach(type => {
				const fileTypeDir = path.join(customFileEntry, type)
				const existingFiles = fs.readdirSync(fileTypeDir, { withFileTypes: true })
					.map(dirent => dirent.name)
				existingFiles.forEach(file => {
					// Deletes all files with name unlike any item id's
					if (itemsKebabId.some(id => file.includes(id))) return;
					const filePath = path.join(fileTypeDir, file)
					fs.rmSync(filePath)
				})
			})
		})

	}

	updateOverlay(overlay: Overlay): void {
		if (!overlay || overlay.isDemo) return;
		this.setOverlay(overlay)
	}

	duplicateOverlay(overlayId: string): void {
		const overlay = this.getOverlayById(overlayId);
		if (isNil(overlay)) return;
		const newOverlay = { ...overlay, id: newId(), title: `${overlay.title} - copy`, isDemo: false }
		this.setOverlay(newOverlay);
		const source = path.join(this.appDir, "public", "custom", overlayId)
		const destination = path.join(this.appDir, "public", "custom", newOverlay.id)
		fs.cp(source, destination, { recursive: true }, (err => this.log.error(err)));
	}

	uploadOverlay(overlay: Overlay, overlayId: string = newId()): void {
		overlay.id = overlayId
		this.setOverlay(overlay)
	}

	deleteOverlay(overlayId: string): void {
		this.store.delete(`obs.layout.overlays.${overlayId}`)
		setTimeout(this.emitOverlayUpdate.bind(this), 100)
		const source = path.join(this.appDir, "public", "custom", overlayId)
		fs.rm(source, { recursive: true }, (err => this.log.error(err)))
	}

	duplicateSceneLayer(overlayId: string, statsScene: LiveStatsScene, layerIndex: number) {
		let overlay = this.getOverlayById(overlayId);
		if (isNil(overlay) || !overlay?.[statsScene].layers.length) return;

		const duplicatedLayer: Layer = cloneDeep({
			...overlay[statsScene].layers[layerIndex],
			id: newId(),
		});

		const customFileDir = path.join(this.appDir, "public", "custom", overlayId)

		duplicatedLayer.items.forEach(item => {
			const prevId = `${item.id}`
			const prevFileName = kebabCase(prevId)
			item.id = newId()
			const newFileName = kebabCase(item.id)
			const files = findFilesStartingWith(customFileDir, prevFileName)
			files.forEach(file => {
				const source = file;
				const target = file.replace(prevFileName, newFileName) 
				fs.copyFileSync(source, target)
			})
			// Currently not a flexible solution
			item.data.font.src = item.data.font.src?.replace(prevFileName, newFileName)
			item.data.image.name = item.data.image.name?.replace(prevFileName, newFileName)
		})

		const layers: Layer[] = [...overlay[statsScene].layers];
		overlay[statsScene].layers = [
			...layers.slice(0, layerIndex),
			duplicatedLayer,
			...layers.slice(layerIndex),
		];

		this.setOverlay(overlay)
	}

	setCurrentLayoutIndex(index: number) {
		this.store.set('obs.layout.current.layerIndex', index);
	}

	setCurrentItemId(itemId: string) {
		this.store.set('obs.layout.current.itemId', itemId);
	}

	emitOverlayUpdate() {
		const overlays = this.getOverlays();
		this.messageHandler.sendMessage('Overlays', overlays);
	}

	initListeners() {
		this.store.onDidChange('obs.layout.current', (value) => {
			this.messageHandler.sendMessage('CurrentOverlayEditor', value as OverlayEditor);
		});
	}

	private initSvelteListeners() {
		this.clientEmitter.on('CleanupCustomResources', this.cleanupCustomResources.bind(this));

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

		this.clientEmitter.on('SceneLayerDuplicate', this.duplicateSceneLayer.bind(this))

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
			const appDirCustomFilesDir = `${this.appDir}/public/custom/${overlayId}`
			const entries = getCustomFiles(appDirCustomFilesDir);
			const shareOverlay: SharedOverlay = {
				...overlay,
				customFiles: entries
			}
			if (canceled || !filePath) return;
			fs.writeFileSync(filePath, JSON.stringify(shareOverlay), 'utf-8');
		});

		this.clientEmitter.on('OverlayUpload', async () => {
			const { canceled, filePaths } = await dialog.showOpenDialog(this.mainWindow, {
				properties: ['openFile'],
				filters: [{ name: 'json', extensions: ['json'] }],
			});
			if (canceled) return;
			const sharedOverlay = JSON.parse(fs.readFileSync(filePaths[0], 'utf8')) as SharedOverlay;
			const { customFiles, ...overlay } = sharedOverlay;
			overlay.id = newId()

			const customFileDir = path.join(this.appDir, "public", "custom", overlay.id)
			saveCustomFiles(customFileDir, customFiles)
			this.uploadOverlay(overlay, overlay.id);
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
