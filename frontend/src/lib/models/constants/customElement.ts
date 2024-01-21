export enum CustomElement {
    // Custom String
    CustomString = 1000,
    InGameCurrentPlayerPercent = 1001,
    InGamePlayer1Percent = 1002,
    InGamePlayer2Percent = 1003,
    InGameCurrentPlayerPercentDecimal = 1004,
    InGamePlayer1PercentDecimal = 1005,
    InGamePlayer2PercentDecimal = 1006,
    InGameCurrentPlayerPercentCustom = 1007,
    InGamePlayer1PercentCustom = 1008,
    InGamePlayer2PercentCustom = 1009,
    InGameCurrentPlayerPercentDecimalCustom = 1010,
    InGamePlayer1PercentDecimalCustom = 1011,
    InGamePlayer2PercentDecimalCustom = 1012,

    InGameCurrentPlayerComboCounter = 1020,
    InGamePlayer1ComboCounter = 1021,
    InGamePlayer2ComboCounter = 1022,
    InGameCurrentPlayerStocksRemaining = 1023,
    InGamePlayer1StocksRemaining = 1024,
    InGamePlayer2StocksRemaining = 1025,

    // Custom Image
    CustomImage = 2000,
    InGameCurrentPlayerCharacterRenderLeft = 2001,
    InGameCurrentPlayerCharacterRenderRight = 2002,
    InGamePlayer1CharacterRenderLeft = 2003,
    InGamePlayer1CharacterRenderRight = 2004,
    InGamePlayer2CharacterRenderLeft = 2005,
    InGamePlayer2CharacterRenderRight = 2006,

    // Custom Box
    CustomBox = 3000,

    InGameCurrentPlayerControllerButtonA = 3100,
    InGameCurrentPlayerControllerButtonB = 3101,
    InGameCurrentPlayerControllerButtonX = 3102,
    InGameCurrentPlayerControllerButtonY = 3103,
    InGameCurrentPlayerControllerDPad = 3104,
    InGameCurrentPlayerControllerButtonZ = 3108,
    InGameCurrentPlayerControllerButtonL = 3109,
    InGameCurrentPlayerControllerButtonR = 3110,


    InGamePlayer1ControllerButtonA = 3120,
    InGamePlayer1ControllerButtonB = 3121,
    InGamePlayer1ControllerButtonX = 3122,
    InGamePlayer1ControllerButtonY = 3123,
    InGamePlayer1ControllerDPad = 3124,
    InGamePlayer1ControllerButtonZ = 3125,
    InGamePlayer1ControllerButtonL = 3126,
    InGamePlayer1ControllerButtonR = 3127,

    InGamePlayer2ControllerButtonA = 3140,
    InGamePlayer2ControllerButtonB = 3141,
    InGamePlayer2ControllerButtonX = 3142,
    InGamePlayer2ControllerButtonY = 3143,
    InGamePlayer2ControllerDPad = 3144,
    InGamePlayer2ControllerButtonZ = 3145,
    InGamePlayer2ControllerButtonL = 3146,
    InGamePlayer2ControllerButtonR = 3147,

    InGameCurrentPlayerControllerAnalogL = 3150,
    InGameCurrentPlayerControllerAnalogR = 3151,
    InGamePlayer1ControllerAnalogL = 3152,
    InGamePlayer1ControllerAnalogR = 3153,
    InGamePlayer2ControllerAnalogL = 3154,
    InGamePlayer2ControllerAnalogR = 3155,

    InGameCurrentPlayerControllerAnalogStickL = 3160,
    InGameCurrentPlayerControllerAnalogStickR = 3161,
    InGamePlayer1ControllerAnalogStickL = 3162,
    InGamePlayer1ControllerAnalogStickR = 3163,
    InGamePlayer2ControllerAnalogStickL = 3164,
    InGamePlayer2ControllerAnalogStickR = 3165,

    InGamePlayerRadar = 3200,

    // String
    // Rank Data
    SlippiRankCurrentPlayerTag = 4000,
    SlippiRankCurrentPlayerScore = 4003,
    SlippiRankCurrentPlayerRankText = 4006,
    SlippiRankPlayer1RankText = 4007,
    SlippiRankPlayer2RankText = 4008,
    SlippiRankCurrentPlayerRating = 4009,
    SlippiRankPlayer1Rating = 4010,
    SlippiRankPlayer2Rating = 4011,
    SlippiRankCurrentPlayerConnectCode = 4012,
    SlippiRankPlayer1ConnectCode = 4013,
    SlippiRankPlayer2ConnectCode = 4014,
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

    SlippiRankChangeRatingDifference = 4140,

    //Post Match Game Summary
    CurrentSetGameRecentPlayer1Score = 4200,
    CurrentSetGameRecentPlayer2Score = 4201,
    CurrentSetGameRecentPlayer1StocksRemaining = 4202,
    CurrentSetGameRecentPlayer2StocksRemaining = 4203,

    CurrentSetGame1Player1Score = 4210,
    CurrentSetGame1Player2Score = 4211,
    CurrentSetGame1Player1StocksRemaining = 4212,
    CurrentSetGame1Player2StocksRemaining = 4213,

    CurrentSetGame2Player1Score = 4220,
    CurrentSetGame2Player2Score = 4221,
    CurrentSetGame2Player1StocksRemaining = 4222,
    CurrentSetGame2Player2StocksRemaining = 4223,

    CurrentSetGame3Player1Score = 4230,
    CurrentSetGame3Player2Score = 4231,
    CurrentSetGame3Player1StocksRemaining = 4232,
    CurrentSetGame3Player2StocksRemaining = 4233,

    CurrentSetGame4Player1Score = 4240,
    CurrentSetGame4Player2Score = 4241,
    CurrentSetGame4Player1StocksRemaining = 4242,
    CurrentSetGame4Player2StocksRemaining = 4243,

    CurrentSetGame5Player1Score = 4250,
    CurrentSetGame5Player2Score = 4251,
    CurrentSetGame5Player1StocksRemaining = 4252,
    CurrentSetGame5Player2StocksRemaining = 4253,

    // In Game
    InGameTimerMinutes = 4300,
    InGameTimerSeconds = 4301,
    InGameTimerMilliseconds1 = 4302,
    InGameTimerMilliseconds2 = 4303,
    InGameTimerMilliseconds3 = 4304,
    InGameTimerSecondsCountdown = 4305,

    // Match

    MatchGameMode = 4400,
    MatchBestOf = 4401,

    MatchPlayer1Tag = 4420,
    MatchPlayer2Tag = 4421,
    MatchPlayer1Score = 4422,
    MatchPlayer2Score = 4423,


    // Post Game
    PostGameCurrentPlayerAttackCountBair = 4600,
    PostGamePlayer1AttackCountBair = 4601,
    PostGamePlayer2AttackCountBair = 4602,
    PostGameCurrentPlayerAttackCountDair = 4603,
    PostGamePlayer1AttackCountDair = 4604,
    PostGamePlayer2AttackCountDair = 4605,
    PostGameCurrentPlayerAttackCountDash = 4606,
    PostGamePlayer1AttackCountDash = 4607,
    PostGamePlayer2AttackCountDash = 4608,
    PostGameCurrentPlayerAttackCountDsmash = 4609,
    PostGamePlayer1AttackCountDsmash = 4610,
    PostGamePlayer2AttackCountDsmash = 4611,
    PostGameCurrentPlayerAttackCountDtilt = 4612,
    PostGamePlayer1AttackCountDtilt = 4613,
    PostGamePlayer2AttackCountDtilt = 4614,
    PostGameCurrentPlayerAttackCountFair = 4615,
    PostGamePlayer1AttackCountFair = 4616,
    PostGamePlayer2AttackCountFair = 4617,
    PostGameCurrentPlayerAttackCountFsmash = 4618,
    PostGamePlayer1AttackCountFsmash = 4619,
    PostGamePlayer2AttackCountFsmash = 4620,
    PostGameCurrentPlayerAttackCountFtilt = 4621,
    PostGamePlayer1AttackCountFtilt = 4622,
    PostGamePlayer2AttackCountFtilt = 4623,
    PostGameCurrentPlayerAttackCountJab = 4624,
    PostGamePlayer1AttackCountJab = 4625,
    PostGamePlayer2AttackCountJab = 4626,
    PostGameCurrentPlayerAttackCountJab2 = 4627,
    PostGamePlayer1AttackCountJab2 = 4628,
    PostGamePlayer2AttackCountJab2 = 4629,
    PostGameCurrentPlayerAttackCountJab3 = 4630,
    PostGamePlayer1AttackCountJab3 = 4631,
    PostGamePlayer2AttackCountJab3 = 4632,
    PostGameCurrentPlayerAttackCountJabMulti = 4633,
    PostGamePlayer1AttackCountJabMulti = 4634,
    PostGamePlayer2AttackCountJabMulti = 4635,
    PostGameCurrentPlayerAttackCountNair = 4636,
    PostGamePlayer1AttackCountNair = 4637,
    PostGamePlayer2AttackCountNair = 4638,
    PostGameCurrentPlayerAttackCountUair = 4639,
    PostGamePlayer1AttackCountUair = 4640,
    PostGamePlayer2AttackCountUair = 4641,
    PostGameCurrentPlayerAttackCountUsmash = 4642,
    PostGamePlayer1AttackCountUsmash = 4643,
    PostGamePlayer2AttackCountUsmash = 4644,
    PostGameCurrentPlayerAttackCountUtilt = 4645,
    PostGamePlayer1AttackCountUtilt = 4646,
    PostGamePlayer2AttackCountUtilt = 4647,

    PostGameCurrentPlayerActionCountAirDodge = 4648,
    PostGamePlayer1ActionCountAirDodge = 4649,
    PostGamePlayer2ActionCountAirDodge = 4650,
    PostGameCurrentPlayerActionCountDashDance = 4651,
    PostGamePlayer1ActionCountDashDance = 4652,
    PostGamePlayer2ActionCountDashDance = 4653,
    PostGameCurrentPlayerActionCountLedgeGrab = 4654,
    PostGamePlayer1ActionCountLedgeGrab = 4655,
    PostGamePlayer2ActionCountLedgeGrab = 4656,
    PostGameCurrentPlayerActionCountRoll = 4657,
    PostGamePlayer1ActionCountRoll = 4658,
    PostGamePlayer2ActionCountRoll = 4659,
    PostGameCurrentPlayerActionCountSpotDodge = 4660,
    PostGamePlayer1ActionCountSpotDodge = 4661,
    PostGamePlayer2ActionCountSpotDodge = 4662,
    PostGameCurrentPlayerActionCountWaveDash = 4663,
    PostGamePlayer1ActionCountWaveDash = 4664,
    PostGamePlayer2ActionCountWaveDash = 4665,
    PostGameCurrentPlayerActionCountWaveLand = 4666,
    PostGamePlayer1ActionCountWaveLand = 4667,
    PostGamePlayer2ActionCountWaveLand = 4668,

    PostGameCurrentPlayerActionCountGrabTotal = 4669,
    PostGamePlayer1ActionCountGrabTotal = 4670,
    PostGamePlayer2ActionCountGrabTotal = 4671,
    PostGameCurrentPlayerActionCountGrabSuccess = 4672,
    PostGamePlayer1ActionCountGrabSuccess = 4673,
    PostGamePlayer2ActionCountGrabSuccess = 4674,
    PostGameCurrentPlayerActionCountGrabFail = 4675,
    PostGamePlayer1ActionCountGrabFail = 4676,
    PostGamePlayer2ActionCountGrabFail = 4677,
    PostGameCurrentPlayerActionCountGrabSuccessPercent = 4678,
    PostGamePlayer1ActionCountGrabSuccessPercent = 4679,
    PostGamePlayer2ActionCountGrabSuccessPercent = 4680,
    PostGameCurrentPlayerActionCountGrabFailPercent = 4681,
    PostGamePlayer1ActionCountGrabFailPercent = 4682,
    PostGamePlayer2ActionCountGrabFailPercent = 4683,

    PostGameCurrentPlayerActionCountGroundTechTotal = 4684,
    PostGamePlayer1ActionCountGroundTechTotal = 4685,
    PostGamePlayer2ActionCountGroundTechTotal = 4686,
    PostGameCurrentPlayerActionCountGroundTechIn = 4687,
    PostGamePlayer1ActionCountGroundTechIn = 4688,
    PostGamePlayer2ActionCountGroundTechIn = 4689,
    PostGameCurrentPlayerActionCountGroundTechAway = 4690,
    PostGamePlayer1ActionCountGroundTechAway = 4691,
    PostGamePlayer2ActionCountGroundTechAway = 4692,
    PostGameCurrentPlayerActionCountGroundTechNeutral = 4693,
    PostGamePlayer1ActionCountGroundTechNeutral = 4694,
    PostGamePlayer2ActionCountGroundTechNeutral = 4695,
    PostGameCurrentPlayerActionCountGroundTechSuccess = 4696,
    PostGamePlayer1ActionCountGroundTechSuccess = 4697,
    PostGamePlayer2ActionCountGroundTechSuccess = 4698,
    PostGameCurrentPlayerActionCountGroundTechSuccessPercent = 4699,
    PostGamePlayer1ActionCountGroundTechSuccessPercent = 4700,
    PostGamePlayer2ActionCountGroundTechSuccessPercent = 4701,
    PostGameCurrentPlayerActionCountGroundTechFail = 4702,
    PostGamePlayer1ActionCountGroundTechFail = 4703,
    PostGamePlayer2ActionCountGroundTechFail = 4704,
    PostGameCurrentPlayerActionCountGroundTechFailPercent = 4705,
    PostGamePlayer1ActionCountGroundTechFailPercent = 4706,
    PostGamePlayer2ActionCountGroundTechFailPercent = 4707,

    PostGameCurrentPlayerActionCountWallTechTotal = 4708,
    PostGamePlayer1ActionCountWallTechTotal = 4709,
    PostGamePlayer2ActionCountWallTechTotal = 4710,
    PostGameCurrentPlayerActionCountWallTechSuccess = 4711,
    PostGamePlayer1ActionCountWallTechSuccess = 4712,
    PostGamePlayer2ActionCountWallTechSuccess = 4713,
    PostGameCurrentPlayerActionCountWallTechFail = 4714,
    PostGamePlayer1ActionCountWallTechFail = 4715,
    PostGamePlayer2ActionCountWallTechFail = 4716,
    PostGameCurrentPlayerActionCountWallTechSuccessPercent = 4717,
    PostGamePlayer1ActionCountWallTechSuccessPercent = 4718,
    PostGamePlayer2ActionCountWallTechSuccessPercent = 4719,
    PostGameCurrentPlayerActionCountWallTechFailPercent = 4720,
    PostGamePlayer1ActionCountWallTechFailPercent = 4721,
    PostGamePlayer2ActionCountWallTechFailPercent = 4722,

    PostGameCurrentPlayerActionCountLCancelTotal = 4723,
    PostGamePlayer1ActionCountLCancelTotal = 4724,
    PostGamePlayer2ActionCountLCancelTotal = 4725,
    PostGameCurrentPlayerActionCountLCancelSuccess = 4726,
    PostGamePlayer1ActionCountLCancelSuccess = 4727,
    PostGamePlayer2ActionCountLCancelSuccess = 4728,
    PostGameCurrentPlayerActionCountLCancelFail = 4729,
    PostGamePlayer1ActionCountLCancelFail = 4730,
    PostGamePlayer2ActionCountLCancelFail = 4731,
    PostGameCurrentPlayerActionCountLCancelSuccessPercent = 4732,
    PostGamePlayer1ActionCountLCancelSuccessPercent = 4733,
    PostGamePlayer2ActionCountLCancelSuccessPercent = 4734,
    PostGameCurrentPlayerActionCountLCancelFailPercent = 4735,
    PostGamePlayer1ActionCountLCancelFailPercent = 4736,
    PostGamePlayer2ActionCountLCancelFailPercent = 4737,

    PostGameCurrentPlayerActionCountThrowTotal = 4738,
    PostGamePlayer1ActionCountThrowTotal = 4739,
    PostGamePlayer2ActionCountThrowTotal = 4740,
    PostGameCurrentPlayerActionCountThrowUp = 4741,
    PostGamePlayer1ActionCountThrowUp = 4742,
    PostGamePlayer2ActionCountThrowUp = 4743,
    PostGameCurrentPlayerActionCountThrowForward = 4744,
    PostGamePlayer1ActionCountThrowForward = 4745,
    PostGamePlayer2ActionCountThrowForward = 4746,
    PostGameCurrentPlayerActionCountThrowBack = 4747,
    PostGamePlayer1ActionCountThrowBack = 4748,
    PostGamePlayer2ActionCountThrowBack = 4749,
    PostGameCurrentPlayerActionCountThrowDown = 4750,
    PostGamePlayer1ActionCountThrowDown = 4751,
    PostGamePlayer2ActionCountThrowDown = 4752,

    PostGameOverallBeneficialTradeTotal = 4753,
    PostGameCurrentPlayerOverallBeneficialTradeCount = 4754,
    PostGamePlayer1OverallBeneficialTradeCount = 4755,
    PostGamePlayer2OverallBeneficialTradeCount = 4756,
    PostGameCurrentPlayerOverallBeneficialTradeRatio = 4757,
    PostGamePlayer1OverallBeneficialTradeRatio = 4758,
    PostGamePlayer2OverallBeneficialTradeRatio = 4759,
    PostGameOverallCounterHitTotal = 4760,
    PostGameCurrentPlayerOverallCounterHitCount = 4763,
    PostGamePlayer1OverallCounterHitCount = 4764,
    PostGamePlayer2OverallCounterHitCount = 4765,
    PostGameCurrentPlayerOverallCounterHitRatio = 4766,
    PostGamePlayer1OverallCounterHitRatio = 4767,
    PostGamePlayer2OverallCounterHitRatio = 4768,
    PostGameCurrentPlayerOverallDamageTotal = 4769,
    PostGamePlayer1OverallDamageTotal = 4770,
    PostGamePlayer2OverallDamageTotal = 4771,
    PostGameCurrentPlayerOverallOpeningsTotal = 4772,
    PostGamePlayer1OverallOpeningsTotal = 4773,
    PostGamePlayer2OverallOpeningsTotal = 4774,
    PostGameCurrentPlayerOverallDamagePerOpening = 4775,
    PostGamePlayer1OverallDamagePerOpening = 4776,
    PostGamePlayer2OverallDamagePerOpening = 4777,
    PostGameCurrentPlayerOverallDigitalInputsTotal = 4778,
    PostGamePlayer1OverallDigitalInputsTotal = 4779,
    PostGamePlayer2OverallDigitalInputsTotal = 4780,
    PostGameCurrentPlayerOverallDigitalInputsPerMinute = 4780,
    PostGamePlayer1OverallDigitalInputsPerMinute = 4781,
    PostGamePlayer2OverallDigitalInputsPerMinute = 4782,
    PostGameCurrentPlayerOverallDigitalInputsPerSecond = 4783,
    PostGamePlayer1OverallDigitalInputsPerSecond = 4784,
    PostGamePlayer2OverallDigitalInputsPerSecond = 4785,
    PostGameCurrentPlayerOverallInputsTotal = 4786,
    PostGamePlayer1OverallInputsTotal = 4787,
    PostGamePlayer2OverallInputsTotal = 4788,
    PostGameCurrentPlayerOverallInputsPerMinute = 4789,
    PostGamePlayer1OverallInputsPerMinute = 4790,
    PostGamePlayer2OverallInputsPerMinute = 4791,
    PostGameCurrentPlayerOverallInputsPerSecond = 4792,
    PostGamePlayer1OverallInputsPerSecond = 4793,
    PostGamePlayer2OverallInputsPerSecond = 4794,
    PostGameOverallNeutralWinsTotal = 4795,
    PostGameCurrentPlayerOverallNeutralWinsCount = 4796,
    PostGamePlayer1OverallNeutralWinsCount = 4797,
    PostGamePlayer2OverallNeutralWinsCount = 4798,
    PostGameCurrentPlayerOverallNeutralWinsRatio = 4799,
    PostGamePlayer1OverallNeutralWinsRatio = 4800,
    PostGamePlayer2OverallNeutralWinsRatio = 4801,
    PostGameCurrentPlayerOverallOpeningsPerKill = 4802,
    PostGamePlayer1OverallOpeningsPerKill = 4803,
    PostGamePlayer2OverallOpeningsPerKill = 4804,

    PostGameCurrentPlayerOverallStocksRemaining = 4805,
    PostGamePlayer1OverallStocksRemaining = 4806,
    PostGamePlayer2OverallStocksRemaining = 4807,


    // TODO: Create Components For Post Match

    // Post Match
    PostGameMatchCurrentPlayerAttackCountBair = 5000,
    PostGameMatchPlayer1AttackCountBair = 5001,
    PostGameMatchPlayer2AttackCountBair = 5002,
    PostGameMatchCurrentPlayerAttackCountDair = 5003,
    PostGameMatchPlayer1AttackCountDair = 5004,
    PostGameMatchPlayer2AttackCountDair = 5005,
    PostGameMatchCurrentPlayerAttackCountDash = 5006,
    PostGameMatchPlayer1AttackCountDash = 5007,
    PostGameMatchPlayer2AttackCountDash = 5008,
    PostGameMatchCurrentPlayerAttackCountDsmash = 5009,
    PostGameMatchPlayer1AttackCountDsmash = 5010,
    PostGameMatchPlayer2AttackCountDsmash = 5011,
    PostGameMatchCurrentPlayerAttackCountDtilt = 5012,
    PostGameMatchPlayer1AttackCountDtilt = 5013,
    PostGameMatchPlayer2AttackCountDtilt = 5014,
    PostGameMatchCurrentPlayerAttackCountFair = 5015,
    PostGameMatchPlayer1AttackCountFair = 5016,
    PostGameMatchPlayer2AttackCountFair = 5017,
    PostGameMatchCurrentPlayerAttackCountFsmash = 5018,
    PostGameMatchPlayer1AttackCountFsmash = 5019,
    PostGameMatchPlayer2AttackCountFsmash = 5020,
    PostGameMatchCurrentPlayerAttackCountFtilt = 5021,
    PostGameMatchPlayer1AttackCountFtilt = 5022,
    PostGameMatchPlayer2AttackCountFtilt = 5023,
    PostGameMatchCurrentPlayerAttackCountJab = 5024,
    PostGameMatchPlayer1AttackCountJab = 5025,
    PostGameMatchPlayer2AttackCountJab = 5026,
    PostGameMatchCurrentPlayerAttackCountJab2 = 5027,
    PostGameMatchPlayer1AttackCountJab2 = 5028,
    PostGameMatchPlayer2AttackCountJab2 = 5029,
    PostGameMatchCurrentPlayerAttackCountJab3 = 5030,
    PostGameMatchPlayer1AttackCountJab3 = 5031,
    PostGameMatchPlayer2AttackCountJab3 = 5032,
    PostGameMatchCurrentPlayerAttackCountJabMulti = 5033,
    PostGameMatchPlayer1AttackCountJabMulti = 5034,
    PostGameMatchPlayer2AttackCountJabMulti = 5035,
    PostGameMatchCurrentPlayerAttackCountNair = 5036,
    PostGameMatchPlayer1AttackCountNair = 5037,
    PostGameMatchPlayer2AttackCountNair = 5038,
    PostGameMatchCurrentPlayerAttackCountUair = 5039,
    PostGameMatchPlayer1AttackCountUair = 5040,
    PostGameMatchPlayer2AttackCountUair = 5041,
    PostGameMatchCurrentPlayerAttackCountUsmash = 5042,
    PostGameMatchPlayer1AttackCountUsmash = 5043,
    PostGameMatchPlayer2AttackCountUsmash = 5044,
    PostGameMatchCurrentPlayerAttackCountUtilt = 5045,
    PostGameMatchPlayer1AttackCountUtilt = 5046,
    PostGameMatchPlayer2AttackCountUtilt = 5047,

    PostGameMatchCurrentPlayerActionCountAirDodge = 5048,
    PostGameMatchPlayer1ActionCountAirDodge = 5049,
    PostGameMatchPlayer2ActionCountAirDodge = 5050,
    PostGameMatchCurrentPlayerActionCountDashDance = 5051,
    PostGameMatchPlayer1ActionCountDashDance = 5052,
    PostGameMatchPlayer2ActionCountDashDance = 5053,
    PostGameMatchCurrentPlayerActionCountLedgeGrab = 5054,
    PostGameMatchPlayer1ActionCountLedgeGrab = 5055,
    PostGameMatchPlayer2ActionCountLedgeGrab = 5056,
    PostGameMatchCurrentPlayerActionCountRoll = 5057,
    PostGameMatchPlayer1ActionCountRoll = 5058,
    PostGameMatchPlayer2ActionCountRoll = 5059,
    PostGameMatchCurrentPlayerActionCountSpotDodge = 5060,
    PostGameMatchPlayer1ActionCountSpotDodge = 5061,
    PostGameMatchPlayer2ActionCountSpotDodge = 5062,
    PostGameMatchCurrentPlayerActionCountWaveDash = 5063,
    PostGameMatchPlayer1ActionCountWaveDash = 5064,
    PostGameMatchPlayer2ActionCountWaveDash = 5065,
    PostGameMatchCurrentPlayerActionCountWaveLand = 5066,
    PostGameMatchPlayer1ActionCountWaveLand = 5067,
    PostGameMatchPlayer2ActionCountWaveLand = 5068,

    PostGameMatchCurrentPlayerActionCountGrabTotal = 5069,
    PostGameMatchPlayer1ActionCountGrabTotal = 5070,
    PostGameMatchPlayer2ActionCountGrabTotal = 5071,
    PostGameMatchCurrentPlayerActionCountGrabSuccess = 5072,
    PostGameMatchPlayer1ActionCountGrabSuccess = 5073,
    PostGameMatchPlayer2ActionCountGrabSuccess = 5074,
    PostGameMatchCurrentPlayerActionCountGrabFail = 5075,
    PostGameMatchPlayer1ActionCountGrabFail = 5076,
    PostGameMatchPlayer2ActionCountGrabFail = 5077,
    PostGameMatchCurrentPlayerActionCountGrabSuccessPercent = 5078,
    PostGameMatchPlayer1ActionCountGrabSuccessPercent = 5079,
    PostGameMatchPlayer2ActionCountGrabSuccessPercent = 5080,
    PostGameMatchCurrentPlayerActionCountGrabFailPercent = 5081,
    PostGameMatchPlayer1ActionCountGrabFailPercent = 5082,
    PostGameMatchPlayer2ActionCountGrabFailPercent = 5083,

    PostGameMatchCurrentPlayerActionCountGroundTechTotal = 5084,
    PostGameMatchPlayer1ActionCountGroundTechTotal = 5085,
    PostGameMatchPlayer2ActionCountGroundTechTotal = 5086,
    PostGameMatchCurrentPlayerActionCountGroundTechIn = 5087,
    PostGameMatchPlayer1ActionCountGroundTechIn = 5088,
    PostGameMatchPlayer2ActionCountGroundTechIn = 5089,
    PostGameMatchCurrentPlayerActionCountGroundTechAway = 5090,
    PostGameMatchPlayer1ActionCountGroundTechAway = 5091,
    PostGameMatchPlayer2ActionCountGroundTechAway = 5092,
    PostGameMatchCurrentPlayerActionCountGroundTechNeutral = 5093,
    PostGameMatchPlayer1ActionCountGroundTechNeutral = 5094,
    PostGameMatchPlayer2ActionCountGroundTechNeutral = 5095,
    PostGameMatchCurrentPlayerActionCountGroundTechSuccess = 5096,
    PostGameMatchPlayer1ActionCountGroundTechSuccess = 5097,
    PostGameMatchPlayer2ActionCountGroundTechSuccess = 5098,
    PostGameMatchCurrentPlayerActionCountGroundTechSuccessPercent = 5099,
    PostGameMatchPlayer1ActionCountGroundTechSuccessPercent = 5100,
    PostGameMatchPlayer2ActionCountGroundTechSuccessPercent = 5101,
    PostGameMatchCurrentPlayerActionCountGroundTechFail = 5102,
    PostGameMatchPlayer1ActionCountGroundTechFail = 5103,
    PostGameMatchPlayer2ActionCountGroundTechFail = 5104,
    PostGameMatchCurrentPlayerActionCountGroundTechFailPercent = 5105,
    PostGameMatchPlayer1ActionCountGroundTechFailPercent = 5106,
    PostGameMatchPlayer2ActionCountGroundTechFailPercent = 5107,

    PostGameMatchCurrentPlayerActionCountWallTechTotal = 5108,
    PostGameMatchPlayer1ActionCountWallTechTotal = 5109,
    PostGameMatchPlayer2ActionCountWallTechTotal = 5110,
    PostGameMatchCurrentPlayerActionCountWallTechSuccess = 5111,
    PostGameMatchPlayer1ActionCountWallTechSuccess = 5112,
    PostGameMatchPlayer2ActionCountWallTechSuccess = 5113,
    PostGameMatchCurrentPlayerActionCountWallTechFail = 5114,
    PostGameMatchPlayer1ActionCountWallTechFail = 5115,
    PostGameMatchPlayer2ActionCountWallTechFail = 5116,
    PostGameMatchCurrentPlayerActionCountWallTechSuccessPercent = 5117,
    PostGameMatchPlayer1ActionCountWallTechSuccessPercent = 5118,
    PostGameMatchPlayer2ActionCountWallTechSuccessPercent = 5119,
    PostGameMatchCurrentPlayerActionCountWallTechFailPercent = 5120,
    PostGameMatchPlayer1ActionCountWallTechFailPercent = 5121,
    PostGameMatchPlayer2ActionCountWallTechFailPercent = 5122,

    PostGameMatchCurrentPlayerActionCountLCancelTotal = 5123,
    PostGameMatchPlayer1ActionCountLCancelTotal = 5124,
    PostGameMatchPlayer2ActionCountLCancelTotal = 5125,
    PostGameMatchCurrentPlayerActionCountLCancelSuccess = 5126,
    PostGameMatchPlayer1ActionCountLCancelSuccess = 5127,
    PostGameMatchPlayer2ActionCountLCancelSuccess = 5128,
    PostGameMatchCurrentPlayerActionCountLCancelFail = 5129,
    PostGameMatchPlayer1ActionCountLCancelFail = 5130,
    PostGameMatchPlayer2ActionCountLCancelFail = 5131,
    PostGameMatchCurrentPlayerActionCountLCancelSuccessPercent = 5132,
    PostGameMatchPlayer1ActionCountLCancelSuccessPercent = 5133,
    PostGameMatchPlayer2ActionCountLCancelSuccessPercent = 5134,
    PostGameMatchCurrentPlayerActionCountLCancelFailPercent = 5135,
    PostGameMatchPlayer1ActionCountLCancelFailPercent = 5136,
    PostGameMatchPlayer2ActionCountLCancelFailPercent = 5137,

    PostGameMatchCurrentPlayerActionCountThrowTotal = 5138,
    PostGameMatchPlayer1ActionCountThrowTotal = 5139,
    PostGameMatchPlayer2ActionCountThrowTotal = 5140,
    PostGameMatchCurrentPlayerActionCountThrowUp = 5141,
    PostGameMatchPlayer1ActionCountThrowUp = 5142,
    PostGameMatchPlayer2ActionCountThrowUp = 5143,
    PostGameMatchCurrentPlayerActionCountThrowForward = 5144,
    PostGameMatchPlayer1ActionCountThrowForward = 5145,
    PostGameMatchPlayer2ActionCountThrowForward = 5146,
    PostGameMatchCurrentPlayerActionCountThrowBack = 5147,
    PostGameMatchPlayer1ActionCountThrowBack = 5148,
    PostGameMatchPlayer2ActionCountThrowBack = 5149,
    PostGameMatchCurrentPlayerActionCountThrowDown = 5150,
    PostGameMatchPlayer1ActionCountThrowDown = 5151,
    PostGameMatchPlayer2ActionCountThrowDown = 5152,

    PostGameMatchOverallBeneficialTradeTotal = 5153,
    PostGameMatchCurrentPlayerOverallBeneficialTradeCount = 5154,
    PostGameMatchPlayer1OverallBeneficialTradeCount = 5155,
    PostGameMatchPlayer2OverallBeneficialTradeCount = 5156,
    PostGameMatchCurrentPlayerOverallBeneficialTradeRatio = 5157,
    PostGameMatchPlayer1OverallBeneficialTradeRatio = 5158,
    PostGameMatchPlayer2OverallBeneficialTradeRatio = 5159,
    PostGameMatchOverallCounterHitTotal = 5160,
    PostGameMatchCurrentPlayerOverallCounterHitCount = 5163,
    PostGameMatchPlayer1OverallCounterHitCount = 5164,
    PostGameMatchPlayer2OverallCounterHitCount = 5165,
    PostGameMatchCurrentPlayerOverallCounterHitRatio = 5166,
    PostGameMatchPlayer1OverallCounterHitRatio = 5167,
    PostGameMatchPlayer2OverallCounterHitRatio = 5168,
    PostGameMatchCurrentPlayerOverallDamageTotal = 5169,
    PostGameMatchPlayer1OverallDamageTotal = 5170,
    PostGameMatchPlayer2OverallDamageTotal = 5171,
    PostGameMatchCurrentPlayerOverallOpeningsTotal = 5172,
    PostGameMatchPlayer1OverallOpeningsTotal = 5173,
    PostGameMatchPlayer2OverallOpeningsTotal = 5174,
    PostGameMatchCurrentPlayerOverallDamagePerOpening = 5175,
    PostGameMatchPlayer1OverallDamagePerOpening = 5176,
    PostGameMatchPlayer2OverallDamagePerOpening = 5177,
    PostGameMatchCurrentPlayerOverallDigitalInputsTotal = 5178,
    PostGameMatchPlayer1OverallDigitalInputsTotal = 5179,
    PostGameMatchPlayer2OverallDigitalInputsTotal = 5180,
    PostGameMatchCurrentPlayerOverallDigitalInputsPerMinute = 5180,
    PostGameMatchPlayer1OverallDigitalInputsPerMinute = 5181,
    PostGameMatchPlayer2OverallDigitalInputsPerMinute = 5182,
    PostGameMatchCurrentPlayerOverallDigitalInputsPerSecond = 5183,
    PostGameMatchPlayer1OverallDigitalInputsPerSecond = 5184,
    PostGameMatchPlayer2OverallDigitalInputsPerSecond = 5185,
    PostGameMatchCurrentPlayerOverallInputsTotal = 5186,
    PostGameMatchPlayer1OverallInputsTotal = 5187,
    PostGameMatchPlayer2OverallInputsTotal = 5188,
    PostGameMatchCurrentPlayerOverallInputsPerMinute = 5189,
    PostGameMatchPlayer1OverallInputsPerMinute = 5190,
    PostGameMatchPlayer2OverallInputsPerMinute = 5191,
    PostGameMatchCurrentPlayerOverallInputsPerSecond = 5192,
    PostGameMatchPlayer1OverallInputsPerSecond = 5193,
    PostGameMatchPlayer2OverallInputsPerSecond = 5194,
    PostGameMatchOverallNeutralWinsTotal = 5195,
    PostGameMatchCurrentPlayerOverallNeutralWinsCount = 5196,
    PostGameMatchPlayer1OverallNeutralWinsCount = 5197,
    PostGameMatchPlayer2OverallNeutralWinsCount = 5198,
    PostGameMatchCurrentPlayerOverallNeutralWinsRatio = 5199,
    PostGameMatchPlayer1OverallNeutralWinsRatio = 5200,
    PostGameMatchPlayer2OverallNeutralWinsRatio = 5201,
    PostGameMatchCurrentPlayerOverallOpeningsPerKill = 5202,
    PostGameMatchPlayer1OverallOpeningsPerKill = 5203,
    PostGameMatchPlayer2OverallOpeningsPerKill = 5204,

    SessionWins = 5300,
    SessionLosses = 5301,
    SessionRating = 5302,
    SessionGameNumber = 5303,

    // Image
    // Rank Data
    SlippiRankCurrentPlayerRankIcon = 6000,
    SlippiRankPlayer1RankIcon = 6001,
    SlippiRankPlayer2RankIcon = 6002,
    SlippiRankCurrentPlayerCharacter1Icon = 6010,
    SlippiRankPlayer1Character1Icon = 6011,
    SlippiRankPlayer2Character1Icon = 6012,
    SlippiRankCurrentPlayerCharacter2Icon = 6020,
    SlippiRankPlayer1Character2Icon = 6021,
    SlippiRankPlayer2Character2Icon = 6022,
    SlippiRankCurrentPlayerCharacter3Icon = 6030,
    SlippiRankPlayer1Character3Icon = 6031,
    SlippiRankPlayer2Character3Icon = 6032,

    CurrentSetGameRecentStage = 6100,
    CurrentSetGameRecentPlayer1CharacterIcon = 6101,
    CurrentSetGameRecentPlayer2CharacterIcon = 6102,
    CurrentSetGameRecentPlayer1CharacterRenderLeft = 6103,
    CurrentSetGameRecentPlayer1CharacterRenderRight = 6104,
    CurrentSetGameRecentPlayer2CharacterRenderLeft = 6105,
    CurrentSetGameRecentPlayer2CharacterRenderRight = 6106,

    CurrentSetGame1Stage = 6110,
    CurrentSetGame1Player1CharacterIcon = 6111,
    CurrentSetGame1Player2CharacterIcon = 6112,
    CurrentSetGame1Player1CharacterRenderLeft = 6113,
    CurrentSetGame1Player1CharacterRenderRight = 6114,
    CurrentSetGame1Player2CharacterRenderLeft = 6115,
    CurrentSetGame1Player2CharacterRenderRight = 6116,

    CurrentSetGame2Stage = 6120,
    CurrentSetGame2Player1CharacterIcon = 6161,
    CurrentSetGame2Player2CharacterIcon = 6122,
    CurrentSetGame2Player1CharacterRenderLeft = 6123,
    CurrentSetGame2Player1CharacterRenderRight = 6124,
    CurrentSetGame2Player2CharacterRenderLeft = 6125,
    CurrentSetGame2Player2CharacterRenderRight = 6126,

    CurrentSetGame3Stage = 6130,
    CurrentSetGame3Player1CharacterIcon = 6131,
    CurrentSetGame3Player2CharacterIcon = 6132,
    CurrentSetGame3Player1CharacterRenderLeft = 6133,
    CurrentSetGame3Player1CharacterRenderRight = 6134,
    CurrentSetGame3Player2CharacterRenderLeft = 6135,
    CurrentSetGame3Player2CharacterRenderRight = 6136,

    CurrentSetGame4Stage = 6140,
    CurrentSetGame4Player1CharacterIcon = 6141,
    CurrentSetGame4Player2CharacterIcon = 6142,
    CurrentSetGame4Player1CharacterRenderLeft = 6143,
    CurrentSetGame4Player1CharacterRenderRight = 6144,
    CurrentSetGame4Player2CharacterRenderLeft = 6145,
    CurrentSetGame4Player2CharacterRenderRight = 6146,

    CurrentSetGame5Stage = 6150,
    CurrentSetGame5Player1CharacterIcon = 6151,
    CurrentSetGame5Player2CharacterIcon = 6152,
    CurrentSetGame5Player1CharacterRenderLeft = 6153,
    CurrentSetGame5Player1CharacterRenderRight = 6154,
    CurrentSetGame5Player2CharacterRenderLeft = 6155,
    CurrentSetGame5Player2CharacterRenderRight = 6156,

    InGameStage = 6200,


    InGameCurrentPlayerCharacterIcon = 6210,
    InGameCurrentPlayerCharacterSeriesSymbol = 6211,
    InGameCurrentPlayerCharacterSeriesSymbolUltimate = 6212,

    InGamePlayer1CharacterIcon = 6220,
    InGamePlayer1CharacterSeriesSymbol = 6221,
    InGamePlayer1CharacterSeriesSymbolUltimate = 6222,

    InGamePlayer2CharacterIcon = 6230,
    InGamePlayer2CharacterSeriesSymbol = 6231,
    InGamePlayer2CharacterSeriesSymbolUltimate = 6232,


}