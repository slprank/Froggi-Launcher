class MessageHandler {
	constructor(dir, mainWindow, log, store) {
		log.info('Creating message handler..');
		const path = require('path');
		const express = require('express');
		const cors = require('cors');
		const http = require('http');
		const { WebSocketServer } = require('ws');

		this.dir = dir;
		this.app = express();
		this.app.use(express.static(path.join(this.dir + '/build')));
		this.app.use(cors());
		this.server = http.createServer(this.app);
		this.webSocketServer = new WebSocketServer({ port: 3100 });
		this.webSockets = [];
		this.store = store;

		this.mainWindow = mainWindow;
	}

	initHtml() {
		try {
			this.app.get('/', (req, res) => {
				res.resolve(this.dir + '/index.html');
			});

			this.app.get('*', (req, res) => {
				const params = req.params[0]
					.split('/')
					.slice(1)
					.map((route, i) => `route${i + 1}=${route}`)
					.join('&');
				res.redirect(`/?${params}`);
			});

			this.server.listen(3200, (err) => {
				console.log('listening on *:3200');
			});
		} catch (err) {
			console.log(err);
		}
	}

	initWebSocket() {
		try {
			this.webSocketServer.on('connection', (socket) => {
				this.webSockets.push(socket);
				socket.on('close', () => {
					this.webContents = this.webSockets.filter((s) => s != socket);
				});
				this.initData(socket);
			});
		} catch (err) {
			console.log(err);
		}
	}

	sendMessage(topic, payload) {
		this.mainWindow.webContents.send(
			'message',
			JSON.stringify({
				[topic]: payload,
			}),
		);
		this.webSockets.forEach((socket) => {
			socket.send(
				JSON.stringify({
					[topic]: payload,
				}),
			);
		});
	}

	sendInitMessage(socket, topic, payload) {
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

	initData(socket) {
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
		this.sendInitMessage(socket, 'live_stats_scene', this.store.getStatsScene());
	}
}

module.exports = { MessageHandler };
