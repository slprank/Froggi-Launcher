<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import {
		getRecentGames,
		getCurrentPlayer,
		getPlayers,
	} from '../../../../utils/fetchSubscriptions.svelte';

	export const postGame1SummaryVisibilityOption = async (option: SelectedVisibilityOption) => {
		const recentGames = await getRecentGames();

		const player = await getCurrentPlayer();
		const players = await getPlayers();

		const gameIndex = recentGames.length > 5 ? -5 : 0;
		const game = recentGames.at(gameIndex);

		const winnerIndex = game?.gameEnd.placements.findIndex(
			(placement) => placement.position === 0,
		);

		if (option[VisibilityOption.PostGame1SummaryCompleted] === VisibilityToggle.True)
			if (game) return true;
		if (option[VisibilityOption.PostGame1SummaryCompleted] === VisibilityToggle.False)
			if (!game) return true;
		if (option[VisibilityOption.PostGame1SummaryCurrentPlayerWin] === VisibilityToggle.True)
			if (winnerIndex === player.playerIndex) return true;
		if (option[VisibilityOption.PostGame1SummaryCurrentPlayerWin] === VisibilityToggle.False)
			if (winnerIndex !== player.playerIndex) return true;
		if (option[VisibilityOption.PostGame1SummaryCurrentPlayerLoss] === VisibilityToggle.True)
			if (winnerIndex !== player.playerIndex) return true;
		if (option[VisibilityOption.PostGame1SummaryCurrentPlayerLoss] === VisibilityToggle.False)
			if (winnerIndex === player.playerIndex) return true;

		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock1] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 1
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock1] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 1
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock2] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 2
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock2] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 2
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock3] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 3
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock3] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 3
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock4] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 4
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock4] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 4
			)
				return true;

		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock1] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 1
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock1] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 1
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock2] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 2
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock2] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 2
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock3] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 3
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock3] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 3
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock4] === VisibilityToggle.True)
			if (
				(game?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) >= 4
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock4] === VisibilityToggle.False)
			if (
				(game?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post.stocksRemaining ??
					0) < 4
			)
				return true;

		return false;
	};
</script>
