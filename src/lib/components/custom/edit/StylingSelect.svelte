<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import type { Class, Css, ElementPayload } from '$lib/types/types';
	import ColorInput from '$lib/components/custom/input/ColorInput.svelte';
	import SliderInput from '$lib/components/custom/input/SliderInput.svelte';
	import { CustomElement } from '$lib/types/enum';

	export let selectedElementId: number;
	export let payload: ElementPayload;
	let isFirstVisit = selectedElementId !== undefined;
	let prevSelectedElementId = selectedElementId;

	function clearStyle() {
		if (isFirstVisit) return;
		if (selectedElementId === prevSelectedElementId) return;

		payload.class = {} as Class;
		payload.css = {
			background: boxSettings ? '#000000' : '',
			borderColor: boxSettings ? '#000000' : '',
			color: stringSettings ? '#000000' : '',
			opacity: '1',
		} as Css;
		prevSelectedElementId = selectedElementId;
	}
	$: selectedElementId, clearStyle();

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
	// TODO: Add text/box shadow
</script>

<div class="w-full mb-2">
	{#if customStringSettings}
		<h1 class="text-white text-lg font-medium mb-2">Custom text</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
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
		<h1 class="text-white text-lg font-medium mb-2">Alignment</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Horizontal</h1>
				<Select bind:selected={payload.class.alignment}>
					<option value="justify-start">Left</option>
					<option selected value="justify-center">Center</option>
					<option value="justify-end">Right</option>
				</Select>
			</div>
		</div>
		<h1 class="text-white text-lg font-medium mb-2">Shadow</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Text shadow</h1>
				<Select bind:selected={payload.class.textShadow}>
					<option selected value="">None</option>
					<option value="text-shadow-sm">Light</option>
					<option value="text-shadow">Medium</option>
					<option value="text-shadow-lg">Dark</option>
				</Select>
			</div>
		</div>
		<h1 class="text-white text-lg font-medium mb-2">Colors</h1>
		<div class="w-full h-fit flex flex-wrap gap-2 ">
			<div class="w-36 h-12">
				<ColorInput bind:value={payload.css.color} />
			</div>
		</div>
	{/if}
	{#if boxSettings}
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Border</h1>
				<Select bind:selected={payload.class.border}>
					<option value="" selected>None</option>
					<option value="border border-2">Full 2px</option>
					<option value="border border-4">Full 4px</option>
					<option value="border border-6">Full 6px</option>
					<option value="border border-8">Full 8px</option>
					<option value="border border-x-2">X 2px</option>
					<option value="border border-x-4">X 4px</option>
					<option value="border border-x-6">X 6px</option>
					<option value="border border-x-8">X 8px</option>
					<option value="border border-y-2">Y 2px</option>
					<option value="border border-y-4">Y 4px</option>
					<option value="border border-y-6">Y 6px</option>
					<option value="border border-y-8">Y 8px</option>
					<option value="border border-t-2">Top 2px</option>
					<option value="border border-t-4">Top 4px</option>
					<option value="border border-t-6">Top 6px</option>
					<option value="border border-t-8">Top 8px</option>
					<option value="border border-r-2">Right2px</option>
					<option value="border border-r-4">Right4px</option>
					<option value="border border-r-6">Right6px</option>
					<option value="border border-r-8">Right8px</option>
					<option value="border border-b-2">Bottom 2px</option>
					<option value="border border-b-4">Bottom 4px</option>
					<option value="border border-b-6">Bottom 6px</option>
					<option value="border border-b-8">Bottom 8px</option>
					<option value="border border-l-2">Left 2px</option>
					<option value="border border-l-4">Left 4px</option>
					<option value="border border-l-6">Left 6px</option>
					<option value="border border-l-8">Left 8px</option>
				</Select>
			</div>
		</div>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Rounded corner</h1>
				<Select bind:selected={payload.class.rounded}>
					<option value="" selected>None</option>
					<option value="rounded-sm">Small</option>
					<option value="rounded-md">Medium</option>
					<option value="rounded-lg">Large</option>
					<option value="rounded-full">Full</option>
				</Select>
			</div>
		</div>
		<h1 class="text-white text-lg font-medium mb-2">Shadow</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Box shadow</h1>
				<Select bind:selected={payload.class.boxShadow}>
					<option selected value="">None</option>
					<option value="box-shadow-sm">Light</option>
					<option value="box-shadow">Medium</option>
					<option value="box-shadow-lg">Dark</option>
				</Select>
			</div>
		</div>
		<h1 class="text-white text-lg font-medium mb-2">Background color</h1>
		<div class="w-full h-fit flex flex-wrap gap-2 ">
			<div class="w-36 h-12">
				<ColorInput bind:value={payload.css.background} />
			</div>
		</div>
		<h1 class="text-white text-lg font-medium mb-2">Border color</h1>
		<div class="w-full h-fit flex flex-wrap gap-2 ">
			<div class="w-36 h-12">
				<ColorInput bind:value={payload.css.borderColor} />
			</div>
		</div>
	{/if}
	{#if imageSettings}
		<h1 class="text-white text-lg font-medium">Select Image</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Image</h1>
				<Select bind:selected={payload.image.imageName}>
					<option selected value="image1.png">Image 1</option>
					<option value="image2.png">Image 2</option>
				</Select>
			</div>
		</div>
		<h1 class="text-white text-lg font-medium">Image Positioning</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Fit</h1>
				<Select bind:selected={payload.image.objectFit}>
					<option selected value="bg-cover">Cover</option>
					<option value="bg-contain">Contain</option>
				</Select>
			</div>
		</div>
	{/if}
	<h1 class="text-white text-lg font-medium">Transparency</h1>
	<div class="w-full h-fit flex flex-wrap gap-2">
		<div class="w-36 h-24">
			<SliderInput bind:value={payload.css.opacity} />
		</div>
		<h1 class="text-white text-center capitalize">{payload.css.opacity}</h1>
	</div>
</div>
