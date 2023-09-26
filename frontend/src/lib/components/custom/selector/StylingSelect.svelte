<script lang="ts">
	import Select from '$lib/components/input/Select.svelte';
	import type { ElementPayload } from '$lib/models/types';
	import { Animation, AnimationTrigger, VisibilityOption } from '$lib/models/enum';
	import ColorInput from '$lib/components/input/ColorInput.svelte';
	import SliderInput from '$lib/components/input/SliderInput.svelte';
	import { CustomElement } from '$lib/models/constants/customElement';
	import { LiveStatsScene } from '$lib/models/enum';
	import CodeInput from '$lib/components/input/CodeInput.svelte';
	import { fly } from 'svelte/transition';
	import FileToBase64Input from '$lib/components/input/FileToBase64Input.svelte';
	import ShadowSelect from './ShadowSelect.svelte';
	import { statsScene, eventEmitter } from '$lib/utils/store.svelte';
	import AnimationInput from '$lib/components/input/AnimationInput.svelte';
	import BooleanInput from '$lib/components/input/BooleanInput.svelte';
	import FontSelectorLayer from '$lib/components/custom/selector/FontSelectLayer.svelte';
	import { getDefaultElementPayload } from '../edit/OverlayHandler.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import VisibilitySelect from './VisibilitySelect.svelte';

	// TODO: Animation options and sliders

	export let selectedId: string;
	export let selectedElementId: number;
	export let payload: ElementPayload;

	$: customStringSettings = selectedElementId >= 1000 && selectedElementId < 2000;
	$: customBoxSettings = selectedElementId >= 2000 && selectedElementId < 3000;
	$: customImageSettings = selectedElementId >= 3000 && selectedElementId < 4000;
	$: stringSettings =
		(selectedElementId >= 4000 && selectedElementId < 5000) ||
		selectedElementId === CustomElement.CustomString;
	$: boxSettings =
		(selectedElementId >= 5000 && selectedElementId < 6000) ||
		selectedElementId === CustomElement.CustomBox;
	$: imageSettings =
		(selectedElementId >= 6000 && selectedElementId < 7000) ||
		selectedElementId === CustomElement.CustomImage;
	$: percentSettings = selectedElementId >= 1001 && selectedElementId <= 1006;

	const prevSelectedElementId = selectedElementId;

	function clearStyle() {
		if (selectedElementId === prevSelectedElementId) return;
		payload = getDefaultElementPayload();
	}

	$: selectedElementId, clearStyle();

	const fixAnimationInputDelay = () => {
		if (payload.animation.in.type === Animation.None) {
			payload.animation.in.options.delay = 0;
			payload.animation.in.options.duration = 0;
		}
		if (payload.animation.out.type === Animation.None) {
			payload.animation.out.options.delay = 0;
			payload.animation.out.options.duration = 0;
		}
	};
	$: payload.animation, fixAnimationInputDelay();

	$: console.log('Selected id', selectedElementId);

	const shuffleAnimationTriggers = () => {
		$eventEmitter.emit('animation_test_trigger');
	};
	const shuffleAnimationVisibility = () => {
		$eventEmitter.emit('animation_test_visibility');
	};
</script>

