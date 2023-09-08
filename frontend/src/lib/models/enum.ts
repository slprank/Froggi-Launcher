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
	CurrentPlayerSlippiData = 13,
	Player1SlippiData = 14,
	Player2SlippiData = 15,
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

export enum CustomElement {

	// Custom String
	CustomString = 1000,
	CurrentPlayerPercent = 1001,
	Player1Percent = 1002,
	Player2Percent = 1003,
	CurrentPlayerPercentDecimal = 1004,
	Player1PercentDecimal = 1005,
	Player2PercentDecimal = 1006,

	// Custom Image
	CustomImage = 2000,
	CurrentPlayerCharacterRender = 2001,
	Player1CharacterRender = 2002,
	Player2CharacterRender = 2003,

	// Custom Box
	CustomBox = 3000,

	// String
	CurrentPlayerTag = 4000,
	Player1Tag = 4001,
	Player2Tag = 4002,
	CurrentPlayerScore = 4003,
	Player1Score = 4004,
	Player2Score = 4005,
	CurrentPlayerRankText = 4006,
	Player1RankText = 4007,
	Player2RankText = 4008,
	CurrentPlayerRating = 4009,
	Player1Rating = 4010,
	Player2Rating = 4011,
	CurrentPlayerConnectCode = 4012,
	Player1ConnectCode = 4013,
	Player2ConnectCode = 40140,
	CurrentPlayerContinent = 4015,
	Player1Continent = 4016,
	Player2Continent = 4017,
	CurrentPlayerContinentInitials = 4018,
	Player1ContinentInitials = 4019,
	Player2ContinentInitials = 4020,

	CurrentPlayerDailyGlobalPlacement = 4030,
	Player1DailyGlobalPlacement = 4031,
	Player2DailyGlobalPlacement = 4032,
	CurrentPlayerDailyRegionalPlacement = 4033,
	Player1DailyRegionalPlacement = 40340,
	Player2DailyRegionalPlacement = 4035,
	CurrentPlayerWins = 4036,
	Player1Wins = 4037,
	Player2Wins = 4038,
	CurrentPlayerWinsPercent = 4039,
	Player1WinsPercent = 4040,
	Player2WinsPercent = 4041,
	CurrentPlayerLosses = 4042,
	Player1Losses = 4043,
	Player2Losses = 4044,
	CurrentPlayerLossesPercent = 4045,
	Player1LossesPercent = 4046,
	Player2LossesPercent = 4047,
	CurrentPlayerCharacter1 = 4048,
	Player1Character1 = 4049,
	Player2Character1 = 4050,
	CurrentPlayerCharacter2 = 4051,
	Player1Character2 = 4052,
	Player2Character2 = 4053,
	CurrentPlayerCharacter3 = 4054,
	Player1Character3 = 4055,
	Player2Character3 = 4056,
	CurrentPlayerCharacter1Percent = 4057,
	Player1Character1Percent = 4058,
	Player2Character1Percent = 4059,
	CurrentPlayerCharacter2Percent = 4060,
	Player1Character2Percent = 4061,
	Player2Character2Percent = 4062,
	CurrentPlayerCharacter3Percent = 4063,
	Player1Character3Percent = 4064,
	Player2Character3Percent = 4065,

	GameMode = 5050,
	BestOf = 5051,

	// Image
	CurrentPlayerRankIcon = 6000,
	Player1RankIcon = 6001,
	Player2RankIcon = 6002,
	CurrentPlayerCharacterIcon = 6003,
	Player1CharacterIcon = 6004,
	Player2CharacterIcon = 6005,
	CurrentPlayerCharacter1Icon = 6006,
	Player1Character1Icon = 6007,
	Player2Character1Icon = 6008,
	CurrentPlayerCharacter2Icon = 6009,
	Player1Character2Icon = 6010,
	Player2Character2Icon = 6011,
	CurrentPlayerCharacter3Icon = 6012,
	Player1Character3Icon = 6013,
	Player2Character3Icon = 6014,
}