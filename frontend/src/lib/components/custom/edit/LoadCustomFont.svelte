<script lang="ts">
	export let base64: string | undefined;

	// records of all fonts already loaded
	const font = 'Custom';

	const new_font = new FontFace(font, `url(${base64})`);
	new_font.load().then(function (loaded_face) {
		document.fonts.add(loaded_face);
	});
</script>

<div style={`--test: url(${base64})`}>
	<h1 style="font-family: Custom">Melee</h1>
</div>

<style>
	@font-face {
		font-family: 'Custom';
		src: var(--test);
	}
	div {
		width: calc(var(--size) * 1px);
		height: calc(var(--size) * 1px);
		background-color: green;
	}
</style>
