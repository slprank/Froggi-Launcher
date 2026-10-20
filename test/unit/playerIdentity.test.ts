import { assignKeys, withKeys } from '../../frontend/src/lib/utils/playerIdentity';
import { orderTeams, teamReference } from '../../frontend/src/lib/utils/teams';

// teamId 0 = red, 1 = blue, 2 = green
type P = { playerIndex: number; port: number; teamId: number; connectCode: string; froggiKey?: string | null };
const p = (playerIndex: number, teamId: number, connectCode = ''): P => ({ playerIndex, port: playerIndex + 1, teamId, connectCode });
const keyed = (players: P[], previous?: (P | null | undefined)[]) => withKeys(players, assignKeys(players, true, previous));

describe('player identity', () => {
	const game1 = keyed([p(0, 1), p(1, 0), p(2, 0), p(3, 1)]); // ports: blue, red, red, blue

	it('first offline doubles game: colour + order in the team', () => {
		expect(game1.map((x) => x!.froggiKey)).toEqual(['Blue-1', 'Red-1', 'Red-2', 'Blue-2']);
	});

	it('teams swap ports but keep colours → keys follow the colour, lower port stays -1', () => {
		const game2 = keyed([p(0, 0), p(1, 1), p(2, 1), p(3, 0)], game1);
		expect(game2.map((x) => x!.froggiKey)).toEqual(['Red-1', 'Blue-1', 'Blue-2', 'Red-2']);
	});

	it('one team changes colour → it is the team whose colour is missing', () => {
		const game2 = keyed([p(0, 2), p(1, 0), p(2, 0), p(3, 2)], game1); // blue → green
		expect(game2.map((x) => x!.froggiKey)).toEqual(['Blue-1', 'Red-1', 'Red-2', 'Blue-2']);
	});

	it('keys keep the team order stable across a colour change', () => {
		const reference = teamReference(orderTeams(game1));
		const game2 = keyed([p(0, 0), p(1, 2), p(2, 2), p(3, 0)], game1); // red→… both moved
		const teams = orderTeams(game2, reference);
		expect(teams.map((t) => t.players.map((x) => x.froggiKey))).toEqual([['Blue-1', 'Blue-2'], ['Red-1', 'Red-2']]); // Team 1 = port 1's team in game 1
	});

	it('online: connect codes; singles offline: no keys', () => {
		expect(assignKeys([p(0, 0, 'A#1'), p(1, 1, 'B#2')], true)).toEqual({ 0: 'A#1', 1: 'B#2' });
		expect(assignKeys([p(0, 0), p(1, 1)], false)).toEqual({ 0: undefined, 1: undefined });
	});
});

describe('set continuation', () => {
	const { sameOnlinePlayers } = jest.requireActual('../../frontend/src/lib/utils/playerIdentity');
	it('same connect codes on any ports = same players; offline never matches', () => {
		expect(sameOnlinePlayers([p(0, 0, 'A#1'), p(1, 1, 'B#2')], [p(2, 0, 'B#2'), p(3, 1, 'A#1')])).toBe(true);
		expect(sameOnlinePlayers([p(0, 0, 'A#1'), p(1, 1, 'B#2')], [p(0, 0, 'A#1'), p(1, 1, 'C#3')])).toBe(false);
		expect(sameOnlinePlayers([p(0, 0), p(1, 1)], [p(0, 0), p(1, 1)])).toBe(false);
	});
});

describe('continuing a set in a new Slippi session', () => {
	const { continuesSet } = jest.requireActual('../../frontend/src/lib/utils/playerIdentity');
	const a = [p(0, 0, 'A#1'), p(1, 1, 'B#2')];
	const base = { enabled: true, currentMatchId: 'session-2', previousMatchId: 'session-1', previousSetEnded: false, currentPlayers: a, previousPlayers: a };

	it('same players, set not finished → continue (score is kept)', () => {
		expect(continuesSet(base)).toBe(true);
		expect(continuesSet({ ...base, currentPlayers: [p(2, 0, 'B#2'), p(3, 1, 'A#1')] })).toBe(true); // other ports
	});
	it('toggle off → a new session is a new set', () => {
		expect(continuesSet({ ...base, enabled: false })).toBe(false);
	});
	it('finished set, other players, same session or offline → no continuation', () => {
		expect(continuesSet({ ...base, previousSetEnded: true })).toBe(false);
		expect(continuesSet({ ...base, currentPlayers: [p(0, 0, 'A#1'), p(1, 1, 'C#3')] })).toBe(false);
		expect(continuesSet({ ...base, currentMatchId: 'session-1' })).toBe(false);
		expect(continuesSet({ ...base, currentMatchId: '', previousMatchId: '' })).toBe(false);
	});
});
