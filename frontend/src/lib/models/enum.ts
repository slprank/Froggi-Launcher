export enum Animation {
	None = 0,
	Blur = 1,
	Fade = 2,
	Fly = 3,
	FlyRandom = 4,
	FlyAutomatic = 5,
	Scale = 6,
	Slide = 7,
}

export enum AnimationTrigger {
	None = 0,
	Visibility = 1,
	Player1Percent = 2,
	Player2Percent = 3,
	Player1StockLost = 2,
	Player2StockLost = 3,
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

export enum CustomElement {

	// Custom String
	CustomString = 100,
	CurrentPlayerPercent = 101,
	Player1Percent = 102,
	Player2Percent = 103,
	CurrentPlayerPercentDecimal = 104,
	Player1PercentDecimal = 105,
	Player2PercentDecimal = 106,

	// Custom Image
	CustomImage = 200,
	CurrentPlayerCharacterRender = 201,
	Player1CharacterRender = 202,
	Player2CharacterRender = 203,

	// Custom Box
	CustomBox = 300,

	// String
	CurrentPlayerTag = 400,
	Player1Tag = 401,
	Player2Tag = 402,
	Player1Score = 403,
	Player2Score = 404,

	GameMode = 450,
	BestOf = 451,


	// Box
	// Potential Box Elements

	// Image
	CurrentPlayerRankIcon = 600,
	Player1RankIcon = 601,
	Player2RankIcon = 602,
	Player1RankText = 603,
	Player2RankText = 604,
	CurrentPlayerCharacterIcon = 605,
	Player1CharacterIcon = 606,
	Player2CharacterIcon = 607,
}


export enum DolphinState {
	Disconnected = 0,
	Connected = 1,
	Connecting = 2,
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
	WaitingForDolphin = 0,
	PreGame = 2,
	InGame = 4,
	CustomUi = 5,
	PostGame = 6,
	PostSet = 8,
	RankChange = 10,
	Custom = 12,
	PlayersRank = 13,
	CurrentPlayerRank = 14,
}

export enum ElementPauseOption {
	Always = 1,
	OnlyActive = 2,
	OnlyPaused = 3,
}

export enum InGameState {
	None = 0,
	Running = 1,
	Paused = 2,
	End = 3
}

export enum Direction {
	Up = 1,
	Down = 2,
	Left = 3,
	Right = 4
}

export enum LiveStatsScene {
	WaitingForDolphin = 0,
	PreGame = 2,
	InGame = 4,
	PostGame = 6,
	PostSet = 8,
	RankChange = 10,
}

export enum PlayerActionState {
	Dead = 0
}

export enum SceneBackground {
	None = 0,
	Color = 1,
	Image = 2,
	ImageCustom = 3,
	ImageStage = 4,
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

