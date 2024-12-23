<script lang="ts" context="module">
	import {
		SelectedVisibilityCondition,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import type { CurrentPlayer } from '$lib/models/types/slippiData';
	import { getCurrentPlayer } from '$lib/utils/fetchSubscriptions.svelte';

	export const rankVisibilityOption = (
		option: SelectedVisibilityCondition,
		player: CurrentPlayer | undefined,
	) => {
		const prevRank = player?.rank?.history?.at(-1);
		const currentRank = player?.rank?.current;
		const newRank = player?.rank?.new;

		if (!prevRank || !currentRank || !newRank) return;

		if (option[VisibilityOption.RankStatsBeforeRankUpdated] === VisibilityToggle.True)
			if (currentRank !== newRank) return true;
		if (option[VisibilityOption.RankStatsBeforeRankUpdated] === VisibilityToggle.False)
			if (currentRank === newRank) return true;
		if (option[VisibilityOption.RankStatsAfterRankUpdated] === VisibilityToggle.True)
			if (currentRank === newRank) return true;
		if (option[VisibilityOption.RankStatsAfterRankUpdated] === VisibilityToggle.False)
			if (currentRank !== newRank) return true;

		if (option[VisibilityOption.RankStatsMatchWon] === VisibilityToggle.True)
			if ((newRank?.wins ?? 0) > (prevRank?.wins ?? 0)) return true;
		if (option[VisibilityOption.RankStatsMatchWon] === VisibilityToggle.False)
			if ((newRank?.losses ?? 0) > (prevRank?.losses ?? 0)) return true;

		return false;
	};
</script>
