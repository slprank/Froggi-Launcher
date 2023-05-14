<script lang="ts">
	export let base64: string | undefined;

	// records of all fonts already loaded
	const font = 'Custom';

	const new_font = new FontFace(font, `url(${base64})`);
	new_font.load().then(function (loaded_face) {
		document.fonts.add(loaded_face);
	});
</script>
