<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { EventEmitter } from 'events';
	import {
		AutoUpdaterStatus,
		DolphinConnectionState,
		InGameState,
		LiveStatsScene,
	} from '$lib/models/enum';
	import Device from 'svelte-device-info';
	import type { AutoUpdater, Obs, Url } from '$lib/models/types';
	import type { CurrentPlayer, GameStats, Player } from '$lib/models/types/slippiData';
	import type { FrameEntryType, GameStartType } from '@slippi/slippi-js';

	export const eventEmitter = writable<EventEmitter>(new EventEmitter());

	export const isBrowser = writable<boolean>(!window.electron && browser);
	export const isDesktop = writable<boolean>(
		!window.electron && browser && !Device.isMobile && !Device.isTablet,
	);
	export const isElectron = writable<boolean>(window.electron);
	export const isMobile = writable<boolean>(!window.electron && Device.isMobile);
	export const isTablet = writable<boolean>(!window.electron && Device.isTablet);
	export const isIframe = writable<boolean>(window.self !== window.top);

	export const isPWA = writable<boolean>(
		window.electron ||
			(!window.electron && browser && !Device.isMobile && !Device.isTablet) ||
			!!(
				(window.matchMedia?.('(display-mode: standalone)').matches ||
					(window.navigator as any).standalone) &&
				(Device.isMobile || Device.isTablet)
			),
	);

	export const autoUpdater = writable<AutoUpdater>({
		status: AutoUpdaterStatus.LookingForUpdate,
	} as AutoUpdater);
	export const currentPlayer = writable<CurrentPlayer>();
	export const currentPlayers = writable<Player[]>();
	export const dolphinState = writable<DolphinConnectionState>();
	export const gameFrame = writable<FrameEntryType>();
	export const gameScore = writable<number[]>([0, 0]);
	export const gameState = writable<InGameState>(InGameState.None);
	export const gameSettings = writable<GameStartType>();
	export const postGameStats = writable<any>();
	export const recentRankedSets = writable<any[]>();
	export const recentGames = writable<GameStats[]>();
	export const sessionStats = writable<any>();
	export const statsScene = writable<LiveStatsScene>(LiveStatsScene.WaitingForDolphin);

	export const obs = writable<Obs>();
	export const urls = writable<Url>();
</script>
