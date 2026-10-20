import { momentWindow, placeClips, reelPosition } from '../../frontend/src/lib/utils/highlightReel';

describe('highlight reel math', () => {
	const clip = (fromEnd: number, toEnd: number) => ({ url: '/highlights/x', fromEnd, toEnd });

	it('position: which clip and how far in, looping', () => {
		const clips = [clip(10, 0), clip(25, 20)]; // 10 s + 5 s
		expect(reelPosition(clips, 3)).toEqual({ index: 0, offset: 3 });
		expect(reelPosition(clips, 12)).toEqual({ index: 1, offset: 2 });
		expect(reelPosition(clips, 16)).toEqual({ index: 0, offset: 1 }); // looped
		expect(reelPosition([], 5)).toBeNull();
	});

	it('clips are windows counted back from the end of the buffer that holds the moment', () => {
		const buffers = [{ id: 'a', end: 60_000, duration: 30 }]; // holds 30–60 s
		const clips = placeClips([{ start: 50_000 - 8 * 1000, end: 50_000 + 2 * 1000, score: 1 }], buffers);
		expect(clips).toEqual([{ url: '/highlights/a', bufferId: 'a', fromEnd: 18, toEnd: 8 }]);
		// stream delay shifts the window later; a window running off the file start is clamped
		expect(placeClips([{ start: 50_000 - 8 * 1000, end: 50_000 + 2 * 1000, score: 1 }], buffers, 0.5)[0]).toMatchObject({ fromEnd: 17.5, toEnd: 7.5 });
		expect(placeClips([{ start: 34_000 - 8 * 1000, end: 34_000 + 2 * 1000, score: 1 }], buffers)[0]).toMatchObject({ fromEnd: 30, toEnd: 24 });
		// a moment outside every buffer has no footage
		expect(placeClips([{ start: 10_000 - 8 * 1000, end: 10_000 + 2 * 1000, score: 1 }], buffers)).toEqual([]);
	});

	it('plays the moments in the given order (a list decided it); back-to-back overlapping clips merge', () => {
		const buffers = [{ id: 'a', end: 100_000, duration: 100 }];
		const m = (at: number) => ({ start: (at - 4) * 1000, end: (at + 1) * 1000, score: 0 });
		expect(placeClips([m(60), m(10), m(90)], buffers).map((c) => 100 - c.fromEnd + 4)).toEqual([60, 10, 90]);
		expect(placeClips([m(50), m(52)], buffers)).toEqual([{ url: '/highlights/a', bufferId: 'a', fromEnd: 54, toEnd: 47 }]);
	});

	it('prefers the buffer that ends soonest after the whole window', () => {
		const buffers = [
			{ id: 'early', end: 51_000, duration: 30 }, // holds the moment, but cuts the "after" part
			{ id: 'late', end: 80_000, duration: 60 },
			{ id: 'later', end: 90_000, duration: 60 },
		];
		expect(placeClips([{ start: 50_000 - 4 * 1000, end: 50_000 + 2 * 1000, score: 1 }], buffers)[0].bufferId).toBe('late');
	});

	it('a mark covers the sequence (or now) with seconds around it; max length keeps the end', () => {
		expect(momentWindow({ startTime: 10_000, endTime: 13_000 }, 2, 2)).toEqual({ start: 8000, end: 15_000 });
		expect(momentWindow({ startTime: 10_000, endTime: 40_000 }, 2, 2, 10)).toEqual({ start: 32_000, end: 42_000 });
		expect(momentWindow({}, 8, 2, undefined, 50_000)).toEqual({ start: 42_000, end: 52_000 });
	});

	it('frames: around the sequence\'s frames (60 per second), or the current frame; never before the first frame', () => {
		expect(momentWindow({ startTime: 0, endTime: 1000, startFrame: 600, endFrame: 900 }, 2, 2, 10).frames).toEqual({ start: 480, end: 1020 });
		expect(momentWindow({ startTime: 0, endTime: 1000, startFrame: 600, endFrame: 1500 }, 2, 2, 10).frames).toEqual({ start: 1020, end: 1620 });
		expect(momentWindow({}, 8, 2, undefined, 0, 300).frames).toEqual({ start: -123, end: 420 });
		expect(momentWindow({}, 8, 2, undefined, 0).frames).toBeUndefined();
	});
});
