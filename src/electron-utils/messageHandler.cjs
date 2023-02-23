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
		this.socketIO = require('socket.io')(this.http, {});

		this.mainWindow = mainWindow;
	}
	initWebSocket() {
		try {
			// Not tested
			this.socketIO.on('connection', (socket) => {
				console.log(`⚡: ${socket.id} user just connected!`);
				socket.on('disconnect', () => {
					console.log('🔥: A user disconnected');
				});
			});

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

	sendMessage(topic, payload) {
		this.mainWindow.webContents.send(topic, payload);
		console.log('Sending', topic, payload);
	}
}

module.exports = { MessageHandler };
