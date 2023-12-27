import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import os from 'os';
import { getControllerInputs } from './memoryRead/controllerInputs';
import { getPause } from './memoryRead/gameState';
import { MessageHandler } from './messageHandler';
import DolphinMemory from 'dolphin-memory-reader';
import { ElectronLiveStatsStore } from './store/storeLiveStats';
import { InGameState } from '../../frontend/src/lib/models/enum';

@singleton()
export class MemoryRead {
	private memoryReadInterval: NodeJS.Timeout = {} as NodeJS.Timeout;
	private isWindows = os.platform() === 'win32';
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject(delay(() => ElectronLiveStatsStore)) private storeLiveStats: ElectronLiveStatsStore,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {}

	initMemoryRead() {
		this.initMemoryReadWin();
	}

	private async initMemoryReadWin() {
		if (!this.isWindows) return;
		this.log.info('Initializing Memory Read');
		const memory = new DolphinMemory();
		await memory.init();
		this.memoryReadInterval = setInterval(() => {
			try {
				this.handleController(memory);
				this.handleGameState(memory);
				// TODO: Get Pause
				// TODO: Get Menu Location
			} catch (err) {
				console.error(err);
				clearInterval(this.memoryReadInterval);
			}
		}, 16);
	}

	private handleController = (memory: DolphinMemory) => {
		const controllers = getControllerInputs(memory);
		this.messageHandler.sendMessage('MemoryControllerInput', controllers);
	};

	private handleGameState = (memory: DolphinMemory) => {
		const currentState = this.storeLiveStats.getGameState();
		if (currentState !== InGameState.Running) return;
		const isPaused = getPause(memory);
		if (!isPaused) return;
		this.storeLiveStats.setGameState(InGameState.Paused);
	};

	stopMemoryRead() {
		this.log.info('Stopping memory read');
		clearInterval(this.memoryReadInterval);
	}
}
