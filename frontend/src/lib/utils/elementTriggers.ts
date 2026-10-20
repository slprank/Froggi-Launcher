import { AnimationTrigger, type SelectedAnimationTriggerCondition } from '../models/types/animationOption';
import { CustomElement as E } from '../models/constants/customElement';
import { Animation, LiveStatsScene } from '../models/enum';
import type { ElementPayload, ElementTrigger, Overlay, TriggerAnimation } from '../models/types/overlay';

/**
 * Element triggers: an animation replays when an element of the scene changes what it shows — its own
 * ("self") or any other element's. "increase" / "decrease" compare the first number the element shows.
 * The first appearance never counts (scene animations / visibility conditions handle appearing).
 *
 * Named triggers that only meant "this value changed" are LEGACY: hidden from the picker (still shown and
 * still working where an element already uses them). `migrateOverlayTriggers` turns a legacy trigger into
 * a "self" element trigger when the element itself shows that value — the same behaviour; otherwise the
 * legacy trigger stays as it is.
 */

export const SELF = 'self';

export const ELEMENT_TRIGGER_WHEN: { value: ElementTrigger['when']; label: string }[] = [
	{ value: 'change', label: 'changes' },
	{ value: 'increase', label: 'increases' },
	{ value: 'decrease', label: 'decreases' },
];

/** A new element: animation 1 replays when the element changes (does nothing until an animation is set). */
export const defaultElementTriggers = (): ElementTrigger[] => [{ source: SELF, when: 'change' }];

/** The first number in a shown value: "142%" → 142, "1,500 (+12)" → 1500. */
export function firstNumber(value: string): number | undefined {
	const m = value.replace(/(\d),(?=\d{3})/g, '$1').match(/-?\d+(?:\.\d+)?/);
	return m ? Number(m[0]) : undefined;
}

/** Does going from `prev` to `next` fire? undefined = the element isn't shown (appearing never fires). */
export function elementTriggerFires(when: ElementTrigger['when'], prev: string | undefined, next: string | undefined): boolean {
	if (prev === undefined || next === undefined || prev === next) return false;
	if (when === 'change') return true;
	const a = firstNumber(prev);
	const b = firstNumber(next);
	if (a === undefined || b === undefined) return false;
	return when === 'increase' ? b > a : b < a;
}

/** Animation 1 + the extra animations of an element. */
export const triggerAnimations = (data: ElementPayload): TriggerAnimation[] => [data.animationTrigger, ...(data.extraAnimationTriggers ?? [])].filter(Boolean);

/** An animation that plays nothing (in and out "none") never replays — no pointless re-render. */
export const hasTriggerAnimation = (t: TriggerAnimation | undefined) =>
	!!t && ((t.in?.type ?? Animation.None) !== Animation.None || (t.out?.type ?? Animation.None) !== Animation.None);

/** "source|when" — one element trigger may be used by only one animation of an element. */
export const elementTriggerKey = (t: ElementTrigger) => `${t.source}|${t.when}`;

/**
 * Legacy "value changed" triggers → the elements that show exactly that value. Triggers missing here
 * are not value mirrors (game events: percent increase, stock loss, countdown, technique, striking…)
 * and stay as named triggers. "Rating Difference Change" is legacy but unmapped: it fires on every
 * update while a rating change is pending, which an element trigger would not copy.
 */
