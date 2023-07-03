<script lang="ts" context="module">
	import type { DolphinState, InGameState } from '$lib/models/enum';
	import type { Obs, Overlay, Player } from '$lib/models/types';
	import {
		eventEmitter,
		currentPlayer,
		currentPlayers,
		gameScore,
		gameSettings,
		postGameStats,
		recentRankedSets,
		sessionStats,
		statsScene,
		urls,
		obs,
		gameFrame,
		dolphinState,
		gameState,
		recentGames,
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import type EventEmitter from 'events';

	export async function initEventListener() {
		console.log('Initializing listeners');
		const _eventEmitter = await geteventEmitter();
		_eventEmitter.on('current_player', (player: Player) => {
			console.log({ player });
			currentPlayer.set(player);
		});
		_eventEmitter.on('current_players', (players: Player[]) => {
			console.log({ players });
			currentPlayers.set(players);
		});
		_eventEmitter.on('dolphin_state', (state: DolphinState) => {
			console.log({ state });
			dolphinState.set(state);
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
		_eventEmitter.on('game_state', (state: InGameState) => {
			console.log({ state });
			gameState.set(state);
		});
		_eventEmitter.on('post_game_stats', (stats: any) => {
			console.log({ stats });
			postGameStats.set(stats);
		});
		_eventEmitter.on('recent_games', (matches: any) => {
			console.log({ matches });
			recentGames.set(matches);
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

	async function geteventEmitter(): Promise<EventEmitter> {
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
