import Store from 'electron-store';
import type { Overlay } from '../../../frontend/src/lib/models/types/overlay';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { newId } from "../../utils/functions"
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';
import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';


@singleton()
export class ElectronOverlayStore {
    store: Store = new Store();
    constructor(
        @inject('BrowserWindow') private mainWindow: BrowserWindow,
        @inject("ElectronLog") private log: ElectronLog,
        @inject('SvelteEmitter') private svelteEmitter: TypedEmitter,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Store")
        this.initListeners();
        this.initSvelteListeners();
        this.createOverlays();
    }

    createOverlays() {
        if (this.store.get('overlays') === undefined)
            this.store.set('overlays', []);
    }

    getOverlays(): Overlay[] {
        return (this.store.get('overlays') ?? []) as Overlay[];
    }

    setOverlays(value: Overlay[]) {
        if (!value) return;
        this.store.set('overlays', value);
    }

    getOverlayById(overlayId: string): Overlay {
        const overlays = this.getOverlays();
        return overlays?.find((overlay: Overlay) => overlay.id === overlayId) as Overlay;
    }

    getOverlayIndex(overlayId: string): number {
        const overlays = this.getOverlays();
        return overlays?.findIndex((overlay: any) => overlay.id == overlayId) ?? undefined;
    }

    updateOverlay(overlay: Overlay): void {
        if (!overlay) return;
        let overlays = this.getOverlays();
        if (!overlays) return;
        const overlayIndex = this.getOverlayIndex(overlay.id);
        overlayIndex === undefined || overlayIndex === -1
            ? overlays.push(overlay)
            : (overlays[overlayIndex] = overlay);
        this.setOverlays(overlays);
    }

    duplicateOverlay(overlayId: string): void {
        const overlay = this.getOverlayById(overlayId)
        let overlays = this.getOverlays();
        if (!overlays) return;
        overlays.push({ ...overlay, id: newId(), title: `${overlay.title} - copy` })
        this.setOverlays(overlays);
    }

    uploadOverlay(overlay: Overlay): void {
        let overlays = this.getOverlays();
        if (!overlays) return
        overlay.id = newId();
        overlays.push(overlay);
        this.setOverlays(overlays);
    }

    deleteOverlay(overlayId: string): void {
        if (!overlayId) return;
        let overlays = this.getOverlays();
        if (!overlays) return;
        overlays = overlays.filter((overlay: Overlay) => overlay.id !== overlayId);
        this.setOverlays(overlays);
    }

    initListeners() {
        this.store.onDidChange("overlays", (value) => {
            this.messageHandler.sendMessage("Overlays", value as Overlay[]);
        })
    }

    private initSvelteListeners() {
        this.svelteEmitter.on("OverlayUpdate", async (overlay) => {
            this.updateOverlay(overlay);
        });

        this.svelteEmitter.on("OverlayDuplicate", async (overlayId) => {
            this.duplicateOverlay(overlayId);
        });

        this.svelteEmitter.on('OverlayDelete', (overlayId) => {
            this.deleteOverlay(overlayId);
        });


        this.svelteEmitter.on('OverlayDownload', async (overlayId) => {
            const overlay = this.getOverlayById(overlayId);
            if (!overlay) return;
            const { canceled, filePath } = await dialog.showSaveDialog(this.mainWindow, {
                filters: [{ name: 'json', extensions: ['json'] }],
                nameFieldLabel: overlay.title,
            });
            if (canceled || !filePath) return;
            fs.writeFileSync(filePath, JSON.stringify(overlay), 'utf-8');
        });

        this.svelteEmitter.on("OverlayUpload", async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog(this.mainWindow, {
                properties: ['openFile'],
                filters: [{ name: 'json', extensions: ['json'] }],
            });
            if (canceled) return;
            const overlay = fs.readFileSync(filePaths[0], 'utf8');
            this.uploadOverlay(JSON.parse(overlay));
        });
    }
}
