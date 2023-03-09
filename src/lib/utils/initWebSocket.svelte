<script lang="ts" context="module">
	import { page } from '$app/stores';
	import {
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

	const initWebSocket = () => {
		console.log('Initializing websocket');
		page.subscribe((page) => {
			eventEmitter.subscribe((eventEmitter) => {
				const socket = new WebSocket(`ws://${page.url.hostname}:3100`);
				socket.onclose = () => {
					setTimeout(window.location.reload, 1000);
				};
				socket.addEventListener('message', ({ data }) => {
					let parse = JSON.parse(data);
					for (const [key, value] of Object.entries(parse)) {
						eventEmitter.emit(key, value);
					}
				});
				initGlobalEventListeners();
			});
		});
	};

	const initGlobalEventListeners = () => {
		console.log('Initializing listeners');
		eventEmitter.subscribe((emitter) => {
			emitter.on('currentPlayer_rank_stats', (rankStats: any) => {
				console.log(rankStats);
				currentPlayerRankStats.set(rankStats);
			});
			emitter.on('currentPlayers_rank_stats', (playersRankStats: any) => {
				console.log(playersRankStats);
				currentPlayersRankStats.set(playersRankStats);
			});
			emitter.on('gameScore', (score: any) => {
				gameScore.set(score);
			});
			emitter.on('gameSettings', (settings: any) => {
				gameSettings.set(settings);
			});
			emitter.on('gameStats', (stats: any) => {
				gameStats.set(stats);
			});
			emitter.on('recentRankedSets', (recentSets: any) => {
				recentRankedSets.set(recentSets);
			});
			emitter.on('sessionStats', (session: any) => {
				sessionStats.set(session);
			});
			emitter.on('statsScene', (scene: any) => {
				statsScene.set(scene);
			});
			emitter.on('urls', (url: any) => {
				console.log('url');
				console.log(url);
				urls.set(url);
			});
		});
	};

	export { initWebSocket };
</script>
