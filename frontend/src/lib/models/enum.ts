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
	CustomUi = "Custom UI",
	PostGameStats = "Post Game Stats",
	PostSetStats = "Post Set Stats",
	CurrentSetStats = "Current Set Stats",
	Custom = "Custom",
	CurrentPlayerSlippiData = "Current Player Slippi Data",
	Player1SlippiData = "Player1 Slippi Data",
	Player2SlippiData = "Player2 Slippi Data",
	ControllerInput = "Controller Input",
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
	CustomCurrentPlayerPercent = 1001,
	InGamePlayer1Percent = 1100,
	InGamePlayer2Percent = 1101,
	InGameCurrentPlayerPercentDecimal = 1102,
	InGamePlayer1PercentDecimal = 1103,
	InGamePlayer2PercentDecimal = 1104,

	// Custom Image
	CustomImage = 2000,
	InGameCurrentPlayerCharacterRender = 2001,
	InGamePlayer1CharacterRender = 2002,
	InGamePlayer2CharacterRender = 2003,

	// Custom Box
	CustomBox = 3000,

	// String
	// Rank Data
	SlippiRankCurrentPlayerTag = 4000,
	SlippiRankPlayer1Tag = 4001,
	SlippiRankPlayer2Tag = 4002,
	SlippiRankCurrentPlayerScore = 4003,
	SlippiRankCurrentPlayerRankText = 4006,
	SlippiRankPlayer1RankText = 4007,
	SlippiRankPlayer2RankText = 4008,
	SlippiRankCurrentPlayerRating = 4009,
	SlippiRankPlayer1Rating = 4010,
	SlippiRankPlayer2Rating = 4011,
	SlippiRankCurrentPlayerConnectCode = 4012,
	SlippiRankPlayer1ConnectCode = 4013,
	SlippiRankPlayer2ConnectCode = 40140,
	SlippiRankCurrentPlayerContinent = 4015,
	SlippiRankPlayer1Continent = 4016,
	SlippiRankPlayer2Continent = 4017,
	SlippiRankCurrentPlayerContinentInitials = 4018,
	SlippiRankPlayer1ContinentInitials = 4019,
	SlippiRankPlayer2ContinentInitials = 4020,
	SlippiRankCurrentPlayerDailyGlobalPlacement = 4100,
	SlippiRankPlayer1DailyGlobalPlacement = 4101,
	SlippiRankPlayer2DailyGlobalPlacement = 4102,
	SlippiRankCurrentPlayerDailyRegionalPlacement = 4103,
	SlippiRankPlayer1DailyRegionalPlacement = 4104,
	SlippiRankPlayer2DailyRegionalPlacement = 4105,
	SlippiRankCurrentPlayerWins = 4106,
	SlippiRankPlayer1Wins = 4107,
	SlippiRankPlayer2Wins = 4108,
	SlippiRankCurrentPlayerWinsPercent = 4109,
	SlippiRankPlayer1WinsPercent = 4110,
	SlippiRankPlayer2WinsPercent = 4111,
	SlippiRankCurrentPlayerLosses = 4112,
	SlippiRankPlayer1Losses = 4113,
	SlippiRankPlayer2Losses = 4114,
	SlippiRankCurrentPlayerLossesPercent = 4115,
	SlippiRankPlayer1LossesPercent = 4116,
	SlippiRankPlayer2LossesPercent = 4117,
	SlippiRankCurrentPlayerCharacter1 = 4118,
	SlippiRankPlayer1Character1 = 4119,
	SlippiRankPlayer2Character1 = 4120,
	SlippiRankCurrentPlayerCharacter2 = 4121,
	SlippiRankPlayer1Character2 = 4122,
	SlippiRankPlayer2Character2 = 4123,
	SlippiRankCurrentPlayerCharacter3 = 4124,
	SlippiRankPlayer1Character3 = 4125,
	SlippiRankPlayer2Character3 = 4126,
	SlippiRankCurrentPlayerCharacter1Percent = 4127,
	SlippiRankPlayer1Character1Percent = 4128,
	SlippiRankPlayer2Character1Percent = 4129,
	SlippiRankCurrentPlayerCharacter2Percent = 4130,
	SlippiRankPlayer1Character2Percent = 4131,
	SlippiRankPlayer2Character2Percent = 4132,
	SlippiRankCurrentPlayerCharacter3Percent = 4133,
	SlippiRankPlayer1Character3Percent = 4134,
	SlippiRankPlayer2Character3Percent = 4135,

	// In Game
	InGamePlayer1Score = 4200,
	InGamePlayer2Score = 4201,

	// Post Game
	PostGameCurrentPlayerAttackCountBair = 4400,
	PostGamePlayer1AttackCountBair = 4401,
	PostGamePlayer2AttackCountBair = 4402,
	PostGameCurrentPlayerAttackCountDair = 4403,
	PostGamePlayer1AttackCountDair = 4404,
	PostGamePlayer2AttackCountDair = 4405,
	PostGameCurrentPlayerAttackCountDash = 4406,
	PostGamePlayer1AttackCountDash = 4407,
	PostGamePlayer2AttackCountDash = 4408,
	PostGameCurrentPlayerAttackCountDsmash = 4409,
	PostGamePlayer1AttackCountDsmash = 4410,
	PostGamePlayer2AttackCountDsmash = 4411,
	PostGameCurrentPlayerAttackCountDtilt = 4412,
	PostGamePlayer1AttackCountDtilt = 4413,
	PostGamePlayer2AttackCountDtilt = 4414,
	PostGameCurrentPlayerAttackCountFair = 4415,
	PostGamePlayer1AttackCountFair = 4416,
	PostGamePlayer2AttackCountFair = 4417,
	PostGameCurrentPlayerAttackCountFsmash = 4418,
	PostGamePlayer1AttackCountFsmash = 4419,
	PostGamePlayer2AttackCountFsmash = 4420,
	PostGameCurrentPlayerAttackCountFtilt = 4421,
	PostGamePlayer1AttackCountFtilt = 4422,
	PostGamePlayer2AttackCountFtilt = 4423,
	PostGameCurrentPlayerAttackCountJab = 4424,
	PostGamePlayer1AttackCountJab = 4425,
	PostGamePlayer2AttackCountJab = 4426,
	PostGameCurrentPlayerAttackCountJab2 = 4427,
	PostGamePlayer1AttackCountJab2 = 4428,
	PostGamePlayer2AttackCountJab2 = 4429,
	PostGameCurrentPlayerAttackCountJab3 = 4430,
	PostGamePlayer1AttackCountJab3 = 4431,
	PostGamePlayer2AttackCountJab3 = 4432,
	PostGameCurrentPlayerAttackCountJabMulti = 4433,
	PostGamePlayer1AttackCountJabMulti = 4434,
	PostGamePlayer2AttackCountJabMulti = 4435,
	PostGameCurrentPlayerAttackCountJabNair = 4436,
	PostGamePlayer1AttackCountJabNair = 4437,
	PostGamePlayer2AttackCountJabNair = 4438,
	PostGameCurrentPlayerAttackCountJabUair = 4439,
	PostGamePlayer1AttackCountJabUair = 4440,
	PostGamePlayer2AttackCountJabUair = 4441,
	PostGameCurrentPlayerAttackCountJabUsmash = 4442,
	PostGamePlayer1AttackCountJabUsmash = 4443,
	PostGamePlayer2AttackCountJabUsmash = 4444,
	PostGameCurrentPlayerAttackCountJabUtilt = 4445,
	PostGamePlayer1AttackCountJabUtilt = 4446,
	PostGamePlayer2AttackCountJabUtilt = 4447,

	PostGameCurrentPlayerActionCountAirDodge = 4448,
	PostGamePlayer1ActionCountAirDodge = 4449,
	PostGamePlayer2ActionCountAirDodge = 4450,
	PostGameCurrentPlayerActionCountDashDance = 4451,
	PostGamePlayer1ActionCountAirDashDance = 4452,
	PostGamePlayer2ActionCountAirDashDance = 4453,
	PostGameCurrentPlayerActionCountLedgeGrab = 4454,
	PostGamePlayer1ActionCountAirLedgeGrab = 4455,
	PostGamePlayer2ActionCountAirLedgeGrab = 4456,
	PostGameCurrentPlayerActionCountRoll = 4457,
	PostGamePlayer1ActionCountRoll = 4458,
	PostGamePlayer2ActionCountRoll = 4459,
	PostGameCurrentPlayerActionSpotDodge = 4460,
	PostGamePlayer1ActionSpotDodge = 4461,
	PostGamePlayer2ActionSpotDodge = 4462,
	PostGameCurrentPlayerActionWaveDash = 4463,
	PostGamePlayer1ActionWaveDash = 4464,
	PostGamePlayer2ActionWaveDash = 4465,
	PostGameCurrentPlayerActionWaveLand = 4466,
	PostGamePlayer1ActionWaveLand = 4467,
	PostGamePlayer2ActionWaveLand = 4468,

	PostGameCurrentPlayerActionGrabTotal = 4469,
	PostGamePlayer1ActionGrabTotal = 4470,
	PostGamePlayer2ActionGrabTotal = 4471,
	PostGameCurrentPlayerActionGrabSuccess = 4472,
	PostGamePlayer1ActionGrabSuccess = 4473,
	PostGamePlayer2ActionGrabSuccess = 4474,
	PostGameCurrentPlayerActionGrabFail = 4475,
	PostGamePlayer1ActionGrabFail = 4476,
	PostGamePlayer2ActionGrabFail = 4477,
	PostGameCurrentPlayerActionGrabSuccessPercent = 4478,
	PostGamePlayer1ActionGrabSuccessPercent = 4479,
	PostGamePlayer2ActionGrabSuccessPercent = 4480,
	PostGameCurrentPlayerActionGrabFailPercent = 4481,
	PostGamePlayer1ActionGrabFailPercent = 4482,
	PostGamePlayer2ActionGrabFailPercent = 4483,

	PostGameCurrentPlayerActionGroundTechTotal = 4484,
	PostGamePlayer1ActionGroundTechTotal = 4485,
	PostGamePlayer2ActionGroundTechTotal = 4486,
	PostGameCurrentPlayerActionGroundTechIn = 4487,
	PostGamePlayer1ActionGroundTechIn = 4488,
	PostGamePlayer2ActionGroundTechIn = 4489,
	PostGameCurrentPlayerActionGroundTechOut = 4490,
	PostGamePlayer1ActionGroundTechOut = 4491,
	PostGamePlayer2ActionGroundTechOut = 4492,
	PostGameCurrentPlayerActionGroundTechNeutral = 4493,
	PostGamePlayer1ActionGroundTechNeutral = 4494,
	PostGamePlayer2ActionGroundTechNeutral = 4495,
	PostGameCurrentPlayerActionGroundTechFail = 4493,
	PostGamePlayer1ActionGroundTechFail = 4494,
	PostGamePlayer2ActionGroundTechFail = 4495,
	PostGameCurrentPlayerActionGroundTechSuccess = 4493,
	PostGamePlayer1ActionGroundTechSuccess = 4494,
	PostGamePlayer2ActionGroundTechSuccess = 4495,

	PostGameCurrentPlayerActionLCancelTotal = 4496,
	PostGamePlayer1ActionLCancelTotal = 4497,
	PostGamePlayer2ActionLCancelTotal = 4498,
	PostGameCurrentPlayerActionLSuccess = 4499,
	PostGamePlayer1ActionLSuccess = 4300,
	PostGamePlayer2ActionLSuccess = 4301,
	PostGameCurrentPlayerActionLFail = 4302,
	PostGamePlayer1ActionLFail = 4303,
	PostGamePlayer2ActionLFail = 4304,
	PostGameCurrentPlayerActionLSuccessPercent = 4305,
	PostGamePlayer1ActionLSuccessPercent = 4306,
	PostGamePlayer2ActionLSuccessPercent = 4307,
	PostGameCurrentPlayerActionLPercent = 4308,
	PostGamePlayer1ActionLPercent = 4309,
	PostGamePlayer2ActionLPercent = 4310,

	PostGameCurrentPlayerActionThrowTotal = 4311,
	PostGamePlayer1ActionThrowTotal = 4312,
	PostGamePlayer2ActionThrowTotal = 4313,
	PostGameCurrentPlayerActionThrowUp = 4314,
	PostGamePlayer1ActionThrowUp = 4315,
	PostGamePlayer2ActionThrowUp = 4316,
	PostGameCurrentPlayerActionThrowForward = 4317,
	PostGamePlayer1ActionThrowForward = 4318,
	PostGamePlayer2ActionThrowForward = 4319,
	PostGameCurrentPlayerActionThrowBack = 4320,
	PostGamePlayer1ActionThrowBack = 4321,
	PostGamePlayer2ActionThrowBack = 4322,
	PostGameCurrentPlayerActionThrowDown = 4323,
	PostGamePlayer1ActionThrowDown = 4324,
	PostGamePlayer2ActionThrowDown = 4325,

	PostGameCurrentPlayerActionWallTechTotal = 4326,
	PostGamePlayer1ActionWallTechTotal = 4327,
	PostGamePlayer2ActionWallTechTotal = 4328,
	PostGameCurrentPlayerActionWallTechSuccess = 4329,
	PostGamePlayer1ActionWallTechSuccess = 4330,
	PostGamePlayer2ActionWallTechSuccess = 4331,
	PostGameCurrentPlayerActionWallTechFail = 4332,
	PostGamePlayer1ActionWallTechFail = 4333,
	PostGamePlayer2ActionWallTechFail = 4334,
	PostGameCurrentPlayerActionWallTechSuccessPercent = 4335,
	PostGamePlayer1ActionWallTechSuccessPercent = 4336,
	PostGamePlayer2ActionWallTechSuccessPercent = 4337,
	PostGameCurrentPlayerActionWallTechFailPercent = 4338,
	PostGamePlayer1ActionWallTechFailPercent = 4339,
	PostGamePlayer2ActionWallTechFailPercent = 4340,

	PostGameOverallBeneficialTradeTotal = 4341,
	PostGameCurrentPlayerOverallBeneficialTradeCount = 4344,
	PostGamePlayer1OverallBeneficialTradeCount = 4345,
	PostGamePlayer2OverallBeneficialTradeCount = 4346,
	PostGameCurrentPlayerOverallBeneficialTradeRatio = 4347,
	PostGamePlayer1OverallBeneficialTradeRatio = 4348,
	PostGamePlayer2OverallBeneficialTradeRatio = 4349,
	PostGameOverallCounterHitTotal = 4350,
	PostGameCurrentPlayerOverallCounterHitCount = 4353,
	PostGamePlayer1OverallCounterHitCount = 4354,
	PostGamePlayer2OverallCounterHitCount = 4355,
	PostGameCurrentPlayerOverallCounterHitRatio = 4356,
	PostGamePlayer1OverallCounterHitRatio = 4357,
	PostGamePlayer2OverallCounterHitRatio = 4358,
	PostGameCurrentPlayerOverallDamageTotal = 4359,
	PostGamePlayer1OverallDamageTotal = 4360,
	PostGamePlayer2OverallDamageTotal = 4361,
	PostGameCurrentPlayerOverallOpeningsTotal = 4362,
	PostGamePlayer1OverallOpeningsTotal = 4363,
	PostGamePlayer2OverallOpeningsTotal = 4364,
	PostGameCurrentPlayerOverallDamagePerOpening = 4365,
	PostGamePlayer1OverallDamagePerOpening = 4366,
	PostGamePlayer2OverallDamagePerOpening = 4367,
	PostGameCurrentPlayerOverallDigitalInputsTotal = 4368,
	PostGamePlayer1OverallDigitalInputsTotal = 4369,
	PostGamePlayer2OverallDigitalInputsTotal = 4370,
	PostGameCurrentPlayerOverallDigitalInputsPerMinute = 4370,
	PostGamePlayer1OverallDigitalInputsPerMinute = 4371,
	PostGamePlayer2OverallDigitalInputsPerMinute = 4372,
	PostGameCurrentPlayerOverallDigitalInputPerSecond = 4373,
	PostGamePlayer1OverallDigitalInputPerSecond = 4374,
	PostGamePlayer2OverallDigitalInputPerSecond = 4375,
	PostGameCurrentPlayerOverallInputsTotal = 4376,
	PostGamePlayer1OverallInputsTotal = 4377,
	PostGamePlayer2OverallInputsTotal = 4378,
	PostGameCurrentPlayerOverallInputsPerMinute = 4379,
	PostGamePlayer1OverallInputsPerMinute = 4380,
	PostGamePlayer2OverallInputsPerMinute = 4381,
	PostGameCurrentPlayerOverallInputPerSecond = 4382,
	PostGamePlayer1OverallInputPerSecond = 4383,
	PostGamePlayer2OverallInputPerSecond = 4384,
	PostGameOverallNeutralWinsTotal = 4385,
	PostGameCurrentPlayerOverallNeutralWinsCount = 4386,
	PostGamePlayer1OverallNeutralWinsCount = 4387,
	PostGamePlayer2OverallNeutralWinsCount = 4388,
	PostGameCurrentPlayerOverallNeutralWinsRatio = 4389,
	PostGamePlayer1OverallNeutralWinsRatio = 4390,
	PostGamePlayer2OverallNeutralWinsRatio = 4391,
	PostGameCurrentPlayerOverallOpeningsPerKill = 4392,
	PostGamePlayer1OverallOpeningsPerKill = 4393,
	PostGamePlayer2OverallOpeningsPerKill = 4394,

	PostGameCurrentPlayerStocksRemaining = 4500,
	PostGamePlayer1StocksRemaining = 4501,
	PostGamePlayer2StocksRemaining = 4502,


	// Post Set
	// 5000-5399

	// Set
	CurrentSetGameMode = 5400,
	CurrentSetGameBestOf = 5401,
	CurrentSetPlayer1Score = 5402,
	CurrentSetPlayer2Score = 5403,

	CurrentSetGame1Player1Score = 5410,
	CurrentSetGame1Player2Score = 5411,
	CurrentSetGame1Player1StocksRemaining = 5412,
	CurrentSetGame1Player2StocksRemaining = 5413,

	CurrentSetGame2Player1Score = 5420,
	CurrentSetGame2Player2Score = 5421,
	CurrentSetGame2Player1StocksRemaining = 5422,
	CurrentSetGame2Player2StocksRemaining = 5423,

	CurrentSetGame3Player1Score = 5430,
	CurrentSetGame3Player2Score = 5431,
	CurrentSetGame3Player1StocksRemaining = 5432,
	CurrentSetGame3Player2StocksRemaining = 5433,

	CurrentSetGame4Player1Score = 5440,
	CurrentSetGame4Player2Score = 5441,
	CurrentSetGame4Player1StocksRemaining = 5442,
	CurrentSetGame4Player2StocksRemaining = 5443,

	CurrentSetGame5Player1Score = 5450,
	CurrentSetGame5Player2Score = 5451,
	CurrentSetGame5Player1StocksRemaining = 5452,
	CurrentSetGame5Player2StocksRemaining = 5453,

	// Session

	// Image
	// Rank Data
	SlippiRankCurrentPlayerRankIcon = 6000,
	SlippiRankPlayer1RankIcon = 6001,
	SlippiRankPlayer2RankIcon = 6002,
	SlippiRankCurrentPlayerCharacterIcon = 6003,
	SlippiRankPlayer1CharacterIcon = 6004,
	SlippiRankPlayer2CharacterIcon = 6005,
	SlippiRankCurrentPlayerCharacter1Icon = 6006,
	SlippiRankPlayer1Character1Icon = 6007,
	SlippiRankPlayer2Character1Icon = 6008,
	SlippiRankCurrentPlayerCharacter2Icon = 6009,
	SlippiRankPlayer1Character2Icon = 6010,
	SlippiRankPlayer2Character2Icon = 6011,
	SlippiRankCurrentPlayerCharacter3Icon = 6012,
	SlippiRankPlayer1Character3Icon = 6013,
	SlippiRankPlayer2Character3Icon = 6014,

	// In Game
	InGameStage = 6200,
	InGamePlayer1CharacterIcon = 6202,
	InGamePlayer2CharacterIcon = 6203,

	// Post Game
	PostGameStage = 6300,
	PostGameCurrentPlayerCharacterIcon = 6301,
	PostGamePlayer1CharacterIcon = 6302,
	PostGamePlayer2CharacterIcon = 6303,
	PostGameCurrentPlayerCharacterRender = 6304,
	PostGamePlayer1CharacterRender = 6305,
	PostGamePlayer2CharacterRender = 6306,

	// Post Set

	// Current Set
	CurrentSetGame1Stage = 6310,
	CurrentSetGame1Player1CharacterIcon = 6311,
	CurrentSetGame1Player2CharacterIcon = 6312,
	CurrentSetGame1Player1CharacterRender = 6313,
	CurrentSetGame1Player2CharacterRender = 6314,

	CurrentSetGame2Stage = 6320,
	CurrentSetGame2Player1CharacterIcon = 6321,
	CurrentSetGame2Player2CharacterIcon = 6322,
	CurrentSetGame2Player1CharacterRender = 6323,
	CurrentSetGame2Player2CharacterRender = 6324,

	CurrentSetGame3Stage = 6330,
	CurrentSetGame3Player1CharacterIcon = 6331,
	CurrentSetGame3Player2CharacterIcon = 6332,
	CurrentSetGame3Player1CharacterRender = 6333,
	CurrentSetGame3Player2CharacterRender = 6334,

	CurrentSetGame4Stage = 6340,
	CurrentSetGame4Player1CharacterIcon = 6341,
	CurrentSetGame4Player2CharacterIcon = 6342,
	CurrentSetGame4Player1CharacterRender = 6343,
	CurrentSetGame4Player2CharacterRender = 6344,

	CurrentSetGame5Stage = 6350,
	CurrentSetGame5Player1CharacterIcon = 6351,
	CurrentSetGame5Player2CharacterIcon = 6352,
	CurrentSetGame5Player1CharacterRender = 6353,
	CurrentSetGame5Player2CharacterRender = 6354,
}