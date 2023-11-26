// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { FrameEntryType, GameStartType } from '@slippi/slippi-js';
import { BestOf, InGameState, LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import {
	GameStartMode,
	GameStartTypeExtended,
	GameStats,
	Match,
	MatchStats,
	Player,
} from '../../../frontend/src/lib/models/types/slippiData';
import { isNil } from 'lodash';

@singleton()
export class ElectronLiveStatsStore {
	private sceneTimeout: NodeJS.Timeout
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject("ElectronStore") private store: Store,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {
		this.log.info('Initializing Live Stats Store');
		this.initListeners();
	}

	getStatsScene(): LiveStatsScene | undefined {
		return (this.store.get('stats.scene') as LiveStatsScene) ?? 0;
	}

	setStatsScene(scene: LiveStatsScene) {
		this.store.set('stats.scene', scene ?? LiveStatsScene.WaitingForDolphin);
	}

	setStatsSceneTimeout(firstScene: LiveStatsScene, secondScene: LiveStatsScene, ms: number) {
		this.store.set('stats.scene', firstScene);

		this.sceneTimeout = setTimeout(() => {
			this.store.set('stats.scene', secondScene);
		}, ms)
	}

	getGameFrame(): FrameEntryType | undefined {
		return this.store.get('stats.game.frame') as FrameEntryType;
	}

	setGameFrame(frameEntry: FrameEntryType | undefined | null) {
		if (!frameEntry) return;
		this.store.set('stats.game.frame', frameEntry);
	}

	deleteGameFrame() {
		this.store.delete('stats.game.frame');
	}

	getGameState(): InGameState | undefined {
		return this.store.get('stats.game.state') as InGameState;
	}

	setGameState(state: InGameState) {
		if (state === this.getGameState()) return;
		return this.store.set('stats.game.state', state);
	}

	getGameSettings(): GameStartTypeExtended | undefined {
		return this.store.get('stats.game.settings') as GameStartTypeExtended;
	}

	setGameSettings(settings: GameStartType) {
		this.store.set('stats.game.settings', settings);
		const gameMode = settings?.matchInfo?.matchId?.match(/mode\.(\w+)/)?.at(1) as GameStartMode ?? 'local'
		if (gameMode === "ranked") this.setBestOf(BestOf.BestOf3)
		this.setGameMode(gameMode);
	}

	setGameMode(mode: GameStartMode) {
		return this.store.set('stats.game.settings.matchInfo.mode', mode);
	}

	getGameStats(): GameStats | undefined {
		return (this.store.get('stats.game.stats') ?? {}) as GameStats;
	}

	setGameStats(gameStats: GameStats | null) {
		if (!gameStats) return;
		this.store.set('stats.game.stats', gameStats);
	}

	setMatchStats(matchStats: MatchStats | undefined | null) {
		if (!matchStats) return;
		this.store.set('stats.match.stats', matchStats);
	}

	setBestOf(bestOf: BestOf | undefined) {
		if (isNil(bestOf)) return;
		this.store.set("stats.match.bestOf", bestOf)
	}

	getBestOf(): BestOf {
		return this.store.get("stats.match.bestOf") as BestOf
	}

	initListeners() {
		this.store.onDidChange('stats.scene', (value) => {
			clearTimeout(this.sceneTimeout)
			this.messageHandler.sendMessage("LiveStatsSceneChange", value as LiveStatsScene);
		});
		this.store.onDidChange(`stats.currentPlayers`, async (value) => {
			this.messageHandler.sendMessage("CurrentPlayers", value as Player[]);
		});
		this.store.onDidChange(`stats.game.frame`, async (value) => {
			this.messageHandler.sendMessage("GameFrame", value as FrameEntryType);
		});
		this.store.onDidChange(`stats.game.settings`, async (value) => {
			this.messageHandler.sendMessage("GameSettings", value as GameStartTypeExtended);
		});
		this.store.onDidChange(`stats.game.state`, async (value) => {
			this.messageHandler.sendMessage("GameState", value as InGameState);
		});
		this.store.onDidChange(`stats.game.stats`, async (value) => {
			this.messageHandler.sendMessage("PostGameStats", value as GameStats);
		});
		this.store.onDidChange(`stats.match`, async (value) => {
			this.messageHandler.sendMessage("CurrentMatch", value as Match);
		});
	}
}
