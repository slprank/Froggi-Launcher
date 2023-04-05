<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { paramRedirect } from '$lib/utils/routeHandler.svelte';
	import { initNoSleep } from '$lib/utils/noSleep.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import {
		isBrowser,
		isElectron,
		isPWA,
		eventEmitter,
		currentPlayerRankStats,
		currentPlayersRankStats,
		gameScore,
		gameSettings,
		gameStats,
		recentRankedSets,
		sessionStats,
		statsScene,
		urls,
	} from '$lib/utils/store.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import Pwa from '$lib/components/modal/mobile/Pwa.svelte';

	let isPwaOpen = !$isPWA;

	function initDevices() {
		if ($isBrowser) {
			initNoSleep();
			initWebSocket();
			initServiceWorker();
			paramRedirect();
		}

		if ($isElectron) {
			initElectronEvents();
			initGlobalEventListeners();
			$eventEmitter.emit('electron', 'init-data-electron');
		}
	}

	function initElectronEvents() {
		console.log('Initializing electron');
		$eventEmitter.on('electron', (topic, payload) => {
			console.log('Sending message..', topic, payload);
			window.electron.send('message', JSON.stringify({ [topic]: payload ?? '' }));
		});
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				$eventEmitter.emit(key, value);
			}
		});
	}

	function initWebSocket() {
		console.log('Initializing websocket');
		const socket = new WebSocket(`ws://${$page.url.hostname}:3100`);
		socket.onopen = () => {
			$eventEmitter.on('electron', (topic, payload) => {
				console.log('Sending message..', topic, payload);
				socket.send(JSON.stringify({ [topic]: payload ?? '' }));
			});
		};
		socket.onclose = () => {
			setTimeout(reload, 1000);
		};
		socket.addEventListener('message', ({ data }) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				$eventEmitter.emit(key, value);
			}
		});
		initGlobalEventListeners();
	}

	function initGlobalEventListeners() {
		console.log('Initializing listeners');
		$eventEmitter.on('currentPlayer_rank_stats', (rankStats: any) => {
			console.log({ rankStats });
			currentPlayerRankStats.set(rankStats);
		});
		$eventEmitter.on('currentPlayers_rank_stats', (playersRankStats: any) => {
			console.log({ playersRankStats });
			currentPlayersRankStats.set(playersRankStats);
		});
		$eventEmitter.on('game_settings', (settings: any) => {
			console.log({ settings });
			gameSettings.set(settings);
		});
		$eventEmitter.on('game_score', (score: any) => {
			console.log({ score });
			gameScore.set(score);
		});
		$eventEmitter.on('game_stats', (stats: any) => {
			console.log({ stats });
			gameStats.set(stats);
		});
		$eventEmitter.on('recent_ranked_sets', (recentSets: any) => {
			console.log({ recentSets });
			recentRankedSets.set(recentSets);
		});
		$eventEmitter.on('session_stats', (session: any) => {
			console.log({ session });
			sessionStats.set(session);
		});
		$eventEmitter.on('live_stats_scene', (scene: any) => {
			console.log({ scene });
			statsScene.set(scene);
		});
		$eventEmitter.on('urls', (url: any) => {
			console.log(url);
			urls.set(url);
		});
	}

	function initServiceWorker() {
		if ('serviceWorker' in navigator) {
			addEventListener('load', function () {
				navigator.serviceWorker.register('./../service-worker.js');
			});
		}
	}

	const reload = () => {
		window.location.reload();
	};

	let ready: boolean = false;

	onMount(() => {
		initDevices();
		ready = true;
	});
</script>

<div class="dragbar" />

{#if ready}
	<Navbar />
	<Modal
		bind:open={isPwaOpen}
		on:close={() => (isPwaOpen = false)}
		class="w-[90%] h-72 min-w-72 max-w-[612px] rounded-lg"
	>
		<Pwa />
	</Modal>
	<slot />
{/if}

<style>
	.dragbar {
		-webkit-app-region: drag;
		position: absolute;
		z-index: 100;
		height: 40px;
		width: 100%;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background-color: black;
	}

	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	*::-webkit-scrollbar {
		display: none;
	}

	* {
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}
</style>
