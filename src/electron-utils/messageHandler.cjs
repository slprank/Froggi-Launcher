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
			// https://socket.io/docs/v4/client-api/
			this.webSocketServer.on('connection', (socket) => {
				// send a message to the client
				socket.send(
					JSON.stringify({
						type: 'hello from server',
						content: [1, '2'],
					}),
				);

				// receive a message from the client
				socket.on('message', (data) => {
					const packet = JSON.parse(data);

					switch (packet.type) {
						case 'hello from client':
							// ...
							break;
					}
				});
			});
		} catch (err) {
			console.log(err);
		}
	}

	sendMessage(topic, payload) {
		this.mainWindow.webContents.send(topic, payload);
		this.server.emit('message', Math.random().toLocaleString()); // Might need to change
		console.log('Sending', topic, payload);
	}
}

module.exports = { MessageHandler };
