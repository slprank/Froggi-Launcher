import { evaluateFormula, formulaKeys, formulaProblem } from '../../frontend/src/lib/utils/formula';
import { itemTokens } from '../../frontend/src/lib/utils/flowList';

describe('flow formulas', () => {
	const keys = { didKill: true, damage: 87.5, hits: 4, seconds: 0, name: 'Mango', none: null };

	it('arithmetic, precedence, keys (true = 1)', () => {
		expect(evaluateFormula('{{didKill}} * 50 + {{damage}} / 4', keys)).toBeCloseTo(71.875);
		expect(evaluateFormula('-(2 + 3) * 2 % 4', keys)).toBe(-2);
		expect(evaluateFormula('{{none}} + 1', keys)).toBe(1);
		expect(evaluateFormula('{{hits}} / {{seconds}}', keys)).toBe(0); // x / 0 = 0
		expect(evaluateFormula('', keys)).toBe(0);
	});

	it('comparisons, logic, ternary, functions', () => {
		expect(evaluateFormula('({{hits}} >= 4) * 40', keys)).toBe(40);
		expect(evaluateFormula('{{hits}} > 4 || {{didKill}} && !false', keys)).toBe(1);
		expect(evaluateFormula('{{damage}} > 100 ? 30 : 10', keys)).toBe(10);
		expect(evaluateFormula('clamp({{hits}} * 8, 0, 25) + max(1, 2, 3) + min(4, -1) + abs(-2) + round(2.6)', keys)).toBe(25 + 3 - 1 + 2 + 3);
	});

	it('clear errors, never eval', () => {
		expect(() => evaluateFormula('{{name}} * 2', keys)).toThrow(/not a number/);
		expect(() => evaluateFormula('{{missing}} + 1', keys)).toThrow(/unknown key/);
		expect(() => evaluateFormula('process.exit(1)', keys)).toThrow(/unknown function process|unexpected/);
		expect(() => evaluateFormula('(1 + 2', keys)).toThrow(/missing \)/);
		expect(formulaProblem('{{a}} * 2 +', ['a'])).toMatch(/ends too early/);
		expect(formulaProblem('{{a}} ? 1 : 0', ['a'])).toBeNull();
	});

	it('nth: the k-th highest', () => {
		expect(evaluateFormula('nth(1, 3, 9, 4)')).toBe(9);
		expect(evaluateFormula('nth(3, 3, 9, 4)')).toBe(3);
		expect(evaluateFormula('nth(5, 3, 9)')).toBe(0);
	});

	it('JavaScript style: bare names, paths, ===, strings, Math.*, lambdas — same results as {{keys}}', () => {
		const t = { total: 70, didKill: true, kind: 'punish', 'state.players.1.percent': 120, 'gameList.count': 2, 'gameList.2.score': 90 };
		expect(evaluateFormula('total >= 40 && didKill', t)).toBe(1);
		expect(evaluateFormula('{{total}} >= 40 && {{didKill}}', t)).toBe(1);
		expect(evaluateFormula('kind === "punish" ? 2 : 1', t)).toBe(2);
		expect(evaluateFormula("kind !== 'combo'", t)).toBe(1);
		expect(evaluateFormula('Math.max(state.players.1.percent, total) + Math.floor(1.9)', t)).toBe(121);
		expect(evaluateFormula('gameList.length + gameList[-1].score', t)).toBe(92);
		const item = itemTokens({ score: 55, kill: true }) as Record<string, never>;
		expect(evaluateFormula('item => item.score * 2', item)).toBe(110);
		expect(evaluateFormula('(it) => it.kill && it.score > 40', item)).toBe(1);
		const lists = { gameList: [{ score: 30 }, { score: 90 }] };
		expect(evaluateFormula('count(gameList, h => h.score > 40) + sum(gameList, x => x.score)', {}, lists)).toBe(121);
		expect(formulaKeys('total * 2 + {{damage}} + item.score')).toEqual(expect.arrayContaining(['total', 'damage', 'item.score']));
	});

	it('cannot run code: no eval, no globals, no prototype access, only listed functions', () => {
		for (const attack of ['constructor', 'toString', '__proto__.polluted', 'globalThis.process', 'window.alert']) {
			expect(() => evaluateFormula(attack, { total: 1 })).toThrow(/unknown key/);
		}
		for (const attack of ['eval("1")', 'Function("return 1")()', 'require("fs")', 'constructor.constructor("x")()', 'Math.random()', 'fetch("x")']) {
			expect(() => evaluateFormula(attack, { total: 1 })).toThrow(/unknown function|unexpected/);
		}
		expect(() => evaluateFormula('total; process.exit()', { total: 1 })).toThrow(/unexpected/);
		expect(() => evaluateFormula('`${total}`', { total: 1 })).toThrow(/unexpected/);
		expect(() => evaluateFormula('total = 5', { total: 1 })).toThrow(/unexpected/);
	});
});
