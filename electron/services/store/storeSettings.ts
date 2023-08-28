// https://www.npmjs.com/package/electron-store
import ip from 'ip';
import Store from 'electron-store';
import type { CurrentPlayer, Player, SlippiLauncherSettings, Url } from '../../../frontend/src/lib/models/types';
import { delay, inject, singleton } from 'tsyringe';
import { ElectronLog } from 'electron-log';
import { MessageHandler } from '../messageHandler';
import getAppDataPath from 'appdata-path';
import fs from 'fs';
import os from 'os';

@singleton()
export class ElectronSettingsStore {
    isMac: boolean = os.platform() === 'darwin';
    isWindows: boolean = os.platform() === 'win32';
    isLinux: boolean = os.platform() === 'linux';
    store: Store = new Store();
    constructor(
        @inject("ElectronLog") public log: ElectronLog,
        @inject(delay(() => MessageHandler)) public messageHandler: MessageHandler,
        @inject("Port") public port: string,
    ) {
        this.initListeners();
        this.updateSlippiSettings();
    }

    getCurrentPlayer(): CurrentPlayer | undefined {
        return this.store.get('settings.currentPlayer') as CurrentPlayer;
    }

    setCurrentPlayer(player: Player) {
        const prevPlayer = this.getCurrentPlayer()
        this.store.set('settings.currentPlayer', { ...prevPlayer, player: player });
    }

    getSlippiLauncherSettings(): SlippiLauncherSettings {
        return this.store.get('settings.slippiLauncher') as SlippiLauncherSettings;
    }

    setSlippiLauncherSettings(dir: string) {
        this.store.set('settings.slippiLauncher', dir);
    }

    updateSlippiSettings(): SlippiLauncherSettings | undefined {
        try {
            const slippiPath = getAppDataPath('Slippi Launcher');
            const rawData = fs.readFileSync(`${slippiPath}/Settings`, 'utf-8');
            let settings = JSON.parse(rawData)?.settings as SlippiLauncherSettings;
            settings = this.verifyAndFixDefaultSettings(settings);
            this.setSlippiLauncherSettings(settings.rootSlpPath!)
            return settings;
        } catch (err) {
            this.log.error(err);
        }
        return
    }

    verifyAndFixDefaultSettings(settings: SlippiLauncherSettings): SlippiLauncherSettings {
        const defaultPath = this.getSlippiDefaultPath()
        if (settings?.rootSlpPath === undefined) {
            settings.rootSlpPath = defaultPath
        }
        if (settings?.spectateSlpPath === undefined) {
            settings.rootSlpPath = `${settings.rootSlpPath}/spectate`
        }
        if (settings?.spectateSlpPath === undefined) {
            settings.useMonthlySubfolders = false
        }
        fs.writeFileSync(`${getAppDataPath('Slippi Launcher')}/Settings`, JSON.stringify({ settings: settings }))
        return settings;
    }

    getSlippiDefaultPath(): string {
        const username = os.userInfo().username
        if (this.isWindows) return `C:/Users/${username}/Documents/Slippi`;
        if (this.isMac) return `/Users/${username}/Slippi`;
        if (this.isLinux) return `/Users/${username}/Slippi`;
        throw new Error("No valid OS")
    }

    getLocalUrl(): Url {
        return {
            local: `http://localhost:${this.port}`, external: `http://${ip.address()}:${this.port}`
        };
    }

    initListeners() {
        this.store.onDidChange(`settings.currentPlayer`, async (value) => {
            this.messageHandler.sendMessage('current_player', value);
        })
    }
}
