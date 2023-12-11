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
	import { getElectronEmitter, getPage } from '$lib/utils/fetchSubscriptions.svelte';
	import { WEBSOCKET_PORT } from '$lib/models/const';
	import type { Obs, ObsConnection } from '$lib/models/types/obsTypes';
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import type { MessageEvents } from './customEventEmitter';
	import { isNil } from 'lodash';

	export async function initEventListener<J extends keyof MessageEvents>(
		topic: J,
		...payload: Parameters<MessageEvents[J]>
	) {
		console.log('Initializing listeners');
		switch (topic) {
			case 'MemoryControllerInput':
				memoryReadController.set(
					...(payload as Parameters<MessageEvents['MemoryControllerInput']>),
				);
				break;
			case 'AutoUpdaterStatus':
				autoUpdater.update((autoUpdater: AutoUpdater) => {
					return { ...autoUpdater, status: payload[0] };
				});
				break;
			case 'AutoUpdaterVersion':
				autoUpdater.update((autoUpdater: AutoUpdater) => {
					return { ...autoUpdater, version: payload[0] };
				});
				break;
			case 'AutoUpdaterProgress':
				autoUpdater.update((autoUpdater: AutoUpdater) => {
					return { ...autoUpdater, progress: payload[0] };
				});
				break;
			case 'CurrentPlayer':
				currentPlayer.set(...(payload as Parameters<MessageEvents['CurrentPlayer']>));
				break;
			case 'CurrentPlayers':
				currentPlayers.set(...(payload as Parameters<MessageEvents['CurrentPlayers']>));
				break;
			case 'DolphinConnectionState':
				dolphinState.set(
					...(payload as Parameters<MessageEvents['DolphinConnectionState']>),
				);
				break;
			case 'GameFrame':
				gameFrame.set(...(payload as Parameters<MessageEvents['GameFrame']>));
				break;
			case 'GameSettings':
				gameSettings.set(...(payload as Parameters<MessageEvents['GameSettings']>));
				break;
			case 'GameScore':
				gameScore.set(...(payload as Parameters<MessageEvents['GameScore']>));
				break;
			case 'GameState':
				gameState.set(...(payload as Parameters<MessageEvents['GameState']>));
				break;
			case 'Notification':
				const message = payload[0] as Parameters<MessageEvents['Notification']>[0];
				const type = payload[1] as Parameters<MessageEvents['Notification']>[0];
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
				break;
			case 'Obs':
				obs.set(...(payload as Parameters<MessageEvents['Obs']>));
				break;
			case 'ObsConnection':
				obsConnection.set(...(payload as Parameters<MessageEvents['ObsConnection']>));
				break;
			case 'Overlays':
				overlays.set(...(payload as Parameters<MessageEvents['Overlays']>));
				break;
			case 'CurrentOverlayEditor':
				currentOverlayEditor.set(
					...(payload as Parameters<MessageEvents['CurrentOverlayEditor']>),
				);
				break;
			case 'PostGameStats':
				postGame.set(...(payload as Parameters<MessageEvents['PostGameStats']>));
				break;
			case 'CurrentMatch':
				currentMatch.set(...(payload as Parameters<MessageEvents['CurrentMatch']>));
				break;
			case 'RecentGames':
				recentGames.set(...(payload as Parameters<MessageEvents['RecentGames']>));
				break;
			case 'RecentRankedSets':
				recentRankedSets.set(...(payload as Parameters<MessageEvents['RecentRankedSets']>));
				break;
			case 'SessionStats':
				sessionStats.set(...(payload as Parameters<MessageEvents['SessionStats']>));
				break;
			case 'LiveStatsSceneChange':
				statsScene.set(...(payload as Parameters<MessageEvents['LiveStatsSceneChange']>));
				break;
			case 'Url':
				urls.set(...(payload as Parameters<MessageEvents['Url']>));
				break;
		}
	}

	export const initElectronEvents = async () => {
		console.log('Initializing electron');
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				initEventListener(key as keyof MessageEvents, ...(value as any));
			}
		});

		const _electronEmitter = await getElectronEmitter();
		_electronEmitter.onAny((event, ...data) => {
			window.electron.send('message', JSON.stringify({ [event as string]: data ?? '' }));
		});
	};

	export const initWebSocket = async () => {
		const _page = await getPage();
		console.log('Initializing websocket');
		const socket = new WebSocket(`ws://${_page.url.hostname}:${WEBSOCKET_PORT}`);
		socket.addEventListener('message', ({ data }: { data: any }) => {
			const parse = JSON.parse(data);
			for (const [key, value] of Object.entries<any[]>(parse)) {
				initEventListener(key as keyof MessageEvents, ...(value as any));
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
