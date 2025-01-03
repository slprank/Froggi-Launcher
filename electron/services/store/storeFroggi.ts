// https://www.npmjs.com/package/electron-store
import Store from 'electron-store';
import type { Froggi } from '../../../frontend/src/lib/models/types/froggiConfigTypes';
import { inject, singleton } from 'tsyringe';
import type { ElectronLog } from 'electron-log';


@singleton()
export class ElectronFroggiStore {
    constructor(
        @inject("ElectronLog") private log: ElectronLog,
        @inject("ElectronStore") private store: Store,
    ) {
        this.log.info("Initializing Players Store")
    }

    getFroggiConfig(): Froggi {
        return (this.store.get("froggi") ?? {}) as Froggi
    }
}
