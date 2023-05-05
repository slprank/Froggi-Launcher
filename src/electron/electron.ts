const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const serve = require('electron-serve');
const path = require('path');
const log = require('electron-log');

const fs = require('fs');
try {
	const achievements = require('./utils/achievements.ts');
	const autoUpdater = require('./utils/autoUpdater.ts');
	const obs = require('./utils/obs.ts');
	const slippi = require('./utils/slippi.ts');
	const statsDisplay = require('./utils/statsDisplay.ts');
	const { Achievements } = require('./utils/achievements.ts');
	const { Api } = require('./utils/api.ts');
	const { ElectronStore } = require('./utils/electronStore.ts');
	const { EventEmitter } = require('events');
	const { MessageHandler } = require('./utils/messageHandler.ts');
	const { ObsWebSocket } = require('./utils/obs.ts');
	const { SlippiJs } = require('./utils/slippi.ts');
	const { StatsDisplay } = require('./utils/statsDisplay.ts');
	const { Test } = require('./utils/test.ts');
	const rootDir = `${__dirname}/../`;

	const os = require('os');

	const isMac = os.platform() === 'darwin';
	const isWindows = os.platform() === 'win32';
	const isLinux = os.platform() === 'linux';

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
	const port = process.env.PORT || 5173;
	const dev = !app.isPackaged;
	let mainWindow;

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
				preload: path.join(__dirname, '/preload.ts'),
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

	function loadVite(port) {
		mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
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
			const api = new Api(log);
			const electronStore = new ElectronStore(log);
			const messageHandler = new MessageHandler(
				rootDir,
				mainWindow,
				ipcMain,
				log,
				electronStore,
				eventEmitter,
			);
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

			const test = new Test(messageHandler, eventEmitter, log, electronStore, api);

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
				if (canceled) return;
				fs.writeFileSync(filePath, JSON.stringify(overlay), 'utf-8');
			});

			eventEmitter.on('upload-overlay', async () => {
				const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
					properties: ['openFile'],
					filters: [{ name: 'json', extensions: ['json'] }],
				});
				if (canceled) return;
				const overlay = await fs.readFileSync(filePaths[0], 'utf8', (err) => {
					console.log(err);
				});
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

	eventEmitter.on('test-message', (data) => {
		console.log(data);
	});
} catch (err) {
	log.error(err);
}
