// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { newId } from "../../utils/functions"
import { Obs, ObsCommand, ObsConnection, ObsInputs, ObsScenes } from '../../../frontend/src/lib/models/types/obsTypes';
import { OBSRequestTypes, OBSResponseTypes } from 'obs-websocket-js';
import { ConnectionState } from '../../../frontend/src/lib/models/enum';


@singleton()
export class ElectronObsStore {
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
    ) {
        this.log.info("Initializing Obs Store")
        this.initListeners();
    }

    getObs(): Obs | undefined {
        return this.store.get('obs') as Obs;
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

    initListeners() {
        this.store.onDidChange("obs.auth", (value) => {
            this.messageHandler.sendMessage("Obs", value as Obs);
        })
        this.store.onDidChange("obs.connection", (connection) => {
            this.messageHandler.sendMessage("ObsConnection", { ...(connection as ObsConnection), auth: undefined } as ObsConnection);
        })
    }
}
