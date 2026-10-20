import type { StrikeState } from '../models/types/stageStriking';
import { STRIKE_STAGES, stageStatus, strikeTurn } from './strikeStageStatus';

type Side = 'p1' | 'p2';

/** One stage in {{state.strike.stages.<stage>…}}. */
export interface FlowStrikeStage {
	/** Stage name, e.g. "Battlefield". */
	name: string;
	/** available · locked (not usable now) · struck (game 1) · banned (by the last winner) · dsr (the picker
	 *  already won there) · picked (this game's stage). */
	status: 'available' | 'locked' | 'struck' | 'banned' | 'dsr' | 'picked';
	isAvailable: boolean;
	isLocked: boolean;
	isStruck: boolean;
	isBanned: boolean;
	isDsr: boolean;
	isPicked: boolean;
	/** Who struck / banned / picked it this game (p1 / p2), else empty. */
	by: Side | null;
	byName: string | null;
	/** Its place in this game's strikes / bans / pick (1 = first), else empty. */
	order: number | null;
}

/** One strike, ban or pick in {{state.strike.history.<n>…}} — the whole set, in order. */
export interface FlowStrikeHistory {
	/** 1, 2, 3… over the whole set. */
	order: number;
	game: number;
	action: 'strike' | 'ban' | 'pick';
	stage: string;
	/** stages.<key> of that stage, e.g. dreamLand. */
	stageKey: string;
	/** p1 / p2; empty for game 1's stage left over after striking. */
	player: Side | null;
	name: string | null;
}

/** {{state.strike…}} — the whole stage striking state, readable in flows. */
export interface FlowStrikeState {
	/** charSelect · rps · rpsResult · striking · stageBan · stagePick · charLock · charPick · playing · setComplete */
	phase: string;
	gameNumber: number;
	bestOf: number;
	score: { p1: number; p2: number };
	/** Who must act now (empty = both or nobody) and what: pickCharacter · rps · chooseStrikeOrder · strike · ban · pick · answerAgreement · play · done. */
	turn: { player: Side | null; name: string | null; action: string };
	p1: { name: string; character: string | null; partnerCharacter: string | null; rps: string | null; dsr: string };
	p2: { name: string; character: string | null; partnerCharacter: string | null; rps: string | null; dsr: string };
	/** Who won rock-paper-scissors, else empty. */
	rpsWinner: Side | null;
	/** The stage this game is played on (name), else empty. */
	stage: string | null;
	/** Every strike, ban and pick of the set, in order. */
	history: FlowStrikeHistory[];
	/** Every legal stage by key: fountainOfDreams, battlefield, finalDestination, dreamLand, yoshisStory, pokemonStadium. */
	stages: Record<string, FlowStrikeStage>;
}

/** Stage key in {{state.strike.stages.<key>}}: "Yoshi's Story" → yoshisStory. */
export const stageKey = (name: string) =>
	name
		.normalize('NFD')
		.replace(/[\u0300-\u036f']/g, '')
		.split(/[^A-Za-z0-9]+/)
		.filter(Boolean)
		.map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()))
		.join('');

const side = (n: 1 | 2 | null | undefined): Side | null => (n === 1 ? 'p1' : n === 2 ? 'p2' : null);

/** The flow view of a stage striking state (who struck what comes from the set's stage log). */
export function strikeFlowState(state: StrikeState | undefined, characterName: (id: number) => string | null): FlowStrikeState | null {
	if (!state || state.phase === 'lobby') return null;
	const names = { p1: state.p1Name, p2: state.p2Name };
	const nameOf = (s: Side | null) => (s ? names[s] : null);
	const stageName = (id: number) => STRIKE_STAGES.find((s) => s.stageId === id)?.name ?? `Stage ${id}`;
	const log = state.stageLog ?? [];
	const history: FlowStrikeHistory[] = log.map((e, i) => ({
		order: i + 1,
		game: e.game,
		action: e.action,
		stage: stageName(e.stageId),
		stageKey: stageKey(stageName(e.stageId)),
		player: side(e.player),
		name: nameOf(side(e.player)),
	}));
	const thisGame = log.filter((e) => e.game === state.gameNum);
	const firstGame = (state.gameNum ?? 1) === 1 && !state.lastWinner;

	const stages: Record<string, FlowStrikeStage> = {};
	for (const s of STRIKE_STAGES) {
		const base = stageStatus(state, s.stageId);
		const banned = !firstGame && (state.bans ?? []).includes(s.stageId);
		const status: FlowStrikeStage['status'] = base === 'struck' && banned ? 'banned' : base;
		const entryIndex = thisGame.findIndex((e) => e.stageId === s.stageId && (status === 'picked' ? e.action === 'pick' : e.action !== 'pick'));
		const entry = ['struck', 'banned', 'picked'].includes(status) && entryIndex >= 0 ? thisGame[entryIndex] : undefined;
		const by = side(entry?.player);
		stages[stageKey(s.name)] = {
			name: s.name,
			status,
			isAvailable: status === 'available',
			isLocked: status === 'locked',
			isStruck: status === 'struck',
			isBanned: status === 'banned',
			isDsr: status === 'dsr',
			isPicked: status === 'picked',
			by,
			byName: nameOf(by),
			order: entry ? entryIndex + 1 : null,
		};
	}
	const turn = strikeTurn(state);
	const player = (p: Side) => {
		const char = state.characters?.[p];
		const partner = state.partnerCharacters?.[p];
		return {
			name: names[p],
			character: char != null ? characterName(char) : null,
			partnerCharacter: partner != null ? characterName(partner) : null,
			rps: state.rps?.[p] ?? null,
			dsr: (state.dsrStages?.[p] ?? []).map(stageName).join(', '),
		};
	};
	return {
		phase: state.phase,
		gameNumber: state.gameNum,
		bestOf: state.bestOf,
		score: { p1: state.score?.p1 ?? 0, p2: state.score?.p2 ?? 0 },
		turn: { player: side(turn.player), name: nameOf(side(turn.player)), action: turn.action },
		p1: player('p1'),
		p2: player('p2'),
		rpsWinner: side(state.rps?.winner),
		stage: state.finalStageId != null && stageStatus(state, state.finalStageId) === 'picked' ? stageName(state.finalStageId) : null,
		history,
		stages,
	};
}
