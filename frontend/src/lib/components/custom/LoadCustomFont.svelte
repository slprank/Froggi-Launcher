<script lang="ts">
	import { onMount } from 'svelte';

	export let base64: string | undefined;

	onMount(async () => {
		if (!base64) return;
		const new_font = new FontFace('Custom', `url(${base64})`);
		const loadedFace = await new_font.load();
		document.fonts.add(loadedFace);
	});
</script>
