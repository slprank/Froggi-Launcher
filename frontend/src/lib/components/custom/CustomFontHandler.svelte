<script lang="ts" context="module">
	import { onMount } from 'svelte';

	export const addFont = async (base64: string | undefined) => {
		if (base64 === undefined) return false;
		if (base64.length === 0) return true;
		const new_font = new FontFace('Custom', `url(${base64})`);
		const loadedFace = await new_font.load();
		document.fonts.add(loadedFace);
		return true;
	};
</script>
