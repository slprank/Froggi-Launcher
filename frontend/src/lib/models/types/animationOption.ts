
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

    PostGameCurrentPlayerWin = "PostGameCurrentPlayerWin",
    PostGameCurrentPlayerLoss = "PostGameCurrentPlayerLoss",
    PostGamePlayer1Win = "PostGamePlayer1Win",
    PostGamePlayer2Win = "PostGamePlayer2Win",
    PostGamePlayer1Stock1 = "PostGamePlayer1Stock1",
    PostGamePlayer1Stock2 = "PostGamePlayer1Stock2",
    PostGamePlayer1Stock3 = "PostGamePlayer1Stock3",
    PostGamePlayer1Stock4 = "PostGamePlayer1Stock4",
    PostGamePlayer2Stock1 = "PostGamePlayer1Stock1",
    PostGamePlayer2Stock2 = "PostGamePlayer1Stock2",
    PostGamePlayer2Stock3 = "PostGamePlayer1Stock3",
    PostGamePlayer2Stock4 = "PostGamePlayer1Stock4",

    PostGame1SummaryCurrentPlayerWin = "PostGame1SummaryCurrentPlayerWin",
    PostGame1SummaryCurrentPlayerLoss = "PostGame1SummaryCurrentPlayerLoss",
    PostGame1SummaryPlayer1Win = "PostGame1SummaryPlayer1Win",
    PostGame1SummaryPlayer2Win = "PostGame1SummaryPlayer2Win",
    PostGame1SummaryPlayer1Stock1 = "PostGame1SummaryPlayer1Stock1",
    PostGame1SummaryPlayer1Stock2 = "PostGame1SummaryPlayer1Stock2",
    PostGame1SummaryPlayer1Stock3 = "PostGame1SummaryPlayer1Stock3",
    PostGame1SummaryPlayer1Stock4 = "PostGame1SummaryPlayer1Stock4",
    PostGame1SummaryPlayer2Stock1 = "PostGame1SummaryPlayer1Stock1",
    PostGame1SummaryPlayer2Stock2 = "PostGame1SummaryPlayer1Stock2",
    PostGame1SummaryPlayer2Stock3 = "PostGame1SummaryPlayer1Stock3",
    PostGame1SummaryPlayer2Stock4 = "PostGame1SummaryPlayer1Stock4",

    PostGame2SummaryCurrentPlayerWin = "PostGame2SummaryCurrentPlayerWin",
    PostGame2SummaryCurrentPlayerLoss = "PostGame2SummaryCurrentPlayerLoss",
    PostGame2SummaryPlayer1Win = "PostGame2SummaryPlayer1Win",
    PostGame2SummaryPlayer2Win = "PostGame2SummaryPlayer2Win",
    PostGame2SummaryPlayer1Stock1 = "PostGame2SummaryPlayer1Stock1",
    PostGame2SummaryPlayer1Stock2 = "PostGame2SummaryPlayer1Stock2",
    PostGame2SummaryPlayer1Stock3 = "PostGame2SummaryPlayer1Stock3",
    PostGame2SummaryPlayer1Stock4 = "PostGame2SummaryPlayer1Stock4",
    PostGame2SummaryPlayer2Stock1 = "PostGame2SummaryPlayer1Stock1",
    PostGame2SummaryPlayer2Stock2 = "PostGame2SummaryPlayer1Stock2",
    PostGame2SummaryPlayer2Stock3 = "PostGame2SummaryPlayer1Stock3",
    PostGame2SummaryPlayer2Stock4 = "PostGame2SummaryPlayer1Stock4",

    PostGame3SummaryCurrentPlayerWin = "PostGame3SummaryCurrentPlayerWin",
    PostGame3SummaryCurrentPlayerLoss = "PostGame3SummaryCurrentPlayerLoss",
    PostGame3SummaryPlayer1Win = "PostGame3SummaryPlayer1Win",
    PostGame3SummaryPlayer2Win = "PostGame3SummaryPlayer2Win",
    PostGame3SummaryPlayer1Stock1 = "PostGame3SummaryPlayer1Stock1",
    PostGame3SummaryPlayer1Stock2 = "PostGame3SummaryPlayer1Stock2",
    PostGame3SummaryPlayer1Stock3 = "PostGame3SummaryPlayer1Stock3",
    PostGame3SummaryPlayer1Stock4 = "PostGame3SummaryPlayer1Stock4",
    PostGame3SummaryPlayer2Stock1 = "PostGame3SummaryPlayer1Stock1",
    PostGame3SummaryPlayer2Stock2 = "PostGame3SummaryPlayer1Stock2",
    PostGame3SummaryPlayer2Stock3 = "PostGame3SummaryPlayer1Stock3",
    PostGame3SummaryPlayer2Stock4 = "PostGame3SummaryPlayer1Stock4",

    PostGame4SummaryCurrentPlayerWin = "PostGame4SummaryCurrentPlayerWin",
    PostGame4SummaryCurrentPlayerLoss = "PostGame4SummaryCurrentPlayerLoss",
    PostGame4SummaryPlayer1Win = "PostGame4SummaryPlayer1Win",
    PostGame4SummaryPlayer2Win = "PostGame4SummaryPlayer2Win",
    PostGame4SummaryPlayer1Stock1 = "PostGame4SummaryPlayer1Stock1",
    PostGame4SummaryPlayer1Stock2 = "PostGame4SummaryPlayer1Stock2",
    PostGame4SummaryPlayer1Stock3 = "PostGame4SummaryPlayer1Stock3",
    PostGame4SummaryPlayer1Stock4 = "PostGame4SummaryPlayer1Stock4",
    PostGame4SummaryPlayer2Stock1 = "PostGame4SummaryPlayer1Stock1",
    PostGame4SummaryPlayer2Stock2 = "PostGame4SummaryPlayer1Stock2",
    PostGame4SummaryPlayer2Stock3 = "PostGame4SummaryPlayer1Stock3",
    PostGame4SummaryPlayer2Stock4 = "PostGame4SummaryPlayer1Stock4",

    PostGame5SummaryCurrentPlayerWin = "PostGame5SummaryCurrentPlayerWin",
    PostGame5SummaryCurrentPlayerLoss = "PostGame5SummaryCurrentPlayerLoss",
    PostGame5SummaryPlayer1Win = "PostGame5SummaryPlayer1Win",
    PostGame5SummaryPlayer2Win = "PostGame5SummaryPlayer2Win",
    PostGame5SummaryPlayer1Stock1 = "PostGame5SummaryPlayer1Stock1",
    PostGame5SummaryPlayer1Stock2 = "PostGame5SummaryPlayer1Stock2",
    PostGame5SummaryPlayer1Stock3 = "PostGame5SummaryPlayer1Stock3",
    PostGame5SummaryPlayer1Stock4 = "PostGame5SummaryPlayer1Stock4",
    PostGame5SummaryPlayer2Stock1 = "PostGame5SummaryPlayer1Stock1",
    PostGame5SummaryPlayer2Stock2 = "PostGame5SummaryPlayer1Stock2",
    PostGame5SummaryPlayer2Stock3 = "PostGame5SummaryPlayer1Stock3",
    PostGame5SummaryPlayer2Stock4 = "PostGame5SummaryPlayer1Stock4",
}

export enum VisibilityCategory {
    CurrentPlayerState = "Current Player State",
    Player1State = "Player1 State",
    Player2State = "Player2 State",
    OngoingGame = "Ongoing Game",
    Session = "Session",
    InGameState = "Game State",
    RecentGame = "Recent Game",
    RecentGame1Summary = "Recent Game1 Summary",
    RecentGame2Summary = "Recent Game2 Summary",
    RecentGame3Summary = "Recent Game3 Summary",
    RecentGame4Summary = "Recent Game4 Summary",
    RecentGame5Summary = "Recent Game5 Summary",
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