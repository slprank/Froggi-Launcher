import { LiveStatsScene, SceneBackground } from '../models/enum';
import { CustomElement } from '../models/constants/customElement';
import type { Overlay, Scene } from '../models/types/overlay';

export const isVideoFile = (name: string | undefined) => /\.(mp4|webm)$/i.test(name ?? '');

/** The scene an overlay shows for a live scene: itself when active, else its fallback (as Board does). */
export const shownScene = (overlay: Overlay, scene: LiveStatsScene): LiveStatsScene =>
	overlay[scene]?.active ? scene : overlay[scene]?.fallback ?? LiveStatsScene.Menu;

/** Image / video URLs one scene uses: its background and every Custom Image element. */
export function sceneAssets(scene: Scene | undefined, overlayId: string, base: string): string[] {
	if (!scene) return [];
	const custom = (name: string) => `${base}/public/custom/${overlayId}/image/${encodeURI(name)}`;
	const urls: string[] = [];
	const bg = scene.background;
	if (bg?.type === SceneBackground.Image && bg.image?.src) urls.push(`/image/backgrounds/${bg.image.src}`);
	if (bg?.type === SceneBackground.ImageCustom && bg.customImage?.name) urls.push(custom(bg.customImage.name));
	for (const layer of scene.layers ?? [])
		for (const item of layer.items ?? [])
			if (item?.elementId === CustomElement.CustomImage && item.data?.image?.name) urls.push(custom(item.data.image.name));
	return urls;
}

/** What to load first (the scene on screen now) and what to warm up after (every other scene). */
export function preloadPlan(overlay: Overlay, current: LiveStatsScene, base: string): { first: string[]; rest: string[] } {
	const first = [...new Set(sceneAssets(overlay[shownScene(overlay, current)], overlay.id, base))];
	const all = Object.values(LiveStatsScene).flatMap((s) => sceneAssets(overlay[s as LiveStatsScene], overlay.id, base));
	return { first, rest: [...new Set(all)].filter((u) => !first.includes(u)) };
}
