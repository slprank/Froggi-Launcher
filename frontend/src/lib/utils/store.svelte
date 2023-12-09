<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import {
		AutoUpdaterStatus,
		ConnectionState,
		InGameState,
		LiveStatsScene,
	} from '$lib/models/enum';
	import Device from 'svelte-device-info';
	import type { AutoUpdater, Overlay, Url } from '$lib/models/types/overlay';
	import type {
		CurrentPlayer,
		GameStartTypeExtended,
		GameStats,
		Match,
		Player,
		Session,
	} from '$lib/models/types/slippiData';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import type { PlayerController } from '$lib/models/types/controller';
	import { TypedEmitter } from './customEventEmitter';
	import type { Obs, ObsConnection } from '$lib/models/types/obsTypes';

	export const localEmitter = writable<TypedEmitter>(new TypedEmitter());
	export const electronEmitter = writable<TypedEmitter>(new TypedEmitter());

	export const isBrowser = writable<boolean>(!window.electron && browser);
	export const isDesktop = writable<boolean>(
		!window.electron && browser && !Device.isMobile && !Device.isTablet,
	);
	export const isElectron = writable<boolean>(window.electron);
	export const isMobile = writable<boolean>(!window.electron && Device.isMobile);
	export const isTablet = writable<boolean>(!window.electron && Device.isTablet);
	export const isIframe = writable<boolean>(window.self !== window.top);
	export const isOverlayPage = writable<boolean>(true);

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
	export const currentPlayer = writable<CurrentPlayer | undefined>({} as CurrentPlayer);
	export const currentPlayers = writable<Player[]>([
		{ displayName: '' } as Player,
		{ displayName: '' } as Player,
	]);
	export const dolphinState = writable<ConnectionState>(ConnectionState.Searching);
	export const gameFrame = writable<FrameEntryType | null>({} as FrameEntryType);
	export const gameScore = writable<number[]>([0, 0]);
	export const gameSettings = writable<GameStartTypeExtended>({} as GameStartTypeExtended);
	export const gameState = writable<InGameState>(InGameState.Inactive);
	export const memoryReadController = writable<PlayerController>({} as PlayerController);
	export const obsConnection = writable<ObsConnection>({} as ObsConnection);
	export const overlays = writable<Overlay[]>([]);
	export const postGame = writable<GameStats>({} as GameStats);
	export const currentMatch = writable<Match | undefined>({} as Match);
	export const recentRankedSets = writable<GameStats[]>([]);
	export const recentGames = writable<GameStats[][]>([]);
	export const sessionStats = writable<Session | undefined>();
	export const statsScene = writable<LiveStatsScene>(LiveStatsScene.WaitingForDolphin);

	export const obs = writable<Obs>();
	export const urls = writable<Url>();
</script>
