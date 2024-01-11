import 'reflect-metadata';
import { app, BrowserWindow, IpcMain, ipcMain, Menu, nativeImage, Tray } from 'electron';
import contextMenu from 'electron-context-menu';
import { container } from 'tsyringe';
import getAppDataPath from 'appdata-path';
import log, { ElectronLog } from 'electron-log';
import serve from 'electron-serve';
import windowStateManager from 'electron-window-state';
import path from 'path';
import os from 'os';
import { TypedEmitter } from '../frontend/src/lib/utils/customEventEmitter';

import { AutoUpdater } from './services/autoUpdater';
import { MessageHandler } from './services/messageHandler';
import { ObsWebSocket } from './services/obs';
import { StatsDisplay } from './services/statsDisplay';
import { SlippiJs } from './services/slippi';
import { SlpParser, SlpStream } from '@slippi/slippi-js';
import { DiscordRpc } from './services/discord';
import { migrateStore } from './services/store/migration';
import Store from 'electron-store';
import { ElectronCommandStore } from './services/store/storeCommands';

const mainLog: ElectronLog = setLoggingPath(log);

function setLoggingPath(log: ElectronLog): ElectronLog {
	try {
		const appDataPath = getAppDataPath('froggi');
		log.transports.file.resolvePath = () => path.join(`${appDataPath}/froggi.log`);
	} catch (err) {
		log.error(err);
	}
	return log;
}

try {
	const isMac = os.platform() === 'darwin';
	const isWindows = os.platform() === 'win32';
	const isLinux = os.platform() === 'linux';

	const store = new Store(migrateStore(log));

	mainLog.info('mac:', isMac, 'win:', isWindows, 'linux', isLinux);

	const slpParser = new SlpParser();
	const slpStream = new SlpStream();
	const localEmitter = new TypedEmitter();
	const clientEmitter = new TypedEmitter();

	const serveURL = serve({ directory: '.' });
	const dev = !app.isPackaged;
	const port = dev ? '5173' : `3200`;

	let mainWindow: BrowserWindow | any;
	let tray: Tray;

	app.disableHardwareAcceleration();

	function createWindow(): BrowserWindow {
		log.info("Creating window")
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
				devTools: dev,
				nodeIntegration: true,
				preload: path.join(__dirname.replace(`\\`, '/'), '/preload.js'),
				spellcheck: false,
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

	function createTray(): Tray {
		const imagePath = path.join(__dirname, '../../build/icon.png');
		const image = nativeImage.createFromPath(imagePath);
		tray = new Tray(image.resize({ width: 16, height: 16 }));
		if (isMac) app.dock.setIcon(image);
		tray.setToolTip('Froggi');

		const contextMenu = Menu.buildFromTemplate([
			{
				label: 'Open',
				click: () => {
					mainWindow.show();
				},
			},
			{
				label: 'Quit',
				click: () => {
					app.exit();
				},
			},
		]);

		tray.setContextMenu(contextMenu);
		return tray;
	}

	contextMenu({
		showLookUpSelection: false,
		showSearchWithGoogle: false,
		showCopyImage: false,
		prepend: (defaultActions, params, browserWindow) => [
			{
				label: 'Dev',
				click: () => {
					mainWindow.openDevTools();
					console.log(defaultActions, params, browserWindow);
				},
			},
		],
	});

	function loadVite(port: string) {
		mainWindow.loadURL(`http://127.0.0.1:${port}`).catch((e: any) => {
			mainLog.error('Error loading URL, retrying', e);
			setTimeout(() => {
				loadVite(port);
			}, 200);
		});

	}

	function createMainWindow() {
		mainWindow = createWindow();
		createTray();

		if (dev) loadVite(port);
		if (!dev) serveURL(mainWindow);

		mainWindow.webContents.once('dom-ready', async () => {
			container.register<BrowserWindow>('BrowserWindow', { useValue: mainWindow });
			container.register<TypedEmitter>('LocalEmitter', { useValue: localEmitter });
			container.register<TypedEmitter>('ClientEmitter', { useValue: clientEmitter });
			container.register<ElectronLog>('ElectronLog', { useValue: mainLog });
			container.register<IpcMain>('IpcMain', { useValue: ipcMain });
			container.register<SlpParser>('SlpParser', { useValue: slpParser });
			container.register<SlpStream>('SlpStream', { useValue: slpStream });
			container.register<Store>('ElectronStore', { useValue: store });
			container.register<string>('RootDir', {
				useValue: `${__dirname}/../..`.replaceAll('\\', '/'),
			});
			container.register<string>('Port', { useValue: port });
			container.register<boolean>('Dev', { useValue: dev });

			container.resolve(ElectronCommandStore);

			container.resolve(DiscordRpc);
			container.resolve(MessageHandler);
			container.resolve(StatsDisplay);
			container.resolve(ObsWebSocket);
			container.resolve(SlippiJs);
			container.resolve(AutoUpdater);
		});

		mainWindow.on('close', (event: Event) => {
			event.preventDefault();
			if (isWindows) mainWindow.hide();
			else app.hide();
		});
	}

	app.once('ready', createMainWindow);

	app.on('activate', () => {
		mainWindow.show();
	});

	process.on('uncaughtException', (error) => {
		mainLog.error('Uncaught Exception:', error);

		app.exit();
	});

} catch (err) {
	mainLog.error(err);
}
