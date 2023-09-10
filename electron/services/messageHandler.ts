import { BrowserWindow, IpcMain, dialog } from "electron";
import { ElectronLog } from "electron-log";
import EventEmitter from "events";
import { delay, inject, singleton } from "tsyringe";
import { ElectronGamesStore } from "./store/storeGames";
import { ElectronLiveStatsStore } from "./store/storeLiveStats";
import { ElectronSettingsStore } from "./store/storeSettings";
import { ElectronObsStore } from "./store/storeObs";
import fs from 'fs';
import { LiveStatsScene } from "../../frontend/src/lib/models/enum";
import { WEBSOCKET_PORT } from '../../frontend/src/lib/models/const';
import { ElectronCurrentPlayerStore } from "./store/storeCurrentPlayer";
import { ElectronPlayersStore } from "./store/storePlayers";
import { ElectronSessionStore } from "./store/storeSession";
import { ElectronDolphinStore } from "./store/storeDolphin";


@singleton()
export class MessageHandler {
	app: any;
	server: any;
	webSocketServer: any;
	webSockets: WebSocket[];

	constructor(
		@inject("Dev") private dev: boolean,
		@inject("BrowserWindow") private mainWindow: BrowserWindow,
		@inject("ElectronLog") private log: ElectronLog,
		@inject("EventEmitter") private eventEmitter: EventEmitter,
		@inject("IpcMain") private ipcMain: IpcMain,
		@inject("Port") private port: string,
		@inject("RootDir") private rootDir: string,
		@inject(delay(() => ElectronDolphinStore)) private storeDolphin: ElectronDolphinStore,
		@inject(delay(() => ElectronGamesStore)) private storeGames: ElectronGamesStore,
		@inject(delay(() => ElectronLiveStatsStore)) private storeLiveStats: ElectronLiveStatsStore,
		@inject(delay(() => ElectronObsStore)) private storeObs: ElectronObsStore,
		@inject(delay(() => ElectronPlayersStore)) private storePlayers: ElectronPlayersStore,
		@inject(delay(() => ElectronCurrentPlayerStore)) private storeCurrentPlayer: ElectronCurrentPlayerStore,
		@inject(delay(() => ElectronSessionStore)) private storeSession: ElectronSessionStore,
		@inject(delay(() => ElectronSettingsStore)) private storeSettings: ElectronSettingsStore,

	) {
		this.log.info('Initializing Message Handler');
		const path = require('path');
		const express = require('express');
		const cors = require('cors');
		const http = require('http');
		const { WebSocketServer } = require('ws');

		this.app = express();
		this.app.use(express.static(path.join(this.rootDir + '/build')));
		this.app.use(cors());
		this.server = http.createServer(this.app);
		this.webSocketServer = new WebSocketServer({ port: WEBSOCKET_PORT });
		this.webSockets = [];

		this.initElectronMessageHandler();
		if (!this.dev) this.initHtml();
		this.initWebSocket();
		this.initEventHandlers()
		this.initGlobalEventListeners();
	}

	initHtml() {
		this.log.info("Initializing HTML")
		try {
			this.app.get('*', (_: any, res: any) => {
				res.resolve(this.rootDir + '/build/index.html');
			});

			this.server.listen(this.port, (_: any) => {
				console.log(`listening on *:${this.port}`);
			});
		} catch (err) {
			console.log(err);
		}
	}

	private initElectronMessageHandler() {
		this.ipcMain.on('message', (_: any, data: any) => {
			let parse = JSON.parse(data); for (const [key, value] of Object.entries(parse)) {
				this.eventEmitter.emit(key, value);
			}
		});
		this.eventEmitter.on('init-data-electron', () => {
			this.initData();
		});
	}

	private initWebSocket() {
		try {
			this.webSocketServer.on('connection', (socket: WebSocket) => {
				this.log.info("New WebSocket Connection")
				this.webSockets.push(socket);
				this.receiveMessage(socket)
				this.initData(socket);
			});
		} catch (err) {
			console.log(err);
		}
	}

