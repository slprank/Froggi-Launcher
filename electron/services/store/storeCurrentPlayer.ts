// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type {
	CurrentPlayer,
	RankedNetplayProfile,
} from '../../../frontend/src/lib/models/types/slippiData';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { ElectronSettingsStore } from './storeSettings';
import { LiveStatsScene } from '../../../frontend/src/lib/models/enum';
import { ElectronLiveStatsStore } from './storeLiveStats';
import { MessageHandler } from '../messageHandler';
import { ElectronSessionStore } from './storeSession';

@singleton()
export class ElectronCurrentPlayerStore {
	private sceneTimeout: NodeJS.Timeout;
	private listeners: Function[];
	constructor(
		@inject('ElectronLog') private log: ElectronLog,
		@inject('ElectronStore') private store: Store,
		@inject(delay(() => ElectronLiveStatsStore)) private storeLiveStats: ElectronLiveStatsStore,
		@inject(delay(() => ElectronSessionStore)) private storeSession: ElectronSessionStore,
		@inject(delay(() => ElectronSettingsStore)) private storeSettings: ElectronSettingsStore,
		@inject(delay(() => MessageHandler)) private messageHandler: MessageHandler,
	) {
		this.log.info('Initializing Current Player Store');
		this.initPlayerListener();
		this.initListeners();
	}

	// Rank
	getCurrentPlayer(): CurrentPlayer | undefined {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		if (!connectCode) return;
		return this.store.get(`player.${connectCode}`) as CurrentPlayer;
	}

	getCurrentPlayerCurrentRankStats(): RankedNetplayProfile | undefined {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		if (!connectCode) return;
		return this.store.get(`player.${connectCode}.rank.current`) as RankedNetplayProfile;
	}

	updateCurrentPlayerConnectCode() {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		if (!connectCode) return;
		this.store.set(`player.${connectCode}.connectCode`, connectCode);
	}

	setCurrentPlayerCurrentRankStats(rankStats: RankedNetplayProfile | undefined) {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		if (!rankStats || !connectCode) return;
		this.store.set(`player.${connectCode}.rank.current`, rankStats);
	}

	setCurrentPlayerNewRankStats(rankStats: RankedNetplayProfile | undefined) {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		if (!rankStats || !connectCode) return;
		this.storeSession.updateSessionStats(rankStats);
		this.store.set(`player.${connectCode}.rank.new`, rankStats);
		this.updateCurrentPlayerRankHistory(rankStats);
	}

	getPlayerRankHistory(): RankedNetplayProfile[] | undefined {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		if (!connectCode) return;
		return (this.store.get(`player.${connectCode}.rank.history`) ??
			[]) as RankedNetplayProfile[];
	}

	updateCurrentPlayerRankHistory(rankStats: RankedNetplayProfile) {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		let history = this.getPlayerRankHistory();
		if (!rankStats || !connectCode || !history) return;
		this.store.set(`player.${connectCode}.rank.history`, [...history, rankStats]);
	}

	private async handleRankChange() {
		const player = this.getCurrentPlayer();
		if (!player) return;
		this.storeLiveStats.setStatsSceneTimeout(
			LiveStatsScene.RankChange,
			LiveStatsScene.PostSet,
			10000,
		);
		setTimeout(() => {
			this.setCurrentPlayerCurrentRankStats(player.rank.new);
		}, 5000);
	}

	private initPlayerListener() {
		this.store.onDidChange(`settings.currentPlayer.connectCode`, async () => {
			this.unsubscribeListeners();
			this.initListeners();
		});
	}

	private initListeners() {
		const connectCode = this.storeSettings.getCurrentPlayerConnectCode();
		if (!connectCode) return;
		this.listeners = [
			this.store.onDidChange(`player.${connectCode}`, (value) => {
				this.messageHandler.sendMessage('CurrentPlayer', value as CurrentPlayer);
			}),
			this.store.onDidChange(`settings.currentPlayer.rank.new`, async () => {
				await this.handleRankChange();
			}),
			this.store.onDidChange('stats.scene', () => {
				clearTimeout(this.sceneTimeout);
			}),
		];
	}

	private unsubscribeListeners() {
		this.listeners?.forEach((unsubscribe) => unsubscribe());
	}
}
