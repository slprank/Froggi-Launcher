
export enum AnimationTrigger {
    None = "None",
    GameCountdown = "Game Countdown",
    CurrentPlayerPercent = "Current Player Percent Increase",
    Player1Percent = "Player1 Percent Increase",
    Player2Percent = "Player2 Percent Increase",
    CurrentPlayerStockLost = "Current Player Stock Loss",
    Player1StockLost = "Player1 Stock Loss",
    Player2StockLost = "Player2 Stock Loss",
    CurrentPlayerCharacterChange = "Current Player Character Change",
    Player1CharacterChange = "Player1 Character Change",
    Player2CharacterChange = "Player2 Character Change",
}

export enum VisibilityOption {
    SessionPositiveWinRate = "Session Positive Win Rate",
    SessionPositiveNetRating = "Session Positive Net Rating",

    InGameRunning = "Game Running",
    InGamePaused = "Game Paused",
    InGameReady = "Game Ready",
    InGameGo = "Game Go",
    InGameCountdown = "Game Countdown",
    InGameEnd = "Game End",
    InGameTime = "Game Time",
    InGamePlayerOffStage = "Player Off Stage",

    InGamePlayer1Combo = "Player 1 Combo",

    InGamePlayer2Combo = "Player 2 Combo",

    PostGameCurrentPlayerWin = "Post Game Current Player Win",
    PostGameCurrentPlayerLoss = "Post Game Current Player Loss",
    PostGamePlayer1Win = "Post Game Player 1 Win",
    PostGamePlayer2Win = "Post Game Player 2 Win",
    PostGamePlayer1Stock1 = "Post Game Player 1 Stock 1",
    PostGamePlayer1Stock2 = "Post Game Player 1 Stock 2",
    PostGamePlayer1Stock3 = "Post Game Player 1 Stock 3",
    PostGamePlayer1Stock4 = "Post Game Player 1 Stock 4",
    PostGamePlayer2Stock1 = "Post Game Player 1 Stock 1",
    PostGamePlayer2Stock2 = "Post Game Player 1 Stock 2",
    PostGamePlayer2Stock3 = "Post Game Player 1 Stock 3",
    PostGamePlayer2Stock4 = "Post Game Player 1 Stock 4",

    PostGame1SummaryCompleted = "Post Game 1 Summary Completed",
    PostGame1SummaryCurrentPlayerWin = "Post Game 1 Summary Current Player Win",
    PostGame1SummaryCurrentPlayerLoss = "Post Game 1 Summary Current Player Loss",
    PostGame1SummaryPlayer1Win = "Post Game 1 Summary Player 1 Win",
    PostGame1SummaryPlayer2Win = "Post Game 1 Summary Player 2 Win",
    PostGame1SummaryPlayer1Stock1 = "Post Game 1 Summary Player 1 Stock 1",
    PostGame1SummaryPlayer1Stock2 = "Post Game 1 Summary Player 1 Stock 2",
    PostGame1SummaryPlayer1Stock3 = "Post Game 1 Summary Player 1 Stock 3",
    PostGame1SummaryPlayer1Stock4 = "Post Game 1 Summary Player 1 Stock 4",
    PostGame1SummaryPlayer2Stock1 = "Post Game 1 Summary Player 1 Stock 1",
    PostGame1SummaryPlayer2Stock2 = "Post Game 1 Summary Player 1 Stock 2",
    PostGame1SummaryPlayer2Stock3 = "Post Game 1 Summary Player 1 Stock 3",
    PostGame1SummaryPlayer2Stock4 = "Post Game 1 Summary Player 1 Stock 4",

    PostGame2SummaryCompleted = "Post Game 2 Summary Completed",
    PostGame2SummaryCurrentPlayerWin = "Post Game 2 Summary Current Player Win",
    PostGame2SummaryCurrentPlayerLoss = "Post Game 2 Summary Current Player Loss",
    PostGame2SummaryPlayer1Win = "Post Game 2 Summary Player 1 Win",
    PostGame2SummaryPlayer2Win = "Post Game 2 Summary Player 2 Win",
    PostGame2SummaryPlayer1Stock1 = "Post Game 2 Summary Player 1 Stock 1",
    PostGame2SummaryPlayer1Stock2 = "Post Game 2 Summary Player 1 Stock 2",
    PostGame2SummaryPlayer1Stock3 = "Post Game 2 Summary Player 1 Stock 3",
    PostGame2SummaryPlayer1Stock4 = "Post Game 2 Summary Player 1 Stock 4",
    PostGame2SummaryPlayer2Stock1 = "Post Game 2 Summary Player 1 Stock 1",
    PostGame2SummaryPlayer2Stock2 = "Post Game 2 Summary Player 1 Stock 2",
    PostGame2SummaryPlayer2Stock3 = "Post Game 2 Summary Player 1 Stock 3",
    PostGame2SummaryPlayer2Stock4 = "Post Game 2 Summary Player 1 Stock 4",

