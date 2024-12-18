<script lang="ts" context="module">
	import { page } from '$app/stores';
	import type { InGameState } from '$lib/models/enum';
	import type { Overlay, Url } from '$lib/models/types/overlay';
	import type {
		CurrentPlayer,
		GameStats,
		Player,
		SessionStats,
	} from '$lib/models/types/slippiData';
	import {
		currentPlayer,
		currentPlayers,
		electronEmitter,
		localEmitter,
		gameFrame,
		gameSettings,
		gameState,
		obs,
		postGame,
		recentGames,
		sessionStats,
		gameScore,
		overlays,
		authorizationKey,
		isIframe,
		urls,
		isElectron,
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType, GameStartType } from '@slippi/slippi-js';
	import type { Page } from '@sveltejs/kit';
	import type { TypedEmitter } from './customEventEmitter';
	import type { Obs } from '$lib/models/types/obsTypes';

	export async function getAuthorizationKey(): Promise<string | undefined> {
		return await new Promise<string | undefined>((resolve) => {
			authorizationKey.subscribe((key) => {
				resolve(key);
			});
		});
	}

	export async function getCurrentPlayer(): Promise<CurrentPlayer | undefined> {
		return await new Promise<CurrentPlayer | undefined>((resolve) => {
			currentPlayer.subscribe((player) => {
				resolve(player);
			});
		});
	}

	export async function getLocalEmitter(): Promise<TypedEmitter> {
		return await new Promise<TypedEmitter>((resolve) => {
			localEmitter.subscribe((localEmitter) => {
				resolve(localEmitter);
			});
		});
	}

	export async function getElectronEmitter(): Promise<TypedEmitter> {
		return await new Promise<TypedEmitter>((resolve) => {
			electronEmitter.subscribe((localEmitter) => {
				resolve(localEmitter);
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

	export async function getOverlays(): Promise<Overlay[]> {
		return await new Promise<Overlay[]>((resolve) => {
			overlays.subscribe((overlays) => {
				resolve(Object.values(overlays));
			});
		});
	}

	export async function getOverlayById(overlayId: string): Promise<Overlay | undefined> {
		return await new Promise<Overlay>((resolve) => {
			overlays.subscribe((overlays) => {
				resolve(overlays[overlayId]);
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

	export async function getPlayers(): Promise<Player[] | undefined> {
		return await new Promise<Player[] | undefined>((resolve) => {
			currentPlayers.subscribe((players) => {
				resolve(players);
			});
		});
	}

	export async function getGameFrame(): Promise<FrameEntryType | null | undefined> {
		return await new Promise<FrameEntryType | null | undefined>((resolve) => {
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

	export async function getRecentGames(): Promise<GameStats[][]> {
		return await new Promise<GameStats[][]>((resolve) => {
			recentGames.subscribe((stats) => {
				resolve(stats);
			});
		});
	}

	export async function getMatchScore(): Promise<number[]> {
		return await new Promise<number[]>((resolve) => {
			gameScore.subscribe((score) => {
				resolve(score);
			});
		});
	}

	export async function getSession(): Promise<SessionStats | undefined> {
		return await new Promise<SessionStats | undefined>((resolve) => {
			sessionStats.subscribe((stats) => {
				resolve(stats);
			});
		});
	}

	export async function getIsIframe(): Promise<boolean> {
		return await new Promise<boolean>((resolve) => {
			isIframe.subscribe((value) => {
				resolve(value);
			});
		});
	}

	export async function getUrls(): Promise<Url> {
		return await new Promise<Url>((resolve) => {
			urls.subscribe((urls) => {
				resolve(urls);
			});
		});
	}

	export async function getIsElectron(): Promise<boolean> {
		return await new Promise<boolean>((resolve) => {
			isElectron.subscribe((isElectron) => {
				resolve(isElectron);
			});
		});
	}
</script>
