import { BrowserWindow, IpcMain } from 'electron';
import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronGamesStore } from './store/storeGames';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { ElectronSettingsStore } from './store/storeSettings';
import { ElectronObsStore } from './store/storeObs';
import { ElectronOverlayStore } from './store/storeOverlay';
import { ElectronCurrentPlayerStore } from './store/storeCurrentPlayer';
import { ElectronPlayersStore } from './store/storePlayers';
import { ElectronSessionStore } from './store/storeSession';
import { ElectronDolphinStore } from './store/storeDolphin';
import path from 'path';
import { TypedEmitter } from '../../frontend/src/lib/utils/customEventEmitter';
import type { MessageEvents } from '../../frontend/src/lib/utils/customEventEmitter';
import { Worker } from 'worker_threads';
import { sendAuthenticatedMessage } from '../../frontend/src/lib/utils/websocketAuthentication';
import { NotificationType } from '../../frontend/src/lib/models/enum';
import { ElectronObsCommandStore } from './store/storeObsCommands';

@singleton()
export class MessageHandler {
	private app: any;
	private express: any;
	private server: any;
	private webSocketWorker: Worker = new Worker(
		path.join(__dirname, 'workers/websocketWorker.js'),
	);

	constructor(
		@inject('Dev') private dev: boolean,
		@inject('BrowserWindow') private mainWindow: BrowserWindow,
		@inject('ElectronLog') private log: ElectronLog,
		@inject('LocalEmitter') private localEmitter: TypedEmitter,
		@inject('ClientEmitter') private clientEmitter: TypedEmitter,
		@inject('IpcMain') private ipcMain: IpcMain,
		@inject('Port') private port: string,
		@inject('RootDir') private rootDir: string,
		@inject(delay(() => ElectronDolphinStore)) private storeDolphin: ElectronDolphinStore,
		@inject(delay(() => ElectronGamesStore)) private storeGames: ElectronGamesStore,
		@inject(delay(() => ElectronLiveStatsStore)) private storeLiveStats: ElectronLiveStatsStore,
		@inject(delay(() => ElectronObsStore)) private storeObs: ElectronObsStore,
		@inject(delay(() => ElectronObsCommandStore))
		private storeObsCommands: ElectronObsCommandStore,
		@inject(delay(() => ElectronOverlayStore)) private storeOverlay: ElectronOverlayStore,
		@inject(delay(() => ElectronPlayersStore)) private storePlayers: ElectronPlayersStore,
		@inject(delay(() => ElectronCurrentPlayerStore))
		private storeCurrentPlayer: ElectronCurrentPlayerStore,
		@inject(delay(() => ElectronSessionStore)) private storeSession: ElectronSessionStore,
		@inject(delay(() => ElectronSettingsStore)) private storeSettings: ElectronSettingsStore,
	) {
		this.log.info('Initializing Message Handler');
		this.express = require('express');
		const cors = require('cors');
		const http = require('http');

		this.app = this.express();

		this.app.use(cors());
		this.server = http.createServer(this.app);

		this.initElectronMessageHandler();
		if (!this.dev) this.initHtml();
		this.initWebSocket();
		this.initEventListeners();
	}

	private initHtml() {
		this.log.info('Initializing HTML');
		const staticServe = this.express.static(path.join(this.rootDir + '/build'));
		try {
			this.app.use('/', staticServe);
			this.app.use('*', staticServe);

			this.server.listen(3200, (_: any) => {
				console.log(`listening on *:${this.port}`);
			});
		} catch (err) {
			this.log.error(err);
		}
	}

	private initElectronMessageHandler() {
		this.ipcMain.on('message', (_: any, data: any) => {
			let parse = JSON.parse(data);
			for (const [key, value] of Object.entries(parse) as [
				key: keyof MessageEvents,
				value: Parameters<MessageEvents[keyof MessageEvents]>,
			]) {
				this.clientEmitter.emit(key as any, ...(value as any));
			}
		});
		this.clientEmitter.on('InitElectron', () => {
			this.initData();
			this.sendAuthKey();
		});
	}

