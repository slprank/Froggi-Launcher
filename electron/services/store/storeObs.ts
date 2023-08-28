// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { Obs, Overlay } from '../../../frontend/src/lib/models/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import os from 'os';
import { newId } from "../../utils/functions"


@singleton()
export class ElectronObsStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") public log: ElectronLog,
        @inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
    ) {
        this.initListeners();
        this.initCustom();
    }

    getCustom(): Obs {
        return this.store.get('obs.custom') as Obs;
    }

    setCustom(value: Obs) {
        if (!value) return;
        this.store.set('obs.custom', value);
    }

    initCustom() {
        if (this.store.get('obs.custom.overlays') === undefined)
            this.store.set('obs.custom.overlays', []);
    }

    getCustomOverlayById(overlayId: string): Overlay {
        const custom = this.getCustom();
        return custom?.overlays?.find((overlay: Overlay) => overlay.id === overlayId) as Overlay;
    }

    getCustomOverlayIndex(overlayId: string): number {
        const overlays = this.getCustom().overlays;
        return overlays?.findIndex((overlay: any) => overlay.id == overlayId) ?? undefined;
    }

    updateCustomOverlay(overlay: Overlay): void {
        if (!overlay) return;
        let custom = this.getCustom();
        const overlayIndex = this.getCustomOverlayIndex(overlay.id);
        overlayIndex === undefined || overlayIndex === -1
            ? custom.overlays.push(overlay)
            : (custom.overlays[overlayIndex] = overlay);
        this.setCustom(custom);
    }

    uploadCustomOverlay(overlay: Overlay): void {
        if (!overlay) return;
        let custom = this.getCustom();
        overlay.id = newId();
        custom.overlays.push(overlay);
        this.setCustom(custom);
    }

    deleteCustomOverlay(overlayId: string): void {
        if (!overlayId) return;
        let custom = this.getCustom();
        custom.overlays = custom.overlays.filter((overlay: any) => overlay.id !== overlayId);
        this.setCustom(custom);
    }

    initListeners() {
        this.store.onDidChange("obs.custom", (value) => {
            this.messageHandler.sendMessage('obs_custom', value);
        })
    }
}
