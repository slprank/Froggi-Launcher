export type RpsChoice = 'rock' | 'paper' | 'scissors';

export type StrikePhase =
	| 'lobby'
	| 'rps'
	| 'rpsResult'
	| 'striking'
	| 'stageBan'
	| 'stagePick'
	| 'charSelect'
	| 'charLock'
	| 'charPick'
	| 'playing'
	| 'setComplete';

export interface GameRecord {
	stageId: number;
	winner: 1 | 2 | null;
	p1Char: number | null;
	p2Char: number | null;
	/** Doubles: each team's second player (teamMembers[1]). */
	p1PartnerChar?: number | null;
	p2PartnerChar?: number | null;
	warmup: boolean;
}

export interface StageLogEntry {
	game: number;
	action: 'strike' | 'ban' | 'pick';
	stageId: number;
	player: 1 | 2 | null;
}

export interface StrikeState {
	p1Name: string;
	p2Name: string;
	bestOf: 3 | 5;
	score: { p1: number; p2: number };
	gameNum: number;

	phase: StrikePhase;

	starters: number[];
	counterpicks: number[];
	stages: number[];
	strikes: number[];
	finalStageId: number | null;

	currentStriker: 1 | 2 | null;
	strikeOrder: [1 | 2, number][];
	strikeOrderIndex: number;

	rps: {
		p1: RpsChoice | null;
		p2: RpsChoice | null;
		winner: 1 | 2 | null;
	};
	/** Epoch ms when the RPS countdown ends. Set once both players are connected. null = not started. */
	rpsDeadline: number | null;

	characters: {
		p1: number | null;
		p2: number | null;
	};
	/** Doubles: the character of each team's second player (teamMembers.pN[1]); `characters` = first player. */
	partnerCharacters?: { p1: number | null; p2: number | null };
	/** Doubles: each team's players as shown on the phones (tag, else "Port N"), lower port first. */
	teamMembers?: { p1: [string, string]; p2: [string, string] } | null;

	dsrStages: { p1: number[]; p2: number[] };
	lastWinner: 1 | 2 | null;

	games: GameRecord[];
	connectedPlayers: (1 | 2)[];

	/** The host swapped sides (Fix set…): a phone link /set/p/N now plays side N's other one (tokens keep their link). */
	sidesSwapped?: boolean;
	/** Every strike, ban and pick of the set in order (game 1's left-over stage: a pick by nobody). */
	stageLog?: StageLogEntry[];
	/** Stages the previous winner banned for the current game (cleared when it is reported). */
	bans?: number[];
	/** Players may agree to play a stage DSR blocks (both confirm on their phones). Default on. */
	allowAgreement?: boolean;
	/** Pending agreement: the picker asked to play a DSR-blocked stage; the other player must accept. */
	agreement?: { stageId: number; requestedBy: 1 | 2 } | null;
	/** The set's players, taken from its first Slippi game — later games only count if they match. */
	setPlayers?: { connectCode: string; playerIndex: number }[] | null;
	/** Stage list + wording: singles (players) or doubles (teams strike as one side). */
	ruleset?: StrikeRuleset;
	/** The host paused striking: phones can't act until it is resumed (the host still can). */
	paused?: boolean;
	/** Set winner when the host ended the match early (for result reporting). */
	setWinner?: 1 | 2 | null;
	/** Last change (epoch ms) — a set idle for 3 hours ends on startup. */
	updatedAt?: number;
}

export type StrikeRuleset = 'singles' | 'doubles';

/** Stage lists per ruleset (2025 majors): doubles drops Fountain of Dreams and has no counterpicks. */
export const STRIKE_RULESETS: Record<StrikeRuleset, { label: string; starters: number[]; counterpicks: number[] }> = {
	singles: { label: 'Singles', starters: [2, 8, 28, 31, 32], counterpicks: [3] },
	doubles: { label: 'Doubles', starters: [31, 28, 32, 3, 8], counterpicks: [] },
};

/** How a stage looks right now in the striking UI / overlay conditions. */
export type StageStatus = 'available' | 'locked' | 'struck' | 'dsr' | 'picked';
