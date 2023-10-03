
export enum AnimationTrigger {
    None = "None",
    GameCountdown = "Game Countdown",
    Player1Percent = "Player1 Percent Increase",
    Player2Percent = "Player2 Percent Increase",
    Player1StockLost = "Player1 Stock Loss",
    Player2StockLost = "Player2 Stock Loss",
}

export enum VisibilityOption {
    GameRunning = "GameRunning",
    GamePaused = "GamePaused",
    GameReady = "GameReady",
    GameGo = "GameGo",
    GameCountdown = "GameCountdown",
    GameEnd = "GameEnd",
    GameTime = "GameTime",
}

export enum VisibilityCategory {
    CurrentPlayerState = "Current Player State",
    Player1State = "Player1 State",
    Player2State = "Player2 State",
    OngoingGame = "Ongoing Game",
    GameState = "Game State",
    Session = "Session",
    RecentGames = "Recent Games"
}

export enum AnimationTriggerCategory {
    CurrentPlayerState = "Current Player State",
    Player1State = "Player1 State",
    Player2State = "Player2 State",
    GameState = "Game State",
}

export type SelectedAnimationTriggerOption = {
    [option in AnimationTrigger]: boolean;
};

export type SelectedVisibilityOption = {
    [option in VisibilityOption]: VisibilityToggle;
};

export enum VisibilityToggle {
    Disabled = 0,
    True = 1,
    False = 2,
}