<script lang="ts">
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import FileToBase64Input from '$lib/components/input/FileToBase64Input.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import type { Font, Overlay } from '$lib/models/types/overlay';
	import { statsScene } from '$lib/utils/store.svelte';
	import { addFont } from '../CustomFontHandler.svelte';

	export let font: Font;
	export let fontId: string;

	const updateFont = async () => {
		addFont(font?.base64 ?? '', fontId);
	};
	$: font, updateFont();
</script>

<div class="w-full flex gap-2">
	<div class="w-36 h-full">
		<h1 class="text-gray-500 text-sm font-medium text-shadow">Font</h1>
		<Select bind:selected={font.family}>
			<option value={$statsScene} selected>Default</option>
			<option value={'sans-serif'} selected>Sans Serif</option>
			<option value={'Melee'}>Melee</option>
			<option value={'Ultimate'}>Ultimate</option>
			<option value={'A-OTF Folk Pro M'}>A-OTF Folk Pro M</option>
			<option value={'Roboto'}>Roboto</option>
			<option value={'Roboto Bold Italic'}>Roboto Bold Italic</option>
			<option value={'Wix'}>Wix</option>
			<option value={fontId}>Custom</option>
		</Select>
	</div>
	<FileToBase64Input
		label="Custom"
		acceptedExtensions=".woff2, .woff, .otf, .ttf"
		bind:base64={font.base64}
	/>
	<TextFitMulti
		class="w-36 h-full pt-[1.25em] grid justify-center items-center text-gray-500 text-shadow"
		style={`font-family: ${font?.family}`}
	>
		Super Smash Bros
	</TextFitMulti>
</div>
