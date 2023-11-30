import type { AutoUpdaterStatus, DolphinConnectionState, InGameState, LiveStatsScene } from "../models/enum"
import type { PlayerController } from "../models/types/controller"
import type { Obs, Overlay, Url } from "../models/types/overlay"
import type { CurrentPlayer, GameStartTypeExtended, GameStats, Match, Player, Session } from "../models/types/slippiData"
import type { FrameEntryType } from "@slippi/slippi-js"
import localEmitter from "eventemitter2"

export interface MessageEvents {
    AutoUpdaterProgress: (progress: string | undefined) => void
    AutoUpdaterStatus: (status: AutoUpdaterStatus) => void
    AutoUpdaterVersion: (version: string | undefined) => void
    AutoUpdaterInstall: () => void
    CurrentPlayer: (player: CurrentPlayer | undefined) => void
    CurrentPlayers: (player: Player[] | undefined) => void
    DolphinConnectionState: (state: DolphinConnectionState | undefined) => void
    GameFrame: (frame: FrameEntryType | undefined | null) => void
    GameScore: (score: number[]) => void
    GameSettings: (settings: GameStartTypeExtended | undefined) => void
    GameState: (state: InGameState | undefined) => void
    InitElectron: () => void
    LayerPreviewChange: (layerIndex: number) => void
    CurrentMatch: (match: Match) => void
    MemoryControllerInput: (controllerInputs: PlayerController) => void
    PostGameStats: (stats: GameStats | undefined) => void
    RecentGames: (games: GameStats[][]) => void
    RecentRankedSets: (games: GameStats[]) => void
    SessionStats: (session: Session | undefined) => void
    LiveStatsSceneChange: (scene: LiveStatsScene | undefined) => void
    Url: (url: Url) => void
    ObsCustom: (obs: Obs | undefined) => void
    ObsCustomOverlay: (url: Overlay) => void
    ObsCustomOverlayDelete: (overlayId: string) => void
    ObsCustomOverlayDownload: (overlayId: string) => void
    ObsCustomOverlayDuplicate: (overlayId: string) => void
    ObsCustomOverlayUpdate: (overlay: Overlay) => void
    ObsCustomOverlayUpload: () => void

    TestAnimationTrigger: () => void
    TestCustomAnimationTrigger: () => void
    TestVisibilityTrigger: () => void
}

export class TypedEmitter extends localEmitter {
    private _untypedOn = this.on
    private _untypedEmit = this.emit
    public on = <K extends keyof MessageEvents>(event: K, listener: MessageEvents[K]): this =>
        this._untypedOn(event, listener);

    public emit = <K extends keyof MessageEvents>(event: K, ...args: Parameters<MessageEvents[K]>): boolean =>
        this._untypedEmit(event, ...args);
}