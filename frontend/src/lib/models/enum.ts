export enum LiveStatsScene {
	WaitingForDolphin = 0,
	PreGame = 2,
	InGame = 4,
	PostGame = 6,
	RankChange = 8,
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