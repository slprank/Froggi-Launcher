<script lang="ts">
	import type { Font } from '$lib/models/types';
	import { addFont } from '../CustomFontHandler.svelte';
	import FontSelector from './FontSelector.svelte';

	export let font: Font;
	export let fontId: string;

	const isFontLoaded = async () => await addFont(font.base64, fontId);
</script>

<div class="w-full flex gap-2">
	{#key font.base64}
		{#await isFontLoaded()}
			<FontSelector bind:font bind:fontId />
		{:then}
			<FontSelector bind:font bind:fontId />
		{/await}
	{/key}
</div>
