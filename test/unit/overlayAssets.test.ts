import { isVideoFile, preloadPlan, shownScene } from '../../frontend/src/lib/utils/overlayAssets';
import { LiveStatsScene, SceneBackground } from '../../frontend/src/lib/models/enum';
import { CustomElement } from '../../frontend/src/lib/models/constants/customElement';

const scene = (over: Record<string, unknown> = {}, images: string[] = []) => ({
	active: true,
	fallback: LiveStatsScene.Menu,
	background: { type: SceneBackground.Color },
	layers: [{ items: images.map((name) => ({ elementId: CustomElement.CustomImage, data: { image: { name } } })) }],
	...over,
});

const overlay = {
	id: 'ov1',
	[LiveStatsScene.Menu]: scene({ background: { type: SceneBackground.ImageCustom, customImage: { name: 'menu bg.png' } } }, ['logo.png']),
	[LiveStatsScene.InGame]: scene({}, ['hud.png', 'loop.mp4']),
	[LiveStatsScene.PostGame]: scene({ active: false, fallback: LiveStatsScene.Menu }),
	[LiveStatsScene.PostSet]: scene({ background: { type: SceneBackground.Image, image: { src: 'stars.png' } } }, ['logo.png']),
} as any;

describe('overlay asset preloading', () => {
	it('loads the scene on screen first, then every other scene once', () => {
		const plan = preloadPlan(overlay, LiveStatsScene.InGame, 'http://x');
		expect(plan.first).toEqual(['http://x/public/custom/ov1/image/hud.png', 'http://x/public/custom/ov1/image/loop.mp4']);
		expect(plan.rest).toEqual(['http://x/public/custom/ov1/image/menu%20bg.png', 'http://x/public/custom/ov1/image/logo.png', '/image/backgrounds/stars.png']);
	});

	it('an inactive scene loads its fallback first', () => {
		expect(shownScene(overlay, LiveStatsScene.PostGame)).toBe(LiveStatsScene.Menu);
		expect(preloadPlan(overlay, LiveStatsScene.PostGame, '').first).toContain('/public/custom/ov1/image/logo.png');
	});

	it('knows video files', () => {
		expect([isVideoFile('a.MP4'), isVideoFile('b.webm'), isVideoFile('c.gif'), isVideoFile(undefined)]).toEqual([true, true, false, false]);
	});
});
