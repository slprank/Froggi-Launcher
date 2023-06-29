<script lang="ts" context="module">
	import type { DolphinState } from '$lib/models/enum';
	import type { Obs, Overlay, Player } from '$lib/models/types';
	import {
		electronEmitter,
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
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import type electronEmitter from 'events';

	export async function initEventListener() {
		console.log('Initializing listeners');
		const _electronEmitter = await getelectronEmitter();
		_electronEmitter.on('current_player', (player: Player) => {
			console.log({ player });
			currentPlayer.set(player);
		});
		_electronEmitter.on('current_players', (players: Player[]) => {
			console.log({ players });
			currentPlayers.set(players);
		});
		_electronEmitter.on('dolphin_state', (state: DolphinState) => {
			console.log({ state });
			dolphinState.set(state);
		});
		_electronEmitter.on('game_frame', (frame: FrameEntryType) => {
			gameFrame.set(frame);
		});
		_electronEmitter.on('game_settings', (settings: any) => {
			console.log({ settings });
			gameSettings.set(settings);
		});
		_electronEmitter.on('game_score', (score: any) => {
			console.log({ score });
			gameScore.set(score);
		});
		_electronEmitter.on('post_game_stats', (stats: any) => {
			console.log({ stats });
			postGameStats.set(stats);
		});
		_electronEmitter.on('recent_ranked_sets', (recentSets: any) => {
			console.log({ recentSets });
			recentRankedSets.set(recentSets);
		});
		_electronEmitter.on('session_stats', (session: any) => {
			console.log({ session });
			sessionStats.set(session);
		});
		_electronEmitter.on('live_stats_scene', (scene: any) => {
			console.log({ scene });
			statsScene.set(scene);
		});
		_electronEmitter.on('urls', (url: any) => {
			console.log(url);
			urls.set(url);
		});

		_electronEmitter.on('obs_custom_overlay', async (value: Overlay) => {
			let _obs = await getObs();
			const overlayIndex = _obs.overlays.findIndex((overlay) => overlay.id == value.id);
			overlayIndex === undefined || overlayIndex === -1
				? _obs.overlays.push(value)
				: (_obs.overlays[overlayIndex] = value);

			obs.set(_obs);
		});

		_electronEmitter.on('obs_custom', (value: any) => {
			console.log('obs', value);
			obs.set(value);
		});
	}

	async function getelectronEmitter(): Promise<electronEmitter> {
		return await new Promise<electronEmitter>((resolve) => {
			electronEmitter.subscribe((electronEmitter) => {
				resolve(electronEmitter);
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
