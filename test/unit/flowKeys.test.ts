import { TRIGGER_TOKENS } from '../../frontend/src/lib/utils/flowEngine';
import { FIRES_WHEN, KEY_INFO, keyInfo, sampleObject, strikeStateSchema, triggerSchema } from '../../frontend/src/lib/utils/flowKeys';
import { SAMPLE_TOKENS } from '../../frontend/src/lib/utils/flowEngine';
import { flattenState, SAMPLE_GAME_STATE } from '../../frontend/src/lib/utils/flowState';
import type { FlowTrigger } from '../../frontend/src/lib/models/types/flow';

describe('flow key descriptions', () => {
	it('every key a trigger gives has a description (chips + the AI assistant)', () => {
		const missing = Object.entries(TRIGGER_TOKENS).flatMap(([t, keys]) => keys.filter((k) => !KEY_INFO[t as FlowTrigger['type']]?.[k]).map((k) => `${t}.${k}`));
		expect(missing).toEqual([]);
	});

	it('the same name can mean something per trigger; list items and counts are explained too', () => {
		expect(keyInfo('character', ['sequence'])).toMatch(/attacker's character name/);
		expect(keyInfo('character', ['strikeAction'])).toMatch(/character picked/);
		expect(keyInfo('item.score', [])).toMatch(/Field "score"/);
		expect(keyInfo('gameList.count', [])).toMatch(/How many items list "gameList"/);
		expect(keyInfo('error', [])).toMatch(/failed/);
	});

	it('every When card says what fires it; schemas give a sample object', () => {
		expect(Object.keys(TRIGGER_TOKENS).filter((t) => !FIRES_WHEN[t as FlowTrigger['type']])).toEqual([]);
		const rows = triggerSchema('sequence', SAMPLE_TOKENS);
		expect(rows.find((r) => r.key === 'didKill')).toMatchObject({ type: 'true / false', example: true });
		expect(sampleObject(triggerSchema('gameStart', SAMPLE_TOKENS))).toMatchObject({ players: { 1: { name: expect.anything() } }, rules: { stocks: expect.anything() } });
	});

	it('every field of the striking object is explained and present in the sample state', () => {
		const sample = flattenState(SAMPLE_GAME_STATE, 'state');
		const rows = strikeStateSchema(sample);
		expect(rows.filter((r) => r.example === undefined)).toEqual([]);
		const concrete = rows.map((r) => r.key.replace('<n>', '6').replace('<stage>', 'finalDestination'));
		expect(concrete.filter((k) => !(k in sample))).toEqual([]);
		expect(rows.find((r) => r.key === 'state.strike.stages.<stage>.isBanned')?.example).toBe(true);
	});
});
