/**
 * KO effects for the live game viewer (GameStateRender), like Melee's. Dead action states:
 *  0–2   DeadDown / DeadLeft / DeadRight            → "blast": a beam of the player's colour fired from the blast zone into the stage
 *  3–5   DeadUp / DeadUpStar / DeadUpStarIce       → "star": no explosion off the top — the player vanishes and a star twinkles
 *  6–10  DeadUpFall… (flying into the screen)       → no effect
 */
export type KoKind = 'blast' | 'star';

export const koKind = (actionStateId: number | null | undefined): KoKind | null =>
	actionStateId == null || actionStateId < 0 ? null : actionStateId <= 2 ? 'blast' : actionStateId <= 5 ? 'star' : null;

export interface KoPlayer {
	playerIndex: number;
	actionStateId: number;
	x: number;
	y: number;
}

export interface KoStart extends KoPlayer {
	kind: KoKind;
}

/**
 * Players that ENTERED a dead state since the previous frame. A player already dead when first seen
 * (viewer opened mid-KO) does not count — `prev` has no entry for them yet.
 */
export function detectKos(prev: Record<number, number | undefined>, players: KoPlayer[]): KoStart[] {
	const out: KoStart[] = [];
	for (const p of players) {
		const kind = koKind(p.actionStateId);
		const before = prev[p.playerIndex];
		if (kind && before !== undefined && !koKind(before)) out.push({ ...p, kind });
	}
	return out;
}

/** World-space rectangle (y up). */
export interface Rect {
	xMin: number;
	xMax: number;
	yMin: number;
	yMax: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Where an effect is drawn (world space) and which way a blast points (degrees, 0 = right, 90 = up).
 * `ko.x / ko.y` = the player's last position (the frame before the KO). Blast: there (kept inside the
 * stage's blast zones `blast`, else the view), aimed back at the stage — the death state says which side.
 * Star: at the player's last x, near the top of what the camera shows (the star twinkles in view).
 */
export function koPlacement(ko: KoStart, view: Rect, blast?: Rect | null, margin = 0.06): { x: number; y: number; angle: number } {
	const mx = (view.xMax - view.xMin) * margin;
	const my = (view.yMax - view.yMin) * margin;
	const inside = { xMin: view.xMin + mx, xMax: view.xMax - mx, yMin: view.yMin + my, yMax: view.yMax - my };
	if (ko.kind === 'star') return { x: clamp(ko.x, inside.xMin, inside.xMax), y: inside.yMax - my, angle: 0 };
	const zone = blast ?? view;
	const at = { x: clamp(ko.x, zone.xMin, zone.xMax), y: clamp(ko.y, zone.yMin, zone.yMax) };
	return { ...at, angle: ko.actionStateId === 0 ? 90 : ko.actionStateId === 1 ? 0 : 180 };
}

/** How long each effect stays on screen (ms). */
export const KO_DURATION_MS: Record<KoKind, number> = { blast: 1100, star: 1400 };
