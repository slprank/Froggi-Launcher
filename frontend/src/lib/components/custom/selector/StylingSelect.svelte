<script lang="ts">
	import Select from '$lib/components/input/Select.svelte';
	import type { Class, ElementPayload } from '$lib/models/types';
	import { Animation, AnimationTrigger, Easing } from '$lib/models/enum';
	import ColorInput from '$lib/components/input/ColorInput.svelte';
	import SliderInput from '$lib/components/input/SliderInput.svelte';
	import { CustomElement, ElementPauseOption, LiveStatsScene } from '$lib/models/enum';
	import CodeInput from '$lib/components/input/CodeInput.svelte';
	import { fly } from 'svelte/transition';
	import FileToBase64Input from '$lib/components/input/FileToBase64Input.svelte';
	import ShadowSelect from './ShadowSelect.svelte';
	import { statsScene } from '$lib/utils/store.svelte';
	import AnimationInput from '$lib/components/input/AnimationInput.svelte';
	import BooleanInput from '$lib/components/input/BooleanInput.svelte';

	// TODO: Animation options and sliders

	export let selectedElementId: number;
	export let payload: ElementPayload;
	let prevSelectedElementId = selectedElementId;

	$: customStringSettings = selectedElementId >= 100 && selectedElementId < 200;
	$: customBoxSettings = selectedElementId >= 200 && selectedElementId < 300;
	$: customImageSettings = selectedElementId >= 300 && selectedElementId < 400;
	$: stringSettings =
		(selectedElementId >= 400 && selectedElementId < 500) ||
		selectedElementId === CustomElement.CustomString;
	$: boxSettings =
		(selectedElementId >= 500 && selectedElementId < 600) ||
		selectedElementId === CustomElement.CustomBox;
	$: imageSettings =
		(selectedElementId >= 600 && selectedElementId < 700) ||
		selectedElementId === CustomElement.CustomImage;

	function clearStyle() {
		if (selectedElementId === prevSelectedElementId) return;
		payload = {
			animation: {
				in: {
					animationType: Animation.None,
					options: {
						delay: 0,
						duration: 0,
						easing: Easing.None,
						x: 0,
						y: 0,
					},
				},
				out: {
					animationType: Animation.None,
					options: {
						delay: 0,
						duration: 0,
						easing: Easing.None,
						x: 0,
						y: 0,
					},
				},
				trigger: AnimationTrigger.None,
			},
			class: {} as Class,
			css: {
				background: boxSettings ? '#000000' : '',
				borderColor: boxSettings ? '#000000' : '',
				color: stringSettings ? '#000000' : '',
				opacity: 1,
				customParent: '',
				customBox: '',
				customText: '',
				customImage: '',
				transform: undefined,
			},
			shadow: {
				x: 0,
				y: 0,
				spread: 0,
				color: '#000000',
			},
			string: '',
			advancedStyling: false,
			pauseOption: ElementPauseOption.Always,
			image: {
				name: undefined,
				src: undefined,
				objectFit: undefined,
			},
		};
		prevSelectedElementId = selectedElementId;
	}
	$: stringSettings, boxSettings, imageSettings, clearStyle();

	const shuffleAnimationTriggers = () => {
		// TODO: Randomize values that triggers animations
	};
</script>

<div class="w-full my-4 grid gap-4">
	{#if selectedElementId === CustomElement.CustomString}
		<div>
			<h1 class="text-gray-500 text-lg font-medium text-shadow">Custom text</h1>
			<div class="w-full h-fit flex flex-wrap">
				<div class="w-36 h-10">
					<input
						type="text"
						id="default-input"
						placeholder="Text"
						bind:value={payload.string}
						class="w-full h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:text-white"
					/>
				</div>
			</div>
		</div>
	{/if}

	{#if stringSettings}
		<div>
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
		</div>
		<div>
			<h1 class="text-gray-500 text-lg font-medium text-shadow">Colors</h1>
			<div class="w-full h-fit flex flex-wrap">
				<div class="w-36 h-12">
					<ColorInput bind:value={payload.css.color} />
				</div>
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
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Background color</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-12">
				<ColorInput bind:value={payload.css.background} />
			</div>
		</div>
		<h1 class="text-gray-500 text-lh font-medium text-shadow">Border color</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-12">
				<ColorInput bind:value={payload.css.borderColor} />
			</div>
		</div>
	{/if}
	{#if selectedElementId === CustomElement.CustomImage}
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Select Image</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<FileToBase64Input
					bind:base64={payload.image.src}
					label="upload"
					acceptedExtensions={'.jpg, .jpeg, .png, .gif, .svg'}
				/>
			</div>
		</div>
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Image Positioning</h1>
	{/if}
	{#if imageSettings}
		{#if selectedElementId >= 100}
			<div class="w-full h-fit flex flex-wrap">
				<div class="w-36 h-24">
					<h1 class="text-gray-500 text-sm font-medium text-shadow">Fit</h1>
					<Select bind:selected={payload.image.objectFit}>
						<option selected value="contain">Contain</option>
						<option value="cover">Cover</option>
					</Select>
				</div>
			</div>
		{/if}
	{/if}
	<div class="w-full h-fit flex flex-wrap">
		<div class="w-36 h-24">
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Flip</h1>
			<Select bind:selected={payload.css.transform}>
				<option selected value="">Default</option>
				<option value="scaleX(-1);">Horizontal</option>
			</Select>
		</div>
	</div>
	<div>
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Shadow</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36">
				<ShadowSelect bind:value={payload.shadow} />
			</div>
		</div>
	</div>
	<div>
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Transparency</h1>
		<div class="w-full h-fit flex flex-wrap items-start">
			<div class="w-36 h-24">
				<SliderInput bind:value={payload.css.opacity} />
			</div>
			<h1 class="text-white text-center capitalize">{payload.css.opacity}</h1>
		</div>
	</div>
	{#if $statsScene === LiveStatsScene.InGame}
		<div class="items-center gap-2 flex">
			<h1
				class="text-gray-500 text-lg font-medium text-shadow mb-2"
				data-tooltip="Animations that triggers on in-game events such as taking damage"
			>
				Trigger Animations
			</h1>
		</div>
		{#if payload.animation.in || payload.animation.out}
			<div class="w-full flex">
				<AnimationInput
					bind:animation={payload.animation.in}
					bind:animationTrigger={payload.animation.trigger}
					label="In"
				/>
				<AnimationInput
					bind:animation={payload.animation.out}
					bind:animationTrigger={payload.animation.trigger}
					label="Out"
				/>
			</div>
		{/if}
		<button
			on:click={shuffleAnimationTriggers}
			class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
		>
			Test animation
		</button>

		<Select bind:selected={payload.pauseOption} label="Display On Pause">
			<option selected value={ElementPauseOption.Always}>Always</option>
			<option value={ElementPauseOption.OnlyActive}>Only While Playing</option>
			<option value={ElementPauseOption.OnlyPaused}>Only While Paused</option>
		</Select>
	{/if}
	<div class="items-center gap-2 flex">
		<h1 class="text-gray-500 text-lg font-medium text-shadow mb-2">Advanced styling</h1>
		<div class="mb-2">
			<BooleanInput bind:checked={payload.advancedStyling} />
		</div>
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
