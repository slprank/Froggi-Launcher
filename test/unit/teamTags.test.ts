import 'reflect-metadata';
import { EventEmitter } from 'events';
import { ElectronPlayersStore } from '../../electron/services/store/storePlayers';
import { teamDisplayName } from '../../frontend/src/lib/utils/teams';

const player = (playerIndex: number, teamId: number, froggiKey: string, displayName = '') => ({ playerIndex, teamId, port: playerIndex + 1, froggiKey, displayName, connectCode: '' }) as never;

describe('team names and Start Set tags', () => {
	it('team name: typed, else "Tag & Tag" when every player has a tag, else the fallback — never ports', () => {
		expect(teamDisplayName('Team Mango', [], 'Team 1')).toBe('Team Mango');
		expect(teamDisplayName('', [player(0, 0, 'Red-1', 'Mango'), player(2, 0, 'Red-2', 'Zain')], 'Team 1')).toBe('Mango & Zain');
		expect(teamDisplayName('', [player(0, 0, 'Red-1', 'Mango'), player(2, 0, 'Red-2')], 'Team 1')).toBe('Team 1');
		expect(teamDisplayName('', [player(0, 0, 'Red-1'), player(2, 0, 'Red-2')], 'Team 1')).toBe('Team 1');
	});

	it("Start Set tags go to the set's first game by slot, then follow each player; a new set without Start Set forgets them", () => {
		const emitter = new EventEmitter();
		const sent: [string, unknown][] = [];
		const store = new ElectronPlayersStore({ info: jest.fn() } as never, emitter as never, { sendMessage: (t: string, v: unknown) => sent.push([t, v]) } as never);
		emitter.emit('StartSet', 'A', 'B', 3, true, 'doubles', { names: ['', 'Blue Team'], tags: { p1: ['Mango', 'Zain'], p2: ['Hbox', ''] } });
		expect(store.getTeamNames()).toEqual(['', 'Blue Team']);
		store.newSet(); // the set's first game: the typed names survive
		// slot order: T1P1, T2P1, T1P2, T2P2
		const game1 = store.withSetTags([player(0, 0, 'Red-1'), player(1, 1, 'Blue-1'), player(2, 0, 'Red-2'), player(3, 1, 'Blue-2')]);
		expect(game1.map((p) => (p as { displayName: string }).displayName)).toEqual(['Mango', 'Hbox', 'Zain', '']);
		// game 2: other ports, same identities → same tags
		const game2 = store.withSetTags([player(2, 0, 'Red-2'), player(3, 1, 'Blue-1'), player(0, 0, 'Red-1'), player(1, 1, 'Blue-2')]);
		expect(game2.map((p) => (p as { displayName: string }).displayName)).toEqual(['Zain', 'Hbox', 'Mango', '']);
		store.newSet(); // a new set, no Start Set
		expect(store.getTeamNames()).toEqual(['', '']);
		expect(store.withSetTags([player(0, 0, 'Red-1')]).map((p) => (p as { displayName: string }).displayName)).toEqual(['']);
	});
});
