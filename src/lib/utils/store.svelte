<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { EventEmitter } from 'events';
	import { LiveStatsScene } from '$lib/types/enum';
	import Device from 'svelte-device-info';
	import type { Obs, Url } from '$lib/types/types';
	import { getDefaultScenes } from '$lib/components/custom/edit/CreateScene.svelte';

	const eventEmitter = writable<EventEmitter>(new EventEmitter());

	const isBrowser = writable<boolean>(!window.electron && browser);
	const isDesktop = writable<boolean>(
		!window.electron && browser && !Device.isMobile && !Device.isTablet,
	);
	const isElectron = writable<boolean>(window.electron);
	const isMobile = writable<boolean>(!window.electron && Device.isMobile);
	const isTablet = writable<boolean>(!window.electron && Device.isTablet);

	const isPWA = writable<boolean>(
		window.electron ||
			(!window.electron && browser && !Device.isMobile && !Device.isTablet) ||
			!!(
				(window.matchMedia?.('(display-mode: standalone)').matches ||
					(window.navigator as any).standalone) &&
				(Device.isMobile || Device.isTablet)
			),
	);

	const currentPlayerRankStats = writable<any>();
	const currentPlayersRankStats = writable<any>();
	const gameScore = writable<any>();
	const gameSettings = writable<any>();
	const gameStats = writable<any>();
	const recentRankedSets = writable<any>();
	const sessionStats = writable<any>();
	const statsScene = writable<LiveStatsScene>(LiveStatsScene.WaitingForDolphin);

	// TODO: Remove object and init it from electron instead
	const obs = writable<Obs>(getDefaultScenes());
	const urls = writable<Url>();

	export {
		eventEmitter,
		isBrowser,
		isDesktop,
		isElectron,
		isMobile,
		isTablet,
		isPWA,
		currentPlayerRankStats,
		currentPlayersRankStats,
		gameScore,
		gameSettings,
		gameStats,
		recentRankedSets,
		sessionStats,
		statsScene,
		obs,
		urls,
	};
</script>
