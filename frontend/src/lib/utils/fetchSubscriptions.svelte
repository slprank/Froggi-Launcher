<script lang="ts" context="module">
	import { page } from '$app/stores';
	import type { InGameState } from '$lib/models/enum';
	import type { Obs } from '$lib/models/types/overlay';
	import type { GameStats, Player, Session } from '$lib/models/types/slippiData';
	import {
		currentPlayer,
		currentPlayers,
		eventEmitter,
		gameFrame,
		gameSettings,
		gameState,
		obs,
		postGame,
		recentGames,
		sessionStats,
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType, GameStartType } from '@slippi/slippi-js';
	import type { Page } from '@sveltejs/kit';
	import type EventEmitter from 'events';

	export async function getCurrentPlayer(): Promise<Player> {
		return await new Promise<Player>((resolve) => {
			currentPlayer.subscribe((player) => {
				resolve(player);
			});
		});
	}

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

	export async function getPlayers(): Promise<Player[]> {
		return await new Promise<Player[]>((resolve) => {
			currentPlayers.subscribe((players) => {
				resolve(players);
			});
		});
	}

	export async function getGameFrame(): Promise<FrameEntryType | null> {
		return await new Promise<FrameEntryType | null>((resolve) => {
			gameFrame.subscribe((gameFrame) => {
				resolve(gameFrame);
			});
		});
	}
	export async function getGameState(): Promise<InGameState> {
		return await new Promise<InGameState>((resolve) => {
			gameState.subscribe((gameState) => {
				resolve(gameState);
			});
		});
	}
	export async function getGameStats(): Promise<GameStats> {
		return await new Promise<GameStats>((resolve) => {
			postGame.subscribe((stats) => {
				resolve(stats);
			});
		});
	}
	export async function getGameSettings(): Promise<GameStartType> {
		return await new Promise<GameStartType>((resolve) => {
			gameSettings.subscribe((gameSettings) => {
				resolve(gameSettings);
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

	export async function getSession(): Promise<Session> {
		return await new Promise<Session>((resolve) => {
			sessionStats.subscribe((stats) => {
				resolve(stats);
			});
		});
	}
</script>
