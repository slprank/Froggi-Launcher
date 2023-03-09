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
					setTimeout(reload, 1000);
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
				console.log({ rankStats });
				currentPlayerRankStats.set(rankStats);
			});
			emitter.on('currentPlayers_rank_stats', (playersRankStats: any) => {
				console.log({ playersRankStats });
				currentPlayersRankStats.set(playersRankStats);
			});
			emitter.on('game_settings', (settings: any) => {
				console.log({ settings });
				gameSettings.set(settings);
			});
			emitter.on('game_score', (score: any) => {
				console.log({ score });
				gameScore.set(score);
			});
			emitter.on('game_stats', (stats: any) => {
				console.log({ stats });
				gameStats.set(stats);
			});
			emitter.on('recent_ranked_sets', (recentSets: any) => {
				console.log({ recentSets });
				recentRankedSets.set(recentSets);
			});
			emitter.on('session_stats', (session: any) => {
				console.log({ session });
				sessionStats.set(session);
			});
			emitter.on('stats_scene', (scene: any) => {
				console.log({ scene });
				statsScene.set(scene);
			});
			emitter.on('urls', (url: any) => {
				console.log(url);
				urls.set(url);
			});
		});
	};

	const reload = () => {
		window.location.reload();
	};

	export { initWebSocket };
</script>
