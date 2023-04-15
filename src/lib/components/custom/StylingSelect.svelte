<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import type { CustomOptions, ElementPayload } from '$lib/types/types';

	export let selectedElement: CustomOptions;
	export let payload: ElementPayload;

	$: stylesArray = [];

	function updateCustomStyle() {
		payload.css = stylesArray.filter((style) => style !== undefined).join(' ');
	}

	$: stylesArray, updateCustomStyle();
</script>

<div class="w-full mb-2">
	{#if selectedElement?.stringSettings}
		<h1 class="text-white text-lg font-medium mb-2">Alignment</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Horizontal</h1>
				<Select bind:selected={stylesArray[0]}>
					<option value="justify-start">Left</option>
					<option selected value="justify-center">Center</option>
					<option value="justify-end">Right</option>
				</Select>
			</div>
		</div>
	{/if}
	{#if selectedElement?.stringSettings}
		<h1 class="text-white text-lg font-medium mb-2">Colors</h1>
		<div class="w-full h-fit flex flex-wrap gap-2 ">
			<div class="w-36 h-12">
				<input
					class="w-full h-full rounded-md"
					type="color"
					id="head"
					name="head"
					bind:value={stylesArray[2]}
				/>
			</div>
		</div>
	{/if}
	{#if selectedElement?.imageSettings}
		<h1 class="text-white text-lg font-medium">Select Image</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Image</h1>
				<Select bind:selected={stylesArray[10]}>
					<option selected value="image1.png">Image 1</option>
					<option value="image2.png">Image 2</option>
				</Select>
			</div>
		</div>
		<h1 class="text-white text-lg font-medium">Image Positioning</h1>
		<div class="w-full h-fit flex flex-wrap gap-2">
			<div class="w-36 h-24">
				<h1 class="text-white text-md font-medium">Fit</h1>
				<Select bind:selected={stylesArray[11]}>
					<option selected value="bg-cover">Cover</option>
					<option value="bg-contain">Contain</option>
				</Select>
			</div>
		</div>
	{/if}

	<!-- Opacity-->
</div>
