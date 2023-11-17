<script lang="ts" context="module">
	import { page } from '$app/stores';
	import type { Obs } from '$lib/models/types/overlay';
	import type { GameStats, Player } from '$lib/models/types/slippiData';
	import {
		currentPlayer,
		currentPlayers,
		eventEmitter,
		obs,
		postGame,
		recentGames,
	} from '$lib/utils/store.svelte';
	import type { Page } from '@sveltejs/kit';
	import type EventEmitter from 'events';

	export async function getEventEmitter(): Promise<EventEmitter> {
		return await new Promise<EventEmitter>((resolve) => {
			eventEmitter.subscribe((eventEmitter) => {
				resolve(eventEmitter);
			});
		});
	}

	export async function getObs(): Promise<Obs> {
		return await new Promise<Obs>((resolve) => {
			obs.subscribe((obs) => {
				resolve(obs);
			});
		});
	}

	export const getPage = async () => {
		return await new Promise<Page>((resolve) => {
			page.subscribe((p) => {
				resolve(p);
			});
		});
	};

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
