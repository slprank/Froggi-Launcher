import type { OBSRequestTypes } from "obs-websocket-js/dist/types";
import type { ConnectionState, LiveStatsScene } from "../enum";
import type { OverlayLayout } from "./overlay";
import { ControllerButtons } from "./controller";

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
    commands: Command[],
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


export interface CustomCommands {
    ChangeScene: {
        sceneName: LiveStatsScene,
    }
}

export enum CommandType {
    Obs = "Obs",
    Custom = "Custom",
}

export interface Command {
    id: string,
    type: CommandType,
    requestType: RequestType
    payload: OBSRequestTypes[keyof OBSRequestTypes] | CustomCommands[keyof CustomCommands] | undefined,
}

export type RequestType = keyof typeof ObsRequestOptions | keyof typeof CustomRequestOptions

export interface ObsController {
    enabled: boolean,
    inputCommands: ObsControllerCommand[],
}

export interface ObsControllerCommand {
    inputs: ControllerButtons,
    command: Command
}

export interface ObsSceneSwitchCommands {
    [LiveStatsScene.WaitingForDolphin]: Command[]
    [LiveStatsScene.Menu]: Command[]
    [LiveStatsScene.InGame]: Command[]
    [LiveStatsScene.PostGame]: Command[]
    [LiveStatsScene.PostSet]: Command[]
    [LiveStatsScene.RankChange]: Command[]
}


export const ObsRequestOptions = {
    SaveReplayBuffer: undefined,
    SetCurrentProgramScene: {
        sceneName: ""
    },
    SetInputVolume: {
        inputName: "",
        inputVolumeMul: 0,
    },
}

export const CustomRequestOptions = {
    ToggleElement: undefined,
    ChangeScene: undefined,
}