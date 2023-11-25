
import { ElectronLog } from 'electron-log';
import Store from 'electron-store';

export const migrateStore = (log: ElectronLog): Store.Options<Record<string, unknown>> => {
    log.info("Here")
    return {
        beforeEachMigration: (_, context) => {
            log.info(`Migrate store from ${context.fromVersion} → ${context.toVersion}`);
            log.info(context)
        },
        migrations: {
            '>=0.1.0': store => {
                log.info('>= 0.1.0')
                store.set('debugPhase', true);
            },
            '>=0.1.6': store => {
                log.info('>= 0.1.6')
                store.set('debugPhase', true);
            }
        }
    }
}