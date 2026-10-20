import { ConnectionState } from '../models/enum';
import type { ObsConnection } from '../models/types/obsTypes';

export type ObsStatus = 'connected' | 'connecting' | 'openNotConnected' | 'closed' | 'notSetUp';

/** Set up before (Froggi has connected once) vs never: "not connected" usually just means OBS is closed. */
export function obsStatus(connection: Partial<ObsConnection> | undefined, obsRunning: boolean | undefined): ObsStatus {
	if (connection?.state === ConnectionState.Connected) return 'connected';
	if (connection?.state === ConnectionState.Searching) return 'connecting';
	if (obsRunning) return 'openNotConnected';
	return connection?.lastConnectedAt ? 'closed' : 'notSetUp';
}

export const OBS_STATUS_TEXT: Record<ObsStatus, string> = {
	connected: 'Connected',
	connecting: 'Connecting…',
	openNotConnected: 'OBS is open — not connected',
	closed: 'OBS is closed',
	notSetUp: 'Not set up',
};
