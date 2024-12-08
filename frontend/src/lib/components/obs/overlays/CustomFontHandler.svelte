<script lang="ts" context="module">
	import { LiveStatsScene } from '$lib/models/enum';
	import { GridContentItem, Layer, Overlay } from '$lib/models/types/overlay';
	import { asyncForEach } from '$lib/utils/helper';

	async function storeFontInCache(fontName: string, fontBase64: string) {
		const cache = await caches.open('font-cache');
		const blob = new Blob([fontBase64], { type: 'font/woff2' });
		const response = new Response(blob);
		await cache.put(fontName, response);
	}

	async function loadFontFromCache(fontName: string) {
		const cache = await caches.open('font-cache');
		const response = await cache.match(fontName);
		if (!response) return null;
		const blob = await response.blob();
		return URL.createObjectURL(blob);
	}

	export const addFont = async (base64: string | undefined, fontName: string) => {
		if (!base64 || document.fonts.check(`12px ${fontName}`)) {
			return; // Font is already in document.fonts
		}

		const fontUrl = (await loadFontFromCache(fontName)) || `url(${base64})`;
		const new_font = new FontFace(fontName, fontUrl);
		const loadedFace = await new_font.load();
		document.fonts.add(loadedFace);
		await storeFontInCache(fontName, base64);
	};

	export const updateFont = async (overlay: Overlay) => {
		await asyncForEach(Object.values(LiveStatsScene), async (statsScene: LiveStatsScene) => {
			if (!overlay) return;
			await addFont(
				overlay[statsScene]?.font?.base64,
				overlay[statsScene]?.font?.family ?? '',
			);
			const items = overlay[statsScene].layers?.map((layer: Layer) => layer.items).flat();

			await asyncForEach(items, async (item: GridContentItem) => {
				await addFont(item.data.font?.base64, item.id);
			});
		});
	};
</script>
