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
	// Potential Box Settings

	// Image
	Player1RankIcon = 300,
	Player2RankIcon = 301,
}

export enum SceneBackground {
	None = 0,
	Color = 1,
	Image = 2,
}

export enum Transition {
	None = 0,
	Fade = 1,
	Scale = 2,
	Fly = 3,
}
