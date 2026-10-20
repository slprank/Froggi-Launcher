import { findSettingsPlayer, getGameScore, getPlayerSlot, getWinnerIndex, didPlayerWin, isDisconnectEnding } from '../../frontend/src/lib/utils/gamePredicates';
import type { GameStats, Player } from '../../frontend/src/lib/models/types/slippiData';

// Minimal GameStats: `players` = [port index, connect code]; the winner is set via placements,
// or `lras` = the port index that quit. Different end stocks so the game is never a tie.
const game = (players: [number, string?][], opts: { winner?: number; lras?: number } = {}): GameStats => ({
	gameEnd: {
		gameEndMethod: opts.lras !== undefined ? 7 : 2,
		lrasInitiatorIndex: opts.lras ?? -1,
		placements: players.map(([idx]) => ({ playerIndex: idx, position: idx === opts.winner ? 0 : 1 })),
	},
	isMock: false,
	isReplay: false,
	lastFrame: {
		frame: 100,
		players: Object.fromEntries(players.map(([idx], i) => [idx, { post: { playerIndex: idx, stocksRemaining: i + 1, percent: 10 * i } }])),
	},
	postGameStats: null,
	score: [0, 0],
	settings: { players: players.map(([idx, code]) => ({ playerIndex: idx, port: idx + 1, connectCode: code ?? '' })), matchInfo: {} },
	timestamp: null,
} as unknown as GameStats);

describe('findSettingsPlayer', () => {
	it('finds by port index, not array position (ports 1 + 3)', () => {
		const players = game([[0], [2]]).settings!.players;
		expect(findSettingsPlayer(players, 2)?.port).toBe(3);
		expect(findSettingsPlayer(players, 1)).toBeUndefined();
	});
});

describe('getWinnerIndex', () => {
	it('returns the winner port index from placements', () => {
		expect(getWinnerIndex(game([[0], [2]], { winner: 2 }))).toBe(2);
	});
	it('LRAS: the player who did not quit wins (ports 1 + 3)', () => {
		expect(getWinnerIndex(game([[0], [2]], { lras: 2 }))).toBe(0);
		expect(getWinnerIndex(game([[0], [2]], { lras: 0 }))).toBe(2);
	});
	it('LRAS: ports 3 + 4', () => {
		expect(getWinnerIndex(game([[2], [3]], { lras: 3 }))).toBe(2);
	});
});

describe('getGameScore — indexed by player slot', () => {
	it('ports 1 + 3: Player 2 (port 3) wins land in slot 1', () => {
		expect(getGameScore([game([[0], [2]], { winner: 2 }), game([[0], [2]], { winner: 2 })])).toEqual([0, 2]);
	});
	it('ports 2 + 4 offline', () => {
		expect(getGameScore([game([[1], [3]], { winner: 1 }), game([[1], [3]], { winner: 3 })])).toEqual([1, 1]);
	});
	it('LRAS counts for the other player', () => {
		expect(getGameScore([game([[0], [2]], { lras: 0 })])).toEqual([0, 1]);
	});
	it('players swapping ports mid-set keep their score (matched by connect code)', () => {
		const g1 = game([[0, 'AAA#1'], [1, 'BBB#2']], { winner: 0 }); // AAA on port 1 wins
		const g2 = game([[0, 'BBB#2'], [1, 'AAA#1']], { winner: 1 }); // AAA now on port 2 wins
		expect(getGameScore([g1, g2])).toEqual([2, 0]);
	});
	it('ties and no-result games do not score', () => {
		expect(getGameScore([game([[0], [1]], {})])).toEqual([0, 0]);
	});
});

describe('getPlayerSlot / didPlayerWin', () => {
	it('slot follows the set reference order', () => {
		const ref = game([[0, 'AAA#1'], [1, 'BBB#2']]).settings!.players;
		expect(getPlayerSlot(game([[0, 'BBB#2'], [1, 'AAA#1']]), 1, ref)).toBe(0);
	});
	it('didPlayerWin uses the slot for ports 1 + 3', () => {
		const g = { ...game([[0], [2]], { winner: 2 }), score: [0, 1] } as GameStats;
		expect(didPlayerWin(g, { playerIndex: 2 } as Player)).toBe(true);
		expect(didPlayerWin(g, { playerIndex: 0 } as Player)).toBe(false);
	});
});

