import { BrowserWindow, IpcMain, dialog } from "electron";
import { ElectronLog } from "electron-log";
import EventEmitter from "events";
import { delay, inject, singleton } from "tsyringe";
import { ElectronJsonStore } from "./electronStore";
import fs from 'fs';
import { LiveStatsScene } from "../../frontend/src/lib/models/enum";


@singleton()
export class MessageHandler {
	app: any;
	eventEmitter: EventEmitter;
	ipcMain: IpcMain;
	mainWindow: BrowserWindow;
	rootDir: string;;
	server: any;
	store: ElectronJsonStore;
	webSocketServer: any;
	webSockets: WebSocket[];

	constructor(
		@inject("BrowserWindow") mainWindow: BrowserWindow,
		@inject("IpcMain") ipcMain: IpcMain,
		@inject("ElectronLog") log: ElectronLog,
		@inject("EventEmitter") eventEmitter: EventEmitter,
		@inject("RootDir") rootDir: string,
		@inject(delay(() => ElectronJsonStore)) store: ElectronJsonStore,
	) {
		log.info('Creating message handler..');
		const path = require('path');
		const express = require('express');
		const cors = require('cors');
		const http = require('http');
		const { WebSocketServer } = require('ws');
		this.rootDir = rootDir;

		this.app = express();
		this.app.use(express.static(path.join(this.rootDir + '/build')));
		this.app.use(cors());
		this.server = http.createServer(this.app);
		this.webSocketServer = new WebSocketServer({ port: 3100 });
		this.webSockets = [];
		this.store = store;


		console.log("rootDir", this.rootDir)

		this.mainWindow = mainWindow;
		this.ipcMain = ipcMain;
		this.eventEmitter = eventEmitter;

		this.initElectronMessageHandler();
		this.initHtml();
		this.initWebSocket();
		this.initEventHandlers();
	}

	initHtml() {
		try {
			this.app.get('/', (_: any, res: any) => {
				res.resolve(this.rootDir + '/build/index.html');
			});

			this.app.get('*', (req: any, res: any) => {
				const params = req.params[0]
					.split('/')
					.slice(1)
					.map((route: string, i: number) => `route${i + 1}=${route}`)
					.join('&');
				res.redirect(`/?${params}`);
			});

			this.server.listen(3200, (_: any) => {
				console.log('listening on *:3200');
			});
		} catch (err) {
			console.log(err);
		}
	}

	initElectronMessageHandler() {
		this.ipcMain.on('message', (_: any, data: any) => {
			let parse = JSON.parse(data);
			// console.log(parse);
			for (const [key, value] of Object.entries(parse)) {
				this.eventEmitter.emit(key, value);
			}
		});
		this.eventEmitter.on('init-data-electron', () => {
			this.initData();
		});
	}

	initWebSocket() {
		try {
			this.webSocketServer.on('connection', (socket: WebSocket) => {
				this.webSockets.push(socket);
				socket.addEventListener('message', (value: any) => {
					let parse = JSON.parse(value.data);
					// console.log(parse);
					for (const [key, value] of Object.entries(parse)) {
						this.eventEmitter.emit(key, value);
					}
				});
				socket.addEventListener('close', () => {
					this.webSockets = this.webSockets.filter((s: any) => s != socket);
				});
				this.initData(socket);
			});
		} catch (err) {
			console.log(err);
		}
	}

	async sendMessage(topic: string, payload: any) {
		await this.mainWindow.webContents.send(
			'message',
			JSON.stringify({
				[topic]: payload,
			}),
		);
		await this.webSockets.forEach((socket: any) => {
			socket.send(
				JSON.stringify({
					[topic]: payload,
				}),
			);
		});
	}

	sendInitMessage(socket: any, topic: string, payload: any) {
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
	initData(socket: WebSocket | undefined = undefined) {
		this.sendInitMessage(
			socket,
			'current_player',
			this.store.getCurrentPlayerRankStats(),
		);
		this.sendInitMessage(
			socket,
			'current_players',
			this.store.getCurrentPlayers(),
		);
		//this.sendInitMessage(socket, 'game_frame', this.store.getGameFrame());

		this.sendInitMessage(socket, 'game_frame', this.store.getGameFrame());
		this.sendInitMessage(socket, 'game_score', this.store.getGameScore());
		this.sendInitMessage(socket, 'game_settings', this.store.getGameSettings());
		this.sendInitMessage(socket, 'game_state', this.store.getGameState());
		this.sendInitMessage(socket, 'live_stats_scene', this.store.getStatsScene());
		this.sendInitMessage(socket, 'obs_custom', this.store.getCustom());
		this.sendInitMessage(socket, 'post_game_stats', this.store.getGameStats());
		this.sendInitMessage(socket, 'recent_set_matches', this.store.getRecentRankedSets());
		this.sendInitMessage(socket, 'recent_ranked_sets', this.store.getRecentRankedSets());
		this.sendInitMessage(socket, 'urls', this.store.getLocalUrl());
		this.sendInitMessage(socket, 'session_stats', this.store.getSessionStats());
	}

	private initEventHandlers() {
		this.eventEmitter.on('update-custom-overlay', async (overlay) => {
			this.store.updateCustomOverlay(overlay);
			this.sendMessage(
				'obs_custom_overlay',
				this.store.getCustomOverlayById(overlay.id),
			);
		});

		this.eventEmitter.on('delete-custom-overlay', async (overlayId) => {
			this.store.deleteCustomOverlay(overlayId);
		});

		this.eventEmitter.on('update-live-scene', async (value: LiveStatsScene) => {
			this.store.setStatsScene(value);
		});

		this.eventEmitter.on('download-overlay', async (overlayId) => {
			const overlay = this.store.getCustomOverlayById(overlayId);
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
			this.store.uploadCustomOverlay(JSON.parse(overlay));
		});
	}
}
