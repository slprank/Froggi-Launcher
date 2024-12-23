import 'reflect-metadata';
import { app, BrowserWindow, IpcMain, ipcMain, Menu, nativeImage, Tray, Notification } from 'electron';
import contextMenu from 'electron-context-menu';
import { container } from 'tsyringe';
import getAppDataPath from 'appdata-path';
import log from 'electron-log';
import type { ElectronLog } from 'electron-log';
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
import { FileUpload } from './services/fileUpload';
import { BACKEND_PORT, VITE_PORT } from '../frontend/src/lib/models/const';

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
	mainLog.info('Starting app');
	const isMac = os.platform() === 'darwin';
	const isWindows = os.platform() === 'win32';
	const isLinux = os.platform() === 'linux';
	mainLog.info('mac:', isMac, 'win:', isWindows, 'linux', isLinux);

	const store = new Store(migrateStore(log));

	const slpParser = new SlpParser();
	const slpStream = new SlpStream();
	const localEmitter = new TypedEmitter();
	const clientEmitter = new TypedEmitter();

	const serveURL = serve({ directory: '.' });
	const dev = !app.isPackaged;
	const port = dev ? `${VITE_PORT}` : `${BACKEND_PORT}`;

	let mainWindow: BrowserWindow | any;
	let tray: Tray;
	let notification: Notification;

	function createWindow(): BrowserWindow {
		log.info('Creating window');
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
				devTools: true, // dev,
				nodeIntegration: true,
				preload: path.join(__dirname.replace(`\\`, '/'), '/preload.js'),
				spellcheck: false,
			},
			x: windowState.x,
			y: windowState.y,
			width: windowState.width,
			height: windowState.height,
		});

		const menu = Menu.buildFromTemplate(createMenu());
		Menu.setApplicationMenu(menu);

		windowState.manage(mainWindow);

		mainWindow.once('ready-to-show', () => {
			mainWindow.show();
			mainWindow.focus();
		});

		mainWindow.on('close', () => {
			windowState.saveState(mainWindow);

			notification.show();
		});

		return mainWindow;
	}

	function createMenu(): Electron.MenuItemConstructorOptions[] {
		return [
			{
				label: 'Froggi',
				submenu: [
					{
						label: 'Quit',
						accelerator: 'CmdOrCtrl+Q',
						click: () => {
							app.quit();
						},
					},
				],
			},
		];
	}

	function createTray(): Tray {
		const imagePath = path.join(__dirname, '../../build/icon.png');
		const image = nativeImage.createFromPath(imagePath);
		tray = new Tray(image.resize({ width: 16, height: 16 }));
		if (isMac) app.dock.setIcon(image);
		tray.setToolTip('Froggi');

		const contextMenu = Menu.buildFromTemplate([
			{
				label: 'Show',
				click: () => {
					mainWindow.show();
				},
			},
			{
				label: 'Reload Window',
				click: () => {
					mainWindow.reload();
				},
			},
			{
				type: 'separator',
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

	function createNotification(): Notification {
		return new Notification({
			title: "App running",
			body: 'The window has been closed, but the app is still running in the background.',
			urgency: "low",
			silent: true,
			actions: [
				{
					type: "button",
					text: "Quit App"
				},
			]
		});
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
		mainWindow.loadURL(`http://localhost:${port}`).catch((e: any) => {
			mainLog.error('Error loading URL, retrying', e);
			setTimeout(() => {
				loadVite(port);
			}, 200);
		});
	}

	function createMainWindow() {
		mainWindow = createWindow();
		notification = createNotification();
		createTray();

		notification.addListener("click", () => {
			mainWindow.show();
		});

		notification.addListener("close", () => {
			mainWindow.hide();
		})

		notification.addListener("action", (_, index) => {
			if (index === 0) {
				app.exit();
			}
		});


		if (dev) loadVite(port);
		if (!dev) serveURL(mainWindow);

		mainWindow.webContents.once('dom-ready', async () => {
			container.register<Electron.App>('App', { useValue: app });
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
			container.register<string>('AppDir', {
				useValue: dev ? getAppDataPath('Electron') : getAppDataPath('froggi'),
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
			container.resolve(FileUpload);
		});

		mainWindow.on('close', (event: Event) => {
			event.preventDefault();
			if (isWindows) mainWindow.minimize();
			else app.hide();
		});
	}

	app.once('ready', createMainWindow);

	app.on('activate', () => {
		mainWindow.show();
	});

	app.on('before-quit', () => {
		app.quit();
	});

	process.on('uncaughtException', (error) => {
		mainLog.error('Uncaught Exception:', error);

		app.exit();
	});
} catch (err) {
	mainLog.error(err);
}
