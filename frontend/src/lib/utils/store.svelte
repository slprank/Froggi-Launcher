<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { EventEmitter } from 'events';
	import { DolphinState, LiveStatsScene } from '$lib/models/enum';
	import Device from 'svelte-device-info';
	import type { Obs, Player, Url } from '$lib/models/types';
	import type { FrameEntryType, GameStartType } from '@slippi/slippi-js';

	export const svelteEmitter = writable<EventEmitter>(new EventEmitter());
	export const electronEmitter = writable<EventEmitter>(new EventEmitter());

	export const isBrowser = writable<boolean>(!window.electron && browser);
	export const isDesktop = writable<boolean>(
		!window.electron && browser && !Device.isMobile && !Device.isTablet,
	);
	export const isElectron = writable<boolean>(window.electron);
	export const isMobile = writable<boolean>(!window.electron && Device.isMobile);
	export const isTablet = writable<boolean>(!window.electron && Device.isTablet);

	export const isPWA = writable<boolean>(
		window.electron ||
			(!window.electron && browser && !Device.isMobile && !Device.isTablet) ||
			!!(
				(window.matchMedia?.('(display-mode: standalone)').matches ||
					(window.navigator as any).standalone) &&
				(Device.isMobile || Device.isTablet)
			),
	);

	export const currentPlayer = writable<Player>();
	export const currentPlayers = writable<Player[]>();
	export const dolphinState = writable<DolphinState>();
	export const gameFrame = writable<FrameEntryType>();
	export const gameScore = writable<number[]>([0, 0]);
	export const gameSettings = writable<GameStartType>();
	export const postGameStats = writable<any>();
	export const recentRankedSets = writable<any>();
	export const sessionStats = writable<any>();
	export const statsScene = writable<LiveStatsScene>(LiveStatsScene.WaitingForDolphin);

	// TODO: Remove object and init it from electron instead
	export const obs = writable<Obs>();
	export const urls = writable<Url>();
</script>
