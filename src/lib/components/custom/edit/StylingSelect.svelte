<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import type { CustomOptions, ElementPayload } from '$lib/types/types';
	import ColorInput from '$lib/components/custom/input/ColorInput.svelte';
	import SliderInput from '$lib/components/custom/input/SliderInput.svelte';

	export let selectedElement: CustomOptions;
	export let payload: ElementPayload;

	$: classArray = [];
	$: cssArray = [];

	function updateCustomStyle() {
		payload.class = classArray.filter((style) => style !== undefined).join(' ');
		payload.css = cssArray.filter((style) => style !== undefined).join('; ');
	}

	$: classArray, cssArray, updateCustomStyle();

	// TODO: Add text/box shadow
</script>

<div class="w-full mb-2">
	{#if selectedElement?.isCustomString}
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
	{#if selectedElement?.boxSettings}
		<h1 class="text-white text-lg font-medium mb-2 mt-4">Custom box</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Border</h1>
				<Select bind:selected={classArray[10]}>
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
	{/if}
	{#if selectedElement?.boxSettings}
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Rounded corner</h1>
				<Select bind:selected={classArray[12]}>
					<option value="" selected>None</option>
					<option value="rounded-sm">Small</option>
					<option value="rounded-md">Medium</option>
					<option value="rounded-lg">Large</option>
					<option value="rounded-full">Full</option>
				</Select>
			</div>
		</div>
	{/if}

	{#if selectedElement?.stringSettings}
		<h1 class="text-white text-lg font-medium mb-2 mt-4">Alignment</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Horizontal</h1>
				<Select bind:selected={classArray[10]}>
					<option value="justify-start">Left</option>
					<option selected value="justify-center">Center</option>
					<option value="justify-end">Right</option>
				</Select>
			</div>
		</div>
	{/if}
	{#if selectedElement?.stringSettings}
		<h1 class="text-white text-lg font-medium mb-2 mt-4">Colors</h1>
		<div class="w-full h-fit flex flex-wrap gap-2 ">
			<div class="w-36 h-12">
				<ColorInput key="color" bind:value={cssArray[10]} />
			</div>
		</div>
	{/if}
	{#if selectedElement?.boxSettings}
		<h1 class="text-white text-lg font-medium mb-2 mt-4">Background color</h1>
		<div class="w-full h-fit flex flex-wrap gap-2 ">
			<div class="w-36 h-12">
				<ColorInput key="background" bind:value={cssArray[11]} />
			</div>
		</div>
		<h1 class="text-white text-lg font-medium mb-2 mt-4">Border color</h1>
		<div class="w-full h-fit flex flex-wrap gap-2 ">
			<div class="w-36 h-12">
				<ColorInput key="border-color" bind:value={cssArray[12]} />
			</div>
		</div>
	{/if}
	{#if selectedElement?.imageSettings}
		<h1 class="text-white text-lg font-medium">Select Image</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Image</h1>
				<Select bind:selected={classArray[20]}>
					<option selected value="image1.png">Image 1</option>
					<option value="image2.png">Image 2</option>
				</Select>
			</div>
		</div>
		<h1 class="text-white text-lg font-medium">Image Positioning</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Fit</h1>
				<Select bind:selected={classArray[21]}>
					<option selected value="bg-cover">Cover</option>
					<option value="bg-contain">Contain</option>
				</Select>
			</div>
		</div>
	{/if}
	<h1 class="text-white text-lg font-medium mt-4">Transparency</h1>
	<div class="w-full h-fit flex flex-wrap gap-2">
		<div class="w-36 h-24">
			<SliderInput bind:value={cssArray[13]} key={'opacity'} />
		</div>
		<h1 class="text-white text-center capitalize">{cssArray[13]}%</h1>
	</div>
</div>
