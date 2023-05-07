export class MessageHandler {
	app: any;
	rootDir: string;
	server: any;
	webSocketServer: any;
	webSockets: any;
	store: any;
	mainWindow: any;
	ipcMain: any;
	eventEmitter: any;

	constructor(
		rootDir: any,
		mainWindow: any,
		ipcMain: any,
		log: any,
		store: any,
		eventEmitter: any,
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

		this.mainWindow = mainWindow;
		this.ipcMain = ipcMain;
		this.eventEmitter = eventEmitter;

		this.initElectronMessageHandler();
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
			console.log(parse);
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
			this.webSocketServer.on('connection', (socket: any) => {
				this.webSockets.push(socket);
				socket.addEventListener('message', (value: any) => {
					let parse = JSON.parse(value.data);
					console.log(parse);
					for (const [key, value] of Object.entries(parse)) {
						this.eventEmitter.emit(key, value);
					}
				});
				socket.on('close', () => {
					this.webSockets = this.webSockets.filter((s: any) => s != socket);
				});
				this.initData(socket);
			});
		} catch (err) {
			console.log(err);
		}
	}

	sendMessage(topic: string, payload: any) {
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
	initData(socket = undefined) {
		this.sendInitMessage(socket, 'urls', this.store.getLocalUrl());
		this.sendInitMessage(
			socket,
			'currentPlayer_rank_stats',
			this.store.getCurrentPlayerRankStats(),
		);
		this.sendInitMessage(
			socket,
			'currentPlayers_rank_stats',
			this.store.getCurrentPlayersRankStats(),
		);
		this.sendInitMessage(socket, 'game_settings', this.store.getGameSettings());
		this.sendInitMessage(socket, 'game_stats', this.store.getGameStats());
		this.sendInitMessage(socket, 'game_score', this.store.getGameScore());
		this.sendInitMessage(socket, 'session_stats', this.store.getSessionStats());
		this.sendInitMessage(socket, 'recent_ranked_sets', this.store.getRecentRankedSets());
		this.sendInitMessage(
			socket,
			'dolphin_connection_status',
			this.store.getDolphinConnectionStatus(),
		);
		this.sendInitMessage(socket, 'obs_custom', this.store.getCustom());
		this.sendInitMessage(socket, 'live_stats_scene', this.store.getStatsScene());
	}
}