	private initWebSocket() {
		try {
			this.webSocketWorker.on('message', (value: string) => {
				const parse = JSON.parse(value);
				for (const [key, value] of Object.entries(parse) as [
					key: keyof MessageEvents,
					value: Parameters<MessageEvents[keyof MessageEvents]>,
				]) {
					sendAuthenticatedMessage(
						parse['socketId'],
						parse['AuthorizationKey'],
						this.storeSettings.getAuthorizationKey(),
						this.clientEmitter,
						this.webSocketWorker,
						key as keyof MessageEvents,
						value as any,
					);
				}
			});
		} catch (err) {
			this.log.error(err);
		}
	}

	sendMessage<J extends keyof MessageEvents>(topic: J, ...payload: Parameters<MessageEvents[J]>) {
		this.webSocketWorker.postMessage(
			JSON.stringify({
				[topic]: payload,
			}),
		);
		this.mainWindow.webContents.send(
			'message',
			JSON.stringify({
				[topic]: payload,
			}),
		);
		this.localEmitter.emit(topic, ...payload);
	}

	private sendInitMessage<J extends keyof MessageEvents>(
		socketId: string | undefined,
		topic: J,
		...payload: Parameters<MessageEvents[J]>
	) {
		this.webSocketWorker.postMessage(
			JSON.stringify({
				[topic]: payload,
				socketId: socketId,
			}),
		);
		if (socketId) return;
		this.sendMessage(topic, ...payload);
	}

	private initData(socketId: string | undefined = undefined) {
		this.sendInitMessage(socketId, 'CurrentPlayer', this.storeCurrentPlayer.getCurrentPlayer());
		this.sendInitMessage(socketId, 'CurrentPlayers', this.storePlayers.getCurrentPlayers());
		this.sendInitMessage(
			socketId,
			'DolphinConnectionState',
			this.storeDolphin.getDolphinConnectionState(),
		);
		this.sendInitMessage(socketId, 'GameScore', this.storeGames.getGameScore());
		this.sendInitMessage(socketId, 'GameSettings', this.storeLiveStats.getGameSettings());
		this.sendInitMessage(socketId, 'GameState', this.storeLiveStats.getGameState());
		this.sendInitMessage(socketId, 'LiveStatsSceneChange', this.storeLiveStats.getStatsScene());
		this.sendInitMessage(socketId, 'Overlays', this.storeOverlay.getOverlays());
		this.sendInitMessage(socketId, 'Obs', this.storeObs.getObs());
		this.sendInitMessage(
			socketId,
			'ObsControllerCommand',
			this.storeObsCommands.getObsController(),
		);
		this.sendInitMessage(socketId, 'ObsSceneSwitch', this.storeObsCommands.getObsSceneSwitch());
		this.sendInitMessage(socketId, 'PostGameStats', this.storeLiveStats.getGameStats());
		this.sendInitMessage(socketId, 'RecentGames', this.storeGames.getRecentGames());
		this.sendInitMessage(socketId, 'RecentRankedSets', this.storeGames.getRecentRankedSets());
		this.sendInitMessage(socketId, 'Url', this.storeSettings.getLocalUrl());
		this.sendInitMessage(socketId, 'SessionStats', this.storeSession.getSessionStats());
	}

	private sendAuthorizedMessage(socketId: string, clientKey: string) {
		const serverKey = this.storeSettings.getAuthorizationKey();
		const isAuthorized = !serverKey || clientKey === serverKey;
		console.log('Is Authorized', isAuthorized, clientKey, serverKey, socketId);
		this.sendInitMessage(socketId, 'Authorize', isAuthorized);
	}

	private sendAuthKey() {
		this.mainWindow.webContents.send(
			'message',
			JSON.stringify({
				['AuthorizationKey']: [this.storeSettings.getAuthorizationKey()],
			}),
		);
	}

	private initEventListeners() {
		this.clientEmitter.on('LayerPreviewChange', (layerIndex: number) => {
			this.sendMessage('LayerPreviewChange', layerIndex);
		});
		this.clientEmitter.on('InitData', (socketId: string) => {
			this.initData(socketId);
		});
		this.clientEmitter.on('InitAuthentication', (payload) => {
			this.sendAuthorizedMessage(payload[0], payload[1] ?? '');
		});
		this.clientEmitter.on('Notification', (message: string, type: NotificationType) => {
			this.sendMessage('Notification', message, type);
		});
	}
}
