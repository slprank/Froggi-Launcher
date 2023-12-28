import type { CustomObsCommandType, Obs, ObsConnection, ObsController, ObsControllerCommand, ObsSceneSwitch } from "../models/types/obsTypes"
import type { AutoUpdaterStatus, BestOf, ConnectionState, InGameState, LiveStatsScene, NotificationType } from "../models/enum"
import type { PlayerController } from "../models/types/controller"
import type { Overlay, OverlayEditor, Url } from "../models/types/overlay"
import type { CurrentPlayer, GameStartTypeExtended, GameStats, Match, Player, SessionStats } from "../models/types/slippiData"
import type { FrameEntryType } from "@slippi/slippi-js"
import localEmitter from "eventemitter2"
import type { OBSRequestTypes } from "obs-websocket-js/dist/types"

export interface MessageEvents {
    Authorize: (isAuthorized: boolean) => void
    AutoUpdaterProgress: (progress: string | undefined) => void
    AutoUpdaterStatus: (status: AutoUpdaterStatus) => void
    AutoUpdaterVersion: (version: string | undefined) => void
    AutoUpdaterInstall: () => void
    BestOfUpdate: (bestOf: BestOf) => void
    CurrentPlayer: (player: CurrentPlayer | undefined) => void
    CurrentPlayers: (player: Player[] | undefined) => void
    DolphinConnectionState: (state: ConnectionState | undefined) => void
    GameFrame: (frame: FrameEntryType | undefined | null) => void
    GameScore: (score: number[]) => void
    GameSettings: (settings: GameStartTypeExtended | undefined) => void
    GameState: (state: InGameState | undefined) => void
    InitElectron: () => void
    InitData: (socketId: string, authorizeKey: string | undefined) => void
    LayerPreviewChange: (layerIndex: number) => void
    CurrentMatch: (match: Match) => void
    MemoryControllerInput: (controllerInputs: PlayerController) => void
    Notification: (message: string, type: NotificationType) => void
    PlayersTagUpdate: (players: Player[]) => void // Here
    PostGameStats: (stats: GameStats | undefined) => void
    RecentGames: (games: GameStats[][]) => void
    RecentGamesReset: () => void // Here
    RecentRankedSets: (games: GameStats[]) => void
    SessionStats: (session: SessionStats | undefined) => void
    LiveStatsSceneChange: (scene: LiveStatsScene) => void
    Url: (url: Url) => void
    Obs: (obs: Obs | undefined) => void
    ObsConnection: (connection: ObsConnection) => void
    CurrentOverlayEditor: (overlay: OverlayEditor) => void
    Overlays: (overlays: Overlay[] | undefined) => void
    OverlayDelete: (overlayId: string) => void
    OverlayDownload: (overlayId: string) => void
    OverlayDuplicate: (overlayId: string) => void
    OverlayUpdate: (overlay: Overlay) => void
    OverlayUpload: () => void
    SelectedItemChange: (itemId: string) => void


    AuthorizationKey: (key: string) => void
    AuthorizationKeyUpdate: (key: string) => void
    InitAuthentication: (payload: [socketId: string, authKey: string]) => void

    ObsControllerCommand: (command: ObsController) => void
    ObsControllerCommandAdd: (command: ObsControllerCommand) => void
    ObsControllerCommandDelete: (commandId: string) => void
    ObsControllerCommandStateToggle: () => void
    ObsSceneSwitch: (options: ObsSceneSwitch) => void
    ObsSceneSwitchUpdate: (options: ObsSceneSwitch) => void
    DeleteObsCommand: (commandId: string) => void
    ExecuteObsCommand: <Type extends keyof OBSRequestTypes>(
        requestType: Type,
        requestData?: OBSRequestTypes[Type],
    ) => void
    ExecuteCustomObsCommand: <Type extends keyof OBSRequestTypes>(
        requestType: CustomObsCommandType,
        requestData?: OBSRequestTypes[Type],
    ) => void


    TestAnimationTrigger: () => void
    TestCustomAnimationTrigger: () => void
    TestVisibilityTrigger: () => void

    Ping: () => void
}

export class TypedEmitter extends localEmitter {
    private _untypedOn = this.on
    private _untypedEmit = this.emit
    public on = <K extends keyof MessageEvents>(event: K, listener: MessageEvents[K]): this =>
        this._untypedOn(event, listener);

    public emit = <K extends keyof MessageEvents>(event: K, ...args: Parameters<MessageEvents[K]>): boolean =>
        this._untypedEmit(event, ...args);
}