export const LEGACY_TRIGGER_ELEMENTS: Partial<Record<AnimationTrigger, E[]>> = {
	[AnimationTrigger.MatchBestOfChange]: [E.MatchBestOf],
	[AnimationTrigger.MatchGameModeChange]: [E.MatchGameMode],
	[AnimationTrigger.MatchPlayer1TagChange]: [E.MatchPlayer1Tag],
	[AnimationTrigger.MatchPlayer2TagChange]: [E.MatchPlayer2Tag],
	[AnimationTrigger.MatchPlayer1ScoreChange]: [E.MatchPlayer1Score, E.CurrentSetGameRecentPlayer1Score],
	[AnimationTrigger.MatchPlayer2ScoreChange]: [E.MatchPlayer2Score, E.CurrentSetGameRecentPlayer2Score],
	[AnimationTrigger.SlippiRankPlayer1ConnectCodeChange]: [E.SlippiRankPlayer1ConnectCode],
	[AnimationTrigger.SlippiRankPlayer2ConnectCodeChange]: [E.SlippiRankPlayer2ConnectCode],
	[AnimationTrigger.SlippiRankPlayer1RatingChange]: [E.SlippiRankPlayer1Rating],
	[AnimationTrigger.SlippiRankPlayer2RatingChange]: [E.SlippiRankPlayer2Rating],
	[AnimationTrigger.SlippiRankPlayer1RankChange]: [E.SlippiRankPlayer1RankText, E.SlippiRankPlayer1RankIcon],
	[AnimationTrigger.SlippiRankPlayer2RankChange]: [E.SlippiRankPlayer2RankText, E.SlippiRankPlayer2RankIcon],
	[AnimationTrigger.SlippiRankStatsWinsChange]: [E.SlippiRankCurrentPlayerWins],
	[AnimationTrigger.SlippiRankStatsLossesChange]: [E.SlippiRankCurrentPlayerLosses],
	[AnimationTrigger.SlippiRankStatsRatingChange]: [E.SlippiRankCurrentPlayerRating],
	[AnimationTrigger.SlippiRankStatsRatingDifferenceChange]: [],
	[AnimationTrigger.SlippiRankStatsRankChange]: [E.SlippiRankCurrentPlayerRankText, E.SlippiRankCurrentPlayerRankIcon],
	[AnimationTrigger.SessionWins]: [E.SessionWins],
	[AnimationTrigger.SessionLosses]: [E.SessionLosses],
	[AnimationTrigger.SessionRating]: [E.SessionRating],
	[AnimationTrigger.SessionGames]: [E.SessionGameNumber],
	[AnimationTrigger.InGameCurrentPlayerCharacterChange]: [
		E.InGameCurrentPlayerCharacterIcon,
		E.InGameCurrentPlayerCharacter,
		E.InGameCurrentPlayerCharacterSeriesSymbol,
		E.InGameCurrentPlayerCharacterSeriesSymbolUltimate,
	],
	[AnimationTrigger.InGamePlayer1CharacterChange]: [
		E.InGamePlayer1CharacterIcon,
		E.InGamePlayer1Character,
		E.InGamePlayer1CharacterSeriesSymbol,
		E.InGamePlayer1CharacterSeriesSymbolUltimate,
	],
	[AnimationTrigger.InGamePlayer2CharacterChange]: [
		E.InGamePlayer2CharacterIcon,
		E.InGamePlayer2Character,
		E.InGamePlayer2CharacterSeriesSymbol,
		E.InGamePlayer2CharacterSeriesSymbolUltimate,
	],
	[AnimationTrigger.StrikePlayer1CharChange]: [E.StrikePlayer1Character],
	[AnimationTrigger.StrikePlayer2CharChange]: [E.StrikePlayer2Character],
};

/** Hidden from the trigger picker unless already selected. */
export const LEGACY_TRIGGERS = new Set(Object.keys(LEGACY_TRIGGER_ELEMENTS) as AnimationTrigger[]);

const KNOWN_TRIGGERS = new Set<string>(Object.values(AnimationTrigger));

/**
 * Migrates one animation of an element: legacy triggers the element itself shows → a "self" element
 * trigger; unknown labels (never fired) dropped. Returns whether anything changed. Idempotent.
 */
export function migrateTriggerAnimation(t: TriggerAnimation | undefined, elementId: number): boolean {
	if (!t?.selectedOptions) return false;
	let changed = false;
	const options = t.selectedOptions as Record<string, boolean>;
	for (const [label, on] of Object.entries(options)) {
		if (!KNOWN_TRIGGERS.has(label)) {
			delete options[label];
			changed = true;
			continue;
		}
		if (!on) continue;
		const shows = LEGACY_TRIGGER_ELEMENTS[label as AnimationTrigger];
		if (!shows?.includes(elementId)) continue;
		delete options[label];
		const self: ElementTrigger = { source: SELF, when: 'change' };
		t.elementTriggers = t.elementTriggers ?? [];
		if (!t.elementTriggers.some((e) => elementTriggerKey(e) === elementTriggerKey(self))) t.elementTriggers.push(self);
		changed = true;
	}
	return changed;
}

/** Every animation of every element of the overlay (see migrateTriggerAnimation). */
export function migrateOverlayTriggers(overlay: Overlay): boolean {
	let changed = false;
	for (const scene of Object.values(LiveStatsScene)) {
		for (const layer of overlay[scene]?.layers ?? []) {
			for (const item of layer.items ?? []) {
				if (!item?.data) continue;
				for (const t of triggerAnimations(item.data)) changed = migrateTriggerAnimation(t, item.elementId) || changed;
			}
		}
	}
	return changed;
}

/** The named triggers that are on. */
export const activeTriggers = (options: SelectedAnimationTriggerCondition | undefined) =>
	Object.entries(options ?? {})
		.filter(([, on]) => on)
		.map(([label]) => label as AnimationTrigger);