    PostGame3SummaryCompleted = "Post Game 3 Summary Completed",
    PostGame3SummaryCurrentPlayerWin = "Post Game 3 Summary Current Player Win",
    PostGame3SummaryCurrentPlayerLoss = "Post Game 3 Summary Current Player Loss",
    PostGame3SummaryPlayer1Win = "Post Game 3 Summary Player 1 Win",
    PostGame3SummaryPlayer2Win = "Post Game 3 Summary Player 2 Win",
    PostGame3SummaryPlayer1Stock1 = "Post Game 3 Summary Player 1 Stock 1",
    PostGame3SummaryPlayer1Stock2 = "Post Game 3 Summary Player 1 Stock 2",
    PostGame3SummaryPlayer1Stock3 = "Post Game 3 Summary Player 1 Stock 3",
    PostGame3SummaryPlayer1Stock4 = "Post Game 3 Summary Player 1 Stock 4",
    PostGame3SummaryPlayer2Stock1 = "Post Game 3 Summary Player 1 Stock 1",
    PostGame3SummaryPlayer2Stock2 = "Post Game 3 Summary Player 1 Stock 2",
    PostGame3SummaryPlayer2Stock3 = "Post Game 3 Summary Player 1 Stock 3",
    PostGame3SummaryPlayer2Stock4 = "Post Game 3 Summary Player 1 Stock 4",

    PostGame4SummaryCompleted = "Post Game 4 Summary Completed",
    PostGame4SummaryCurrentPlayerWin = "Post Game 4 Summary Current Player Win",
    PostGame4SummaryCurrentPlayerLoss = "Post Game 4 Summary Current Player Loss",
    PostGame4SummaryPlayer1Win = "Post Game 4 Summary Player 1 Win",
    PostGame4SummaryPlayer2Win = "Post Game 4 Summary Player 2 Win",
    PostGame4SummaryPlayer1Stock1 = "Post Game 4 Summary Player 1 Stock 1",
    PostGame4SummaryPlayer1Stock2 = "Post Game 4 Summary Player 1 Stock 2",
    PostGame4SummaryPlayer1Stock3 = "Post Game 4 Summary Player 1 Stock 3",
    PostGame4SummaryPlayer1Stock4 = "Post Game 4 Summary Player 1 Stock 4",
    PostGame4SummaryPlayer2Stock1 = "Post Game 4 Summary Player 1 Stock 1",
    PostGame4SummaryPlayer2Stock2 = "Post Game 4 Summary Player 1 Stock 2",
    PostGame4SummaryPlayer2Stock3 = "Post Game 4 Summary Player 1 Stock 3",
    PostGame4SummaryPlayer2Stock4 = "Post Game 4 Summary Player 1 Stock 4",

    PostGame5SummaryCompleted = "Post Game 5 Summary Completed",
    PostGame5SummaryCurrentPlayerWin = "Post Game 5 Summary Current Player Win",
    PostGame5SummaryCurrentPlayerLoss = "Post Game 5 Summary Current Player Loss",
    PostGame5SummaryPlayer1Win = "Post Game 5 Summary Player 1 Win",
    PostGame5SummaryPlayer2Win = "Post Game 5 Summary Player 2 Win",
    PostGame5SummaryPlayer1Stock1 = "Post Game 5 Summary Player 1 Stock 1",
    PostGame5SummaryPlayer1Stock2 = "Post Game 5 Summary Player 1 Stock 2",
    PostGame5SummaryPlayer1Stock3 = "Post Game 5 Summary Player 1 Stock 3",
    PostGame5SummaryPlayer1Stock4 = "Post Game 5 Summary Player 1 Stock 4",
    PostGame5SummaryPlayer2Stock1 = "Post Game 5 Summary Player 1 Stock 1",
    PostGame5SummaryPlayer2Stock2 = "Post Game 5 Summary Player 1 Stock 2",
    PostGame5SummaryPlayer2Stock3 = "Post Game 5 Summary Player 1 Stock 3",
    PostGame5SummaryPlayer2Stock4 = "Post Game 5 Summary Player 1 Stock 4",
}

export enum VisibilityCategory {
    CurrentPlayerState = "Current Player State",
    Player1State = "Player 1 State",
    Player2State = "Player 2 State",
    OngoingGame = "Ongoing Game",
    Session = "Session",
    InGameState = "Game State",
    RecentGame = "Recent Game",
    RecentGame1Summary = "Recent Game 1 Summary",
    RecentGame2Summary = "Recent Game 2 Summary",
    RecentGame3Summary = "Recent Game 3 Summary",
    RecentGame4Summary = "Recent Game 4 Summary",
    RecentGame5Summary = "Recent Game 5 Summary",
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