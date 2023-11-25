<script lang="ts" context="module">
	import type {
		AutoUpdaterStatus,
		BestOf,
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
		Match,
		Player,
		Session,
	} from '$lib/models/types/slippiData';
	import {
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
		memoryReadController,
		currentMatch,
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import {
		getElectronEmitter,
		getLocalEmitter,
		getObs,
		getPage,
	} from '$lib/utils/fetchSubscriptions.svelte';
	import { WEBSOCKET_PORT } from '$lib/models/const';

	export async function initEventListener() {
		console.log('Initializing listeners');
		const _localEmitter = await getLocalEmitter();
		_localEmitter.setMaxListeners(30);
		_localEmitter.on('MemoryControllerInput', (controllers: PlayerController) => {
			memoryReadController.set(controllers);
		});
		_localEmitter.on('AutoUpdaterStatus', (status: AutoUpdaterStatus) => {
			console.log('update status', status);
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, status: status };
			});
		});
		_localEmitter.on('AutoUpdaterVersion', (version: string | undefined) => {
			console.log('version', { version });
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, version: version };
			});
		});
		_localEmitter.on('AutoUpdaterProgress', (progress: string | undefined) => {
			console.log('update progress', progress);
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, progress: progress };
			});
		});
		_localEmitter.on('CurrentPlayer', (player: CurrentPlayer | undefined) => {
			console.log('player', player);
			currentPlayer.set(player);
		});
		_localEmitter.on('CurrentPlayers', (players: Player[] | undefined) => {
			console.log('players', players);
			currentPlayers.set(players);
		});
		_localEmitter.on('DolphinConnectionState', (state: DolphinConnectionState | undefined) => {
			if (!state) return;
			console.log('dolphin state', state);
			dolphinState.set(state);
		});
		_localEmitter.on('GameFrame', (frame: FrameEntryType | undefined | null) => {
			if (!frame) return;
			gameFrame.set(frame);
		});
		_localEmitter.on('GameSettings', (settings: GameStartTypeExtended | undefined) => {
			if (!settings) return;
			console.log('game settings', settings);
			gameSettings.set(settings);
		});
		_localEmitter.on('GameScore', (score: number[]) => {
			console.log('score', score);
			gameScore.set(score);
		});
		_localEmitter.on('GameState', (state: InGameState | undefined) => {
			if (!state) return;
			console.log('game state', state);
			gameState.set(state);
		});
		_localEmitter.on('PostGameStats', (stats: GameStats | undefined) => {
			if (!stats) return;
			console.log('game stats', stats);
			postGame.set(stats);
			gameFrame.set(null);
		});
		_localEmitter.on('CurrentMatch', (stats: Match | undefined) => {
			if (!stats) return;
			console.log('match', stats);
			currentMatch.set(stats);
		});
		_localEmitter.on('RecentGames', (games: GameStats[][]) => {
			console.log('recent games', games);
			recentGames.set(games);
		});
		_localEmitter.on('RecentRankedSets', (recentSets: GameStats[]) => {
			console.log('recent ranked sets', recentSets);
			recentRankedSets.set(recentSets);
		});
		_localEmitter.on('SessionStats', (session: Session | undefined) => {
			console.log('session', session);
			sessionStats.set(session);
		});
		_localEmitter.on('LiveStatsSceneChange', (scene: LiveStatsScene | undefined) => {
			if (!scene) return;
			console.log('live scene', scene);
			statsScene.set(scene);
		});
		_localEmitter.on('Url', (url: Url) => {
			console.log('url', url);
			urls.set(url);
		});

		_localEmitter.on('ObsCustomOverlay', async (overlay: Overlay) => {
			let _obs = await getObs();
			const overlayIndex = _obs.overlays.findIndex((overlay) => overlay.id == overlay.id);
			overlayIndex === undefined || overlayIndex === -1
				? _obs.overlays.push(overlay)
				: (_obs.overlays[overlayIndex] = overlay);

			obs.set(_obs);
		});

		_localEmitter.on('ObsCustom', (value: Obs | undefined) => {
			console.log('custom value', value);
			if (!value) return;
			console.log('obs', value);
			obs.set(value);
		});
	}

	export const initElectronEvents = async () => {
		console.log('Initializing electron');
		const _localEmitter = await getLocalEmitter();
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				_localEmitter.emit(key as any, value);
			}
		});

		const _electronEmitter = await getElectronEmitter();
		_electronEmitter.onAny((event, data) => {
			window.electron.send('message', JSON.stringify({ [event as string]: data ?? '' }));
		});
	};

	export const initWebSocket = async () => {
		const _localEmitter = await getLocalEmitter();
		const _page = await getPage();
		console.log('Initializing websocket');
		const socket = new WebSocket(`ws://${_page.url.hostname}:${WEBSOCKET_PORT}`);
		socket.addEventListener('message', ({ data }) => {
			const parse = JSON.parse(data);
			for (const [key, value] of Object.entries<any[]>(parse)) {
				_localEmitter.emit(key as any, value);
			}
		});

		const _electronEmitter = await getElectronEmitter();
		socket.onopen = () => {
			_electronEmitter.onAny((event, data) => {
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
