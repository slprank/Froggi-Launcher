<script lang="ts" context="module">
	import type {
		AutoUpdaterStatus,
		ConnectionState,
		InGameState,
		LiveStatsScene,
	} from '$lib/models/enum';
	import { NotificationType } from '$lib/models/enum';
	import type { AutoUpdater, Overlay, OverlayEditor, Url } from '$lib/models/types/overlay';
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
		gameFrame,
		dolphinState,
		gameState,
		recentGames,
		autoUpdater,
		memoryReadController,
		currentMatch,
		overlays,
		obsConnection,
		obs,
		currentOverlayEditor,
	} from '$lib/utils/store.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';
	import {
		getElectronEmitter,
		getLocalEmitter,
		getPage,
	} from '$lib/utils/fetchSubscriptions.svelte';
	import { WEBSOCKET_PORT } from '$lib/models/const';
	import type { Obs, ObsConnection } from '$lib/models/types/obsTypes';
	import { notifications } from '$lib/components/notification/Notifications.svelte';

	export async function initEventListener() {
		console.log('Initializing listeners');
		const _localEmitter = await getLocalEmitter();
		_localEmitter.setMaxListeners(30);
		_localEmitter.on('MemoryControllerInput', (controllers: PlayerController) => {
			memoryReadController.set(controllers);
		});
		_localEmitter.on('AutoUpdaterStatus', (status: AutoUpdaterStatus) => {
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, status: status };
			});
		});
		_localEmitter.on('AutoUpdaterVersion', (version: string | undefined) => {
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, version: version };
			});
		});
		_localEmitter.on('AutoUpdaterProgress', (progress: string | undefined) => {
			autoUpdater.update((autoUpdater: AutoUpdater) => {
				return { ...autoUpdater, progress: progress };
			});
		});
		_localEmitter.on('CurrentPlayer', (player: CurrentPlayer | undefined) => {
			currentPlayer.set(player);
		});
		_localEmitter.on('CurrentPlayers', (players: Player[] | undefined) => {
			if (!players) return;
			currentPlayers.set(players);
		});
		_localEmitter.on('DolphinConnectionState', (state: ConnectionState | undefined) => {
			if (!state) return;
			dolphinState.set(state);
		});
		_localEmitter.on('GameFrame', (frame: FrameEntryType | undefined | null) => {
			if (!frame) return;
			gameFrame.set(frame);
		});
		_localEmitter.on('GameSettings', (settings: GameStartTypeExtended | undefined) => {
			if (!settings) return;
			gameSettings.set(settings);
		});
		_localEmitter.on('GameScore', (score: number[]) => {
			gameScore.set(score);
		});
		_localEmitter.on('GameState', (state: InGameState | undefined) => {
			if (!state) return;
			gameState.set(state);
		});
		_localEmitter.on('Notification', (message: string, type: NotificationType) => {
			switch (type) {
				case NotificationType.Default:
					notifications.default(message, 2000);
					break;
				case NotificationType.Danger:
					notifications.danger(message, 2000);
					break;
				case NotificationType.Info:
					notifications.info(message, 2000);
					break;
				case NotificationType.Success:
					notifications.success(message, 2000);
					break;
				case NotificationType.Warning:
					notifications.warning(message, 2000);
					break;
			}
		});
		_localEmitter.on('Obs', (value: Obs | undefined) => {
			if (!value) return;
			obs.set(value);
			obsConnection.set(value.connection);
			overlays.set(value.layout.overlays);
			currentOverlayEditor.set(value.layout.current);
		});
		_localEmitter.on('ObsConnection', (connection: ObsConnection) => {
			obsConnection.set(connection);
		});
		_localEmitter.on('Overlays', (value: Overlay[] | undefined) => {
			if (!value) return;
			overlays.set(value);
		});
		_localEmitter.on('CurrentOverlayEditor', (value: OverlayEditor | undefined) => {
			if (!value) return;
			currentOverlayEditor.set(value);
		});
		_localEmitter.on('PostGameStats', (stats: GameStats | undefined) => {
			if (!stats) return;
			postGame.set(stats);
			gameFrame.set(null);
		});
		_localEmitter.on('CurrentMatch', (stats: Match | undefined) => {
			if (!stats) return;
			currentMatch.set(stats);
		});
		_localEmitter.on('RecentGames', (games: GameStats[][]) => {
			recentGames.set(games);
		});
		_localEmitter.on('RecentRankedSets', (recentSets: GameStats[]) => {
			recentRankedSets.set(recentSets);
		});
		_localEmitter.on('SessionStats', (session: Session | undefined) => {
			sessionStats.set(session);
		});
		_localEmitter.on('LiveStatsSceneChange', (scene: LiveStatsScene | undefined) => {
			if (!scene) return;
			statsScene.set(scene);
		});
		_localEmitter.on('Url', (url: Url) => {
			urls.set(url);
		});
	}

	export const initElectronEvents = async () => {
		console.log('Initializing electron');
		const _localEmitter = await getLocalEmitter();
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				_localEmitter.emit(key as any, ...(value as any));
			}
		});

		const _electronEmitter = await getElectronEmitter();
		_electronEmitter.onAny((event, ...data) => {
			window.electron.send('message', JSON.stringify({ [event as string]: data ?? '' }));
		});
	};

	export const initWebSocket = async () => {
		const _localEmitter = await getLocalEmitter();
		const _page = await getPage();
		console.log('Initializing websocket');
		const socket = new WebSocket(`ws://${_page.url.hostname}:${WEBSOCKET_PORT}`);
		socket.addEventListener('message', ({ data }: { data: any }) => {
			const parse = JSON.parse(data);
			for (const [key, value] of Object.entries<any[]>(parse)) {
				_localEmitter.emit(key as any, ...(value as any));
			}
		});

		const _electronEmitter = await getElectronEmitter();
		socket.onopen = () => {
			_electronEmitter.onAny((event, ...data) => {
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
