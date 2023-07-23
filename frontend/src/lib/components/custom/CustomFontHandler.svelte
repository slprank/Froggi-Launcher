<script lang="ts">
	import { onMount } from 'svelte';

	export let base64: string | undefined;
	export let ready: boolean = false;
	export let fontId: string | undefined = undefined;

	onMount(async () => {
		if (!base64) {
			ready = true;
			return;
		}
		const new_font = new FontFace(fontId ?? 'custom', `url(${base64})`);
		const loadedFace = await new_font.load();
		document.fonts.add(loadedFace);
		ready = true;
	});
</script>
