<script lang="ts" context="module">
	import {
		SelectedVisibilityCondition,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import type { CurrentPlayer } from '$lib/models/types/slippiData';

	export const rankVisibilityOption = (
		option: SelectedVisibilityCondition,
		player: CurrentPlayer | undefined,
	) => {
		const currentRank = player?.rank?.current;
		const newRank = player?.rank?.new;

		if (!currentRank || !newRank) return;

		if (option[VisibilityOption.RankStatsBeforeRankUpdated] === VisibilityToggle.True) {
			if (currentRank.rating !== newRank.rating) return true;
		}
		if (option[VisibilityOption.RankStatsBeforeRankUpdated] === VisibilityToggle.False)
			if (currentRank.rating === newRank.rating) return true;
		if (option[VisibilityOption.RankStatsAfterRankUpdated] === VisibilityToggle.True)
			if (currentRank.rating === newRank.rating) return true;
		if (option[VisibilityOption.RankStatsAfterRankUpdated] === VisibilityToggle.False)
			if (currentRank.rating !== newRank.rating) return true;

		if (option[VisibilityOption.RankStatsMatchWon] === VisibilityToggle.True)
			if ((newRank?.wins ?? 0) > (currentRank?.wins ?? 0)) return true;
		if (option[VisibilityOption.RankStatsMatchWon] === VisibilityToggle.False)
			if ((newRank?.losses ?? 0) > (currentRank?.losses ?? 0)) return true;

		return false;
	};
</script>
