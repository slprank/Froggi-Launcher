class MessageHandler {
	constructor(dir, mainWindow, log) {
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

		this.mainWindow = mainWindow;
	}

	initHtml() {
		try {
			this.app.get('/', (req, res) => {
				res.sendFile(this.dir + '/index.html');
			});

			this.server.listen(3200, () => {
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
			});
		} catch (err) {
			console.log(err);
		}
	}

	sendMessage(topic, payload) {
		this.mainWindow.webContents.send(topic, payload);
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
