// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { Obs, Overlay } from '../../../frontend/src/lib/models/types/overlay';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { newId } from "../../utils/functions"
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';
import { ObsCommand, ObsConnection, ObsInputs, ObsScenes } from '../../../frontend/src/lib/models/types/obsTypes';
import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';
import { OBSRequestTypes, OBSResponseTypes } from 'obs-websocket-js';


@singleton()
export class ElectronObsStore {
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
        return overlays.sort((a: Overlay, b: Overlay) => a.title.localeCompare(b.title))
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

    duplicateCustomOverlay(overlayId: string): void {
        const overlay = this.getCustomOverlayById(overlayId)
        let custom = this.getCustom();
        if (!custom) return;
        custom.overlays.push({ ...overlay, id: newId(), title: `${overlay.title} - copy` })
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

    getPassword(): string | undefined {
        return this.store.get('obs.auth.password') as string;
    }

    setPassword(password: string) {
        this.store.set('obs.auth.password', password);
    }

    getIpAddress(): string {
        return (this.store.get('obs.auth.ipAddress') ?? "127.0.0.1") as string;
    }

    setIpAddress(ip: string) {
        this.store.set('obs.auth.ipAddress', ip);
    }

    getPort(): string {
        return (this.store.get('obs.auth.port') ?? "4455") as string;
    }

    setPort(ip: string) {
        this.store.set('obs.connection.port', ip);
    }

    getConnection(): ObsConnection {
        return (this.store.get('obs.connection') ?? {}) as ObsConnection;
    }

    getCommands(): ObsCommand<keyof OBSRequestTypes>[] {
        return (this.store.get('obs.connection.commands') ?? {}) as ObsCommand<keyof OBSRequestTypes>[];
    }

    addCommand<Type extends keyof OBSRequestTypes>(command: Type, payload: OBSRequestTypes[Type]) {
        const commands = this.getCommands();
        if (!commands) return;
        this.store.set('obs.connection.commands', [...commands, { command: command, payload: payload, id: newId() }]);
    }

    deleteCommand(commandId: string) {
        const commands = this.getCommands();
        if (!commands) return;
        this.store.set('obs.connection.commands', [...commands.filter((command) => command.id !== commandId)]);
    }

    setInputs(inputs: ObsInputs[]) {
        this.store.set('obs.connection.inputs', inputs);
    }

    setItems<Type extends keyof OBSResponseTypes>(items: OBSResponseTypes[Type][]) {
        this.store.set('obs.connection.items', items);
    }

    setScenes(scenes: ObsScenes) {
        this.store.set('obs.connection.scenes', scenes);
    }

    initListeners() {
        this.store.onDidChange("obs.auth", (value) => {
            this.messageHandler.sendMessage("ObsCustom", value as Obs);
        })
        this.store.onDidChange("obs.custom", (value) => {
            this.messageHandler.sendMessage("ObsCustom", value as Obs);
        })
        this.store.onDidChange("obs.connection", (connection) => {
            this.messageHandler.sendMessage("ObsConnection", { ...(connection as ObsConnection), auth: undefined } as ObsConnection);
        })
    }

    private initSvelteListeners() {
        this.svelteEmitter.on("ObsCustomOverlayUpdate", async (overlay) => {
            this.updateCustomOverlay(overlay);
        });

        this.svelteEmitter.on("ObsCustomOverlayDuplicate", async (overlayId) => {
            this.duplicateCustomOverlay(overlayId);
        });

        this.svelteEmitter.on('ObsCustomOverlayDelete', (overlayId) => {
            this.deleteCustomOverlay(overlayId);
        });


        this.svelteEmitter.on('ObsCustomOverlayDownload', async (overlayId) => {
            const overlay = this.getCustomOverlayById(overlayId);
            if (!overlay) return;
            const { canceled, filePath } = await dialog.showSaveDialog(this.mainWindow, {
                filters: [{ name: 'json', extensions: ['json'] }],
                nameFieldLabel: overlay.title,
            });
            if (canceled || !filePath) return;
            fs.writeFileSync(filePath, JSON.stringify(overlay), 'utf-8');
        });

        this.svelteEmitter.on("ObsCustomOverlayUpload", async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog(this.mainWindow, {
                properties: ['openFile'],
                filters: [{ name: 'json', extensions: ['json'] }],
            });
            if (canceled) return;
            const overlay = fs.readFileSync(filePaths[0], 'utf8');
            this.uploadCustomOverlay(JSON.parse(overlay));
        });
    }
}