	receiveMessage = (socket: any) => {
		socket.addEventListener('message', (value: any) => {
			let parse = JSON.parse(value.data);
			for (const [key, value] of Object.entries(parse)) {
				this.eventEmitter.emit(key, value);
			}
		});
		socket.addEventListener('close', () => {
			this.log.info("Closed WebSocket Connection")
			socket.removeEventListener("message")
			this.webSockets = this.webSockets.filter((s: any) => s != socket);
		});
	}

	async sendMessage(topic: string, payload: any) {
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
		this.eventEmitter.emit(topic, payload)
	}

	private sendInitMessage(socket: any, topic: string, payload: any) {
		if (!socket) {
			this.sendMessage(topic, payload);
			return;
		}
		socket.send(
			JSON.stringify({
				[topic]: payload,
			}),
		);
	}

	// Any data sent to frontend should be saved and initialized
	// Leaderboard data should be stored as well
	private initData(socket: WebSocket | undefined = undefined) {
		this.sendInitMessage(
			socket,
			'current_player',
			this.storeCurrentPlayer.getCurrentPlayer(),
		);
		this.sendInitMessage(
			socket,
			'current_players',
			this.storePlayers.getCurrentPlayers(),
		);
		this.sendInitMessage(socket, 'dolphin_connection_state', this.storeDolphin.getDolphinConnectionState());
		this.sendInitMessage(socket, 'game_frame', this.storeLiveStats.getGameFrame());
		this.sendInitMessage(socket, 'game_score', this.storeGames.getGameScore());
		this.sendInitMessage(socket, 'game_settings', this.storeLiveStats.getGameSettings());
		this.sendInitMessage(socket, 'game_state', this.storeLiveStats.getGameState());
		this.sendInitMessage(socket, 'live_stats_scene', this.storeLiveStats.getStatsScene());
		this.sendInitMessage(socket, 'obs_custom', this.storeObs.getCustom());
		this.sendInitMessage(socket, 'post_game_stats', this.storeLiveStats.getGameStats());
		this.sendInitMessage(socket, 'recent_set_matches', this.storeGames.getRecentRankedSets());
		this.sendInitMessage(socket, 'recent_ranked_sets', this.storeGames.getRecentRankedSets());
		this.sendInitMessage(socket, 'urls', this.storeSettings.getLocalUrl());
		this.sendInitMessage(socket, 'session_stats', this.storeSession.getSessionStats());
	}

	private initEventHandlers() {
		this.eventEmitter.on('update-custom-overlay', async (overlay) => {
			this.storeObs.updateCustomOverlay(overlay);
			this.sendMessage(
				'obs_custom_overlay',
				this.storeObs.getCustomOverlayById(overlay.id),
			);
		});

		this.eventEmitter.on('delete-custom-overlay', async (overlayId) => {
			this.storeObs.deleteCustomOverlay(overlayId);
		});

		this.eventEmitter.on('update-live-scene', async (value: LiveStatsScene) => {
			this.storeLiveStats.setStatsScene(value);
		});

		this.eventEmitter.on('download-overlay', async (overlayId) => {
			const overlay = this.storeObs.getCustomOverlayById(overlayId);
			if (!overlay) return;
			const { canceled, filePath } = await dialog.showSaveDialog(this.mainWindow, {
				filters: [{ name: 'json', extensions: ['json'] }],
				nameFieldLabel: overlay.title,
			});
			if (canceled || !filePath) return;
			fs.writeFileSync(filePath, JSON.stringify(overlay), 'utf-8');
		});

		this.eventEmitter.on('upload-overlay', async () => {
			const { canceled, filePaths } = await dialog.showOpenDialog(this.mainWindow, {
				properties: ['openFile'],
				filters: [{ name: 'json', extensions: ['json'] }],
			});
			if (canceled) return;
			const overlay = fs.readFileSync(filePaths[0], 'utf8');
			this.storeObs.uploadCustomOverlay(JSON.parse(overlay));
		});
	}

	private initGlobalEventListeners() {
		this.eventEmitter.on('edit_layer_preview', async (layerIndex: number) => {
			this.sendMessage("edit_layer_preview", layerIndex)
		});
	}
}
