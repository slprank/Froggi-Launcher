import { BestOf } from '$lib/models/enum';
import {
	AnimationTrigger,
	type SelectedAnimationTriggerOption,
} from '$lib/models/types/animationOption';
import { GameStartTypeExtended, Player } from '$lib/models/types/slippiData';

export const matchStateTrigger = (option: SelectedAnimationTriggerOption, currentPlayers: Player[], prevPlayers: Player[] | undefined, score: number[], prevScore: number[] | undefined, gameSettings: GameStartTypeExtended, prevSettings: GameStartTypeExtended | undefined) => {
	let trigger = false;

	if (option[AnimationTrigger.MatchBestOfChange])
		trigger = gameSettings.matchInfo.bestOf !== prevSettings?.matchInfo.bestOf || trigger
	if (option[AnimationTrigger.MatchBestOfChange])
		trigger = gameSettings.matchInfo.mode !== prevSettings?.matchInfo.mode || trigger
	if (option[AnimationTrigger.MatchPlayer1TagChange])
		trigger = currentPlayers.at(0)?.displayName !== prevPlayers?.at(0)?.displayName || trigger
	if (option[AnimationTrigger.MatchPlayer2TagChange])
		trigger = currentPlayers.at(1)?.displayName !== prevPlayers?.at(1)?.displayName || trigger

	if (option[AnimationTrigger.MatchPlayer1ScoreChange])
		trigger = prevScore?.at(0) !== score.at(0) || trigger;

	if (option[AnimationTrigger.MatchPlayer2ScoreChange])
		trigger = prevScore?.at(1) !== score.at(1) || trigger;

	prevScore = score;
	prevSettings = gameSettings;
	prevPlayers = currentPlayers;
	return trigger;
};
