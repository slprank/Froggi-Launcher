const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const serve = require('electron-serve');
const path = require('path');
const log = require('electron-log');

const fs = require('fs');
try {
	const achievements = require('./electron-utils/achievements.cjs');
	const autoUpdater = require('./electron-utils/autoUpdater.cjs');
	const obs = require('./electron-utils/obs.cjs');
	const slippi = require('./electron-utils/slippi.cjs');
	const statsDisplay = require('./electron-utils/statsDisplay.cjs');
	const { Achievements } = require('./electron-utils/achievements.cjs');
	const { Api } = require('./electron-utils/api.cjs');
	const { MessageHandler } = require('./electron-utils/messageHandler.cjs');
	const { ObsWebSocket } = require('./electron-utils/obs.cjs');
	const { StatsDisplay } = require('./electron-utils/statsDisplay.cjs');
	const { SlippiJs } = require('./electron-utils/slippi.cjs');
	const { ElectronStore } = require('./electron-utils/electronStore.cjs');
	const rootDir = `${__dirname}/../`;

	const os = require('os');

	const isMac = os.platform() === 'darwin';
	const isWindows = os.platform() === 'win32';
	const isLinux = os.platform() === 'linux';

	let io;

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
			minHeight: 450,
			minWidth: 500,
			webPreferences: {
				enableRemoteModule: true,
				contextIsolation: true,
				nodeIntegration: true,
				spellcheck: false,
				devTools: true,
				preload: path.join(__dirname, 'preload.cjs'),
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

		mainWindow.webContents.once('dom-ready', () => {
			const api = new Api(log);
			const electronStore = new ElectronStore(log);
			const messageHandler = new MessageHandler(rootDir, mainWindow, log, electronStore);
			const slippiJs = new SlippiJs(messageHandler, ipcMain, log, electronStore);
			const statsDisplay = new StatsDisplay(
				messageHandler,
				ipcMain,
				log,
				slippiJs.slpStream,
				slippiJs.parser,
				electronStore,
				api,
			);
			const obsWebSocket = new ObsWebSocket(messageHandler, ipcMain, log);
			const achievements = new Achievements(messageHandler, ipcMain, log);

			messageHandler.initHtml();
			messageHandler.initWebSocket();
		});

		// Find a better solution to init autoUpdate
		mainWindow.webContents.once('focus', () => {
			if (dev) return;
			autoUpdater.initAutoUpdater(mainWindow, ipcMain, log);
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

	ipcMain.on('to-main', (event, count) => {
		return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
	});
} catch (err) {
	log.error(err);
}
