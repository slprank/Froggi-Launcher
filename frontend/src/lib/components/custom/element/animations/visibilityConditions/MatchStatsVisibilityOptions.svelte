<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import { isNil } from 'lodash';

	export const matchStatsVisibilityOption = (
		option: SelectedVisibilityOption,
		gameScore: number[],
	) => {
		if (option[VisibilityOption.MatchStatsPlayer1Score1] === VisibilityToggle.True)
			if (isScoreGreater(gameScore?.at(0), 1)) return true;
		if (option[VisibilityOption.MatchStatsPlayer1Score1] === VisibilityToggle.False)
			if (!isScoreGreater(gameScore?.at(0), 1)) return true;
		if (option[VisibilityOption.MatchStatsPlayer1Score2] === VisibilityToggle.True)
			if (isScoreGreater(gameScore?.at(0), 2)) return true;
		if (option[VisibilityOption.MatchStatsPlayer1Score2] === VisibilityToggle.False)
			if (!isScoreGreater(gameScore?.at(0), 2)) return true;
		if (option[VisibilityOption.MatchStatsPlayer1Score3] === VisibilityToggle.True)
			if (isScoreGreater(gameScore?.at(0), 3)) return true;
		if (option[VisibilityOption.MatchStatsPlayer1Score3] === VisibilityToggle.False)
			if (!isScoreGreater(gameScore?.at(0), 3)) return true;

		if (option[VisibilityOption.MatchStatsPlayer2Score1] === VisibilityToggle.True)
			if (isScoreGreater(gameScore?.at(1), 1)) return true;
		if (option[VisibilityOption.MatchStatsPlayer2Score1] === VisibilityToggle.False)
			if (!isScoreGreater(gameScore?.at(1), 1)) return true;
		if (option[VisibilityOption.MatchStatsPlayer2Score2] === VisibilityToggle.True)
			if (isScoreGreater(gameScore?.at(1), 2)) return true;
		if (option[VisibilityOption.MatchStatsPlayer2Score2] === VisibilityToggle.False)
			if (!isScoreGreater(gameScore?.at(1), 2)) return true;
		if (option[VisibilityOption.MatchStatsPlayer2Score3] === VisibilityToggle.True)
			if (isScoreGreater(gameScore?.at(1), 3)) return true;
		if (option[VisibilityOption.MatchStatsPlayer2Score3] === VisibilityToggle.False)
			if (!isScoreGreater(gameScore?.at(1), 3)) return true;

		return false;
	};

	const isScoreGreater = (score: number | undefined, min: number) => {
		if (isNil(score)) return false;
		return score >= min;
	};
</script>
