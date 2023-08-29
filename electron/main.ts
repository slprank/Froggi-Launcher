import 'reflect-metadata';
import { app, BrowserWindow, IpcMain, ipcMain } from 'electron';
import contextMenu from 'electron-context-menu';
import { container } from 'tsyringe'
import getAppDataPath from 'appdata-path';
import log, { ElectronLog } from 'electron-log';
import serve from 'electron-serve';
import windowStateManager from 'electron-window-state';
import path from 'path';
import os from 'os';

import { Api } from './services/api';
import { Discord } from './services/discord';
import { EventEmitter } from 'events';
import { MessageHandler } from './services/messageHandler';
import { ObsWebSocket } from './services/obs';
import { StatsDisplay } from './services/statsDisplay';
import { SlippiJs } from './services/slippi';
import { SlpParser, SlpStream } from '@slippi/slippi-js';
import { MemoryRead } from './services/memoryRead';

try {
	const isMac = os.platform() === 'darwin';
	const isWindows = os.platform() === 'win32';
	const isLinux = os.platform() === 'linux';

	log.info('mac:', isMac, 'win:', isWindows, 'linux', isLinux);

	const slpParser = new SlpParser();
	const slpStream = new SlpStream();
	const eventEmitter = new EventEmitter();

	setLoggingPath()

	try {
		require('electron-reloader')(module);
	} catch (e) {
		log.error(e);
	}
	const serveURL = serve({ directory: '.' });
	const dev = !app.isPackaged;
	const port = dev ? "5173" : `3200`;

	let mainWindow: any;

	function createWindow() {
		let windowState = windowStateManager({
			defaultWidth: 800,
			defaultHeight: 600,
		});

		const mainWindow = new BrowserWindow({
			backgroundColor: 'whitesmoke',
			titleBarStyle: 'default',
			minHeight: 600,
			minWidth: 800,
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
				label: 'Dev',
				click: () => {
					mainWindow.openDevTools()
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
			container.register<BrowserWindow>("BrowserWindow", { useValue: mainWindow });
			container.register<ElectronLog>("ElectronLog", { useValue: log });
			container.register<EventEmitter>("EventEmitter", { useValue: eventEmitter });
			container.register<IpcMain>("IpcMain", { useValue: ipcMain });
			container.register<SlpParser>("SlpParser", { useValue: slpParser });
			container.register<SlpStream>("SlpStream", { useValue: slpStream });

			container.register<string>("RootDir", { useValue: `${__dirname}/../..` });
			container.register<string>("Port", { useValue: port });
			container.register<boolean>("Dev", { useValue: dev });

			container.resolve(Api)
			container.resolve(Discord)
			container.resolve(MessageHandler)
			container.resolve(MemoryRead)
			container.resolve(SlippiJs)
			container.resolve(StatsDisplay)
			container.resolve(ObsWebSocket)
		});

		// Find a better solution to init autoUpdate
		mainWindow.webContents.once('focus', () => {
			if (dev) return;
			//autoUpdater.initAutoUpdater(mainWindow, eventEmitter, log);
		});
	}

	app.once('ready', createMainWindow);
	app.on('activate', () => {
		console.log("active")
		if (!mainWindow) {
			createMainWindow();
		}
	});
	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') app.quit();
	});

	function setLoggingPath() {
		try {
			const appDataPath = getAppDataPath("slp-rank-client");
			log.transports.file.resolvePath = () => path.join(`${appDataPath}/slpRankClient.log`);
		} catch (err) {
			log.error(err)
		}
	}
} catch (err) {
	log.error(err);
}
