<script lang="ts" context="module">
	import type { AutoUpdaterStatus, DolphinConnectionState, InGameState } from '$lib/models/enum';
	import type { AutoUpdater, Overlay, Url } from '$lib/models/types/overlay';
	import type { ControllerInputs } from '$lib/models/types/controller';
	import type {
		CurrentPlayer,
		GameStartTypeExtended,
		GameStats,
		MatchStats,
		Player,
	} from '$lib/models/types/slippiData';
	import {
		currentPlayer,
		currentPlayers,
		gameScore,
		gameSettings,
		postGame,
		postMatch,
		recentRankedSets,
		sessionStats,
		statsScene,
		urls,
		obs,
		gameFrame,
		dolphinState,
		gameState,
		recentGames,
		autoUpdater,
		memoryReadController,
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType, GameStartType } from '@slippi/slippi-js';
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { getEventEmitter, getObs } from './FetchSubscriptions.svelte';

	export async function initEventListener() {
		console.log('Initializing listeners');
		const _eventEmitter = await getEventEmitter();
		_eventEmitter.setMaxListeners(30);
		_eventEmitter.on('memory-controller', (controllers: ControllerInputs[]) => {
			memoryReadController.set(controllers);
		});
		_eventEmitter.on('auto-updater-status', (status: AutoUpdaterStatus) => {
			console.log('update status', status);
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, status: status };
			});
		});
		_eventEmitter.on('auto-updater-version', (version: string | undefined) => {
			console.log('version', { version });
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, version: version };
			});
		});
		_eventEmitter.on('auto-updater-progress', (progress: number | undefined) => {
			console.log('update progress', progress);
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, progress: progress };
			});
		});
		_eventEmitter.on('current-player', (player: CurrentPlayer) => {
			console.log('player', player);
			currentPlayer.set(player);
		});
		_eventEmitter.on('current-players', (players: Player[]) => {
			console.log('players', players);
			currentPlayers.set(players);
		});
		_eventEmitter.on('dolphin-connection-state', (state: DolphinConnectionState) => {
			console.log('dolphin state', state);
			dolphinState.set(state);
		});
		_eventEmitter.on('game-frame', (frame: FrameEntryType | null) => {
			gameFrame.set(frame);
		});
		_eventEmitter.on('game-settings', (settings: GameStartTypeExtended) => {
			console.log('game settings', settings);
			gameSettings.set(settings);
		});
		_eventEmitter.on('game-score', (score: number[]) => {
			console.log('score', score);
			gameScore.set(score);
		});
		_eventEmitter.on('game-state', (state: InGameState) => {
			console.log('game state', state);
			gameState.set(state);
		});
		_eventEmitter.on('post-game-stats', (stats: GameStats) => {
			console.log('game stats', stats);
			postGame.set(stats);
			gameFrame.set(null);
		});
		_eventEmitter.on('post-match-stats', (stats: MatchStats) => {
			console.log('match stats', stats);
			postMatch.set(stats);
		});
		_eventEmitter.on('recent-games', (games: GameStats[]) => {
			console.log('recent games', games);
			recentGames.set(games);
		});
		_eventEmitter.on('recent-ranked-sets', (recentSets: any) => {
			console.log('recent ranked sets', recentSets);
			recentRankedSets.set(recentSets);
		});
		_eventEmitter.on('session-stats', (session: any) => {
			console.log('session', session);
			sessionStats.set(session);
		});
		_eventEmitter.on('live-stats-scene', (scene: any) => {
			console.log('live scene', scene);
			statsScene.set(scene);
		});
		_eventEmitter.on('urls', (url: Url) => {
			console.log('url', url);
			urls.set(url);
		});

		_eventEmitter.on('obs-custom-overlay', async (value: Overlay) => {
			let _obs = await getObs();
			const overlayIndex = _obs.overlays.findIndex((overlay) => overlay.id == value.id);
			overlayIndex === undefined || overlayIndex === -1
				? _obs.overlays.push(value)
				: (_obs.overlays[overlayIndex] = value);

			obs.set(_obs);
		});

		_eventEmitter.on('obs-custom', (value: any) => {
			console.log('obs', value);
			obs.set(value);
		});
	}

	export const initElectronEvents = async () => {
		const _eventEmitter = await getEventEmitter();
		console.log('Initializing electron');
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				_eventEmitter.emit(key, value);
			}
		});
		_eventEmitter.on('electron', (topic, payload) => {
			console.log('Sending electron message..', topic, payload);
			window.electron.send('message', JSON.stringify({ [topic]: payload ?? '' }));
		});
	};
</script>
