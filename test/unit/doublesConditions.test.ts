import { doublesVisibilityOption } from '../../frontend/src/lib/utils/doublesConditions';
import { VisibilityToggle } from '../../frontend/src/lib/models/types/animationOption';

// slots [T1P1, T2P1, T1P2, T2P2] = ports 2, 1, 3, 4
const players = [{ playerIndex: 1 }, { playerIndex: 0 }, { playerIndex: 2 }, { playerIndex: 3 }];
const frame = (stocks: Record<number, number>) =>
	({ players: Object.fromEntries(Object.entries(stocks).map(([i, s]) => [i, { post: { stocksRemaining: s, actionStateId: 14 }, pre: { positionX: 0, positionY: 0 } }])) }) as any;
const on = (name: string, v = VisibilityToggle.True) => ({ [name]: v }) as any;

describe('doubles conditions', () => {
	it('Doubles game', () => {
		expect(doublesVisibilityOption(on('Doubles Game'), null, players, true, 31)).toBe(true);
		expect(doublesVisibilityOption(on('Doubles Game'), null, players, false, 31)).toBe(false);
		expect(doublesVisibilityOption(on('Doubles Game', VisibilityToggle.False), null, players, false, 31)).toBe(true);
	});

	it('second players: stocks', () => {
		const f = frame({ 1: 4, 0: 4, 2: 2, 3: 4 });
		expect(doublesVisibilityOption(on('Team 1 Player 2 Stock 3'), f, players, true, 31)).toBe(false);
		expect(doublesVisibilityOption(on('Team 1 Player 2 Stock 2'), f, players, true, 31)).toBe(true);
		expect(doublesVisibilityOption(on('Team 2 Player 2 Stock 4'), f, players, true, 31)).toBe(true);
	});

	it('team stock totals (≤ N)', () => {
		const f = frame({ 1: 1, 2: 2, 0: 4, 3: 4 }); // Team 1 = 3, Team 2 = 8
		expect(doublesVisibilityOption(on('Team 1 Stocks <= 3'), f, players, true, 31)).toBe(true);
		expect(doublesVisibilityOption(on('Team 1 Stocks <= 2'), f, players, true, 31)).toBe(false);
		expect(doublesVisibilityOption(on('Team 2 Stocks <= 7'), f, players, true, 31)).toBe(false);
		expect(doublesVisibilityOption(on('Team 2 Stocks <= 8'), f, players, true, 31)).toBe(true);
	});

	it('singles: second-player conditions never match', () => {
		expect(doublesVisibilityOption(on('Team 1 Player 2 Stock 1'), frame({ 0: 4, 1: 4 }), players.slice(0, 2), false, 31)).toBe(false);
	});
});
