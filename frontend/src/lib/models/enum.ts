export enum Animation {
	None = 0,
	Blur = 1,
	Fade = 2,
	Fly = 3,
	FlyRandom = 4,
	Scale = 5,
	Slide = 6,
}

export enum AnimationTrigger {
	None = 0,
	Visibility = 1,
	Player1Percent = 2,
	Player2Percent = 3,
	Player1StockLost = 2,
	Player2StockLost = 3,
}

export enum CustomElement {

	// Custom String
	CustomString = 100,
	Player1Percent = 101,
	Player2Percent = 102,
	Player1PercentDecimal = 103,
	Player2PercentDecimal = 104,

	// Custom Image
	CustomImage = 200,
	Player1CharacterRender = 201,
	Player2CharacterRender = 202,

	// Custom Box
	CustomBox = 300,

	// String
	Player1Tag = 400,
	Player2Tag = 401,
	Player1Score = 402,
	Player2Score = 403,


	// Box
	// Potential Box Elements

	// Image
	Player1RankIcon = 600,
	Player2RankIcon = 601,
	Player1CharacterIcon = 602,
	Player2CharacterIcon = 603,
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

