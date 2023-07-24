<script lang="ts">
	import type { Font } from '$lib/models/types';
	import { addFont } from '../CustomFontHandler.svelte';
	import FontSelect from './FontSelect.svelte';

	export let font: Font;
	export let fontId: string;

	const updateFont = async () => await addFont(font.base64, fontId);
	$: font, updateFont();
</script>

<div class="w-full flex gap-2">
	{#key font.base64}
		{#await updateFont()}
			<FontSelect bind:font bind:fontId />
		{:then}
			<FontSelect bind:font bind:fontId />
		{/await}
	{/key}
</div>
