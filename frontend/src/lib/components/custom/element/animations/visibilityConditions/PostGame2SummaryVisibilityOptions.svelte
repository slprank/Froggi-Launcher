<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import { getWinnerIndex } from '$lib/utils/gamePredicates';
	import {
		getRecentGames,
		getCurrentPlayer,
		getPlayers,
	} from '$lib/utils/fetchSubscriptions.svelte';

	export const postGame2SummaryVisibilityOption = async (option: SelectedVisibilityOption) => {
		const recentGames = await getRecentGames();

		const player = await getCurrentPlayer();
		const players = await getPlayers();

		const gameIndex = recentGames.length > 5 ? 3 : 1;
		const game = recentGames.at(gameIndex)?.at(-1);

		const winnerIndex = getWinnerIndex(game?.gameEnd);

		if (option[VisibilityOption.PostGame2SummaryCompleted] === VisibilityToggle.True)
			if (game) return true;
		if (option[VisibilityOption.PostGame2SummaryCompleted] === VisibilityToggle.False)
			if (!game) return true;
		if (option[VisibilityOption.PostGame2SummaryCurrentPlayerWin] === VisibilityToggle.True)
			if (winnerIndex === player?.playerIndex) return true;
		if (option[VisibilityOption.PostGame2SummaryCurrentPlayerWin] === VisibilityToggle.False)
			if (winnerIndex !== player?.playerIndex) return true;

		if (option[VisibilityOption.PostGame2SummaryPlayer1Stock1] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players?.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 1
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer1Stock1] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players?.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 1
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer1Stock2] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players?.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 2
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer1Stock2] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players?.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 2
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer1Stock3] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players?.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 3
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer1Stock3] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players?.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 3
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer1Stock4] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players?.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 4
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer1Stock4] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players?.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 4
			)
				return true;

		if (option[VisibilityOption.PostGame2SummaryPlayer2Stock1] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players?.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 1
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer2Stock1] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players?.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 1
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer2Stock2] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players?.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 2
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer2Stock2] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players?.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 2
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer2Stock3] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players?.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 3
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer2Stock3] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players?.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 3
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer2Stock4] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players?.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 4
			)
				return true;
		if (option[VisibilityOption.PostGame2SummaryPlayer2Stock4] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players?.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 4
			)
				return true;

		return false;
	};
</script>
