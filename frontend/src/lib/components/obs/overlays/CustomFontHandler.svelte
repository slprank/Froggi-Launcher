<script lang="ts" context="module">
	import { LiveStatsScene } from '$lib/models/enum';
	import { GridContentItem, Layer, Overlay } from '$lib/models/types/overlay';
	import { asyncForEach } from '$lib/utils/helper';

	export const addFont = async (base64: string | undefined, fontName: string) => {
		if (!base64) {
			return;
		}
		const new_font = new FontFace(fontName, `url(${base64})`);
		const loadedFace = await new_font.load();
		document.fonts.add(loadedFace);
		document.fonts.ready;
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
