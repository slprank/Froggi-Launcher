import type { Flow, FlowAction, FlowEdge, FlowNode } from '../models/types/flow';

/** Id of the shipped highlights flow (installed once, disabled — turn it on in Flows). */
export const HIGHLIGHTS_FLOW_ID = 'highlights';

/**
 * Highlights from OBS's replay buffer, built only from visible cards — every rule, list and step is a card
 * the user (or the AI) can read and change:
 *  - a punish ends → one Calculate per rule → total ≥ 40? → Mark highlight → add it to gameList → save the buffer
 *  - game end → gameList: best first, keep 5, by time → video "game" → add to setList → video "set"
 *  - set over → add setList to tournament → shuffle → video "tournament"
 *  - values stay until a Clear values card clears them: a game starts → clear gameList; a new set (game
 *    start with {{newSet}}, or a Dashboard set start) → clear setList; the tournament list is never cleared
 */

const X = (col: number) => 40 + col * 300;
const ROW = 120;

/** The rules: one Calculate each, a note beside it. */
const RULES: { key: string; formula: string; note: string }[] = [
	{ key: 'kill', formula: '{{didKill}} * 50 + {{gameEnding}} * 25', note: 'Kill: kills weigh the most (50); the game-ending kill 25 more.' },
	{ key: 'damage', formula: 'min({{damage}}, 120) / 4', note: 'Damage done in the sequence, up to 30.' },
	{ key: 'speed', formula: 'clamp({{hitsPerSecond}} * 8, 0, 25)', note: 'Speed always counts: hits per second × 8, up to 25.' },
	{ key: 'swing', formula: 'max({{winChanceSwing}}, 0) * 0.8', note: 'Win-chance swing: how much the attacker\'s chance to win went up (percent points × 0.8). Self-destructs are no sequence, so they never score.' },
	{ key: 'multi', formula: '({{teamKills}} >= 2) * 40', note: 'Multi-kill (doubles): two KOs by the same team within 5 s, 40.' },
	{ key: 'long', formula: '-max({{seconds}} - 8, 0) * 3', note: 'Long sequences (e.g. a slow off-stage chase) lose 3 per second after 8 s.' },
	{ key: 'total', formula: '{{kill}} + {{damage}} + {{speed}} + {{swing}} + {{multi}} + {{long}}', note: 'Total: the rules above added up — the highlight\'s score.' },
];

/** A vertical chain of cards in column `col` starting at row `y`, each with an optional note beside it. */
type Step = { id: string; data: FlowAction | Extract<FlowNode, { kind: 'condition' }>['data']; kind?: 'condition'; note?: string };
const column = (steps: Step[], col: number, y: number): FlowNode[] =>
	steps.flatMap((s, i) => [
		{ id: s.id, kind: s.kind ?? 'action', position: { x: X(col), y: y + i * ROW }, data: s.data } as FlowNode,
		...(s.note ? [{ id: `note-${s.id}`, kind: 'note', position: { x: X(col + 1), y: y + i * ROW }, data: { type: 'note', text: s.note } } as FlowNode] : []),
	]);
const chain = (ids: string[]): FlowEdge[] => ids.slice(1).map((id, i) => ({ id: `e-${ids[i]}-${id}`, source: ids[i], target: id }));

const SEQ_Y = 8 * ROW;
const SEQUENCE: Step[] = [
	...RULES.map((r) => ({ id: `calc-${r.key}`, data: { type: 'calculate', key: r.key, formula: r.formula, description: r.note } as FlowAction, note: r.note })),
	{ id: 'gate', kind: 'condition', data: { type: 'compare', left: '{{total}}', op: '>=', right: '40' }, note: 'A candidate from 40: every kill passes; other punishes need damage, speed or a big swing. The game end keeps only the best 5.' },
	{ id: 'mark', data: { type: 'markHighlight', before: 2, after: 2, maxSeconds: 10, score: '{{total}}' }, note: 'Mark: 2 s before the first hit to 2 s after the end (at most the last 10 s), score = total. Gives {{highlight}} (its id) to the next card, and is saved with the game (frames in its replay).' },
	{ id: 'add-game', data: { type: 'list', key: 'gameList', description: "This game's highlight candidates (id, score, game, kill).", op: 'add', fields: [{ name: 'id', value: '{{highlight}}' }, { name: 'score', value: '{{total}}' }, { name: 'game', value: '{{state.match.gameNumber}}' }, { name: 'kill', value: '{{didKill}}' }] }, note: 'Every candidate goes into this game\'s list as an item: id (the highlight), score, game number, kill.' },
	{ id: 'wait-save', data: { type: 'timer', key: 'highlight-save', seconds: 2.5 }, note: 'Wait until the 2 s after the sequence have been recorded (sequences close together share one save).' },
	{ id: 'save', data: { type: 'obsSaveReplay' }, note: 'OBS saves its replay buffer — the footage of the highlight.' },
];

