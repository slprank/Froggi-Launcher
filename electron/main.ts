import windowStateManager from 'electron-window-state';
import contextMenu from 'electron-context-menu';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import log from 'electron-log';

/*
import { Achievements } from './utils/achievements';
import { Api } from './utils/api';
*/
import { ElectronStore } from './utils/electronStore';
import { MessageHandler } from './utils/messageHandler';
/*
import { ObsWebSocket } from './utils/obs';
import { SlippiJs } from './utils/slippi';
import { StatsDisplay } from './utils/statsDisplay';
*/
import { EventEmitter } from 'events';

import os = require('os');

import fs from 'fs';
try {
	const rootDir = `${__dirname}/../`;

	const isMac = os.platform() === 'darwin';
	const isWindows = os.platform() === 'win32';
	const isLinux = os.platform() === 'linux';

	log.info('mac:', isMac, 'win:', isWindows, 'linux', isLinux);

	const eventEmitter = new EventEmitter();

	if (isWindows) {
		if (!fs.existsSync(path.join(`C:/slpRank-client-logs`)))
			fs.mkdirSync(path.join(`C:/slpRank-client-logs`), { recursive: true });

		log.transports.file.resolvePath = () => path.join(`C:/slpRank-client-logs/main.logs`);
	}

	try {
		require('electron-reloader')(module);
	} catch (e) {
		log.error(e);
	}
	const serveURL = serve({ directory: '.' });
	const port = `${process.env.PORT || 5173}`;
	const dev = !app.isPackaged;

	console.log('no');
	console.log('no');

	let mainWindow: any;

	function createWindow() {
		let windowState = windowStateManager({
			defaultWidth: 800,
			defaultHeight: 600,
		});

		const mainWindow = new BrowserWindow({
			backgroundColor: 'whitesmoke',
			titleBarStyle: 'hidden',
			autoHideMenuBar: true,
			trafficLightPosition: {
				x: 20,
				y: 20,
			},
			minHeight: 540,
			minWidth: 960,
			webPreferences: {
				contextIsolation: true,
				nodeIntegration: true,
				spellcheck: false,
				devTools: dev,
				preload: path.join(__dirname, '/preload.js'),
			},
			x: windowState.x,
			y: windowState.y,
			width: windowState.width,
			height: windowState.height,
		});

		windowState.manage(mainWindow);

		mainWindow.once('ready-to-show', () => {
			mainWindow.show();
			mainWindow.focus();
		});

		mainWindow.on('close', () => {
			windowState.saveState(mainWindow);
		});

		return mainWindow;
	}

	contextMenu({
		showLookUpSelection: false,
		showSearchWithGoogle: false,
		showCopyImage: false,
		prepend: (defaultActions, params, browserWindow) => [
			{
				label: 'Run function',
				click: () => {
					mainWindow.webContents.send('reset-score');
					log.info('Right click: 1');
					console.log(defaultActions, params, browserWindow);
				},
			},
			{
				label: 'Run function 2',
				click: () => {
					mainWindow.webContents.send('reset-score');
					log.info('Right click: 2');
				},
			},
		],
	});

	function loadVite(port: string) {
		mainWindow.loadURL(`http://localhost:${port}`).catch((e: any) => {
			log.error('Error loading URL, retrying', e);
			setTimeout(() => {
				loadVite(port);
			}, 200);
		});
	}

	function createMainWindow() {
		mainWindow = createWindow();
		mainWindow.once('close', () => {
			mainWindow = null;
		});

		if (dev) loadVite(port);
		if (!dev) serveURL(mainWindow);

		mainWindow.webContents.once('dom-ready', async () => {
			//const api = new Api(log);
			const electronStore = new ElectronStore(log);
			const messageHandler = new MessageHandler(
				rootDir,
				mainWindow,
				ipcMain,
				log,
				electronStore,
				eventEmitter,
			);
			/*
			const slippiJs = new SlippiJs(messageHandler, ipcMain, log, electronStore);
			const statsDisplay = new StatsDisplay(
				messageHandler,
				eventEmitter,
				log,
				slippiJs.slpStream,
				slippiJs.parser,
				electronStore,
				api,
			);

			const obsWebSocket = new ObsWebSocket(messageHandler, eventEmitter, log);
			const achievements = new Achievements(messageHandler, eventEmitter, log);
			*/

			// TODO: Move this:
			eventEmitter.on('update-custom-overlay', async (overlay) => {
				electronStore.updateCustomOverlay(overlay);
				messageHandler.sendMessage(
					'obs_custom_overlay',
					electronStore.getCustomOverlayById(overlay.id),
				);
			});

			eventEmitter.on('delete-custom-overlay', async (overlayId) => {
				electronStore.deleteCustomOverlay(overlayId);
				messageHandler.sendMessage('obs_custom', electronStore.getCustom());
			});

			eventEmitter.on('update-live-scene', async (value) => {
				electronStore.setStatsScene(value);
				messageHandler.sendMessage('live_stats_scene', electronStore.getStatsScene());
			});

			eventEmitter.on('download-overlay', async (overlayId) => {
				const overlay = electronStore.getCustomOverlayById(overlayId);
				if (!overlay) return;
				const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
					filters: [{ name: 'json', extensions: ['json'] }],
					nameFieldLabel: overlay.title,
				});
				if (canceled || !filePath) return;
				fs.writeFileSync(filePath, JSON.stringify(overlay), 'utf-8');
			});

			eventEmitter.on('upload-overlay', async () => {
				const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
					properties: ['openFile'],
					filters: [{ name: 'json', extensions: ['json'] }],
				});
				if (canceled) return;
				const overlay = await fs.readFileSync(filePaths[0], 'utf8');
				electronStore.uploadCustomOverlay(JSON.parse(overlay));
				messageHandler.sendMessage('obs_custom', electronStore.getCustom());
			});
			// TODO: To this

			messageHandler.initHtml();
			messageHandler.initWebSocket();
		});

		// Find a better solution to init autoUpdate
		mainWindow.webContents.once('focus', () => {
			if (dev) return;
			//autoUpdater.initAutoUpdater(mainWindow, eventEmitter, log);
		});
	}

	app.once('ready', createMainWindow);
	app.on('activate', () => {
		if (!mainWindow) {
			createMainWindow();
		}
	});
	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});

	eventEmitter.on('test-message', (data: any) => {
		console.log(data);
	});
} catch (err) {
	log.error(err);
}
