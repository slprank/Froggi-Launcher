import {
	AnimationTrigger,
	type SelectedAnimationTriggerOption,
} from '$lib/models/types/animationOption';
import type { CurrentPlayerRank } from '$lib/models/types/slippiData';

export const rankStateTrigger = (
	option: SelectedAnimationTriggerOption,
	rank: CurrentPlayerRank | undefined,
	prevRank: CurrentPlayerRank | undefined,
) => {
	if (!rank || !prevRank) return;
	let trigger = false;

	if (option[AnimationTrigger.SlippiRankStatsRankChange])
		trigger = rank.current?.rank !== prevRank.current?.rank || trigger;

	if (option[AnimationTrigger.SlippiRankStatsRatingChange])
		trigger = rank.current?.rating !== prevRank.current?.rating || trigger;

	return trigger;
};