const END_Y = SEQ_Y + SEQUENCE.length * ROW + 2 * ROW;
const GAME_END: Step[] = [
	{ id: 'wait-reel', data: { type: 'timer', key: 'highlight-reel', seconds: 4 }, note: 'Wait 4 s so the last save is written.' },
	{ id: 'sort-score', data: { type: 'list', key: 'gameList', op: 'sort', formula: '{{item.score}}', order: 'high' }, note: 'Best first: sort by each item\'s score, high → low.' },
	{ id: 'limit', data: { type: 'list', key: 'gameList', op: 'limit', count: 5 }, note: 'Keep the best 5 of the game.' },
	{ id: 'sort-time', data: { type: 'list', key: 'gameList', op: 'sort', formula: '{{item.added}}', order: 'low' }, note: 'Play them in the order they happened: sort by when each was added, low → high.' },
	{ id: 'video-game', data: { type: 'buildHighlightReel', key: 'game', list: 'gameList' }, note: 'Video "game" (e.g. in Post Game): the game\'s best 5.' },
	{ id: 'add-set', data: { type: 'list', key: 'setList', op: 'addList', from: 'gameList' }, note: 'Add the game\'s best 5 to the set — games stay in order.' },
	{ id: 'video-set', data: { type: 'buildHighlightReel', key: 'set', list: 'setList' }, note: 'Video "set" (e.g. in Post Set): the set so far, game by game.' },
	{ id: 'set-over', kind: 'condition', data: { type: 'compare', left: '{{state.set.isComplete}}', op: '==', right: 'true' }, note: 'Is the set over?' },
	{ id: 'add-tournament', data: { type: 'list', key: 'tournament', op: 'addList', from: 'setList' }, note: 'Add the set to the tournament list (kept until Froggi closes).' },
	{ id: 'shuffle', data: { type: 'list', key: 'tournament', op: 'shuffle' }, note: 'Shuffle the whole tournament.' },
	{ id: 'video-tournament', data: { type: 'buildHighlightReel', key: 'tournament', list: 'tournament' }, note: 'Video "tournament": every set\'s highlights, shuffled — show it in any scene.' },
];

const seqIds = SEQUENCE.map((s) => s.id);
const endIds = GAME_END.map((s) => s.id);
const log = (id: string, x: number, y: number, message: string): FlowNode => ({ id, kind: 'action', position: { x, y }, data: { type: 'log', message } });

export const HIGHLIGHTS_FLOW: Flow = {
	id: HIGHLIGHTS_FLOW_ID,
	name: 'Highlights (replay buffer)',
	enabled: false,
	nodes: [
		{
			id: 'about', kind: 'note', position: { x: 40, y: -300 },
			data: { type: 'note', text: 'Highlight reels from OBS\'s replay buffer — every step is a card you can read and change (or tell the AI assistant what a highlight is for you). Videos: "game" (best 5 of the game), "set" (the set, game by game), "tournament" (every set, shuffled) — add a Video element with one of those keys. Froggi never deletes the replay files.' },
		},
		{ id: 't-start', kind: 'trigger', position: { x: X(0), y: 0 }, data: { type: 'gameStart' } },
		...column([{ id: 'settings', data: { type: 'obsReplayBufferSettings', seconds: 30, format: 'hybrid_mp4', fileName: 'Froggi game {{state.match.gameNumber}}' }, note: 'OBS replay buffer: 30 s, Hybrid MP4, files named "Froggi game N …" (nothing happens when already set).' }], 1, 0),
		log('settings-failed', X(2), ROW, 'Highlights: could not set the replay buffer — {{error}}'),
		...column([
			{ id: 'clear-game', data: { type: 'clearValues', keys: 'gameList' }, note: 'A new game: its list starts over.' },
			{ id: 'new-set', kind: 'condition', data: { type: 'compare', left: '{{newSet}}', op: '==', right: 'true' }, note: 'Does this game start a new set?' },
			{ id: 'clear-set', data: { type: 'clearValues', keys: 'setList' }, note: 'Then the set list starts over too. The tournament list is never cleared here — to start over, add a Clear values card for "tournament" after an event you choose (e.g. a controller combo).' },
		], 1, 2 * ROW),
		{ id: 't-set', kind: 'trigger', position: { x: X(0), y: 5 * ROW }, data: { type: 'setStart' } },

		{ id: 't-seq', kind: 'trigger', position: { x: X(0), y: SEQ_Y }, data: { type: 'sequence', kind: 'punish', player: 'any' } },
		...column(SEQUENCE, 1, SEQ_Y),
		log('save-failed', X(3), SEQ_Y + (SEQUENCE.length - 1) * ROW, 'Highlights: replay buffer not saved — {{error}}'),

		{ id: 't-end', kind: 'trigger', position: { x: X(0), y: END_Y }, data: { type: 'gameEnd' } },
		...column(GAME_END, 1, END_Y),
		log('game-failed', X(3), END_Y + endIds.indexOf('video-game') * ROW, 'Highlights: video "game" not built — {{error}}'),
		log('set-failed', X(3), END_Y + endIds.indexOf('video-set') * ROW, 'Highlights: video "set" not built — {{error}}'),
		log('tournament-failed', X(3), END_Y + endIds.indexOf('video-tournament') * ROW, 'Highlights: video "tournament" not built — {{error}}'),
	],
	edges: [
		{ id: 'e-start', source: 't-start', target: 'settings' },
		{ id: 'e-start-clear', source: 't-start', target: 'clear-game' },
		...chain(['clear-game', 'new-set', 'clear-set']),
		{ id: 'e-set-clear', source: 't-set', target: 'clear-set' },
		{ id: 'e-start-err', source: 'settings', target: 'settings-failed', sourceHandle: 'error' },
		{ id: 'e-seq', source: 't-seq', target: seqIds[0] },
		...chain(seqIds),
		{ id: 'e-save-err', source: 'save', target: 'save-failed', sourceHandle: 'error' },
		{ id: 'e-end', source: 't-end', target: endIds[0] },
		...chain(endIds),
		{ id: 'e-game-err', source: 'video-game', target: 'game-failed', sourceHandle: 'error' },
		{ id: 'e-game-err-go', source: 'game-failed', target: 'add-set' },
		{ id: 'e-set-err', source: 'video-set', target: 'set-failed', sourceHandle: 'error' },
		{ id: 'e-set-err-go', source: 'set-failed', target: 'set-over' },
		{ id: 'e-tournament-err', source: 'video-tournament', target: 'tournament-failed', sourceHandle: 'error' },
	],
};
