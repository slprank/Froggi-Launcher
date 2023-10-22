import { ActionCountsType, OverallType } from "@slippi/slippi-js";
import { GameStats, MatchStats } from "../../frontend/src/lib/models/types/slippiData";

export const analyzeMatch = (gameStats: GameStats[] | undefined): MatchStats | undefined => {
    if (!gameStats || !gameStats.length) return;
    const stats = gameStats.map(stats => stats.postGameStats)
    const player1Index = stats.at(0)?.actionCounts.at(0)?.playerIndex ?? 0
    const player2Index = stats.at(1)?.actionCounts.at(1)?.playerIndex ?? 1
    const player1ActionCounts = stats.map(stats => stats?.actionCounts[0]).filter(actionCounts => actionCounts !== undefined) as ActionCountsType[];
    const player2ActionCounts = stats.map(stats => stats?.actionCounts[1]).filter(actionCounts => actionCounts !== undefined) as ActionCountsType[]
    const player1Overall = stats.map(stats => stats?.overall[0]).filter(overall => overall !== undefined) as OverallType[];
    const player2Overall = stats.map(stats => stats?.overall[1]).filter(overall => overall !== undefined) as OverallType[];

    return {
        actionCounts: [
            {
                playerIndex: player1Index,
                airDodgeCount: player1ActionCounts?.map(action => action.airDodgeCount).reduce((i, j) => i + j, 0) ?? 0,
                attackCount: {
                    jab1: player1ActionCounts?.map(action => action.attackCount.jab1).reduce((i, j) => i + j, 0) ?? 0,
                    jab2: player1ActionCounts?.map(action => action.attackCount.jab2).reduce((i, j) => i + j, 0) ?? 0,
                    jab3: player1ActionCounts?.map(action => action.attackCount.jab3).reduce((i, j) => i + j, 0) ?? 0,
                    jabm: player1ActionCounts?.map(action => action.attackCount.jabm).reduce((i, j) => i + j, 0) ?? 0,
                    dash: player1ActionCounts?.map(action => action.attackCount.dash).reduce((i, j) => i + j, 0) ?? 0,
                    ftilt: player1ActionCounts?.map(action => action.attackCount.ftilt).reduce((i, j) => i + j, 0) ?? 0,
                    utilt: player1ActionCounts?.map(action => action.attackCount.utilt).reduce((i, j) => i + j, 0) ?? 0,
                    dtilt: player1ActionCounts?.map(action => action.attackCount.dtilt).reduce((i, j) => i + j, 0) ?? 0,
                    fsmash: player1ActionCounts?.map(action => action.attackCount.fsmash).reduce((i, j) => i + j, 0) ?? 0,
                    usmash: player1ActionCounts?.map(action => action.attackCount.usmash).reduce((i, j) => i + j, 0) ?? 0,
                    dsmash: player1ActionCounts?.map(action => action.attackCount.dsmash).reduce((i, j) => i + j, 0) ?? 0,
                    nair: player1ActionCounts?.map(action => action.attackCount.nair).reduce((i, j) => i + j, 0) ?? 0,
                    fair: player1ActionCounts?.map(action => action.attackCount.fair).reduce((i, j) => i + j, 0) ?? 0,
                    bair: player1ActionCounts?.map(action => action.attackCount.bair).reduce((i, j) => i + j, 0) ?? 0,
                    uair: player1ActionCounts?.map(action => action.attackCount.uair).reduce((i, j) => i + j, 0) ?? 0,
                    dair: player1ActionCounts?.map(action => action.attackCount.dair).reduce((i, j) => i + j, 0) ?? 0,
                },
                dashDanceCount: player1ActionCounts?.map(action => action.dashDanceCount).reduce((i, j) => i + j, 0) ?? 0,
                grabCount: {
                    success: player1ActionCounts?.map(action => action.grabCount.success).reduce((i, j) => i + j, 0) ?? 0,
                    fail: player1ActionCounts?.map(action => action.grabCount.fail).reduce((i, j) => i + j, 0) ?? 0,
                },
                groundTechCount: {
                    in: player1ActionCounts?.map(action => action.groundTechCount.in).reduce((i, j) => i + j, 0) ?? 0,
                    away: player1ActionCounts?.map(action => action.groundTechCount.away).reduce((i, j) => i + j, 0) ?? 0,
                    neutral: player1ActionCounts?.map(action => action.groundTechCount.neutral).reduce((i, j) => i + j, 0) ?? 0,
                    fail: player1ActionCounts?.map(action => action.groundTechCount.fail).reduce((i, j) => i + j, 0) ?? 0,
                },
                lCancelCount: {
                    success: player1ActionCounts?.map(action => action.lCancelCount.success).reduce((i, j) => i + j, 0) ?? 0,
                    fail: player1ActionCounts?.map(action => action.lCancelCount.fail).reduce((i, j) => i + j, 0) ?? 0,
                },
                ledgegrabCount: player1ActionCounts?.map(action => action.ledgegrabCount).reduce((i, j) => i + j, 0) ?? 0,
                rollCount: player1ActionCounts?.map(action => action.rollCount).reduce((i, j) => i + j, 0) ?? 0,
                spotDodgeCount: player1ActionCounts?.map(action => action.spotDodgeCount).reduce((i, j) => i + j, 0) ?? 0,
                throwCount: {
                    up: player1ActionCounts?.map(action => action.throwCount.up).reduce((i, j) => i + j, 0) ?? 0,
                    down: player1ActionCounts?.map(action => action.throwCount.down).reduce((i, j) => i + j, 0) ?? 0,
                    forward: player1ActionCounts?.map(action => action.throwCount.forward).reduce((i, j) => i + j, 0) ?? 0,
                    back: player1ActionCounts?.map(action => action.throwCount.back).reduce((i, j) => i + j, 0) ?? 0,
                },
                wavedashCount: player1ActionCounts?.map(action => action.wavedashCount).reduce((i, j) => i + j, 0) ?? 0,
                wavelandCount: player1ActionCounts?.map(action => action.wavelandCount).reduce((i, j) => i + j, 0) ?? 0,
                wallTechCount: {
                    success: player1ActionCounts?.map(action => action.wallTechCount.success).reduce((i, j) => i + j, 0) ?? 0,
                    fail: player1ActionCounts?.map(action => action.wallTechCount.fail).reduce((i, j) => i + j, 0) ?? 0,
                },
            },
            {
                playerIndex: player2Index,
                airDodgeCount: player2ActionCounts?.map(action => action.airDodgeCount).reduce((i, j) => i + j, 0) ?? 0,
                attackCount: {
                    jab1: player2ActionCounts?.map(action => action.attackCount.jab1).reduce((i, j) => i + j, 0) ?? 0,
                    jab2: player2ActionCounts?.map(action => action.attackCount.jab2).reduce((i, j) => i + j, 0) ?? 0,
                    jab3: player2ActionCounts?.map(action => action.attackCount.jab3).reduce((i, j) => i + j, 0) ?? 0,
                    jabm: player2ActionCounts?.map(action => action.attackCount.jabm).reduce((i, j) => i + j, 0) ?? 0,
                    dash: player2ActionCounts?.map(action => action.attackCount.dash).reduce((i, j) => i + j, 0) ?? 0,
                    ftilt: player2ActionCounts?.map(action => action.attackCount.ftilt).reduce((i, j) => i + j, 0) ?? 0,
                    utilt: player2ActionCounts?.map(action => action.attackCount.utilt).reduce((i, j) => i + j, 0) ?? 0,
                    dtilt: player2ActionCounts?.map(action => action.attackCount.dtilt).reduce((i, j) => i + j, 0) ?? 0,
                    fsmash: player2ActionCounts?.map(action => action.attackCount.fsmash).reduce((i, j) => i + j, 0) ?? 0,
                    usmash: player2ActionCounts?.map(action => action.attackCount.usmash).reduce((i, j) => i + j, 0) ?? 0,
                    dsmash: player2ActionCounts?.map(action => action.attackCount.dsmash).reduce((i, j) => i + j, 0) ?? 0,
                    nair: player2ActionCounts?.map(action => action.attackCount.nair).reduce((i, j) => i + j, 0) ?? 0,
                    fair: player2ActionCounts?.map(action => action.attackCount.fair).reduce((i, j) => i + j, 0) ?? 0,
                    bair: player2ActionCounts?.map(action => action.attackCount.bair).reduce((i, j) => i + j, 0) ?? 0,
                    uair: player2ActionCounts?.map(action => action.attackCount.uair).reduce((i, j) => i + j, 0) ?? 0,
                    dair: player2ActionCounts?.map(action => action.attackCount.dair).reduce((i, j) => i + j, 0) ?? 0,
                },
                dashDanceCount: player2ActionCounts?.map(action => action.dashDanceCount).reduce((i, j) => i + j, 0) ?? 0,
                grabCount: {
                    success: player2ActionCounts?.map(action => action.grabCount.success).reduce((i, j) => i + j, 0) ?? 0,
                    fail: player2ActionCounts?.map(action => action.grabCount.fail).reduce((i, j) => i + j, 0) ?? 0,
                },
                groundTechCount: {
                    in: player2ActionCounts?.map(action => action.groundTechCount.in).reduce((i, j) => i + j, 0) ?? 0,
                    away: player2ActionCounts?.map(action => action.groundTechCount.away).reduce((i, j) => i + j, 0) ?? 0,
                    neutral: player2ActionCounts?.map(action => action.groundTechCount.neutral).reduce((i, j) => i + j, 0) ?? 0,
                    fail: player2ActionCounts?.map(action => action.groundTechCount.fail).reduce((i, j) => i + j, 0) ?? 0,
                },
                lCancelCount: {
                    success: player2ActionCounts?.map(action => action.lCancelCount.success).reduce((i, j) => i + j, 0) ?? 0,
                    fail: player2ActionCounts?.map(action => action.lCancelCount.fail).reduce((i, j) => i + j, 0) ?? 0,
                },
                ledgegrabCount: player2ActionCounts?.map(action => action.ledgegrabCount).reduce((i, j) => i + j, 0) ?? 0,
                rollCount: player2ActionCounts?.map(action => action.rollCount).reduce((i, j) => i + j, 0) ?? 0,
                spotDodgeCount: player2ActionCounts?.map(action => action.spotDodgeCount).reduce((i, j) => i + j, 0) ?? 0,
                throwCount: {
                    up: player2ActionCounts?.map(action => action.throwCount.up).reduce((i, j) => i + j, 0) ?? 0,
                    down: player2ActionCounts?.map(action => action.throwCount.down).reduce((i, j) => i + j, 0) ?? 0,
                    forward: player2ActionCounts?.map(action => action.throwCount.forward).reduce((i, j) => i + j, 0) ?? 0,
                    back: player2ActionCounts?.map(action => action.throwCount.back).reduce((i, j) => i + j, 0) ?? 0,
                },
                wavedashCount: player2ActionCounts?.map(action => action.wavedashCount).reduce((i, j) => i + j, 0) ?? 0,
                wavelandCount: player2ActionCounts?.map(action => action.wavelandCount).reduce((i, j) => i + j, 0) ?? 0,
                wallTechCount: {
                    success: player2ActionCounts?.map(action => action.wallTechCount.success).reduce((i, j) => i + j, 0) ?? 0,
                    fail: player2ActionCounts?.map(action => action.wallTechCount.fail).reduce((i, j) => i + j, 0) ?? 0,
                },
            }
        ],
        overall: [
            {
                playerIndex: player1Index,
                inputCounts: {
                    buttons: player1Overall?.map(overall => overall.inputCounts.buttons).reduce((i, j) => i + j, 0) ?? 0,
                    triggers: player1Overall?.map(overall => overall.inputCounts.triggers).reduce((i, j) => i + j, 0) ?? 0,
                    joystick: player1Overall?.map(overall => overall.inputCounts.joystick).reduce((i, j) => i + j, 0) ?? 0,
                    cstick: player1Overall?.map(overall => overall.inputCounts.cstick).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.inputCounts.total).reduce((i, j) => i + j, 0) ?? 0,
                },
                conversionCount: player1Overall?.map(overall => overall.conversionCount).reduce((i, j) => i + j, 0) ?? 0,
                totalDamage: player1Overall?.map(overall => overall.totalDamage).reduce((i, j) => i + j, 0) ?? 0,
                killCount: player1Overall?.map(overall => overall.killCount).reduce((i, j) => i + j, 0) ?? 0,
                successfulConversions: {
                    count: player1Overall?.map(overall => overall.successfulConversions.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.successfulConversions.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player1Overall?.map(overall => overall.successfulConversions.count).reduce((i, j) => i + j, 0) ?? 0) / (player1Overall?.map(overall => overall.successfulConversions.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                inputsPerMinute: {
                    count: player1Overall?.map(overall => overall.inputsPerMinute.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.inputsPerMinute.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player1Overall?.map(overall => overall.inputsPerMinute.count).reduce((i, j) => i + j, 0) ?? 0) / (player1Overall?.map(overall => overall.inputsPerMinute.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                digitalInputsPerMinute: {
                    count: player1Overall?.map(overall => overall.digitalInputsPerMinute.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.digitalInputsPerMinute.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player1Overall?.map(overall => overall.digitalInputsPerMinute.count).reduce((i, j) => i + j, 0) ?? 0) / (player1Overall?.map(overall => overall.digitalInputsPerMinute.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                openingsPerKill: {
                    count: player1Overall?.map(overall => overall.openingsPerKill.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.openingsPerKill.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player1Overall?.map(overall => overall.openingsPerKill.count).reduce((i, j) => i + j, 0) ?? 0) / (player1Overall?.map(overall => overall.openingsPerKill.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                damagePerOpening: {
                    count: player1Overall?.map(overall => overall.damagePerOpening.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.damagePerOpening.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player1Overall?.map(overall => overall.damagePerOpening.count).reduce((i, j) => i + j, 0) ?? 0) / (player1Overall?.map(overall => overall.damagePerOpening.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                neutralWinRatio: {
                    count: player1Overall?.map(overall => overall.neutralWinRatio.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.neutralWinRatio.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player1Overall?.map(overall => overall.neutralWinRatio.count).reduce((i, j) => i + j, 0) ?? 0) / (player1Overall?.map(overall => overall.neutralWinRatio.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                counterHitRatio: {
                    count: player1Overall?.map(overall => overall.counterHitRatio.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.counterHitRatio.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player1Overall?.map(overall => overall.counterHitRatio.count).reduce((i, j) => i + j, 0) ?? 0) / (player1Overall?.map(overall => overall.counterHitRatio.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                beneficialTradeRatio: {
                    count: player1Overall?.map(overall => overall.beneficialTradeRatio.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player1Overall?.map(overall => overall.beneficialTradeRatio.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player1Overall?.map(overall => overall.beneficialTradeRatio.count).reduce((i, j) => i + j, 0) ?? 0) / (player1Overall?.map(overall => overall.beneficialTradeRatio.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
            },
            {
                playerIndex: player2Index,
                inputCounts: {
                    buttons: player2Overall?.map(overall => overall.inputCounts.buttons).reduce((i, j) => i + j, 0) ?? 0,
                    triggers: player2Overall?.map(overall => overall.inputCounts.triggers).reduce((i, j) => i + j, 0) ?? 0,
                    joystick: player2Overall?.map(overall => overall.inputCounts.joystick).reduce((i, j) => i + j, 0) ?? 0,
                    cstick: player2Overall?.map(overall => overall.inputCounts.cstick).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.inputCounts.total).reduce((i, j) => i + j, 0) ?? 0,
                },
                conversionCount: player2Overall?.map(overall => overall.conversionCount).reduce((i, j) => i + j, 0) ?? 0,
                totalDamage: player2Overall?.map(overall => overall.totalDamage).reduce((i, j) => i + j, 0) ?? 0,
                killCount: player2Overall?.map(overall => overall.killCount).reduce((i, j) => i + j, 0) ?? 0,
                successfulConversions: {
                    count: player2Overall?.map(overall => overall.successfulConversions.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.successfulConversions.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player2Overall?.map(overall => overall.successfulConversions.count).reduce((i, j) => i + j, 0) ?? 0) / (player2Overall?.map(overall => overall.successfulConversions.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                inputsPerMinute: {
                    count: player2Overall?.map(overall => overall.inputsPerMinute.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.inputsPerMinute.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player2Overall?.map(overall => overall.inputsPerMinute.count).reduce((i, j) => i + j, 0) ?? 0) / (player2Overall?.map(overall => overall.inputsPerMinute.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                digitalInputsPerMinute: {
                    count: player2Overall?.map(overall => overall.digitalInputsPerMinute.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.digitalInputsPerMinute.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player2Overall?.map(overall => overall.digitalInputsPerMinute.count).reduce((i, j) => i + j, 0) ?? 0) / (player2Overall?.map(overall => overall.digitalInputsPerMinute.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                openingsPerKill: {
                    count: player2Overall?.map(overall => overall.openingsPerKill.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.openingsPerKill.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player2Overall?.map(overall => overall.openingsPerKill.count).reduce((i, j) => i + j, 0) ?? 0) / (player2Overall?.map(overall => overall.openingsPerKill.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                damagePerOpening: {
                    count: player2Overall?.map(overall => overall.damagePerOpening.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.damagePerOpening.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player2Overall?.map(overall => overall.damagePerOpening.count).reduce((i, j) => i + j, 0) ?? 0) / (player2Overall?.map(overall => overall.damagePerOpening.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                neutralWinRatio: {
                    count: player2Overall?.map(overall => overall.neutralWinRatio.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.neutralWinRatio.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player2Overall?.map(overall => overall.neutralWinRatio.count).reduce((i, j) => i + j, 0) ?? 0) / (player2Overall?.map(overall => overall.neutralWinRatio.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                counterHitRatio: {
                    count: player2Overall?.map(overall => overall.counterHitRatio.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.counterHitRatio.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player2Overall?.map(overall => overall.counterHitRatio.count).reduce((i, j) => i + j, 0) ?? 0) / (player2Overall?.map(overall => overall.counterHitRatio.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
                beneficialTradeRatio: {
                    count: player2Overall?.map(overall => overall.beneficialTradeRatio.count).reduce((i, j) => i + j, 0) ?? 0,
                    total: player2Overall?.map(overall => overall.beneficialTradeRatio.total).reduce((i, j) => i + j, 0) ?? 0,
                    ratio: ((player2Overall?.map(overall => overall.beneficialTradeRatio.count).reduce((i, j) => i + j, 0) ?? 0) / (player2Overall?.map(overall => overall.beneficialTradeRatio.total).reduce((i, j) => i + j, 0) ?? 1)),
                },
            }
        ],
    }
}