import type { OBSRequestTypes } from "obs-websocket-js/dist/types";
import type { ConnectionState, LiveStatsScene } from "../enum";
import type { OverlayLayout } from "./overlay";
import { ControllerButtons } from "./controller";

export enum CustomObsCommandType {
    ToggleElement = 'ToggleElement',
    ChangeScene = 'ChangeScene',
}

export interface CustomObsCommand<Type extends keyof OBSRequestTypes> {
    command: Type,
    payload: OBSRequestTypes[Type],
    id: string,
}

export interface Obs {
    auth: ObsAuth | undefined,
    connection: ObsConnection,
    layout: OverlayLayout,
}

export interface ObsConnection {
    commands: ObsCommand<keyof OBSRequestTypes>[],
    scenes: ObsScenes | undefined,
    inputs: ObsInputs[] | undefined,
    items: ObsItem[] | undefined,
    replayBufferState: {
        outputActive: boolean,
        outputState: string,
    } | undefined,
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

export enum ObsCommandType {
    Obs = "Obs",
    Custom = "Custom",
}

export interface CustomCommands {
    ChangeScene: {
        sceneName: LiveStatsScene,
    }
}

export interface ObsCommand<Type extends keyof OBSRequestTypes> {
    command: Type,
    payload: OBSRequestTypes[Type],
    id: string,
}

export interface ObsCustomCommand<Type extends keyof CustomCommands> {
    command: Type,
    payload: CustomCommands[Type],
    id: string,
}

export interface ObsController {
    enabled: boolean,
    inputCommands: ObsControllerCommand[],
}

export interface ObsControllerCommand {
    inputs: ControllerButtons,
    command: keyof OBSRequestTypes,
    payload: OBSRequestTypes[keyof OBSRequestTypes] | any,
    id: string | undefined
}

export interface ObsSceneSwitch {
    [LiveStatsScene.WaitingForDolphin]: SceneSwitchCommand
    [LiveStatsScene.Menu]: SceneSwitchCommand
    [LiveStatsScene.InGame]: SceneSwitchCommand
    [LiveStatsScene.PostGame]: SceneSwitchCommand
    [LiveStatsScene.PostSet]: SceneSwitchCommand
    [LiveStatsScene.RankChange]: SceneSwitchCommand
}

export interface SceneSwitchCommand {
    [obsCommand: keyof OBSRequestTypes | string]: OBSRequestTypes[keyof OBSRequestTypes] | any
}