<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import type { GameStats, Player } from '$lib/models/types/slippiData';
	import { currentPlayer, currentPlayers, postGame, recentGames } from '$lib/utils/store.svelte';

	export const postGameMatchVisibilityOption = async (option: SelectedVisibilityOption[]) => {
		const gameStats = await getGameStats();
		const recentGames = await getRecentGames();

		const player = await getCurrentPlayer();
		const players = await getPlayers();

		return option.every((option) => {
			const game1Index = recentGames.length > 5 ? -5 : 0;
			const game1 = recentGames.at(game1Index);

			const lowestPlacement1 = game1?.gameEnd.placements
				.filter((placement) => placement.position && placement.position > 0)
				.sort((placementA, placementB) => placementA.position! - placementB.position!)
				.at(0);

			if (option[VisibilityOption.PostGame1SummaryCurrentPlayerWin] === VisibilityToggle.True)
				if (lowestPlacement1?.playerIndex === player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame1SummaryCurrentPlayerWin] === VisibilityToggle.False
			)
				if (lowestPlacement1?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame1SummaryCurrentPlayerLoss] === VisibilityToggle.True
			)
				if (lowestPlacement1?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame1SummaryCurrentPlayerLoss] ===
				VisibilityToggle.False
			)
				if (lowestPlacement1?.playerIndex === player.playerIndex) return true;

			if (option[VisibilityOption.PostGame1SummaryPlayer1Stock1] === VisibilityToggle.True)
				if (
					(game1?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer1Stock1] === VisibilityToggle.False)
				if (
					(game1?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer1Stock2] === VisibilityToggle.True)
				if (
					(game1?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer1Stock2] === VisibilityToggle.False)
				if (
					(game1?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer1Stock3] === VisibilityToggle.True)
				if (
					(game1?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer1Stock3] === VisibilityToggle.False)
				if (
					(game1?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer1Stock4] === VisibilityToggle.True)
				if (
					(game1?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer1Stock4] === VisibilityToggle.False)
				if (
					(game1?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			if (option[VisibilityOption.PostGame1SummaryPlayer2Stock1] === VisibilityToggle.True)
				if (
					(game1?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer2Stock1] === VisibilityToggle.False)
				if (
					(game1?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer2Stock2] === VisibilityToggle.True)
				if (
					(game1?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer2Stock2] === VisibilityToggle.False)
				if (
					(game1?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer2Stock3] === VisibilityToggle.True)
				if (
					(game1?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer2Stock3] === VisibilityToggle.False)
				if (
					(game1?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer2Stock4] === VisibilityToggle.True)
				if (
					(game1?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame1SummaryPlayer2Stock4] === VisibilityToggle.False)
				if (
					(game1?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			const game2Index = recentGames.length > 5 ? -5 : 0;
			const game2 = recentGames.at(game2Index);

			const lowestPlacement2 = game2?.gameEnd.placements
				.filter((placement) => placement.position && placement.position > 0)
				.sort((placementA, placementB) => placementA.position! - placementB.position!)
				.at(0);

			if (option[VisibilityOption.PostGame2SummaryCurrentPlayerWin] === VisibilityToggle.True)
				if (lowestPlacement2?.playerIndex === player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame2SummaryCurrentPlayerWin] === VisibilityToggle.False
			)
				if (lowestPlacement2?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame2SummaryCurrentPlayerLoss] === VisibilityToggle.True
			)
				if (lowestPlacement2?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame2SummaryCurrentPlayerLoss] ===
				VisibilityToggle.False
			)
				if (lowestPlacement2?.playerIndex === player.playerIndex) return true;

			if (option[VisibilityOption.PostGame2SummaryPlayer1Stock1] === VisibilityToggle.True)
				if (
					(game2?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer1Stock1] === VisibilityToggle.False)
				if (
					(game2?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer1Stock2] === VisibilityToggle.True)
				if (
					(game2?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer1Stock2] === VisibilityToggle.False)
				if (
					(game2?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer1Stock3] === VisibilityToggle.True)
				if (
					(game2?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer1Stock3] === VisibilityToggle.False)
				if (
					(game2?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer1Stock4] === VisibilityToggle.True)
				if (
					(game2?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer1Stock4] === VisibilityToggle.False)
				if (
					(game2?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			if (option[VisibilityOption.PostGame2SummaryPlayer2Stock1] === VisibilityToggle.True)
				if (
					(game2?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer2Stock1] === VisibilityToggle.False)
				if (
					(game2?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer2Stock2] === VisibilityToggle.True)
				if (
					(game2?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer2Stock2] === VisibilityToggle.False)
				if (
					(game2?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer2Stock3] === VisibilityToggle.True)
				if (
					(game2?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer2Stock3] === VisibilityToggle.False)
				if (
					(game2?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer2Stock4] === VisibilityToggle.True)
				if (
					(game2?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame2SummaryPlayer2Stock4] === VisibilityToggle.False)
				if (
					(game2?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			const game3Index = recentGames.length > 5 ? -5 : 0;
			const game3 = recentGames.at(game3Index);

			const lowestPlacement3 = game3?.gameEnd.placements
				.filter((placement) => placement.position && placement.position > 0)
				.sort((placementA, placementB) => placementA.position! - placementB.position!)
				.at(0);

			if (option[VisibilityOption.PostGame3SummaryCurrentPlayerWin] === VisibilityToggle.True)
				if (lowestPlacement3?.playerIndex === player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame3SummaryCurrentPlayerWin] === VisibilityToggle.False
			)
				if (lowestPlacement3?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame3SummaryCurrentPlayerLoss] === VisibilityToggle.True
			)
				if (lowestPlacement3?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame3SummaryCurrentPlayerLoss] ===
				VisibilityToggle.False
			)
				if (lowestPlacement3?.playerIndex === player.playerIndex) return true;

			if (option[VisibilityOption.PostGame3SummaryPlayer1Stock1] === VisibilityToggle.True)
				if (
					(game3?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer1Stock1] === VisibilityToggle.False)
				if (
					(game3?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer1Stock2] === VisibilityToggle.True)
				if (
					(game3?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer1Stock2] === VisibilityToggle.False)
				if (
					(game3?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer1Stock3] === VisibilityToggle.True)
				if (
					(game3?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer1Stock3] === VisibilityToggle.False)
				if (
					(game3?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer1Stock4] === VisibilityToggle.True)
				if (
					(game3?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer1Stock4] === VisibilityToggle.False)
				if (
					(game3?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			if (option[VisibilityOption.PostGame3SummaryPlayer2Stock1] === VisibilityToggle.True)
				if (
					(game3?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer2Stock1] === VisibilityToggle.False)
				if (
					(game3?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer2Stock2] === VisibilityToggle.True)
				if (
					(game3?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer2Stock2] === VisibilityToggle.False)
				if (
					(game3?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer2Stock3] === VisibilityToggle.True)
				if (
					(game3?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer2Stock3] === VisibilityToggle.False)
				if (
					(game3?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer2Stock4] === VisibilityToggle.True)
				if (
					(game3?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame3SummaryPlayer2Stock4] === VisibilityToggle.False)
				if (
					(game3?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			const game4Index = recentGames.length > 5 ? -5 : 0;
			const game4 = recentGames.at(game4Index);

			const lowestPlacement4 = game4?.gameEnd.placements
				.filter((placement) => placement.position && placement.position > 0)
				.sort((placementA, placementB) => placementA.position! - placementB.position!)
				.at(0);

			if (option[VisibilityOption.PostGame4SummaryCurrentPlayerWin] === VisibilityToggle.True)
				if (lowestPlacement4?.playerIndex === player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame4SummaryCurrentPlayerWin] === VisibilityToggle.False
			)
				if (lowestPlacement4?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame4SummaryCurrentPlayerLoss] === VisibilityToggle.True
			)
				if (lowestPlacement4?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame4SummaryCurrentPlayerLoss] ===
				VisibilityToggle.False
			)
				if (lowestPlacement4?.playerIndex === player.playerIndex) return true;

			if (option[VisibilityOption.PostGame4SummaryPlayer1Stock1] === VisibilityToggle.True)
				if (
					(game4?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer1Stock1] === VisibilityToggle.False)
				if (
					(game4?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer1Stock2] === VisibilityToggle.True)
				if (
					(game4?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer1Stock2] === VisibilityToggle.False)
				if (
					(game4?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer1Stock3] === VisibilityToggle.True)
				if (
					(game4?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer1Stock3] === VisibilityToggle.False)
				if (
					(game4?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer1Stock4] === VisibilityToggle.True)
				if (
					(game4?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer1Stock4] === VisibilityToggle.False)
				if (
					(game4?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			if (option[VisibilityOption.PostGame4SummaryPlayer2Stock1] === VisibilityToggle.True)
				if (
					(game4?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer2Stock1] === VisibilityToggle.False)
				if (
					(game4?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer2Stock2] === VisibilityToggle.True)
				if (
					(game4?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer2Stock2] === VisibilityToggle.False)
				if (
					(game4?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer2Stock3] === VisibilityToggle.True)
				if (
					(game4?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer2Stock3] === VisibilityToggle.False)
				if (
					(game4?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer2Stock4] === VisibilityToggle.True)
				if (
					(game4?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame4SummaryPlayer2Stock4] === VisibilityToggle.False)
				if (
					(game4?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			const game5Index = recentGames.length > 5 ? -5 : 0;
			const game5 = recentGames.at(game5Index);

			const lowestPlacement5 = game5?.gameEnd.placements
				.filter((placement) => placement.position && placement.position > 0)
				.sort((placementA, placementB) => placementA.position! - placementB.position!)
				.at(0);

			if (option[VisibilityOption.PostGame5SummaryCurrentPlayerWin] === VisibilityToggle.True)
				if (lowestPlacement5?.playerIndex === player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame5SummaryCurrentPlayerWin] === VisibilityToggle.False
			)
				if (lowestPlacement5?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame5SummaryCurrentPlayerLoss] === VisibilityToggle.True
			)
				if (lowestPlacement5?.playerIndex !== player.playerIndex) return true;
			if (
				option[VisibilityOption.PostGame5SummaryCurrentPlayerLoss] ===
				VisibilityToggle.False
			)
				if (lowestPlacement5?.playerIndex === player.playerIndex) return true;

			if (option[VisibilityOption.PostGame5SummaryPlayer1Stock1] === VisibilityToggle.True)
				if (
					(game5?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer1Stock1] === VisibilityToggle.False)
				if (
					(game5?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer1Stock2] === VisibilityToggle.True)
				if (
					(game5?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer1Stock2] === VisibilityToggle.False)
				if (
					(game5?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer1Stock3] === VisibilityToggle.True)
				if (
					(game5?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer1Stock3] === VisibilityToggle.False)
				if (
					(game5?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer1Stock4] === VisibilityToggle.True)
				if (
					(game5?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer1Stock4] === VisibilityToggle.False)
				if (
					(game5?.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			if (option[VisibilityOption.PostGame5SummaryPlayer2Stock1] === VisibilityToggle.True)
				if (
					(game5?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 1
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer2Stock1] === VisibilityToggle.False)
				if (
					(game5?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 1
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer2Stock2] === VisibilityToggle.True)
				if (
					(game5?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 2
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer2Stock2] === VisibilityToggle.False)
				if (
					(game5?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 2
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer2Stock3] === VisibilityToggle.True)
				if (
					(game5?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 3
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer2Stock3] === VisibilityToggle.False)
				if (
					(game5?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 3
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer2Stock4] === VisibilityToggle.True)
				if (
					(game5?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) >= 4
				)
					return true;
			if (option[VisibilityOption.PostGame5SummaryPlayer2Stock4] === VisibilityToggle.False)
				if (
					(game5?.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
						.stocksRemaining ?? 0) < 4
				)
					return true;

			return false;
		});
	};

	async function getGameStats(): Promise<GameStats> {
		return await new Promise<GameStats>((resolve) => {
			postGame.subscribe((stats) => {
				resolve(stats);
			});
		});
	}
	async function getRecentGames(): Promise<GameStats[]> {
		return await new Promise<GameStats[]>((resolve) => {
			recentGames.subscribe((stats) => {
				resolve(stats);
			});
		});
	}

	async function getCurrentPlayer(): Promise<Player> {
		return await new Promise<Player>((resolve) => {
			currentPlayer.subscribe((player) => {
				resolve(player);
			});
		});
	}
	async function getPlayers(): Promise<Player[]> {
		return await new Promise<Player[]>((resolve) => {
			currentPlayers.subscribe((players) => {
				resolve(players);
			});
		});
	}
</script>
