<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import { getSession } from '$lib/utils/FetchSubscriptions.svelte';

	export const sessionVisibilityOption = async (option: SelectedVisibilityOption) => {
		const session = await getSession();

		const wins = session.currentRankStats.wins - session.startRankStats.wins;
		const losses = session.currentRankStats.losses - session.startRankStats.losses;
		const rating = session.currentRankStats.rating - session.startRankStats.rating;

		if (option[VisibilityOption.SessionPositiveWinRate] === VisibilityToggle.True)
			if (wins >= losses) return true;
		if (option[VisibilityOption.SessionPositiveWinRate] === VisibilityToggle.False)
			if (wins < losses) return true;
		if (option[VisibilityOption.SessionPositiveNetRating] === VisibilityToggle.True)
			if (rating >= 0) return true;
		if (option[VisibilityOption.SessionPositiveNetRating] === VisibilityToggle.False)
			if (rating < 0) return true;

		return false;
	};
</script>
