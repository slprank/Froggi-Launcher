// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import { FrameEntryType, GameEndType, GameStartType, StatsType } from '@slippi/slippi-js';
import os from 'os';
import { InGameState, LiveStatsScene } from '../../../frontend/src/lib/models/enum';


@singleton()
export class ElectronLiveStatsStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") public log: ElectronLog,
        @inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
    ) {
        this.initListeners();
    }

    getStatsScene(): LiveStatsScene {
        return this.store.get('stats.scene') as LiveStatsScene ?? 0;
    }

    setStatsScene(scene: LiveStatsScene) {
        this.store.set('stats.scene', scene ?? 0);
    }

    getGameFrame(): FrameEntryType {
        return this.store.get('stats.game.frame') as FrameEntryType
    }

    setGameFrame(frameEntry: FrameEntryType) {
        this.store.set('stats.game.frame', frameEntry)
    }

    getGameState() {
        return this.store.get("stats.game.state")
    }

    setGameState(state: InGameState) {
        if (state === this.getGameState()) return;
        return this.store.set("stats.game.state", state)
    }

    getGameSettings(): GameStartType {
        return this.store.get('stats.game.settings') as GameStartType;
    }

    setGameSettings(settings: GameStartType) {
        const regex = /mode\.(\w+)/;
        this.setGameMode(settings?.matchInfo?.matchId?.match(regex)?.at(1) ?? "")
        return this.store.set('stats.game.settings', settings);
    }

    getGameMode(): string {
        return this.store.get('stats.game.settings.matchInfo.mode') as string;
    }

    setGameMode(mode: string) {
        return this.store.set('stats.game.settings.matchInfo.mode', mode);
    }

    getGameStats(): StatsType {
        return this.store.get('stats.game.stats') as StatsType;
    }

    setGameStats(gameStats: GameEndType) {
        this.store.set('stats.game.stats', gameStats);
    }

    initListeners() {
        this.store.onDidChange("stats.scene", (value) => {
            this.messageHandler.sendMessage("live_stats_scene", value)
        })
        this.store.onDidChange(`stats.currentPlayers`, async (value) => {
            this.messageHandler.sendMessage('current_players', value);
        })
        this.store.onDidChange(`stats.game.frame`, async (value) => {
            this.messageHandler.sendMessage('game_frame', value);
        })
        this.store.onDidChange(`stats.game.settings`, async (value) => {
            this.messageHandler.sendMessage('game_settings', value);
        })
        this.store.onDidChange(`stats.game.state`, async (value) => {
            console.log("state", value)
            this.messageHandler.sendMessage('game_state', value);
        })
        this.store.onDidChange(`stats.game.stats`, async (value) => {
            this.messageHandler.sendMessage('post_game_stats', value);
        })
    }
}
