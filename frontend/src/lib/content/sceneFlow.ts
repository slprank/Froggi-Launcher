import { LiveStatsScene } from '../models/enum';
import type { Flow, FlowAction, FlowCondition, FlowNode, FlowTrigger } from '../models/types/flow';

/** Id of the shipped scene flow (installed enabled once; Flows page → Restore default brings it back). */
export const SCENE_FLOW_ID = 'scene-switching';

/**
 * Froggi's scene rules — scenes are switched by flows only, and this is the default one. Edit it to change
 * the rules. All timers use the key "scene", so a new game or a new set cancels a pending switch.
 *
 * Dolphin connects → Menu · disconnects → Waiting for Dolphin
 * Game starts → In Game
 * Game ends:
 *   set decided + ranked      → Rank Change (Rank changes → Rank Change → 8 s → Post Set → 150 s → Menu)
 *   set decided, not ranked   → Post Set → 150 s → Menu
 *   during a striking set     → Post Game → 15 s → Stage Striking (if Post Game is still showing)
 *   otherwise                 → Post Game → 150 s → Menu
 * A set starts → Stage Striking · A player makes a stage striking choice on their phone → Stage Striking (never over In Game)
 */
const col = (c: number) => 40 + c * 250;
let row = 0;
const nodes: FlowNode[] = [];
const edges: Flow['edges'] = [];
const when = (id: string, data: FlowTrigger, y: number): string => (nodes.push({ id, kind: 'trigger', position: { x: col(0), y }, data }), id);
const and = (id: string, data: FlowCondition, c: number, y: number): string => (nodes.push({ id, kind: 'condition', position: { x: col(c), y }, data }), id);
const then = (id: string, data: FlowAction, c: number, y: number): string => (nodes.push({ id, kind: 'action', position: { x: col(c), y }, data }), id);
const link = (...ids: string[]) => ids.slice(1).forEach((id, i) => edges.push({ id: `${ids[i]}-${id}`, source: ids[i], target: id }));
/** Like link, but the first step leaves from the condition's ✕ output (when it does not hold). */
const otherwise = (condition: string, ...ids: string[]) => {
	edges.push({ id: `${condition}-not-${ids[0]}`, source: condition, target: ids[0], sourceHandle: 'false' });
	link(...ids);
};
const scene = (s: LiveStatsScene) => ({ type: 'setScene', scene: s }) as const;
const timer = (seconds: number) => ({ type: 'timer', key: 'scene', seconds }) as const;
const is = (key: string, value: string, op: '==' | '!=' = '==') => ({ type: 'compare', left: `{{state.${key}}}`, op, right: value }) as const;
const y = () => (row++) * 110 + 40;

// Dolphin
link(when('dolphin-on', { type: 'dolphinConnection', connected: true }, y()), then('menu-on-connect', scene(LiveStatsScene.Menu), 1, 40));
link(when('dolphin-off', { type: 'dolphinConnection', connected: false }, y()), then('waiting', scene(LiveStatsScene.WaitingForDolphin), 1, 150));

// Game start
link(when('game-start', { type: 'gameStart' }, y()), then('cancel-on-start', { type: 'cancelTimer', key: 'scene' }, 1, 260), then('in-game', scene(LiveStatsScene.InGame), 2, 260));

// Game end — each condition's ✓ (right) and ✕ (bottom) outputs pick the branch
const gameEndY = y() + 90;
row += 4;
const gameEnd = when('game-end', { type: 'gameEnd' }, gameEndY + 120);
const setOver = and('set-over', is('set.isComplete', 'true'), 1, gameEndY + 120);
const ranked = and('ranked', is('mode', 'ranked'), 2, gameEndY);
const striking = and('striking', is('set.isActive', 'true'), 2, gameEndY + 270);
link(gameEnd, setOver, ranked, then('rank-change', scene(LiveStatsScene.RankChange), 3, gameEndY));
otherwise(ranked, then('post-set', scene(LiveStatsScene.PostSet), 3, gameEndY + 120), then('post-set-wait', timer(150), 4, gameEndY + 120), then('menu-after-set', scene(LiveStatsScene.Menu), 5, gameEndY + 120));
otherwise(setOver, striking, then('post-game-set', scene(LiveStatsScene.PostGame), 3, gameEndY + 270), then('strike-wait', timer(15), 4, gameEndY + 270), and('still-post-game', is('scene', LiveStatsScene.PostGame), 5, gameEndY + 270), then('to-strike', scene(LiveStatsScene.StrikePhase), 6, gameEndY + 270));
otherwise(striking, then('post-game', scene(LiveStatsScene.PostGame), 3, gameEndY + 400), then('post-game-wait', timer(150), 4, gameEndY + 400), then('menu-after-game', scene(LiveStatsScene.Menu), 5, gameEndY + 400));

// Rank change (ranked set decided): show it, then Post Set
const rankY = gameEndY + 520;
link(when('rank', { type: 'rankChange' }, rankY), then('rank-scene', scene(LiveStatsScene.RankChange), 1, rankY), then('rank-wait', timer(8), 2, rankY), then('post-set-after-rank', scene(LiveStatsScene.PostSet), 3, rankY), then('menu-after-rank-wait', timer(150), 4, rankY), then('menu-after-rank', scene(LiveStatsScene.Menu), 5, rankY));

// A set starts
const setY = rankY + 110;
link(when('set-start', { type: 'setStart' }, setY), then('cancel-on-set', { type: 'cancelTimer', key: 'scene' }, 1, setY), then('strike', scene(LiveStatsScene.StrikePhase), 2, setY));

// Stage striking: a player makes a choice on their phone → Stage Striking, but never over a running game
const phoneY = setY + 110;
link(when('phone-action', { type: 'strikeAction' }, phoneY), and('not-in-game', is('scene', LiveStatsScene.InGame, '!='), 1, phoneY), then('strike-on-phone', scene(LiveStatsScene.StrikePhase), 2, phoneY));

// Note on top
nodes.unshift({
	id: 'about',
	kind: 'note',
	position: { x: col(0), y: -150 },
	data: {
		type: 'note',
		text: 'This flow decides which scene the overlays show. It must be enabled for scenes to change automatically. Edit the cards to change timings or scenes — if you delete it, use Restore default on the Flows page, or "Use" the demo "Scene switching" for a copy.',
	},
});

export const SCENE_SWITCHING_FLOW: Flow = {
	id: SCENE_FLOW_ID,
	name: 'Scene switching',
	enabled: true,
	nodes,
	edges,
};
