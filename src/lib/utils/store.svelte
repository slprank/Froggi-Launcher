<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { EventEmitter } from 'events';
	import Device from 'svelte-device-info';

	const eventEmitter = writable<EventEmitter>(new EventEmitter());

	const isBrowser = writable<boolean>(!window.electron && browser);
	const isDesktop = writable<boolean>(
		!window.electron && browser && !Device.isMobile && !Device.isTablet,
	);
	const isElectron = writable<boolean>(window.electron);
	const isMobile = writable<boolean>(!window.electron && Device.isMobile);
	const isTablet = writable<boolean>(!window.electron && Device.isTablet);

	const currentPlayerRankStats = writable<any>();
	const currentPlayersRankStats = writable<any>();
	const gameScore = writable<any>();
	const gameSettings = writable<any>();
	const gameStats = writable<any>();
	const recentRankedSets = writable<any>();
	const sessionStats = writable<any>();
	const statsScene = writable<any>();
	const urls = writable<any>();

	export {
		eventEmitter,
		isBrowser,
		isDesktop,
		isElectron,
		isMobile,
		isTablet,
		currentPlayerRankStats,
		currentPlayersRankStats,
		gameScore,
		gameSettings,
		gameStats,
		recentRankedSets,
		sessionStats,
		statsScene,
		urls,
	};
</script>
