<script lang="ts">
	export let base64: string | undefined;

	const new_font = new FontFace('Custom', `url(${base64})`);
	new_font.load().then(function (loaded_face) {
		document.fonts.add(loaded_face);
	});
</script>
