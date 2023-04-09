<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { EventEmitter } from 'events';
	import { LiveStatsScene } from '$lib/types/enum';
	import Device from 'svelte-device-info';
	import type { Obs, Url } from '$lib/types/types';

	// Remove this
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	const id = () => '_' + Math.random().toString(36).substr(2, 9);
	// Here

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
	const obs = writable<Obs>({
		scenes: [
			{
				id: 1,
				title: 'main',
				description: 'main description',
				default: LiveStatsScene.PlayerRankStats,
				preGame: {
					backgroundColor: 'white',
					backgroundImage: undefined,
					layer1: [
						{
							32: gridHelp.item({
								x: 0,
								y: 0,
								w: 4,
								h: 4,
								min: { w: 2, h: 2 },
								max: { y: 32, h: 33 },
							}),
							id: id(),
						},

						{
							32: gridHelp.item({
								x: 12,
								y: 12,
								w: 4,
								h: 4,
								min: { w: 2, h: 2 },
								max: { y: 32, h: 33 },
							}),
							id: id(),
							data: 'damn',
						},
					],
					layer2: [],
					layer3: [],
				},
				inGame: {
					backgroundColor: 'white',
					backgroundImage: undefined,
					layer1: [],
					layer2: [],
					layer3: [],
				},
				postGame: {
					backgroundColor: 'white',
					backgroundImage: undefined,
					layer1: [],
					layer2: [],
					layer3: [],
				},
				rankChange: {
					backgroundColor: 'white',
					backgroundImage: undefined,
					layer1: [],
					layer2: [],
					layer3: [],
				},
			},
		],
	});
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
