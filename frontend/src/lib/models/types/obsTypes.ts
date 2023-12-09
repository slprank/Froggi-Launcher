import type { OBSRequestTypes } from "obs-websocket-js/dist/types";
import type { ConnectionState } from "../enum";

export interface Obs {
    auth: ObsAuth | undefined,
    connection: ObsConnection,
}

export interface ObsConnection {
    commands: ObsCommand<keyof OBSRequestTypes>[],
    scenes: ObsScenes,
    inputs: ObsInputs[],
    items: ObsItem[],
    replayBufferState: {
        outputActive: boolean,
        outputState: string,
    },
    state: ConnectionState,
}

export interface ObsScenes {
    currentProgramSceneName: string;
    currentPreviewSceneName: string;
    scenes: {
        sceneIndex: number;
        sceneName: string;
    }[];
}

export interface ObsItem {
    inputKind: string,
    isGroup: null,
    sceneItemBlendMode: string,
    sceneItemEnabled: boolean,
    sceneItemId: number,
    sceneItemIndex: number,
    sceneItemLocked: false,
    sourceName: string,
    sourceType: string
}

export interface ObsInputs {
    inputKind: string,
    inputName: string,
    unversionedInputKind: string,
    volume: {
        inputVolumeDb: number,
        inputVolumeMul: number
    }
}

export interface ObsAuth {
    ipAddress: string,
    port: number,
    password: string,
}

export interface ObsCommand<Type extends keyof OBSRequestTypes> {
    command: Type,
    payload: OBSRequestTypes[Type],
    id: string,
}