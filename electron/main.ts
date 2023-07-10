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

import { Api } from './utils/api';
import { EventEmitter } from 'events';
import { MessageHandler } from './utils/messageHandler';
import { ObsWebSocket } from './utils/obs';
import { StatsDisplay } from './utils/statsDisplay';
import { SlippiJs } from './utils/slippi';
import { DolphinConnection, SlpParser, SlpStream } from '@slippi/slippi-js';

try {
	const isMac = os.platform() === 'darwin';
	const isWindows = os.platform() === 'win32';
	const isLinux = os.platform() === 'linux';

	log.info('mac:', isMac, 'win:', isWindows, 'linux', isLinux);

	const dolphinConnection = new DolphinConnection();
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
	const port = `${process.env.PORT || 5173}`;
	const dev = !app.isPackaged;

	let mainWindow: any;

	function createWindow() {
		let windowState = windowStateManager({
			defaultWidth: 800,
			defaultHeight: 600,
		});

		const mainWindow = new BrowserWindow({
			backgroundColor: 'whitesmoke',
			titleBarStyle: 'default',
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
			container.register<DolphinConnection>("DolphinConnection", { useValue: dolphinConnection });
			container.register<SlpParser>("SlpParser", { useValue: slpParser });
			container.register<SlpStream>("SlpStream", { useValue: slpStream });
			container.register<ElectronLog>("ElectronLog", { useValue: log });
			container.register<BrowserWindow>("BrowserWindow", { useValue: mainWindow });
			container.register<IpcMain>("IpcMain", { useValue: ipcMain });
			container.register<EventEmitter>("EventEmitter", { useValue: eventEmitter });
			container.register<string>("RootDir", { useValue: `${__dirname}/../..` });

			container.resolve(Api)
			container.resolve(MessageHandler)
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
