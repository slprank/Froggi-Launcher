// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import type { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { Obs, ObsAuth, ObsConnection, ObsInputs, ObsScenes } from '../../../frontend/src/lib/models/types/obsTypes';
import { OBSResponseTypes } from 'obs-websocket-js';
import { ConnectionState } from '../../../frontend/src/lib/models/enum';
import { TypedEmitter } from '../../../frontend/src/lib/utils/customEventEmitter';


@singleton()
export class ElectronObsStore {
    private store: Store = new Store();
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject("ClientEmitter") private clientEmitter: TypedEmitter,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Store")
        this.initEventListeners();
        this.initListeners();
    }

    setDefaultObsAuth() {
        const auth = this.getAuth();
        if (!auth) this.store.set('obs.auth', { ipAddress: 'localhost', port: 4455, password: '' });
    }

    getObs(): Obs | undefined {
        return this.store.get('obs') as Obs;
    }

    getAuth(): ObsAuth | undefined {
        return this.store.get('obs.auth') as ObsAuth;
    }

    getPassword(): string | undefined {
        return this.store.get('obs.auth.password') as string;
    }

    setPassword(password: string) {
        this.store.set('obs.auth.password', password);
    }

    getIpAddress(): string {
        return (this.store.get('obs.auth.ipAddress') ?? "localhost") as string;
    }

    setIpAddress(ip: string) {
        this.store.set('obs.auth.ipAddress', ip);
    }

    getPort(): string {
        return (this.store.get('obs.auth.port') ?? "4455") as string;
    }

    setPort(ip: string) {
        this.store.set('obs.auth.port', ip);
    }

    getConnection(): ObsConnection {
        return (this.store.get('obs.connection') ?? {}) as ObsConnection;
    }


    setConnectionState(state: ConnectionState) {
        this.store.set('obs.connection.state', state);
    }

    setInputs(inputs: ObsInputs[]) {
        this.store.set('obs.connection.inputs', inputs);
    }

    setItems<Type extends keyof OBSResponseTypes>(items: OBSResponseTypes[Type][]) {
        this.store.set('obs.connection.items', items);
    }

    setReplayBufferState<Type extends keyof OBSResponseTypes>(state: OBSResponseTypes[Type]) {
        this.store.set('obs.connection.replayBufferState', state);
    }


    setScenes(scenes: ObsScenes) {
        this.store.set('obs.connection.scenes', scenes);
    }

    private initEventListeners() {
        this.clientEmitter.on("ObsAuth", (auth: ObsAuth) => {
            this.store.set('obs.auth', auth);
        })
    }

    private initListeners() {
        this.store.onDidChange("obs.auth", (value) => {
            this.messageHandler.sendMessage("ObsAuth", value as ObsAuth);
        })
        this.store.onDidChange("obs.connection", (connection) => {
            this.messageHandler.sendMessage("ObsConnection", { ...(connection as ObsConnection), auth: undefined } as ObsConnection);
        })
    }
}
