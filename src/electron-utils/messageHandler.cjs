class MessageHandler {
	constructor(dir, mainWindow, log) {
		log.info('Creating message handler..');
		this.dir = dir;
		this.path = require('path');
		this.express = require('express');
		this.app = this.express();
		console.log(this.dir);
		this.app.use(this.express.static(this.path.join(this.dir + '/build')));
		this.cors = require('cors');
		this.app.use(this.cors());
		this.http = require('http');
		this.server = this.http.createServer(this.app);
		const { WebSocketServer } = require('ws');
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
			socket.send(JSON.stringify(`{${topic}: ${payload}}`));
		});
		console.log('Sending', topic, payload);
	}
}

module.exports = { MessageHandler };
