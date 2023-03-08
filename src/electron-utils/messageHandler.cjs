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
			// On connection send saved data from db
			this.webSocketServer.on('connection', (socket) => {
				this.webSockets.push(socket);
				socket.on('close', () => {
					this.webContents = this.webSockets.filter((s) => s != socket);
				});
				this.initData();
			});
		} catch (err) {
			console.log(err);
		}
	}

	initData() {
		this.sendMessage('initCurrentPlayerRankStats', this.store.getCurrentPlayerRankStats());
		this.sendMessage('initCurrentPlayersRankStats', this.store.getCurrentPlayersRankStats());
		this.sendMessage('initGameSettings', this.store.getGameSettings());
		this.sendMessage('initGameStats', this.store.getGameStats());
		this.sendMessage('initGameScore', this.store.getGameScore());
		this.sendMessage('initSessionStats', this.store.getSessionStats());
		this.sendMessage('initRecentRankedSets', this.store.getRecentRankedSets());
		this.sendMessage('initStatsScene', this.store.getStatsScene());
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
}

module.exports = { MessageHandler };
