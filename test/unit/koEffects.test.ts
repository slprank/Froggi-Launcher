import { detectKos, koKind, koPlacement } from '../../frontend/src/lib/utils/viewer/koEffects';

const view = { xMin: -200, xMax: 200, yMin: -150, yMax: 150 };

describe('KO effects (live viewer)', () => {
	it('side / bottom KOs blast, top KOs are a star, flying into the screen has no effect', () => {
		expect([0, 1, 2].map(koKind)).toEqual(['blast', 'blast', 'blast']);
		expect([3, 4, 5].map(koKind)).toEqual(['star', 'star', 'star']);
		expect([6, 7, 8, 9, 10, 11, 14, -1, null].map(koKind)).toEqual([null, null, null, null, null, null, null, null, null]);
	});

	it('fires once when a player ENTERS a dead state — not while dead, not when first seen dead', () => {
		const p = (actionStateId: number) => [{ playerIndex: 0, actionStateId, x: 0, y: 0 }];
		expect(detectKos({ 0: 14 }, p(1))).toHaveLength(1);
		expect(detectKos({ 0: 1 }, p(1))).toHaveLength(0); // still dead
		expect(detectKos({}, p(1))).toHaveLength(0); // viewer opened mid-KO
		expect(detectKos({ 0: 4 }, p(6))).toHaveLength(0); // dead → dead
	});

	it("blasts appear at the player's last position (inside the blast zone), aimed by the death state", () => {
		const blast = { xMin: -246, xMax: 246, yMin: -140, yMax: 188 }; // Final Destination
		const at = (state: number, x: number, y: number) => koPlacement({ playerIndex: 0, actionStateId: state, x, y, kind: 'blast' }, view, blast, 0);
		expect(at(1, -244, 40)).toEqual({ x: -244, y: 40, angle: 0 }); // DeadLeft → points right
		expect(at(2, 260, 500)).toEqual({ x: 246, y: 188, angle: 180 }); // DeadRight, kept inside the zone
		expect(at(0, -40, -139)).toEqual({ x: -40, y: -139, angle: 90 }); // DeadDown → points up
		// no blast zone data: kept inside the view
		expect(koPlacement({ playerIndex: 0, actionStateId: 1, x: -999, y: 0, kind: 'blast' }, view, null, 0)).toEqual({ x: -200, y: 0, angle: 0 });
	});

	it('star KOs twinkle near the top of the view', () => {
		expect(koPlacement({ playerIndex: 0, actionStateId: 4, x: 500, y: 300, kind: 'star' }, view, null, 0)).toEqual({ x: 200, y: 150, angle: 0 });
	});
});
