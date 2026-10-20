import { TEAM_COLORS, type TeamsPlayer } from './teams';

/**
 * Who is who across the games of a set (`froggiKey` on each player — `playerKey` prefers it).
 *  - Online: the connect code.
 *  - Offline singles: nothing (players are assumed to keep their port).
 *  - Offline doubles: "<Colour>-<n>" from the set's first game (Red-1 = the red team's lower port).
 *    Later games: a team keeps its key when it keeps its colour; if one team changed colour, it is
 *    the one whose old colour is missing. Within a team the lower port keeps the "-1" player.
 *    Both teams changed colour → keys follow red > blue > green (the host can fix it by hand).
 */
export type KeyedPlayer = TeamsPlayer & { froggiKey?: string | null };

const colourName = (teamId: number | null | undefined) => {
	const c = TEAM_COLORS[teamId ?? -1] ?? 'team';
	return c[0].toUpperCase() + c.slice(1);
};

/** Offline doubles keys for one team: lower port first. */
const byPort = <P extends TeamsPlayer>(players: P[]) => [...players].sort((a, b) => a.playerIndex - b.playerIndex);

function groupByTeam<P extends TeamsPlayer>(players: P[]) {
	const teams = new Map<number, P[]>();
	for (const p of players) teams.set(p.teamId ?? 0, [...(teams.get(p.teamId ?? 0) ?? []), p]);
	return teams;
}

/** froggiKey per playerIndex for the current game. `previous` = the set's previous game (keyed). */
export function assignKeys(
	current: (KeyedPlayer | null | undefined)[],
	isTeams: boolean,
	previous?: (KeyedPlayer | null | undefined)[],
): Record<number, string | undefined> {
	const players = current.filter((p): p is KeyedPlayer => !!p);
	const out: Record<number, string | undefined> = {};
	for (const p of players) out[p.playerIndex] = p.connectCode || undefined;
	const offline = players.filter((p) => !p.connectCode);
	if (!isTeams || !offline.length) return out;

	const now = groupByTeam(offline);
	const before = groupByTeam((previous ?? []).filter((p): p is KeyedPlayer => !!p && !p.connectCode && !!p.froggiKey));

	// colour (teamId) now → teamId in the previous game
	const map = new Map<number, number>();
	for (const id of now.keys()) if (before.has(id)) map.set(id, id);
	const newIds = [...now.keys()].filter((id) => !map.has(id)).sort((a, b) => a - b);
	const oldIds = [...before.keys()].filter((id) => ![...map.values()].includes(id)).sort((a, b) => a - b);
	newIds.forEach((id, i) => oldIds[i] !== undefined && map.set(id, oldIds[i]));

	for (const [teamId, members] of now) {
		const prevTeam = map.has(teamId) ? byPort(before.get(map.get(teamId)!) ?? []) : [];
		byPort(members).forEach((p, i) => {
			out[p.playerIndex] = prevTeam[i]?.froggiKey ?? `${colourName(teamId)}-${i + 1}`;
		});
	}
	return out;
}

/** Copy of the players with their keys applied. */
export function withKeys<P extends KeyedPlayer>(players: (P | null | undefined)[], keys: Record<number, string | undefined>): (P | null | undefined)[] {
	return players.map((p) => (p ? { ...p, froggiKey: keys[p.playerIndex] ?? null } : p));
}

/** Same online players (connect codes) in both games — a reconnect into a new Slippi session. */
export function sameOnlinePlayers(a: (TeamsPlayer | null | undefined)[] | undefined, b: (TeamsPlayer | null | undefined)[] | undefined): boolean {
	const codes = (list: typeof a) => (list ?? []).filter((p): p is TeamsPlayer => !!p).map((p) => p.connectCode ?? '').sort();
	const x = codes(a);
	const y = codes(b);
	return x.length > 0 && x.every(Boolean) && x.length === y.length && x.every((c, i) => c === y[i]);
}

/**
 * Does a game that starts a NEW Slippi session (new match id) continue the running set?
 * Only when the host keeps "Continue the set in the next session" on (default), the previous set
 * isn't finished, and the same online players are playing (ports may differ).
 */
export function continuesSet(o: {
	enabled: boolean;
	currentMatchId: string;
	previousMatchId: string;
	previousSetEnded: boolean;
	currentPlayers: (TeamsPlayer | null | undefined)[] | undefined;
	previousPlayers: (TeamsPlayer | null | undefined)[] | undefined;
}): boolean {
	if (!o.enabled || !o.currentMatchId || !o.previousMatchId || o.currentMatchId === o.previousMatchId) return false;
	return !o.previousSetEnded && sameOnlinePlayers(o.currentPlayers, o.previousPlayers);
}
