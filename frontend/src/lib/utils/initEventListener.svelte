<script lang="ts" context="module">
	import { NotificationType } from '$lib/models/enum';
	import type { AutoUpdater } from '$lib/models/types/overlay';

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
	import { notifications } from '$lib/components/notification/Notifications.svelte';
	import type { MessageEvents } from './customEventEmitter';

	async function messageDataHandler<J extends keyof MessageEvents>(
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
				currentPlayer.set(payload[0] as Parameters<MessageEvents['CurrentPlayer']>[0]);
				break;
			case 'CurrentPlayers':
				currentPlayers.set(payload[0] as Parameters<MessageEvents['CurrentPlayers']>[0]);
				break;
			case 'DolphinConnectionState':
				dolphinState.set(
					payload[0] as Parameters<MessageEvents['DolphinConnectionState']>[0],
				);
				break;
			case 'GameFrame':
				gameFrame.set(payload[0] as Parameters<MessageEvents['GameFrame']>[0]);
				break;
			case 'GameSettings':
				gameSettings.set(payload[0] as Parameters<MessageEvents['GameSettings']>[0]);
				break;
			case 'GameScore':
				gameScore.set(payload[0] as Parameters<MessageEvents['GameScore']>[0]);
				break;
			case 'GameState':
				gameState.set(payload[0] as Parameters<MessageEvents['GameState']>[0]);
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
				obs.set(payload[0] as Parameters<MessageEvents['Obs']>[0]);
				break;
			case 'ObsConnection':
				obsConnection.set(payload[0] as Parameters<MessageEvents['ObsConnection']>[0]);
				break;
			case 'Overlays':
				overlays.set(payload[0] as Parameters<MessageEvents['Overlays']>[0]);
				break;
			case 'CurrentOverlayEditor':
				currentOverlayEditor.set(
					payload[0] as Parameters<MessageEvents['CurrentOverlayEditor']>[0],
				);
				break;
			case 'PostGameStats':
				postGame.set(payload[0] as Parameters<MessageEvents['PostGameStats']>[0]);
				break;
			case 'CurrentMatch':
				currentMatch.set(payload[0] as Parameters<MessageEvents['CurrentMatch']>[0]);
				break;
			case 'RecentGames':
				recentGames.set(payload[0] as Parameters<MessageEvents['RecentGames']>[0]);
				break;
			case 'RecentRankedSets':
				recentRankedSets.set(
					payload[0] as Parameters<MessageEvents['RecentRankedSets']>[0],
				);
				break;
			case 'SessionStats':
				sessionStats.set(payload[0] as Parameters<MessageEvents['SessionStats']>[0]);
				break;
			case 'LiveStatsSceneChange':
				statsScene.set(payload[0] as Parameters<MessageEvents['LiveStatsSceneChange']>[0]);
				break;
			case 'Url':
				urls.set(payload[0] as Parameters<MessageEvents['Url']>[0]);
				break;
		}
	}

	export const initElectronEvents = async () => {
		console.log('Initializing electron');
		window.electron.receive('message', (data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse)) {
				messageDataHandler(key as keyof MessageEvents, ...(value as any));
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
				messageDataHandler(key as keyof MessageEvents, ...(value as any));
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
