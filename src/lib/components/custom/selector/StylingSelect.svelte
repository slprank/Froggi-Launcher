<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import type { Class, Css, ElementPayload } from '$lib/types/types';
	import ColorInput from '$lib/components/input/ColorInput.svelte';
	import SliderInput from '$lib/components/input/SliderInput.svelte';
	import { CustomElement } from '$lib/types/enum';
	import CodeInput from '$lib/components/input/CodeInput.svelte';
	import { fly } from 'svelte/transition';
	import ImageInput from '$lib/components/input/ImageInput.svelte';

	export let selectedElementId: number;
	export let payload: ElementPayload;
	let isFirstVisit = selectedElementId !== undefined;
	let prevSelectedElementId = selectedElementId;
	let isAdvancedStyle = false;

	function clearStyle() {
		if (isFirstVisit) return;
		if (selectedElementId === prevSelectedElementId) return;

		payload.class = {} as Class;
		console.log(boxSettings, stringSettings, imageSettings);
		payload.css = {
			background: boxSettings ? '#000000' : '',
			borderColor: boxSettings ? '#000000' : '',
			color: stringSettings ? '#000000' : '',
			opacity: 1,
		} as Css;
		prevSelectedElementId = selectedElementId;
		payload.css.customText = '';
		payload.css.customBox = '';
		payload.css.customImage = '';
	}
	$: stringSettings, boxSettings, imageSettings, clearStyle();

	$: customStringSettings = selectedElementId === CustomElement.CustomString;
	$: customBoxSettings = selectedElementId === CustomElement.CustomBox;
	$: customImageSettings = selectedElementId === CustomElement.CustomImage;
	$: stringSettings =
		selectedElementId === CustomElement.CustomString ||
		(selectedElementId >= 100 && selectedElementId < 200);
	$: boxSettings =
		selectedElementId === CustomElement.CustomBox ||
		(selectedElementId >= 200 && selectedElementId < 300);
	$: imageSettings =
		selectedElementId === CustomElement.CustomImage ||
		(selectedElementId >= 300 && selectedElementId < 400);

	isFirstVisit = false;
</script>

