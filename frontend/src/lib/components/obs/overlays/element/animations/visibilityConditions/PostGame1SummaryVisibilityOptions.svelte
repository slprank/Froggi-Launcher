<script lang="ts" context="module">
	import {
		SelectedVisibilityCondition,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import type { CurrentPlayer, GameStats, Player } from '$lib/models/types/slippiData';
	import { gameWinnerSlot, getWinnerIndex } from '$lib/utils/gamePredicates';

	export const postGame1SummaryVisibilityOption = (
		option: SelectedVisibilityCondition,
		players: Player[],
		player: Player | undefined,
		recentGames: GameStats[],
	) => {
		const gameIndex = recentGames.length > 5 ? 4 : 0;
		const game = recentGames.at(gameIndex);

		const winnerIndex = getWinnerIndex(game);

		if (option[VisibilityOption.PostGame1SummaryCompleted] === VisibilityToggle.True)
			if (game) return true;
		if (option[VisibilityOption.PostGame1SummaryCompleted] === VisibilityToggle.False)
			if (!game) return true;
		if (option[VisibilityOption.PostGame1SummaryCurrentPlayerWin] === VisibilityToggle.True)
			if (winnerIndex === player?.playerIndex) return true;
		if (option[VisibilityOption.PostGame1SummaryCurrentPlayerWin] === VisibilityToggle.False)
			if (winnerIndex !== player?.playerIndex) return true;
		// Player 1 / Player 2 = the set's sides (from the stored set score of that game).
		const winnerSlot = gameWinnerSlot(recentGames, gameIndex);
		if (option[VisibilityOption.PostGame1SummaryPlayer1Win] === VisibilityToggle.True) if (winnerSlot === 0) return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Win] === VisibilityToggle.False) if (game && winnerSlot !== 0) return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Win] === VisibilityToggle.True) if (winnerSlot === 1) return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Win] === VisibilityToggle.False) if (game && winnerSlot !== 1) return true;

		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock1] === VisibilityToggle.True)
			if (
				(game?.lastFrame?.players?.[players?.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 1
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock1] === VisibilityToggle.False)
			if (
				(game?.lastFrame?.players?.[players?.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 1
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock2] === VisibilityToggle.True)
			if (
				(game?.lastFrame?.players?.[players?.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 2
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock2] === VisibilityToggle.False)
			if (
				(game?.lastFrame?.players?.[players?.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 2
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock3] === VisibilityToggle.True)
			if (
				(game?.lastFrame?.players?.[players?.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 3
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock3] === VisibilityToggle.False)
			if (
				(game?.lastFrame?.players?.[players?.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 3
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock4] === VisibilityToggle.True)
			if (
				(game?.lastFrame?.players?.[players?.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 4
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer1Stock4] === VisibilityToggle.False)
			if (
				(game?.lastFrame?.players?.[players?.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 4
			)
				return true;

		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock1] === VisibilityToggle.True)
			if (
				(game?.lastFrame?.players?.[players?.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 1
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock1] === VisibilityToggle.False)
			if (
				(game?.lastFrame?.players?.[players?.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 1
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock2] === VisibilityToggle.True)
			if (
				(game?.lastFrame?.players?.[players?.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 2
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock2] === VisibilityToggle.False)
			if (
				(game?.lastFrame?.players?.[players?.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 2
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock3] === VisibilityToggle.True)
			if (
				(game?.lastFrame?.players?.[players?.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 3
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock3] === VisibilityToggle.False)
			if (
				(game?.lastFrame?.players?.[players?.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 3
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock4] === VisibilityToggle.True)
			if (
				(game?.lastFrame?.players?.[players?.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 4
			)
				return true;
		if (option[VisibilityOption.PostGame1SummaryPlayer2Stock4] === VisibilityToggle.False)
			if (
				(game?.lastFrame?.players?.[players?.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 4
			)
				return true;

		return false;
	};
</script>
