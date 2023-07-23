<script lang="ts" context="module">
	export let base64: string;
	export let fontId: string | undefined = undefined;
	export let ready: boolean = false;

	export const addFont = async (
		base64: string | undefined,
		fontId: string | undefined = undefined,
	): Promise<boolean> => {
		return await new Promise(async (resolve) => {
			if (!base64) {
				resolve(true);
				return;
			}
			const new_font = new FontFace(fontId ?? 'custom', `url(${base64})`);
			const loadedFace = await new_font.load();
			document.fonts.add(loadedFace);
			await document.fonts.ready;
			resolve(true);
		});
	};
</script>
