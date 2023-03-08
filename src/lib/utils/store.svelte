<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { EventEmitter } from 'events';
	import Device from 'svelte-device-info';

	const eventEmitter = writable<EventEmitter>(new EventEmitter());
	const isElectron = writable<boolean>(window.electron);
	const isBrowser = writable<boolean>(!window.electron && browser);
	const isMobile = writable<boolean>(!window.electron && Device.isMobile);
	const isTablet = writable<boolean>(!window.electron && Device.isMobile);

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
