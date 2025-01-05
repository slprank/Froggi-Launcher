import {
	AnimationTrigger,
	type SelectedAnimationTriggerCondition,
} from '$lib/models/types/animationOption';
import { GameStartTypeExtended, Player } from '$lib/models/types/slippiData';
import { isNil } from 'lodash';

export const matchStateTrigger = (option: SelectedAnimationTriggerCondition, currentPlayers: Player[], prevPlayers: Player[] | undefined, score: number[], prevScore: number[] | undefined, gameSettings: GameStartTypeExtended, prevSettings: GameStartTypeExtended | undefined) => {
	if (isNil(currentPlayers) || isNil(prevPlayers)) return;
	let trigger = false;


	if (option[AnimationTrigger.MatchBestOfChange])
		trigger = gameSettings.matchInfo.bestOf !== prevSettings?.matchInfo.bestOf || trigger
	if (option[AnimationTrigger.MatchGameModeChange])
		trigger = gameSettings.matchInfo.mode !== prevSettings?.matchInfo.mode || trigger
	if (option[AnimationTrigger.MatchPlayer1TagChange])
		trigger = currentPlayers?.[0]?.displayName !== prevPlayers?.[0]?.displayName || trigger
	if (option[AnimationTrigger.MatchPlayer2TagChange])
		trigger = currentPlayers?.[1]?.displayName !== prevPlayers?.[1]?.displayName || trigger

	if (option[AnimationTrigger.MatchPlayer1ScoreChange])
		trigger = prevScore?.[0] !== score?.[0] || trigger;

	if (option[AnimationTrigger.MatchPlayer2ScoreChange])
		trigger = prevScore?.[1] !== score?.[1] || trigger;

	return trigger;
};
