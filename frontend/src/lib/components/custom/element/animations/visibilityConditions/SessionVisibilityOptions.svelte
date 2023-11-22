<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import { getSession } from '$lib/utils/fetchSubscriptions.svelte';

	export const sessionVisibilityOption = async (option: SelectedVisibilityOption) => {
		const session = await getSession();

		const wins = (session?.currentRankStats.wins ?? 0) - (session?.startRankStats.wins ?? 0);
		const losses =
			(session?.currentRankStats.losses ?? 0) - (session?.startRankStats.losses ?? 0);
		const rating =
			(session?.currentRankStats.rating ?? 0) - (session?.startRankStats.rating ?? 0);

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
