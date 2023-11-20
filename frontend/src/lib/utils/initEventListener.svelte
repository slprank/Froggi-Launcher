<script lang="ts" context="module">
	import type {
		AutoUpdaterStatus,
		DolphinConnectionState,
		InGameState,
		LiveStatsScene,
	} from '$lib/models/enum';
	import type { AutoUpdater, Obs, Overlay, Url } from '$lib/models/types/overlay';
	import type { PlayerController } from '$lib/models/types/controller';
	import type {
		CurrentPlayer,
		GameStartTypeExtended,
		GameStats,
		MatchStats,
		Player,
		Session,
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
	import type { FrameEntryType } from '@slippi/slippi-js';
	import {
		getElectronEmitter,
		getEventEmitter,
		getObs,
		getPage,
	} from '$lib/utils/fetchSubscriptions.svelte';
	import { WEBSOCKET_PORT } from '$lib/models/const';

	export async function initEventListener() {
		console.log('Initializing listeners');
		const _electronEmitter = await getElectronEmitter();
		_electronEmitter.setMaxListeners(30);
		_electronEmitter.on('MemoryControllerInput', (controllers: PlayerController) => {
			memoryReadController.set(controllers);
		});
		_electronEmitter.on('AutoUpdaterStatus', (status: AutoUpdaterStatus) => {
			console.log('update status', status);
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, status: status };
			});
		});
		_electronEmitter.on('AutoUpdaterVersion', (version: string | undefined) => {
			console.log('version', { version });
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, version: version };
			});
		});
		_electronEmitter.on('AutoUpdaterProgress', (progress: string | undefined) => {
			console.log('update progress', progress);
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, progress: progress };
			});
		});
		_electronEmitter.on('CurrentPlayer', (player: CurrentPlayer | undefined) => {
			console.log('player', player);
			currentPlayer.set(player);
		});
		_electronEmitter.on('CurrentPlayers', (players: Player[] | undefined) => {
			console.log('players', players);
			currentPlayers.set(players);
		});
		_electronEmitter.on(
			'DolphinConnectionState',
			(state: DolphinConnectionState | undefined) => {
				if (!state) return;
				console.log('dolphin state', state);
				dolphinState.set(state);
			},
		);
		_electronEmitter.on('GameFrame', (frame: FrameEntryType | undefined | null) => {
			if (!frame) return;
			gameFrame.set(frame);
		});
		_electronEmitter.on('GameSettings', (settings: GameStartTypeExtended | undefined) => {
			if (!settings) return;
			console.log('game settings', settings);
			gameSettings.set(settings);
		});
		_electronEmitter.on('GameScore', (score: number[]) => {
			console.log('score', score);
			gameScore.set(score);
		});
		_electronEmitter.on('GameState', (state: InGameState | undefined) => {
			if (!state) return;
			console.log('game state', state);
			gameState.set(state);
		});
		_electronEmitter.on('PostGameStats', (stats: GameStats | undefined) => {
			if (!stats) return;
			console.log('game stats', stats);
			postGame.set(stats);
			gameFrame.set(null);
		});
		_electronEmitter.on('PostMatchStats', (stats: MatchStats | undefined) => {
			if (!stats) return;
			console.log('match stats', stats);
			postMatch.set(stats);
		});
		_electronEmitter.on('RecentGames', (games: GameStats[]) => {
			console.log('recent games', games);
			recentGames.set(games);
		});
		_electronEmitter.on('RecentRankedSets', (recentSets: GameStats[]) => {
			console.log('recent ranked sets', recentSets);
			recentRankedSets.set(recentSets);
		});
		_electronEmitter.on('SessionStats', (session: Session | undefined) => {
			console.log('session', session);
			sessionStats.set(session);
		});
		_electronEmitter.on('LiveStatsSceneChange', (scene: LiveStatsScene | undefined) => {
			if (!scene) return;
			console.log('live scene', scene);
			statsScene.set(scene);
		});
		_electronEmitter.on('Url', (url: Url) => {
			console.log('url', url);
			urls.set(url);
		});

		_electronEmitter.on('ObsCustomOverlay', async (overlay: Overlay) => {
			let _obs = await getObs();
			const overlayIndex = _obs.overlays.findIndex((overlay) => overlay.id == overlay.id);
			overlayIndex === undefined || overlayIndex === -1
				? _obs.overlays.push(overlay)
				: (_obs.overlays[overlayIndex] = overlay);

			obs.set(_obs);
		});

		_electronEmitter.on('ObsCustom', (value: Obs | undefined) => {
			console.log('custom value', value);
			if (!value) return;
			console.log('obs', value);
			obs.set(value);
		});
	}

	export const initElectronEvents = async () => {
		const _electronEmitter = await getElectronEmitter();
		console.log('Initializing electron');
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				console.log('ipcMain', key, value);
				_electronEmitter.emit(key as any, value);
			}
		});

		const _eventEmitter = await getEventEmitter();
		_eventEmitter.onAny((event, data) => {
			//console.log('Sending electron message..', event, data);
			window.electron.send('message', JSON.stringify({ [event as string]: data ?? '' }));
		});
	};

	export const initWebSocket = async () => {
		const _electronEmitter = await getElectronEmitter();
		const _page = await getPage();
		console.log('Initializing websocket');
		const socket = new WebSocket(`ws://${_page.url.hostname}:${WEBSOCKET_PORT}`);
		socket.addEventListener('message', ({ data }) => {
			const parse = JSON.parse(data);
			for (const [key, value] of Object.entries<any[]>(parse)) {
				console.log('ws', key, value);
				_electronEmitter.emit(key as any, value);
			}
		});

		const _eventEmitter = await getEventEmitter();
		socket.onopen = () => {
			_eventEmitter.onAny((event, data) => {
				console.log('Sending electron message..', event, data);
				socket.send(JSON.stringify({ [event as string]: data }));
			});
		};
		socket.onclose = () => {
			setTimeout(reload, 1000);
		};
	};

	const reload = () => {
		window.location.reload();
	};
</script>
