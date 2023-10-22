// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { Obs, Overlay } from '../../../frontend/src/lib/models/types/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { newId } from "../../utils/functions"


@singleton()
export class ElectronObsStore {
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Store")
        this.initListeners();
        this.createCustom();
    }

    createCustom() {
        if (this.store.get('obs.custom.overlays') === undefined)
            this.store.set('obs.custom.overlays', []);
    }

    getCustom(): Obs | undefined {
        return this.store.get('obs.custom') as Obs;
    }

    setCustom(value: Obs) {
        if (!value) return;
        this.store.set('obs.custom', value);
    }

    getOverlays(): Overlay[] {
        const overlays = this.store.get('obs.custom.overlays') as Overlay[];
        if (!overlays) throw new Error("Overlays not found")
        return overlays
    }

    getCustomOverlayById(overlayId: string): Overlay {
        const custom = this.getCustom();
        return custom?.overlays?.find((overlay: Overlay) => overlay.id === overlayId) as Overlay;
    }

    getCustomOverlayIndex(overlayId: string): number {
        const overlays = this.getOverlays();
        return overlays?.findIndex((overlay: any) => overlay.id == overlayId) ?? undefined;
    }

    updateCustomOverlay(overlay: Overlay): void {
        if (!overlay) return;
        let custom = this.getCustom();
        if (!custom) return;
        const overlayIndex = this.getCustomOverlayIndex(overlay.id);
        overlayIndex === undefined || overlayIndex === -1
            ? custom.overlays.push(overlay)
            : (custom.overlays[overlayIndex] = overlay);
        this.setCustom(custom);
    }

    uploadCustomOverlay(overlay: Overlay): void {
        let custom = this.getCustom();
        if (!custom) return
        overlay.id = newId();
        custom.overlays.push(overlay);
        this.setCustom(custom);
    }

    deleteCustomOverlay(overlayId: string): void {
        if (!overlayId) return;
        let custom = this.getCustom();
        if (!custom) return;
        custom.overlays = custom.overlays.filter((overlay: Overlay) => overlay.id !== overlayId);
        this.setCustom(custom);
    }

    initListeners() {
        this.store.onDidChange("obs.custom", (value) => {
            this.messageHandler.sendMessage('obs-custom', value);
        })
    }
}
