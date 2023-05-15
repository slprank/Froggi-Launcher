<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let base64: string | undefined;

	let font: FontFace;

	onMount(() => {
		const new_font = new FontFace('Custom', `url(${base64})`);
		new_font.load().then(function (loaded_face) {
			font = loaded_face;
			document.fonts.add(font);
		});
	});

	onDestroy(() => {
		document.fonts.delete(font);
	});
</script>
