// https://github.com/obs-websocket-community-projects/obs-websocket-js

import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import OBSWebSocket from 'obs-websocket-js';
import { TypedEmitter } from '../../frontend/src/lib/utils/customEventEmitter';
import { ElectronObsStore } from './store/storeObs';
import { ObsInputs, ObsItem, ObsScenes } from '../../frontend/src/lib/models/types/obsTypes';
import { MessageHandler } from './messageHandler';
import { NotificationType, ConnectionState } from '../../frontend/src/lib/models/enum';

@singleton()
export class ObsWebSocket {
	private obs = new OBSWebSocket();
	private obsConnectionInterval: NodeJS.Timeout | undefined;
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('SvelteEmitter') private svelteEmitter: TypedEmitter,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
		@inject(delay(() => ElectronObsStore)) private storeObs: ElectronObsStore,
	) {
		this.log.info('Initializing OBS');
		this.initObsWebSocket();
		this.initSvelteListeners();
	}

	updateObsData = async () => {
		this.updateScenes()
		this.updateInputs()
		this.updateItems()
	}

	updateScenes = async () => {
		const scenes = await this.obs.call("GetSceneList");
		this.storeObs.setScenes(scenes as unknown as ObsScenes)
	}

	updateInputs = async () => {
		const inputList = await this.obs.call("GetInputList")
		let inputs = inputList.inputs as unknown as ObsInputs[];
		for (const [index, input] of inputs.entries()) {
			const volume = await this.obs.call("GetInputVolume", { inputName: `${input.inputName}` });

			inputs[index] = {
				...input,
				volume: { ...volume }
			};
		}
		const filteredInputs = inputs.filter((input) => !["browser_source"].includes(input.inputKind))
		this.storeObs.setInputs(filteredInputs as unknown as ObsInputs[]);
	}

	updateItems = async () => {
		const scenes = await this.obs.call("GetSceneList");
		const itemsList = await this.obs.call("GetSceneItemList", { sceneName: scenes.currentProgramSceneName });
		const items = itemsList.sceneItems as unknown as ObsItem[];

		this.storeObs.setItems(items);
	}

	reloadBrowserSources = async () => {
		const scenes = await this.obs.call("GetSceneList");
		const sceneList = scenes.scenes.map((scene) => scene.sceneName)
		for (const scene of sceneList) {
			const itemsList = await this.obs.call("GetSceneItemList", { sceneName: `${scene}` });
			itemsList.sceneItems.forEach(async (item) => {
				if (item.inputKind === "browser_source") {
					await this.obs.call("PressInputPropertiesButton", { inputName: `${item.sourceName}`, propertyName: "refreshnocache" });
				}
			});
		}
		//await this.cycleThroughScenes()
	}

	cycleThroughScenes = async () => {
		const scenes = await this.obs.call("GetSceneList");
		const currentScene = scenes.currentProgramSceneName
		const sceneList = scenes.scenes.map((scene) => scene.sceneName)
		for (const scene of sceneList) {
			await this.obs.call("SetCurrentProgramScene", { sceneName: `${scene}` })
			await new Promise((resolve) => setTimeout(resolve, 500))
		}
		await this.obs.call("SetCurrentProgramScene", { sceneName: currentScene })
	}

	startReplayBuffer = async () => {
		const replayBufferState = await this.obs.call("GetReplayBufferStatus");
		if (replayBufferState.outputActive) return;
		await this.obs.call("StartReplayBuffer");
	}

	searchForObs = async () => {
		clearTimeout(this.obsConnectionInterval)
		this.log.info("Searching for OBS connection")
		this.storeObs.setConnectionState(ConnectionState.Searching)
		this.obsConnectionInterval = setTimeout(async () => {
			const password = this.storeObs.getPassword()
			const ipAddress = this.storeObs.getIpAddress()
			const port = this.storeObs.getPort()
			try {
				await this.obs.connect(`ws://${ipAddress}:${port}`, password);
			} catch {
				this.log.error(`Could not connect to OBS: ${`ws://${ipAddress}:${port}`} - (Failed connection attempts may cause lag spikes)`)
			}
		}, 5000)
	}

	initConnection = async () => {
		await this.updateObsData()
		await this.reloadBrowserSources()
		await this.obs.call("StartReplayBuffer");
	}

	initObsWebSocket = async () => {
		this.obs.on("ConnectionClosed", async () => {
			this.searchForObs()
			this.log.info("OBS Connection Closed")
		});
		this.obs.on("ConnectionError", () => {
			this.searchForObs()
			this.log.error("OBS Connection Error")
		});
		this.obs.on("ConnectionOpened", () => {
			this.storeObs.setConnectionState(ConnectionState.Connected)
			setTimeout(this.initConnection, 1000)
			this.log.info("OBS Connection Opened")
		});

		this.obs.on("CurrentProgramSceneChanged", () => {
			this.updateObsData()
		});
		this.obs.on("SceneListChanged", () => {
			this.updateObsData()
		});
		this.obs.on("InputVolumeChanged", () => {
			this.updateObsData()
		})
		this.obs.on("ReplayBufferSaved", () => {
			this.messageHandler.sendMessage("Notification", "Replay Saved", NotificationType.Success)
		})
		this.obs.on("ReplayBufferStateChanged", (state) => {
			this.storeObs.setReplayBufferState(state)
		})

		this.searchForObs()
	};

	initSvelteListeners() {
		this.svelteEmitter.on("ExecuteObsCommand", async (command, payload) => {

			await this.obs.call(command, payload);
			await this.updateObsData()

			this.messageHandler.sendMessage("Notification", `Could not execute command: ${command}`, NotificationType.Warning)
		});

	}
}