<div class="w-full my-4">
	{#if customStringSettings}
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Custom text</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-10">
				<input
					type="text"
					id="default-input"
					placeholder="Text"
					bind:value={payload.string}
					class="w-full h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
				/>
			</div>
		</div>
	{/if}

	{#if stringSettings}
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Alignment</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Horizontal</h1>
				<Select bind:selected={payload.class.alignment}>
					<option value="justify-start">Left</option>
					<option selected value="justify-center">Center</option>
					<option value="justify-end">Right</option>
				</Select>
			</div>
		</div>
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Shadow</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Text shadow</h1>
				<Select bind:selected={payload.class.textShadow}>
					<option selected value="">None</option>
					<option value="text-shadow-sm">Light</option>
					<option value="text-shadow">Medium</option>
					<option value="text-shadow-lg">Dark</option>
				</Select>
			</div>
		</div>
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Colors</h1>
		<div class="w-full h-fit flex flex-wrap ">
			<div class="w-36 h-12">
				<ColorInput bind:value={payload.css.color} />
			</div>
		</div>
	{/if}
	{#if boxSettings}
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Border</h1>
				<Select bind:selected={payload.class.border}>
					<option value="" selected>None</option>
					<option value="border-2">Full 2px</option>
					<option value="border-4">Full 4px</option>
					<option value="border-6">Full 6px</option>
					<option value="border-8">Full 8px</option>
					<option value="border-x-2">X 2px</option>
					<option value="border-x-4">X 4px</option>
					<option value="border-x-6">X 6px</option>
					<option value="border-x-8">X 8px</option>
					<option value="border-y-2">Y 2px</option>
					<option value="border-y-4">Y 4px</option>
					<option value="border-y-6">Y 6px</option>
					<option value="border-y-8">Y 8px</option>
					<option value="border-t-2">Top 2px</option>
					<option value="border-t-4">Top 4px</option>
					<option value="border-t-6">Top 6px</option>
					<option value="border-t-8">Top 8px</option>
					<option value="border-r-2">Right2px</option>
					<option value="border-r-4">Right4px</option>
					<option value="border-r-6">Right6px</option>
					<option value="border-r-8">Right8px</option>
					<option value="border-b-2">Bottom 2px</option>
					<option value="border-b-4">Bottom 4px</option>
					<option value="border-b-6">Bottom 6px</option>
					<option value="border-b-8">Bottom 8px</option>
					<option value="border-l-2">Left 2px</option>
					<option value="border-l-4">Left 4px</option>
					<option value="border-l-6">Left 6px</option>
					<option value="border-l-8">Left 8px</option>
				</Select>
			</div>
		</div>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Rounded corner</h1>
				<Select bind:selected={payload.class.rounded}>
					<option value="" selected>None</option>
					<option value="rounded-sm">Small</option>
					<option value="rounded-md">Medium</option>
					<option value="rounded-lg">Large</option>
					<option value="rounded-full">Full</option>
				</Select>
			</div>
		</div>
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Shadow</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Box shadow</h1>
				<Select bind:selected={payload.class.boxShadow}>
					<option selected value="">None</option>
					<option value="box-shadow-sm">Light</option>
					<option value="box-shadow">Medium</option>
					<option value="box-shadow-lg">Dark</option>
				</Select>
			</div>
		</div>
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Background color</h1>
		<div class="w-full h-fit flex flex-wrap ">
			<div class="w-36 h-12">
				<ColorInput bind:value={payload.css.background} />
			</div>
		</div>
		<h1 class="text-gray-500 text-lh font-medium text-shadow">Border color</h1>
		<div class="w-full h-fit flex flex-wrap ">
			<div class="w-36 h-12">
				<ColorInput bind:value={payload.css.borderColor} />
			</div>
		</div>
	{/if}
	{#if customImageSettings}
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Select Image</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<ImageInput bind:image={payload.image.src} label="upload" />
			</div>
		</div>
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Image Positioning</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Fit</h1>
				<Select bind:selected={payload.image.objectFit}>
					<option selected value="bg-cover">Cover</option>
					<option value="bg-contain">Contain</option>
				</Select>
			</div>
		</div>
	{/if}
	<h1 class="text-gray-500 text-lg font-medium text-shadow">Transparency</h1>
	<div class="w-full h-fit flex flex-wrap">
		<div class="w-36 h-24">
			<SliderInput bind:value={payload.css.opacity} />
		</div>
		<h1 class="text-white text-center capitalize">{payload.css.opacity}</h1>
	</div>
	<div class="flex items-center gap-2">
		<h1 class="text-gray-500 text-lg font-medium text-shadow mb-2">Advanced styling</h1>
		<input type="checkbox" bind:checked={payload.advancedStyling} />
	</div>
	{#if payload.advancedStyling}
		{#if stringSettings || imageSettings}
			<div in:fly={{ duration: 250, delay: 0 }}>
				<CodeInput
					bind:value={payload.css.customParent}
					label="Custom Inline CSS Parent - Default: width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
				/>
			</div>
		{/if}
		{#if boxSettings || imageSettings}
			<div in:fly={{ duration: 250, delay: 50 }}>
				<CodeInput
					bind:value={payload.css.customBox}
					label="Custom Inline CSS Box - Default: width: 100%; height: 100%;"
				/>
			</div>
		{/if}
		{#if stringSettings}
			<div in:fly={{ duration: 250, delay: 100 }}>
				<CodeInput bind:value={payload.css.customText} label="Custom Inline CSS Text" />
			</div>
		{/if}
		{#if imageSettings}
			<div in:fly={{ duration: 250, delay: 150 }}>
				<CodeInput
					bind:value={payload.css.customImage}
					label="Custom Inline CSS Image - Default: width: 100%; height: 100%; object-fit: contain;"
				/>
			</div>
		{/if}
	{/if}
</div>
