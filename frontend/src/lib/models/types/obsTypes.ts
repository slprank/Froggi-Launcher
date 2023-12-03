import type { OBSRequestTypes } from "obs-websocket-js/dist/types";

export interface ObsConnection {
    auth: ObsAuth | undefined,
    commands: ObsCommand<keyof OBSRequestTypes>[],
    scenes: ObsScenes,
    audio: string[],
    items: string[],
}

export interface ObsScenes {
    currentProgramSceneName: string;
    currentPreviewSceneName: string;
    scenes: {
        sceneIndex: number;
        sceneName: string;
    };
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
    unversionedInputKind: string
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