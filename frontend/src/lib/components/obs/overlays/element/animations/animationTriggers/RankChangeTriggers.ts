import {
	AnimationTrigger,
	type SelectedAnimationTriggerOption,
} from '$lib/models/types/animationOption';
import type { CurrentPlayer, Rank } from '$lib/models/types/slippiData';

let prevRank: Rank;
export const rankStateTrigger = (
	option: SelectedAnimationTriggerOption,
	player: CurrentPlayer | undefined,
) => {
	if (!player) return;
	let trigger = false;

	if (option[AnimationTrigger.RankStatsIconChange])
		trigger = player.rank.current?.rank !== player.rank.current?.rank || trigger;

	if (option[AnimationTrigger.RankStatsRatingChange])
		trigger = player.rank.current?.rating !== player.rank.current?.rating || trigger;

	prevRank = player.rank;
	return trigger;
};
