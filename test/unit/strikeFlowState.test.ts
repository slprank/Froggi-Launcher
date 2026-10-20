import { stageKey, strikeFlowState } from '../../frontend/src/lib/utils/strikeFlowState';
import type { StrikeState } from '../../frontend/src/lib/models/types/stageStriking';

const base = {
	p1Name: 'Mango', p2Name: 'Zain', bestOf: 3, score: { p1: 0, p2: 0 }, gameNum: 1,
	starters: [2, 31, 32, 28, 8], counterpicks: [3], stages: [2, 31, 32, 28, 8, 3], strikes: [], finalStageId: null,
	currentStriker: null, strikeOrder: [[1, 1], [2, 2], [1, 1]], strikeOrderIndex: 0,
	rps: { p1: 'rock', p2: 'scissors', winner: 1 }, rpsDeadline: null, characters: { p1: 20, p2: 9 },
	dsrStages: { p1: [], p2: [] }, lastWinner: null, games: [], connectedPlayers: [1, 2],
} as unknown as StrikeState;
const names = ['Captain Falcon', 'Donkey Kong', 'Fox', 'Game & Watch', 'Kirby', 'Bowser', 'Link', 'Luigi', 'Mario', 'Marth', 'Mewtwo', 'Ness', 'Peach', 'Pikachu', 'Ice Climbers', 'Jigglypuff', 'Samus', 'Yoshi', 'Zelda', 'Sheik', 'Falco'];
const character = (id: number) => names[id] ?? null;

describe('{{state.strike}} — the stage striking object for flows', () => {
	const g1Log = [
		{ game: 1, action: 'strike', stageId: 2, player: 1 },
		{ game: 1, action: 'strike', stageId: 31, player: 2 },
		{ game: 1, action: 'strike', stageId: 32, player: 2 },
		{ game: 1, action: 'strike', stageId: 28, player: 1 },
		{ game: 1, action: 'pick', stageId: 8, player: null },
	];

	it('game 1: each stage says who struck it and when; the stage left over is picked by nobody', () => {
		const s = strikeFlowState({ ...base, phase: 'charPick', strikes: [2, 31, 32, 28], finalStageId: 8, stageLog: g1Log } as StrikeState, character)!;
		expect(s.stages.fountainOfDreams).toMatchObject({ status: 'struck', isStruck: true, isBanned: false, by: 'p1', byName: 'Mango', order: 1 });
		expect(s.stages.battlefield).toMatchObject({ isStruck: true, by: 'p2', order: 2 });
		expect(s.stages.dreamLand).toMatchObject({ by: 'p1', order: 4 });
		expect(s.stages.yoshisStory).toMatchObject({ status: 'picked', isPicked: true, by: null, order: 5 });
		expect(s.stages.pokemonStadium).toMatchObject({ isLocked: true, order: null }); // counterpick in game 1
		expect(s.history.map((h) => `${h.order} ${h.action} ${h.stage} ${h.player ?? '-'}`)).toEqual([
			'1 strike Fountain of Dreams p1', '2 strike Battlefield p2', '3 strike Final Destination p2', '4 strike Dream Land p1', "5 pick Yoshi's Story -",
		]);
		expect(s).toMatchObject({ stage: "Yoshi's Story", rpsWinner: 'p1', score: { p1: 0, p2: 0 } });
		expect(s.p1).toMatchObject({ name: 'Mango', character: 'Falco', rps: 'rock' });
	});

	it('game 2: the winner\'s ban (by, order 1), the loser picking with their DSR stage blocked; the set history keeps game 1', () => {
		const log = [...g1Log, { game: 2, action: 'ban', stageId: 32, player: 1 }];
		const s = strikeFlowState({ ...base, phase: 'stagePick', gameNum: 2, lastWinner: 1, bans: [32], currentStriker: 2, dsrStages: { p1: [], p2: [31] }, score: { p1: 1, p2: 0 }, stageLog: log } as StrikeState, character)!;
		expect(s.stages.finalDestination).toMatchObject({ status: 'banned', isBanned: true, by: 'p1', byName: 'Mango', order: 1 });
		expect(s.stages.battlefield).toMatchObject({ isDsr: true, by: null });
		expect(s.history).toHaveLength(6);
		expect(s.history[5]).toEqual({ order: 6, game: 2, action: 'ban', stage: 'Final Destination', stageKey: 'finalDestination', player: 'p1', name: 'Mango' });
		expect(s).toMatchObject({ turn: { player: 'p2', name: 'Zain', action: 'pick' }, score: { p1: 1, p2: 0 }, stage: null });
		expect(s.p2.dsr).toBe('Battlefield');
	});

	it('no set → empty; stage keys', () => {
		expect(strikeFlowState(undefined, character)).toBeNull();
		expect([stageKey("Yoshi's Story"), stageKey('Pokémon Stadium'), stageKey('Fountain of Dreams')]).toEqual(['yoshisStory', 'pokemonStadium', 'fountainOfDreams']);
	});
});
