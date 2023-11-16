<script lang="ts" context="module">
	import type { GameStats, Player } from '$lib/models/types/slippiData';
	import { currentPlayer, currentPlayers, postGame, recentGames } from '$lib/utils/store.svelte';

	export async function getGameStats(): Promise<GameStats> {
		return await new Promise<GameStats>((resolve) => {
			postGame.subscribe((stats) => {
				resolve(stats);
			});
		});
	}

	export async function getRecentGames(): Promise<GameStats[]> {
		return await new Promise<GameStats[]>((resolve) => {
			recentGames.subscribe((stats) => {
				resolve(stats);
			});
		});
	}

	export async function getCurrentPlayer(): Promise<Player> {
		return await new Promise<Player>((resolve) => {
			currentPlayer.subscribe((player) => {
				resolve(player);
			});
		});
	}
	export async function getPlayers(): Promise<Player[]> {
		return await new Promise<Player[]>((resolve) => {
			currentPlayers.subscribe((players) => {
				resolve(players);
			});
		});
	}
</script>
