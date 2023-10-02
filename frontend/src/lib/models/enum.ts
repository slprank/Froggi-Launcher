export enum Animation {
	None = "None",
	Blur = "Blur",
	Fade = "Fade",
	Fly = "Fly",
	FlyRandom = "Fly Random",
	FlyAutomatic = "Fly Automatic",
	Scale = "Scale",
	Slide = "Slide",
}

export enum AnimationTrigger {
	None = "None",
	Player1Percent = "Player1 Percent Increase",
	Player2Percent = "Player2 Percent Increase",
	Player1StockLost = "Player1 Stock Loss",
	Player2StockLost = "Player2 Stock Loss",
}

export enum AutoUpdaterStatus {
	DownloadAvailable = "Download",
	LookingForUpdate = "Looking For Update",
	Downloading = "Downloading",
	DownloadComplete = "Install",
	Installing = "Installing",
	UpToDate = "Up To Date"
}

export enum Character {
	Falcon = 0,
	DK = 1,
	Fox = 2,
	GW = 3,
	Kirby = 4,
	Bowser = 5,
	Link = 6,
	Luigi = 7,
	Mario = 8,
	Marth = 9,
	MewTwo = 10,
	Ness = 11,
	Peach = 12,
	Pikachu = 13,
	IceClimbers = 14,
	Jigglypuff = 15,
	Samus = 16,
	Yoshi = 17,
	Zelda = 18,
	Sheik = 19,
	Falco = 20,
	YoungLink = 21,
	DrMario = 22,
	Roy = 23,
	Pichu = 24,
	Ganondorf = 25
}

export enum DolphinConnectionState {
	Disconnected = "Disconnected",
	Connected = "Connected",
	Connecting = "Connecting",
	Searching = "Searching",
}

export enum Easing {
	None = 0,
	BackInOut = 1,
	BounceInOut = 2,
	BounceIn = 3,
	BounceOut = 4,
	ElasticInOut = 5,
	ElasticIn = 6,
	ElasticOut = 7,
	SineOut = 8
}

export enum ElementCategory {
	GameCustomUi = "Custom UI",
	Player1CustomUi = "Player1 Custom UI",
	Player2CustomUi = "Player2 Custom UI",
	CurrentPlayerPostGameAttackCount = "Current Player Attack Count",
	Player1PostGameAttackCount = "Player1 Attack Count",
	Player2PostGameAttackCount = "Player2 Attack Count",
	CurrentPlayerPostGameActionCount = "Current Player Action Count",
	Player1PostGameActionCount = "Player1 Action Count",
	Player2PostGameActionCount = "Player2 Action Count",
	CurrentPlayerPostGameOverallStats = "Current Player Overall Stats",
	Player1PostGameOverallStats = "Player1 Overall Stats",
	Player2PostGameOverallStats = "Player2 Overall Stats",
	PostSetStats = "Post Set Stats",
	CurrentSetStats = "Current Set Stats",
	Custom = "Custom",
	CurrentPlayerSlippiData = "Current Player Slippi Data",
	Player1SlippiData = "Player1 Slippi Data",
	Player2SlippiData = "Player2 Slippi Data",
	ControllerInput = "Controller Input",
}

export enum VisibilityCategory {
	CurrentPlayerState = "Current Player State",
	Player1State = "Player1 State",
	Player2State = "Player2 State",
	OngoingGame = "Ongoing Game",
	GameState = "Game State",
	Session = "Session",
	ResetGames = "Recent Games"
}

export enum VisibilityOption {
	GameRunning = "Running",
	GamePaused = "Paused",
	GameReady = "Ready",
	GameGo = "Go",
	GameCountdown = "Countdown",
	GameEnd = "End",
}

export enum InGameState {
	Inactive = "Inactive",
	Running = "Running",
	Paused = "Paused",
}

export enum LiveStatsScene {
	WaitingForDolphin = "Waiting",
	Menu = "Menu",
	InGame = "In Game",
	PostGame = "Post Game",
	PostSet = "Post Set",
	RankChange = "Rank Change",
}

export enum PlayerActionState {
	Dead = 0
}

export enum SceneBackground {
	None = "None",
	Color = "Color",
	Image = "Image",
	ImageCustom = "Custom Image",
	InGameImageStage = "In Game Stage Image",
	PostGameImageStage = "Post Game Stage Image",
}

export enum Transition {
	None = 0,
	Fade = 1,
	Scale = 2,
	Fly = 3,
	Slide = 4,
	Blur = 5,
	Draw = 6,
	CrossFade = 7,
}