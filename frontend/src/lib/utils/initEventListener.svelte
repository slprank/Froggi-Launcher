<script lang="ts" context="module">
	import type { AutoUpdaterStatus, DolphinConnectionState, InGameState } from '$lib/models/enum';
	import type { AutoUpdater, Obs, Overlay } from '$lib/models/types';
	import type { CurrentPlayer, GameStats, Player } from '$lib/models/types/slippiData';
	import {
		eventEmitter,
		currentPlayer,
		currentPlayers,
		gameScore,
		gameSettings,
		postGame,
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
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import type EventEmitter from 'events';

	export async function initEventListener() {
		console.log('Initializing listeners');
		const _eventEmitter = await getEventEmitter();
		_eventEmitter.setMaxListeners(30);
		_eventEmitter.on('auto-updater-status', (status: AutoUpdaterStatus) => {
			console.log({ status });
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
			console.log({ progress });
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, progress: progress };
			});
		});
		_eventEmitter.on('current-player', (player: CurrentPlayer) => {
			console.log({ player });
			currentPlayer.set(player);
		});
		_eventEmitter.on('current-players', (players: Player[]) => {
			console.log({ players });
			currentPlayers.set(players);
		});
		_eventEmitter.on('dolphin-connection-state', (state: DolphinConnectionState) => {
			console.log({ state });
			dolphinState.set(state);
		});
		_eventEmitter.on('game-frame', (frame: FrameEntryType | null) => {
			gameFrame.set(frame);
		});
		_eventEmitter.on('game-settings', (settings: any) => {
			console.log({ settings });
			gameSettings.set(settings);
		});
		_eventEmitter.on('game-score', (score: any) => {
			console.log({ score });
			gameScore.set(score);
		});
		_eventEmitter.on('game-state', (state: InGameState) => {
			console.log({ state });
			gameState.set(state);
		});
		_eventEmitter.on('post-game-stats', (stats: GameStats) => {
			console.log({ stats });
			postGame.set(stats);
		});
		_eventEmitter.on('post-match-stats', (stats: GameStats) => {
			console.log({ stats });
			postGame.set(stats);
		});
		_eventEmitter.on('recent-games', (matches: any) => {
			console.log({ matches });
			recentGames.set(matches);
		});
		_eventEmitter.on('recent-ranked-sets', (recentSets: any) => {
			console.log({ recentSets });
			recentRankedSets.set(recentSets);
		});
		_eventEmitter.on('session-stats', (session: any) => {
			console.log({ session });
			sessionStats.set(session);
		});
		_eventEmitter.on('live-stats-scene', (scene: any) => {
			console.log({ scene });
			statsScene.set(scene);
		});
		_eventEmitter.on('urls', (url: any) => {
			console.log(url);
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
