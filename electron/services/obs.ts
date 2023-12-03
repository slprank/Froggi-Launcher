// https://github.com/obs-websocket-community-projects/obs-websocket-js

import { ElectronLog } from 'electron-log';
import { delay, inject, singleton } from 'tsyringe';
import OBSWebSocket from 'obs-websocket-js';
import { TypedEmitter } from '../../frontend/src/lib/utils/customEventEmitter';
import { ElectronObsStore } from './store/storeObs';
import { ObsInputs, ObsItem, ObsScenes } from '../../frontend/src/lib/models/types/obsTypes';

@singleton()
export class ObsWebSocket {
	private obs = new OBSWebSocket();
	private obsConnectionInterval: NodeJS.Timeout | undefined;
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('SvelteEmitter') private svelteEmitter: TypedEmitter,
		@inject(delay(() => ElectronObsStore)) private storeObs: ElectronObsStore,
	) {
		this.log.info('Initializing OBS');
		this.initObsWebSocket();
		this.initSvelteListeners();
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
			clearInterval(this.obsConnectionInterval)
			setTimeout(() => {
				this.getObsData()
				this.reloadBrowserSources()
			}, 1000)
			this.log.info("OBS Connection Opened")
		});
		this.obs.on("CurrentProgramSceneChanged", () => {
			this.getObsData()
		});
		this.searchForObs()
	};

	getObsData = async () => {
		const scenes = await this.obs.call("GetSceneList");
		const itemsList = await this.obs.call("GetSceneItemList", { sceneName: scenes.currentProgramSceneName });
		const inputList = await this.obs.call("GetInputList");
		this.storeObs.setScenes(scenes as unknown as ObsScenes)
		this.storeObs.setItems(itemsList.sceneItems as unknown as ObsItem[])
		this.storeObs.setInputs(inputList.inputs as unknown as ObsInputs[])
	}

	reloadBrowserSources = async () => {
		const scenes = await this.obs.call("GetSceneList");
		console.log("scenes", scenes)
		scenes.scenes.forEach(async (scene) => {
			const itemsList = await this.obs.call("GetSceneItemList", { sceneName: `${scene.sceneName}` });
			console.log("itemsList", itemsList)
			itemsList.sceneItems.forEach(async (item) => {
				if (item.inputKind === "browser_source") {
					console.log("Reload", item.sourceName)
					await this.obs.call("PressInputPropertiesButton", { inputName: `${item.sourceName}`, propertyName: "refreshnocache" });
				}
			});
		});
	}

	searchForObs = async () => {
		this.log.info("Searching for OBS connection")
		this.obsConnectionInterval = setInterval(async () => {
			const password = this.storeObs.getPassword()
			const ipAddress = this.storeObs.getIpAddress()
			const port = this.storeObs.getPort()
			await this.obs.connect(`ws://${ipAddress}:${port}`, password);
		}, 5000)
	}

	initSvelteListeners() {
		this.svelteEmitter.on("ExecuteObsCommand", (command, payload) => {
			this.log.info("OBS Command:", command, payload)
			this.obs.call(command, payload);
		});
	}
}
