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

import { AutoUpdater } from './services/autoUpdater';
import { EventEmitter } from 'events';
import { MessageHandler } from './services/messageHandler';
import { ObsWebSocket } from './services/obs';
import { StatsDisplay } from './services/statsDisplay';
import { SlippiJs } from './services/slippi';
import { SlpParser, SlpStream } from '@slippi/slippi-js';
import { DiscordRpc } from './services/discord';
import Store from 'electron-store';

const isMac = os.platform() === 'darwin';
const isWindows = os.platform() === 'win32';
const isLinux = os.platform() === 'linux';

const store = new Store()

log.info('mac:', isMac, 'win:', isWindows, 'linux', isLinux);

const slpParser = new SlpParser();
const slpStream = new SlpStream();
const eventEmitter = new EventEmitter();

setLoggingPath();

try {
	require('electron-reloader')(module);
} catch (e) {
	log.error(e);
}
const serveURL = serve({ directory: '.' });
const dev = !app.isPackaged;
const port = dev ? '5173' : `3200`;

let mainWindow: BrowserWindow | any;
let tray: Tray;

function createWindow(): BrowserWindow {

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
			devTools: true ?? dev,
			preload: path.join(__dirname.replace(`\\`, '/'), '/preload.js'),
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
	const image = nativeImage.createFromPath(
		path.join(__dirname, "../frontend/static/icon.png")
	);
	console.log("test", image.isMacTemplateImage, image.getSize())
	tray = new Tray(image.resize({ width: 16, height: 16 }))
	tray.setToolTip("Froggi")

	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Open',
			click: () => {
				mainWindow.show()
			}
		},
		{
			label: 'Quit',
			click: () => {
				eventEmitter.emit('update-install');
				app.exit()
			}
		},
	])

	tray.setContextMenu(contextMenu)
	return tray
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
				mainWindow.openDevTools();
			},
		},
	],
});

function loadVite(port: string) {
	mainWindow.loadURL(`http://127.0.0.1:${port}`).catch((e: any) => {
		log.error('Error loading URL, retrying', e);
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
		container.register<EventEmitter>('EventEmitter', { useValue: eventEmitter });
		container.register<ElectronLog>('ElectronLog', { useValue: log });
		container.register<IpcMain>('IpcMain', { useValue: ipcMain });
		container.register<SlpParser>('SlpParser', { useValue: slpParser });
		container.register<SlpStream>('SlpStream', { useValue: slpStream });
		container.register<Store>('ElectronStore', { useValue: store });
		container.register<string>('RootDir', {
			useValue: `${__dirname}/../..`.replaceAll('\\', '/'),
		});
		container.register<string>('Port', { useValue: port });
		container.register<boolean>('Dev', { useValue: dev });

		container.resolve(DiscordRpc);
		container.resolve(MessageHandler);
		container.resolve(StatsDisplay);
		container.resolve(ObsWebSocket);
		container.resolve(SlippiJs);
		container.resolve(AutoUpdater);
	});

	mainWindow.on('close', (event: Event) => {
		event.preventDefault()
		app.hide()
	})
}

app.once('ready', createMainWindow);

app.on('activate', () => { mainWindow.show() })

function setLoggingPath() {
	try {
		const appDataPath = getAppDataPath('froggi');
		log.transports.file.resolvePath = () => path.join(`${appDataPath}/froggi.log`);
	} catch (err) {
		log.error(err);
	}
}
