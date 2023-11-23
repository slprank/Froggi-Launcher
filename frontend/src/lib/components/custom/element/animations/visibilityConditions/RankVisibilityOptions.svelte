<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import { getCurrentPlayer } from '$lib/utils/fetchSubscriptions.svelte';

	export const rankVisibilityOption = async (option: SelectedVisibilityOption) => {
		const player = await getCurrentPlayer();

		const oldRank = player?.rank.current;
		const newRank = player?.rank.new;

		if (option[VisibilityOption.RankStatsBeforeRankUpdated] === VisibilityToggle.True)
			if (oldRank !== newRank) return true;
		if (option[VisibilityOption.RankStatsBeforeRankUpdated] === VisibilityToggle.False)
			if (oldRank === newRank) return true;
		if (option[VisibilityOption.RankStatsAfterRankUpdated] === VisibilityToggle.True)
			if (oldRank === newRank) return true;
		if (option[VisibilityOption.RankStatsAfterRankUpdated] === VisibilityToggle.False)
			if (oldRank !== newRank) return true;

		return false;
	};
</script>
