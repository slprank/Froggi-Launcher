export enum Animation {
	None = "none",
	Blur = "blur",
	Fade = "fade",
	Fly = "fly",
	FlyRandom = "fly random",
	FlyAutomatic = "fly automatic",
	Scale = "scale",
	Slide = "slide",
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

export enum InGameState {
	Inactive = "Inactive",
	Running = "Running",
	Paused = "Paused",
	End = "Game End",
	Time = "Time",
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