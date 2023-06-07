export enum LiveStatsScene {
	WaitingForDolphin = 0,
	PreGame = 2,
	InGame = 4,
	PostGame = 6,
	RankChange = 8,
}

export enum CustomElement {
	CustomString = 1,
	CustomBox = 2,
	CustomImage = 3,

	// String
	Player1Tag = 100,
	Player2Tag = 101,
	Player1Score = 102,
	Player2Score = 103,

	// Box
	// Potential Box Elements

	// Image
	Player1RankIcon = 300,
	Player2RankIcon = 301,
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
