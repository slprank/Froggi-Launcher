import { flattenState, isStateKey, SAMPLE_GAME_STATE } from '../../frontend/src/lib/utils/flowState';
import { gameStartTokens, knownKeyCheck } from '../../frontend/src/lib/utils/flowEngine';

describe('flow game state', () => {
	it('flattens nested objects to dotted paths, lists 1-based', () => {
		expect(flattenState({ a: { b: 1 }, list: ['x', 'y'], n: null }, 'state')).toEqual({ 'state.a.b': 1, 'state.list.1': 'x', 'state.list.2': 'y', 'state.n': null });
		expect(flattenState(SAMPLE_GAME_STATE, 'state')['state.players.3.fight.match.kos']).toBe(6);
	});

	it('knows every path of the state shape, any player/team number, and anything under strike/lastGame', () => {
		expect(isStateKey('state.players.1.rank.rating')).toBe(true);
		expect(isStateKey('state.players.4.percent')).toBe(true);
		expect(isStateKey('state.teams.2.stocks')).toBe(true);
		expect(isStateKey('state.strike.stages.3.status')).toBe(true);
		expect(isStateKey('state.players.1.nope')).toBe(false);
		expect(isStateKey('state.players')).toBe(false); // a branch, not a value
		expect(isStateKey('players.1.name')).toBe(false); // trigger key, not state
	});

	it('game start keys: players in slot order and rules', () => {
		const t = gameStartTokens(SAMPLE_GAME_STATE);
		expect(t).toMatchObject({ stage: 'Battlefield', 'players.1.character': 'Fox', 'players.4.team': 'Blue', 'rules.stocks': 4 });
		const isKnown = knownKeyCheck({ nodes: [{ id: 't', kind: 'trigger', position: { x: 0, y: 0 }, data: { type: 'gameStart' } }] });
		expect(Object.keys(t).every(isKnown)).toBe(true);
		expect(isKnown('stocksLeft')).toBe(false);
	});
});
