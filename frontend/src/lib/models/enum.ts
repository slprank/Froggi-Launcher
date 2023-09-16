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

	CurrentPlayerDailyGlobalPlacement = 4100,
	Player1DailyGlobalPlacement = 4101,
	Player2DailyGlobalPlacement = 4102,
	CurrentPlayerDailyRegionalPlacement = 4103,
	Player1DailyRegionalPlacement = 4104,
	Player2DailyRegionalPlacement = 4105,
	CurrentPlayerWins = 4106,
	Player1Wins = 4107,
	Player2Wins = 4108,
	CurrentPlayerWinsPercent = 4109,
	Player1WinsPercent = 4110,
	Player2WinsPercent = 4111,
	CurrentPlayerLosses = 4112,
	Player1Losses = 4113,
	Player2Losses = 4114,
	CurrentPlayerLossesPercent = 4115,
	Player1LossesPercent = 4116,
	Player2LossesPercent = 4117,
	CurrentPlayerCharacter1 = 4118,
	Player1Character1 = 4119,
	Player2Character1 = 4120,
	CurrentPlayerCharacter2 = 4121,
	Player1Character2 = 4122,
	Player2Character2 = 4123,
	CurrentPlayerCharacter3 = 4124,
	Player1Character3 = 4125,
	Player2Character3 = 4126,
	CurrentPlayerCharacter1Percent = 4127,
	Player1Character1Percent = 4128,
	Player2Character1Percent = 4129,
	CurrentPlayerCharacter2Percent = 4130,
	Player1Character2Percent = 4131,
	Player2Character2Percent = 4132,
	CurrentPlayerCharacter3Percent = 4133,
	Player1Character3Percent = 4134,
	Player2Character3Percent = 4135,

	CurrentPlayerAttackCountBair = 4200,
	Player1AttackCountBair = 4201,
	Player2AttackCountBair = 4202,
	CurrentPlayerAttackCountDair = 4203,
	Player1AttackCountDair = 4204,
	Player2AttackCountDair = 4205,
	CurrentPlayerAttackCountDash = 4206,
	Player1AttackCountDash = 4207,
	Player2AttackCountDash = 4208,
	CurrentPlayerAttackCountDsmash = 4209,
	Player1AttackCountDsmash = 4210,
	Player2AttackCountDsmash = 4211,
	CurrentPlayerAttackCountDtilt = 4212,
	Player1AttackCountDtilt = 4213,
	Player2AttackCountDtilt = 4214,
	CurrentPlayerAttackCountFair = 4215,
	Player1AttackCountFair = 4216,
	Player2AttackCountFair = 4217,
	CurrentPlayerAttackCountFsmash = 4218,
	Player1AttackCountFsmash = 4219,
	Player2AttackCountFsmash = 4220,
	CurrentPlayerAttackCountFtilt = 4221,
	Player1AttackCountFtilt = 4222,
	Player2AttackCountFtilt = 4223,
	CurrentPlayerAttackCountJab = 4224,
	Player1AttackCountJab = 4225,
	Player2AttackCountJab = 4226,
	CurrentPlayerAttackCountJab2 = 4227,
	Player1AttackCountJab2 = 4228,
	Player2AttackCountJab2 = 4229,
	CurrentPlayerAttackCountJab3 = 4230,
	Player1AttackCountJab3 = 4231,
	Player2AttackCountJab3 = 4232,
	CurrentPlayerAttackCountJabMulti = 4233,
	Player1AttackCountJabMulti = 4234,
	Player2AttackCountJabMulti = 4235,
	CurrentPlayerAttackCountJabNair = 4236,
	Player1AttackCountJabNair = 4237,
	Player2AttackCountJabNair = 4238,
	CurrentPlayerAttackCountJabUair = 4239,
	Player1AttackCountJabUair = 4240,
	Player2AttackCountJabUair = 4241,
	CurrentPlayerAttackCountJabUsmash = 4242,
	Player1AttackCountJabUsmash = 4243,
	Player2AttackCountJabUsmash = 4244,
	CurrentPlayerAttackCountJabUtilt = 4245,
	Player1AttackCountJabUtilt = 4246,
	Player2AttackCountJabUtilt = 4247,

	CurrentPlayerActionCountJabAirDodge = 4248,
	Player1ActionCountJabAirDodge = 4249,
	Player2ActionCountJabAirDodge = 4250,

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