import fs from 'fs';
import path from 'path';
import { AnimationTrigger } from '../../frontend/src/lib/models/types/animationOption';
import { CustomElement } from '../../frontend/src/lib/models/constants/customElement';
import { LiveStatsScene } from '../../frontend/src/lib/models/enum';
import type { GridContentItem, Overlay } from '../../frontend/src/lib/models/types/overlay';
import {
	LEGACY_TRIGGER_ELEMENTS,
	LEGACY_TRIGGERS,
	SELF,
	activeTriggers,
	elementTriggerFires,
	firstNumber,
	migrateOverlayTriggers,
	triggerAnimations,
} from '../../frontend/src/lib/utils/elementTriggers';

const DEMOS = path.join(__dirname, '../../../demo-overlays');
const FIXTURES = path.join(__dirname, '../../../test/fixtures');
const load = (file: string, dir = DEMOS) => JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')) as Overlay;
/** The demo HUD as it shipped before element triggers (legacy named triggers only). */
const legacyHud = () => load('legacy-hud.json', FIXTURES);
const items = (overlay: Overlay) =>
	Object.values(LiveStatsScene).flatMap((scene) => (overlay[scene]?.layers ?? []).flatMap((l) => l.items.map((item) => ({ scene, item }))));
const KNOWN = new Set<string>(Object.values(AnimationTrigger));

/** Every trigger an item had before → still a working named trigger, or a "self" element trigger on an element that shows that value. */
function expectEveryTriggerKept(before: GridContentItem, after: GridContentItem) {
	triggerAnimations(before.data).forEach((t, i) => {
		const now = triggerAnimations(after.data)[i];
		for (const label of activeTriggers(t.selectedOptions)) {
			if (!KNOWN.has(label)) continue; // never fired (unknown label) — dropped
			if (now.selectedOptions[label]) continue; // kept as it was (evaluated exactly as before)
			expect(LEGACY_TRIGGER_ELEMENTS[label]).toContain(after.elementId);
			expect(now.elementTriggers).toContainEqual({ source: SELF, when: 'change' });
		}
	});
}

describe('element triggers: legacy overlays keep working', () => {
	it('legacy demo HUD: value triggers on their own element become "this element changes"; game events stay', () => {
		const before = legacyHud();
		const after = legacyHud();
		expect(migrateOverlayTriggers(after)).toBe(true);
		const pairs = items(before).map((b, i) => [b.item, items(after)[i].item] as const);
		pairs.forEach(([b, a]) => expectEveryTriggerKept(b, a));

		const of = (elementId: CustomElement) => pairs.filter(([b]) => b.elementId === elementId).map(([, a]) => a.data.animationTrigger);
		// Game events are not value mirrors: unchanged.
		expect(of(CustomElement.InGameTimerSecondsCountdown)[0].selectedOptions[AnimationTrigger.InGameGameCountdown]).toBe(true);
		expect(of(CustomElement.InGamePlayer1StocksRemaining)[0].selectedOptions[AnimationTrigger.InGamePlayer1StockLost]).toBe(true);
		expect(of(CustomElement.CustomString).some((t) => t.selectedOptions[AnimationTrigger.InGamePlayer1Percent])).toBe(true);
		// Player 1's icon showing Player 1's character → self.
		for (const t of of(CustomElement.InGamePlayer1CharacterIcon)) {
			expect(t.selectedOptions[AnimationTrigger.InGamePlayer1CharacterChange]).toBeUndefined();
			expect(t.elementTriggers).toEqual([{ source: SELF, when: 'change' }]);
		}
		// Player 2's icon: its own character → self; Player 1's character (another element's value) stays legacy.
		for (const t of of(CustomElement.InGamePlayer2CharacterIcon)) {
			expect(t.selectedOptions[AnimationTrigger.InGamePlayer2CharacterChange]).toBeUndefined();
			expect(t.selectedOptions[AnimationTrigger.InGamePlayer1CharacterChange]).toBe(true);
			expect(t.elementTriggers).toEqual([{ source: SELF, when: 'change' }]);
		}
		expect(migrateOverlayTriggers(after)).toBe(false); // idempotent
	});

	it('every demo overlay (and the legacy HUD): no trigger lost, unknown labels dropped, idempotent', () => {
		for (const [file, dir] of [...fs.readdirSync(DEMOS).filter((f) => f.endsWith('.json')).map((f) => [f, DEMOS]), ['legacy-hud.json', FIXTURES]]) {
			const before = load(file, dir);
			const after = load(file, dir);
			migrateOverlayTriggers(after);
			items(before).forEach((b, i) => expectEveryTriggerKept(b.item, items(after)[i].item));
			for (const { item } of items(after))
				for (const t of triggerAnimations(item.data)) for (const label of Object.keys(t.selectedOptions ?? {})) expect(KNOWN).toContain(label);
			expect(migrateOverlayTriggers(after)).toBe(false);
		}
	});

	it('shipped demos are modern: no legacy triggers, nothing left to migrate; HUD keeps its game-event triggers', () => {
		for (const file of fs.readdirSync(DEMOS).filter((f) => f.endsWith('.json'))) {
			const overlay = load(file);
			const legacy = items(overlay).flatMap(({ item }) => triggerAnimations(item.data).flatMap((t) => activeTriggers(t.selectedOptions))).filter((l) => LEGACY_TRIGGERS.has(l));
			expect([file, legacy]).toEqual([file, []]);
			expect([file, migrateOverlayTriggers(overlay)]).toEqual([file, false]);
		}
		const hud = items(load('hud.json')).flatMap(({ item }) => activeTriggers(item.data.animationTrigger.selectedOptions));
		expect(hud).toEqual(expect.arrayContaining([AnimationTrigger.InGameGameCountdown, AnimationTrigger.InGamePlayer1StockLost, AnimationTrigger.InGamePlayer1Percent]));
		const score = items(load('Score.json')).filter(({ item }) => item.elementId === CustomElement.MatchPlayer1Tag);
		expect(score[0].item.data.animationTrigger.elementTriggers).toEqual([{ source: SELF, when: 'change' }]);
	});

	it('event triggers are never legacy (e.g. damage shakes a character render)', () => {
		for (const t of [AnimationTrigger.InGamePlayer1Percent, AnimationTrigger.InGamePlayer1StockLost, AnimationTrigger.InGameGameCountdown, AnimationTrigger.StrikeAnyStageStruck])
			expect(LEGACY_TRIGGERS.has(t)).toBe(false);
	});
});

describe('element triggers: when they fire', () => {
	it('change / increase / decrease; appearing or disappearing never fires', () => {
		expect(elementTriggerFires('change', 'Mango', 'Cody')).toBe(true);
		expect(elementTriggerFires('change', 'Mango', 'Mango')).toBe(false);
		expect(elementTriggerFires('change', undefined, 'Mango')).toBe(false); // first appearance
		expect(elementTriggerFires('change', 'Mango', undefined)).toBe(false); // hidden
		expect(elementTriggerFires('increase', '42%', '57%')).toBe(true);
		expect(elementTriggerFires('increase', '57%', '0%')).toBe(false);
		expect(elementTriggerFires('decrease', '57%', '0%')).toBe(true); // respawn
		expect(elementTriggerFires('increase', 'Mango', 'Cody')).toBe(false); // no numbers
		expect(firstNumber('1,500 (+12)')).toBe(1500);
		expect(firstNumber('-3.5 rating')).toBe(-3.5);
	});
});
