import { BestOf } from '$lib/models/enum';
import {
	AnimationTrigger,
	type SelectedAnimationTriggerOption,
} from '$lib/models/types/animationOption';
import { GameStartTypeExtended, Player } from '$lib/models/types/slippiData';
import { GameStartType } from '@slippi/slippi-js';

let prevScore: number[] | undefined;
let prevPlayers: Player[] | undefined;
let prevSettings: GameStartTypeExtended | undefined;
export const matchStateTrigger = (option: SelectedAnimationTriggerOption, currentPlayers: Player[], score: number[], gameSettings: GameStartTypeExtended) => {
	let trigger = false;

	if (option[AnimationTrigger.MatchBestOfChange])
		trigger = gameSettings.matchInfo.bestOf !== prevSettings?.matchInfo.bestOf || trigger
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
