import {
	Obs,
	ObsConnection,
} from '../models/types/obsTypes';
import {
	CommandType,
	Controller,
	ControllerCommand,
	SceneSwitchCommands,
	Command,
	RequestType,
	PayloadType,
} from '../models/types/commandTypes';
import type {
	AutoUpdaterStatus,
	BestOf,
	ConnectionState,
	InGameState,
	LiveStatsScene,
	NotificationType,
} from '../models/enum';
import type { PlayerController } from '../models/types/controller';
import type { Overlay, OverlayEditor, Url } from '../models/types/overlay';
import type {
	CurrentPlayer,
	GameStartTypeExtended,
	GameStats,
	Match,
	Player,
	SessionStats,
} from '../models/types/slippiData';
import type { FrameEntryType } from '@slippi/slippi-js';
import localEmitter from 'eventemitter2';

export interface MessageEvents {
	Authorize: (isAuthorized: boolean) => void;
	AutoUpdaterProgress: (progress: string | undefined) => void;
	AutoUpdaterStatus: (status: AutoUpdaterStatus) => void;
	AutoUpdaterVersion: (version: string | undefined) => void;
	AutoUpdaterCheckForUpdate: () => void;
	AutoUpdaterDownloadUpdate: () => void;
	AutoUpdaterDownloadUrl: (url: string) => void;
	AutoUpdaterInstall: () => void;
	BestOfUpdate: (bestOf: BestOf) => void;
	CurrentPlayer: (player: CurrentPlayer | undefined) => void;
	CurrentPlayers: (player: Player[] | undefined) => void;
	DolphinConnectionState: (state: ConnectionState | undefined) => void;
	GameFrame: (frame: FrameEntryType | undefined | null) => void;
	GameScore: (score: number[]) => void;
	GameSettings: (settings: GameStartTypeExtended | undefined) => void;
	GameState: (state: InGameState | undefined) => void;
	InitElectron: () => void;
	InitData: (socketId: string, authorizeKey: string | undefined) => void;
	LayerPreviewChange: (layerIndex: number) => void;
	CurrentMatch: (match: Match) => void;
	MemoryControllerInput: (controllerInputs: PlayerController) => void;
	Notification: (message: string, type: NotificationType) => void;
	PlayersTagUpdate: (players: Player[]) => void; // Here
	PostGameStats: (stats: GameStats | undefined) => void;
	RecentGames: (games: GameStats[][]) => void;
	RecentGamesReset: () => void; // Here
	RecentRankedSets: (games: GameStats[]) => void;
	SessionStats: (session: SessionStats | undefined) => void;
	LiveStatsSceneChange: (scene: LiveStatsScene) => void;
	Url: (url: Url) => void;
	CurrentOverlayEditor: (overlay: OverlayEditor) => void;
	Obs: (obs: Obs | undefined) => void;
	ObsConnection: (connection: ObsConnection) => void;
	Overlays: (overlays: Overlay[] | undefined) => void;
	OverlayDelete: (overlayId: string) => void;
	OverlayDownload: (overlayId: string) => void;
	OverlayDuplicate: (overlayId: string) => void;
	OverlayUpdate: (overlay: Overlay) => void;
	OverlayUpload: () => void;
	SelectedItemChange: (itemId: string) => void;

	AuthorizationKey: (key: string) => void;
	AuthorizationKeyUpdate: (key: string) => void;
	InitAuthentication: (payload: [socketId: string, authKey: string]) => void;

	ControllerCommand: (command: Controller) => void;
	ControllerCommandAdd: (command: ControllerCommand) => void;
	ControllerCommandDelete: (commandId: string) => void;
	ControllerCommandStateToggle: () => void;
	SceneSwitchCommands: (options: SceneSwitchCommands) => void;
	SceneSwitchCommandAdd: (scene: LiveStatsScene, options: Command) => void;
	SceneSwitchCommandDelete: (scene: LiveStatsScene, commandId: string) => void;
	SceneSwitchCommandStateToggle: () => void;
	DeleteCommand: (commandId: string) => void;
	ExecuteCommand: (
		type: CommandType,
		requestType: RequestType,
		requestData?: PayloadType,
	) => void;

	TestAnimationTrigger: () => void;
	TestCustomAnimationTrigger: () => void;
	TestVisibilityTrigger: () => void;

	Ping: () => void;
}

export class TypedEmitter extends localEmitter {
	private _untypedOn = this.on;
	private _untypedEmit = this.emit;
	public on = <K extends keyof MessageEvents>(event: K, listener: MessageEvents[K]): this =>
		this._untypedOn(event, listener);

	public emit = <K extends keyof MessageEvents>(
		event: K,
		...args: Parameters<MessageEvents[K]>
	): boolean => this._untypedEmit(event, ...args);
}
