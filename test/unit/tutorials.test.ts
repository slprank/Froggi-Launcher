import fs from 'fs';
import path from 'path';
import { TUTORIALS, tutorialAsMarkdown } from '../../frontend/src/lib/content/tutorials';

// Tests run from build_electron/test/unit — the repo root is three levels up.
const STATIC = path.join(__dirname, '../../../frontend/static');

describe('tutorials (shared by the app and the AI assistant)', () => {
	it('ids are unique and every page has content', () => {
		const ids = TUTORIALS.map((t) => t.id);
		expect(new Set(ids).size).toBe(ids.length);
		for (const t of TUTORIALS) for (const p of t.pages) expect(p.blocks.length).toBeGreaterThan(0);
	});

	it('every screenshot and video exists', () => {
		const missing = TUTORIALS.flatMap((t) => t.pages.flatMap((p) => p.blocks))
			.filter((b): b is Extract<typeof b, { src: string }> => 'src' in b)
			.map((b) => b.src)
			.filter((src) => !fs.existsSync(path.join(STATIC, src)));
		expect(missing).toEqual([]);
	});

	it('renders as markdown for the AI, with captions instead of pictures', () => {
		const md = tutorialAsMarkdown(TUTORIALS.find((t) => t.id === 'tournament')!);
		expect(md).toContain('# Run a tournament');
		expect(md).toMatch(/\[Screenshot: .+ — \/image\/tutorial\/tournament\/phone-striking\.jpg\]/);
		expect(tutorialAsMarkdown(TUTORIALS.find((t) => t.id === 'ai-assistant')!)).toContain('Copy AI instructions');
	});
});