describe('gameWinnerSlot (per-game summaries)', () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { gameWinnerSlot } = require('../../frontend/src/lib/utils/gamePredicates');
	it('reads each game\'s winner from the set score after it', () => {
		const games = [{ score: [1, 0] }, { score: [1, 1] }, { score: [1, 1] }, { score: [2, 1] }];
		expect([0, 1, 2, 3].map((i) => gameWinnerSlot(games, i))).toEqual([0, 1, undefined, 0]); // game 3 = tie / no result
		expect(gameWinnerSlot(games, 9)).toBeUndefined();
	});
});

describe('result overrides (host, with a note)', () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { getGameScore } = require('../../frontend/src/lib/utils/gamePredicates');
	const game = (winnerPort: number, override?: { winnerSlot: 0 | 1 | null; note: string }) => ({
		gameEnd: { gameEndMethod: 2, lrasInitiatorIndex: -1, placements: [0, 1].map((p) => ({ playerIndex: p, position: p === winnerPort ? 0 : 1 })) },
		lastFrame: { players: { 0: { post: { stocksRemaining: winnerPort === 0 ? 2 : 0 } }, 1: { post: { stocksRemaining: winnerPort === 1 ? 2 : 0 } } } },
		settings: { players: [{ playerIndex: 0, port: 1, connectCode: '' }, { playerIndex: 1, port: 2, connectCode: '' }] },
		resultOverride: override ?? null,
	});
	it('the override decides the game; null winner = doesn\'t count', () => {
		expect(getGameScore([game(0), game(1)])).toEqual([1, 1]);
		expect(getGameScore([game(0), game(1, { winnerSlot: 0, note: 'LRAS by mistake' })])).toEqual([2, 0]);
		expect(getGameScore([game(0), game(1, { winnerSlot: null, note: 'Replay — controller unplugged' })])).toEqual([1, 0]);
	});
});

describe('disconnect endings', () => {
	const end = (gameEndMethod: number, lrasInitiatorIndex: number | null) => ({ gameEndMethod, lrasInitiatorIndex, placements: [] }) as never;
	it('No Contest without a quitter or an unresolved end is a disconnect; normal finishes and LRAS are not', () => {
		expect(isDisconnectEnding(end(7, -1))).toBe(true);
		expect(isDisconnectEnding(end(7, null))).toBe(true);
		expect(isDisconnectEnding(end(0, -1))).toBe(true);
		expect(isDisconnectEnding(end(7, 1))).toBe(false); // player 2 quit (LRAS)
		expect(isDisconnectEnding(end(2, -1))).toBe(false); // GAME!
		expect(isDisconnectEnding(end(1, -1))).toBe(false); // TIME!
		expect(isDisconnectEnding(undefined)).toBe(false);
	});
});

describe('swapped sides (Fix set…)', () => {
	it('singles: the score, a hand-set result and slots follow the swap stored on the first game', () => {
		const g1 = { ...game([[0, 'A#1'], [1, 'B#2']], { winner: 0 }), sides: { swapped: true } } as GameStats;
		const g2 = game([[0, 'A#1'], [1, 'B#2']], { winner: 0 });
		expect(getGameScore([g1, g2])).toEqual([0, 2]); // A (port 1) is now Player 2
		const forced = { ...game([[0, 'A#1'], [1, 'B#2']]), resultOverride: { winnerSlot: 0 as const, note: '' } } as GameStats;
		expect(getGameScore([g1, forced])).toEqual([1, 1]); // hand-set results name the side as shown
		expect(getGameScore([{ ...g1, sides: null }, g2])).toEqual([2, 0]);
	});

	it('doubles: Team 1 is the red team unless swapped', () => {
		const teams = (winnerTeam: number, sides?: GameStats['sides']) =>
			({
				...game([[0], [1], [2], [3]]),
				settings: { isTeams: true, matchInfo: {}, players: [0, 1, 2, 3].map((i) => ({ playerIndex: i, port: i + 1, teamId: i % 2, connectCode: '' })) },
				gameEnd: { gameEndMethod: 2, lrasInitiatorIndex: -1, placements: [0, 1, 2, 3].map((i) => ({ playerIndex: i, position: i % 2 === winnerTeam ? 0 : 1 })) },
				sides,
			}) as unknown as GameStats;
		expect(getGameScore([teams(0), teams(0)])).toEqual([2, 0]); // red (teamId 0) = Team 1
		expect(getGameScore([teams(0, { swapped: true }), teams(0)])).toEqual([0, 2]);
	});
});
