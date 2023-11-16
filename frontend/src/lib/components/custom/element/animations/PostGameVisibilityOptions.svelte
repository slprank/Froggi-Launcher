<script lang="ts" context="module">
	import {
		SelectedVisibilityOption,
		VisibilityOption,
		VisibilityToggle,
	} from '$lib/models/types/animationOption';
	import type { GameStats, Player } from '$lib/models/types/slippiData';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';

	export const postGameVisibilityOption = async (option: SelectedVisibilityOption) => {
		const gameStats = await getGameStats();

		const player = await getCurrentPlayer();
		const players = await getPlayers();

		const winnerIndex = gameStats.gameEnd.placements.findIndex(
			(placement) => placement.position === 0,
		);

		if (option[VisibilityOption.PostGameCurrentPlayerWin] === VisibilityToggle.True)
			if (winnerIndex === player.playerIndex) return true;
		if (option[VisibilityOption.PostGameCurrentPlayerWin] === VisibilityToggle.False)
			if (winnerIndex !== player.playerIndex) return true;
		if (option[VisibilityOption.PostGameCurrentPlayerLoss] === VisibilityToggle.True)
			if (winnerIndex !== player.playerIndex) return true;
		if (option[VisibilityOption.PostGameCurrentPlayerLoss] === VisibilityToggle.False)
			if (winnerIndex === player.playerIndex) return true;

		if (option[VisibilityOption.PostGamePlayer1Stock1] === VisibilityToggle.True)
			if (
				(gameStats.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 1
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer1Stock1] === VisibilityToggle.False)
			if (
				(gameStats.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 1
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer1Stock2] === VisibilityToggle.True)
			if (
				(gameStats.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 2
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer1Stock2] === VisibilityToggle.False)
			if (
				(gameStats.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 2
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer1Stock3] === VisibilityToggle.True)
			if (
				(gameStats.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 3
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer1Stock3] === VisibilityToggle.False)
			if (
				(gameStats.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 3
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer1Stock4] === VisibilityToggle.True)
			if (
				(gameStats.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 4
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer1Stock4] === VisibilityToggle.False)
			if (
				(gameStats.lastFrame.players[players.at(0)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 4
			)
				return true;

		if (option[VisibilityOption.PostGamePlayer2Stock1] === VisibilityToggle.True)
			if (
				(gameStats.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 1
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer2Stock1] === VisibilityToggle.False)
			if (
				(gameStats.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 1
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer2Stock2] === VisibilityToggle.True)
			if (
				(gameStats.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 2
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer2Stock2] === VisibilityToggle.False)
			if (
				(gameStats.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 2
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer2Stock3] === VisibilityToggle.True)
			if (
				(gameStats.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 3
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer2Stock3] === VisibilityToggle.False)
			if (
				(gameStats.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 3
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer2Stock4] === VisibilityToggle.True)
			if (
				(gameStats.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) >= 4
			)
				return true;
		if (option[VisibilityOption.PostGamePlayer2Stock4] === VisibilityToggle.False)
			if (
				(gameStats.lastFrame.players[players.at(1)?.playerIndex ?? -1]?.post
					.stocksRemaining ?? 0) < 4
			)
				return true;

		return false;
	};

	async function getGameStats(): Promise<GameStats> {
		return await new Promise<GameStats>((resolve) => {
			postGame.subscribe((stats) => {
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
