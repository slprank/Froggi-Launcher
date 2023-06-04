<script lang="ts" context="module">
	import type { Obs, Overlay } from '$lib/types/types';
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
		obs,
		gameFrame,
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import type EventEmitter from 'events';

	export async function initEventListener() {
		console.log('Initializing listeners');
		const _eventEmitter = await getEventEmitter();
		_eventEmitter.on('currentPlayer_rank_stats', (rankStats: any) => {
			console.log({ rankStats });
			currentPlayerRankStats.set(rankStats);
		});
		_eventEmitter.on('currentPlayers_rank_stats', (playersRankStats: any) => {
			console.log({ playersRankStats });
			currentPlayersRankStats.set(playersRankStats);
		});
		_eventEmitter.on('game_frame', (frame: FrameEntryType) => {
			gameFrame.set(frame);
		});
		_eventEmitter.on('game_settings', (settings: any) => {
			console.log({ settings });
			gameSettings.set(settings);
		});
		_eventEmitter.on('game_score', (score: any) => {
			console.log({ score });
			gameScore.set(score);
		});
		_eventEmitter.on('game_stats', (stats: any) => {
			console.log({ stats });
			gameStats.set(stats);
		});
		_eventEmitter.on('recent_ranked_sets', (recentSets: any) => {
			console.log({ recentSets });
			recentRankedSets.set(recentSets);
		});
		_eventEmitter.on('session_stats', (session: any) => {
			console.log({ session });
			sessionStats.set(session);
		});
		_eventEmitter.on('live_stats_scene', (scene: any) => {
			console.log({ scene });
			statsScene.set(scene);
		});
		_eventEmitter.on('urls', (url: any) => {
			console.log(url);
			urls.set(url);
		});

		_eventEmitter.on('obs_custom_overlay', async (value: Overlay) => {
			let _obs = await getObs();
			const overlayIndex = _obs.overlays.findIndex((overlay) => overlay.id == value.id);
			overlayIndex === undefined || overlayIndex === -1
				? _obs.overlays.push(value)
				: (_obs.overlays[overlayIndex] = value);

			obs.set(_obs);
		});

		_eventEmitter.on('obs_custom', (value: any) => {
			console.log('obs', value);
			obs.set(value);
		});
	}

	async function getEventEmitter(): Promise<EventEmitter> {
		return await new Promise<EventEmitter>((resolve) => {
			eventEmitter.subscribe((eventEmitter) => {
				resolve(eventEmitter);
			});
		});
	}

	async function getObs(): Promise<Obs> {
		return await new Promise<Obs>((resolve) => {
			obs.subscribe((obs) => {
				resolve(obs);
			});
		});
	}
</script>
