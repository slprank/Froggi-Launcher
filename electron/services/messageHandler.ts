import { BrowserWindow, IpcMain } from 'electron';
import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronGamesStore } from './store/storeGames';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { ElectronSettingsStore } from './store/storeSettings';
import { ElectronObsStore } from './store/storeObs';
import { ElectronOverlayStore } from './store/storeOverlay';
import { WEBSOCKET_PORT } from '../../frontend/src/lib/models/const';
import { ElectronCurrentPlayerStore } from './store/storeCurrentPlayer';
import { ElectronPlayersStore } from './store/storePlayers';
import { ElectronSessionStore } from './store/storeSession';
import { ElectronDolphinStore } from './store/storeDolphin';
import path from 'path';
import { TypedEmitter } from '../../frontend/src/lib/utils/customEventEmitter';
import type { MessageEvents } from '../../frontend/src/lib/utils/customEventEmitter';

@singleton()
export class MessageHandler {
	private app: any;
	private express: any;
	private server: any;
	private webSocketServer: any;
	private webSockets: WebSocket[];

	constructor(
		@inject('Dev') private dev: boolean,
		@inject('BrowserWindow') private mainWindow: BrowserWindow,
		@inject('ElectronLog') private log: ElectronLog,
		@inject('LocalEmitter') private localEmitter: TypedEmitter,
		@inject('SvelteEmitter') private svelteEmitter: TypedEmitter,
		@inject('IpcMain') private ipcMain: IpcMain,
		@inject('Port') private port: string,
		@inject('RootDir') private rootDir: string,
		@inject(delay(() => ElectronDolphinStore)) private storeDolphin: ElectronDolphinStore,
		@inject(delay(() => ElectronGamesStore)) private storeGames: ElectronGamesStore,
		@inject(delay(() => ElectronLiveStatsStore)) private storeLiveStats: ElectronLiveStatsStore,
		@inject(delay(() => ElectronObsStore)) private storeObs: ElectronObsStore,
		@inject(delay(() => ElectronOverlayStore)) private storeOverlay: ElectronOverlayStore,
		@inject(delay(() => ElectronPlayersStore)) private storePlayers: ElectronPlayersStore,
		@inject(delay(() => ElectronCurrentPlayerStore)) private storeCurrentPlayer: ElectronCurrentPlayerStore,
		@inject(delay(() => ElectronSessionStore)) private storeSession: ElectronSessionStore,
		@inject(delay(() => ElectronSettingsStore)) private storeSettings: ElectronSettingsStore,
	) {
		this.log.info('Initializing Message Handler');
		this.express = require('express');
		const cors = require('cors');
		const http = require('http');
		const { WebSocketServer } = require('ws');

		this.app = this.express();

		this.app.use(cors());
		this.server = http.createServer(this.app);
		this.webSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT });
		this.webSockets = [];

		this.initElectronMessageHandler();
		if (!this.dev) this.initHtml();
		this.initWebSocket();
		this.initEventHandlers();
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
			for (const [key, value] of Object.entries(parse)) {
				console.log("command", key, value)
				this.svelteEmitter.emit(key as any, ...value as any);
			}
		});
		this.svelteEmitter.on("InitElectron", () => {
			this.initData();
		});
	}

	private initWebSocket() {
		try {
			this.webSocketServer.on('connection', (socket: WebSocket) => {
				this.log.info('New WebSocket Connection');
				this.webSockets.push(socket);
				this.receiveMessage(socket);
				this.initData(socket);
			});
		} catch (err) {
			this.log.error(err);
		}
	}

	private receiveMessage = (socket: any) => {
		socket.addEventListener('message', (value: any) => {
			let parse = JSON.parse(value.data);
			for (const [key, value] of Object.entries(parse)) {
				this.svelteEmitter.emit(key as any, ...value as any);
			}
		});
		socket.addEventListener('close', () => {
			this.log.info('Closed WebSocket Connection');
			socket.removeEventListener('message');
			this.webSockets = this.webSockets.filter((s: any) => s != socket);
		});
	};

	sendMessage<J extends keyof MessageEvents>(topic: J, ...payload: Parameters<MessageEvents[J]>) {
		this.mainWindow.webContents.send(
			'message',
			JSON.stringify({
				[topic]: payload,
			}),
		);
		this.webSockets.forEach((socket: any) => {
			socket.send(
				JSON.stringify({
					[topic]: payload,
				}),
			);
		});
		this.localEmitter.emit(topic, ...payload);
	}

	private sendInitMessage<J extends keyof MessageEvents>(socket: any, topic: J, ...payload: Parameters<MessageEvents[J]>) {
		if (!socket) {
			this.sendMessage(topic, ...payload);
			return;
		}
		socket.send(
			JSON.stringify({
				[topic]: [...payload],
			}),
		);
	}

	private initData(socket: WebSocket | undefined = undefined) {
		this.sendInitMessage(socket, "CurrentPlayer", this.storeCurrentPlayer.getCurrentPlayer());
		this.sendInitMessage(socket, "CurrentPlayers", this.storePlayers.getCurrentPlayers());
		this.sendInitMessage(
			socket,
			"DolphinConnectionState",
			this.storeDolphin.getDolphinConnectionState(),
		);
		this.sendInitMessage(socket, "GameScore", this.storeGames.getGameScore());
		this.sendInitMessage(socket, "GameSettings", this.storeLiveStats.getGameSettings());
		this.sendInitMessage(socket, "GameState", this.storeLiveStats.getGameState());
		this.sendInitMessage(socket, "LiveStatsSceneChange", this.storeLiveStats.getStatsScene());
		this.sendInitMessage(socket, "Overlays", this.storeOverlay.getOverlays());
		this.sendInitMessage(socket, "Obs", this.storeObs.getObs());
		this.sendInitMessage(socket, "PostGameStats", this.storeLiveStats.getGameStats());
		this.sendInitMessage(socket, "RecentGames", this.storeGames.getRecentGames());
		this.sendInitMessage(socket, "RecentRankedSets", this.storeGames.getRecentRankedSets());
		this.sendInitMessage(socket, "Url", this.storeSettings.getLocalUrl());
		this.sendInitMessage(socket, "SessionStats", this.storeSession.getSessionStats());
	}

	private initEventHandlers() {
		this.svelteEmitter.on('LayerPreviewChange', (layerIndex: number) => {
			this.sendMessage('LayerPreviewChange', layerIndex);
		});
	}

}