{#key selectedElementId}
	<div
		class="w-full my-4 grid gap-4"
		in:fly={{ duration: 250, x: 150, delay: 250 }}
		out:fly={{ duration: 250, x: 150 }}
	>
		{#if selectedElementId === CustomElement.CustomString}
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
		{/if}

		{#if stringSettings || customStringSettings}
			<FontSelectorLayer bind:font={payload.font} fontId={selectedId} />
		{/if}
		{#if percentSettings}
			<h1 class="text-gray-500 text-lg font-medium text-shadow">Percent Colors</h1>
			<div>
				<div class="w-full h-fit flex flex-wrap">
					<div class="w-36 h-12">
						<h1 class="text-gray-500 text-sm font-medium text-shadow">
							Start Color - 0%
						</h1>
						<ColorInput bind:value={payload.percent.startColor} />
					</div>
				</div>
			</div>
			<div>
				<div class="w-full h-fit flex flex-wrap">
					<div class="w-36 h-12">
						<h1 class="text-gray-500 text-sm font-medium text-shadow">
							End Color - 300%
						</h1>
						<ColorInput bind:value={payload.percent.endColor} />
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
				<h1 class="text-gray-500 text-lg font-medium text-shadow">Color</h1>
				<div class="w-full h-fit flex flex-wrap">
					<div class="w-36 h-12">
						<ColorInput bind:value={payload.css.color} />
					</div>
				</div>
			</div>
		{/if}
		{#if stringSettings || percentSettings}
			<h1 class="text-gray-500 text-lg font-medium text-shadow">Stroke</h1>
			<div>
				<h1 class="text-gray-500 text-sm font-medium text-shadow">
					Size - ({payload.stroke.size})
				</h1>
				<div class="w-full h-fit flex flex-wrap">
					<div class="w-36">
						<NumberInput bind:value={payload.stroke.size} min={0} max={5} step={0.1} />
					</div>
				</div>
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Color</h1>
				<div class="w-full h-fit flex flex-wrap">
					<div class="w-36">
						<ColorInput bind:value={payload.stroke.color} />
					</div>
				</div>
			</div>
		{/if}
		{#if boxSettings}
			<div class="w-full h-fit flex flex-wrap">
				<div class="w-36">
					<h1 class="text-gray-500 text-lg font-medium text-shadow">Border</h1>
					<h1 class="text-gray-500 text-md font-medium text-shadow">Color</h1>
					<div class="w-full h-fit flex flex-wrap">
						<ColorInput bind:value={payload.css.borderColor} />
					</div>
					<div class="grid grid-flow-row gap-2">
						<NumberInput
							value={Number(payload.css.borderLeft?.slice(0, -9) ?? 0)}
							bind:valueConcat={payload.css.borderLeft}
							min={0}
							max={100}
							step={0.1}
							stringFormat={'{0}rem solid'}
							label={'Left'}
						/>
						<NumberInput
							value={Number(payload.css.borderRight?.slice(0, -9) ?? 0)}
							bind:valueConcat={payload.css.borderRight}
							min={0}
							max={100}
							step={0.1}
							stringFormat={'{0}rem solid'}
							label={'Right'}
						/>
						<NumberInput
							value={Number(payload.css.borderTop?.slice(0, -9) ?? 0)}
							bind:valueConcat={payload.css.borderTop}
							min={0}
							max={100}
							step={0.1}
							stringFormat={'{0}rem solid'}
							label={'Top'}
						/>
						<NumberInput
							value={Number(payload.css.borderBottom?.slice(0, -9) ?? 0)}
							bind:valueConcat={payload.css.borderBottom}
							min={0}
							max={100}
							step={0.1}
							stringFormat={'{0}rem solid'}
							label={'Bottom'}
						/>
					</div>
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
							<option value="contain">Contain</option>
							<option selected value="cover">Cover</option>
						</Select>
					</div>
				</div>
			{/if}
		{/if}
		<h1 class="text-gray-500 text-lg font-medium text-shadow">Transformation</h1>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-36 h-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Flip</h1>
				<Select bind:selected={payload.css.scale}>
					<option selected value={undefined}>Default</option>
					<option value={'-1 1;'}>Horizontal</option>
					<option value={'1 -1'}>Vertical</option>
					<option value={'-1 -1'}>Horizontal & Vertical</option>
				</Select>
			</div>
		</div>
		<div class="w-full h-fit flex flex-wrap">
			<div class="w-44 h-24">
				<h1 class="text-gray-500 text-sm font-medium text-shadow">
					Rotate - ({payload.css.rotate ?? '0deg'})
				</h1>
				<SliderInput
					value={payload.css.rotate ? parseInt(payload.css.rotate.slice(0, -3)) : 0}
					stringFormat={'{0}deg'}
					bind:valueConcat={payload.css.rotate}
					min={-180}
					max={180}
					step={1}
				/>
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
					<SliderInput
						value={parseInt(payload.css.opacity)}
						bind:valueConcat={payload.css.opacity}
					/>
				</div>
				<h1 class="text-white text-center capitalize">{payload.css.opacity}</h1>
			</div>
		</div>
		<div class="items-center gap-2 flex">
			<h1
				class="text-gray-500 text-lg font-medium text-shadow mb-2"
				data-tooltip="Animations that triggers on in-game events such as taking damage"
			>
				Animation Triggers
			</h1>
		</div>
		<h1 class="text-gray-500 text-sm font-medium text-shadow">Trigger</h1>
		<div class="relative w-[50%] bg-white rounded-md">
			<Select bind:selected={payload.animation.trigger}>
				<option selected value={AnimationTrigger.None}>None</option>
				{#if $statsScene === LiveStatsScene.InGame}
					<option selected value={AnimationTrigger.Player1Percent}>
						Player1 Percent Increase
					</option>
					<option value={AnimationTrigger.Player2Percent}>
						Player2 Percent Increase
					</option>
					<option selected value={AnimationTrigger.Player1StockLost}>
						Player1 Stock Lost
					</option>
					<option selected value={AnimationTrigger.Player2StockLost}>
						Player2 Stock Lost
					</option>
				{/if}
			</Select>
		</div>
		{#if payload.animation.trigger !== AnimationTrigger.None}
			<div class="w-full flex gap-4">
				<AnimationInput bind:animation={payload.animation.in} label="In" />
				<AnimationInput bind:animation={payload.animation.out} label="Out" />
			</div>
			<button
				on:click={shuffleAnimationTriggers}
				data-tooltip={`in/out animation will be triggered simultaneously, consider applying delay while testing`}
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
			>
				Test animation
			</button>
		{/if}

		<div class="items-center gap-2 flex">
			<h1
				class="text-gray-500 text-lg font-medium text-shadow mb-2"
				data-tooltip="Animations that triggers on in-game events such as taking damage"
			>
				Visibility
			</h1>
		</div>

		<VisibilitySelect bind:selectedVisibilityOption={payload.visibility.key} />

		{#if payload.visibility.key !== VisibilityOption.Always}
			<div class="w-full flex gap-4">
				<AnimationInput bind:animation={payload.visibility.in} label="In" />
				<AnimationInput bind:animation={payload.visibility.out} label="Out" />
			</div>
			<button
				on:click={shuffleAnimationVisibility}
				data-tooltip={`in/out animation will be triggered simultaneously, consider applying delay while testing`}
				class="transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border border-white rounded"
			>
				Test animation
			</button>
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
{/key}
