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
	MatchStats,
} from '../../../frontend/src/lib/models/types/slippiData';

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
		this.store.set('stats.scene', scene ?? 0);
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
		if (!bestOf) return;
		this.store.set("stats.bestOf", bestOf)
	}

	getBestOf(): BestOf {
		return this.store.get("stats.bestOf") as BestOf
	}

	initListeners() {
		this.store.onDidChange('stats.scene', (value) => {
			clearTimeout(this.sceneTimeout)
			this.messageHandler.sendMessage('live-stats-scene', value);
		});
		this.store.onDidChange(`stats.currentPlayers`, async (value) => {
			this.messageHandler.sendMessage('current-players', value);
		});
		this.store.onDidChange(`stats.game.frame`, async (value) => {
			this.messageHandler.sendMessage('game-frame', value);
		});
		this.store.onDidChange(`stats.game.settings`, async (value) => {
			this.messageHandler.sendMessage('game-settings', value);
		});
		this.store.onDidChange(`stats.game.state`, async (value) => {
			this.messageHandler.sendMessage('game-state', value);
		});
		this.store.onDidChange(`stats.game.stats`, async (value) => {
			this.messageHandler.sendMessage('post-game-stats', value);
		});
		this.store.onDidChange(`stats.match.stats`, async (value) => {
			this.messageHandler.sendMessage('post-match-stats', value);
		});
	}
}
