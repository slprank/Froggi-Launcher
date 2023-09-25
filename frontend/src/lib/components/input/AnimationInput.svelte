<script lang="ts">
	import type { AnimationSettings } from '$lib/models/types';
	import { Animation, Easing } from '$lib/models/enum';
	import Select from './Select.svelte';
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { notifications } from '../notification/Notifications.svelte';

	const max = SCENE_TRANSITION_DELAY;
	export let animation: AnimationSettings;
	export let label: string | undefined = undefined;
	export let isSceneAnimation: boolean = false;

	const fixAnimationInputDelay = () => {
		if (animation?.options.duration > SCENE_TRANSITION_DELAY) {
			animation.options.duration = SCENE_TRANSITION_DELAY;
			notifications.warning(`Duration cannot exceed ${SCENE_TRANSITION_DELAY}ms`, 3000);
		}
		if (animation?.options.duration + animation?.options.delay > SCENE_TRANSITION_DELAY) {
			animation.options.delay = SCENE_TRANSITION_DELAY - animation?.options.duration;
			notifications.warning(
				`Duration + delay cannot exceed ${SCENE_TRANSITION_DELAY}ms`,
				3000,
			);
		}
		if (animation.type === Animation.None) {
			animation.options.delay = 0;
			animation.options.duration = 0;
		}
	};
	$: animation, fixAnimationInputDelay();
	// TODO: Add dropdown for key listening value
</script>

{#if animation}
	<div class="w-full">
		{#if label}
			<h1 class="text-gray-500 text-md font-medium text-shadow">{label}</h1>
		{/if}
		<div class="w-full">
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Type</h1>
			<div class="relative w-full bg-white rounded-md">
				<Select bind:selected={animation.type}>
					<option selected value={Animation.None}>None</option>
					<option value={Animation.Blur}>Blur</option>
					<option value={Animation.Fade}>Fade</option>
					<option value={Animation.Fly}>Fly</option>
					<option value={Animation.Scale}>Scale</option>
					<option value={Animation.FlyRandom}>Fly Random</option>
					{#if isSceneAnimation}
						<option value={Animation.FlyAutomatic}>Fly Automatic</option>
					{/if}
					<option value={Animation.Slide}>Slide</option>
				</Select>
			</div>

			{#if animation?.type !== Animation.None}
				{#if [Animation.Fly, Animation.FlyRandom, Animation.Slide].includes(animation.type)}
					<h1 class="text-gray-500 text-sm font-medium text-shadow">X-distance - px</h1>
					<div class="relative w-full h-11 bg-white rounded-md">
						<input
							type="number"
							class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
							id="numberInput"
							step={1}
							min={-max}
							{max}
							bind:value={animation.options.x}
						/>
					</div>

					<h1 class="text-gray-500 text-sm font-medium text-shadow">Y-distance - px</h1>
					<div class="relative w-full h-11 bg-white rounded-md">
						<input
							type="number"
							class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
							id="numberInput"
							step={max / 100}
							min={-max}
							{max}
							bind:value={animation.options.y}
						/>
					</div>
				{/if}

				{#if animation.type === Animation.Scale}
					<h1 class="text-gray-500 text-sm font-medium text-shadow">Scale From - 1x</h1>
					<div class="relative w-full h-11 bg-white rounded-md">
						<input
							type="number"
							class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
							id="numberInput"
							step={0.01}
							min={0}
							max={5}
							bind:value={animation.options.start}
						/>
					</div>
				{/if}
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Duration - ms</h1>
				<div class="relative w-full h-11 bg-white rounded-md">
					<input
						type="number"
						class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
						id="numberInput"
						step={max / 100}
						min={0}
						{max}
						bind:value={animation.options.duration}
					/>
				</div>
				<h1 class="text-gray-500 text-sm font-medium text-shadow">Delay - ms</h1>
				<div class="relative w-full h-11 bg-white rounded-md">
					<input
						type="number"
						class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
						id="numberInput"
						step={max / 100}
						min={0}
						{max}
						bind:value={animation.options.delay}
					/>
				</div>
				{#if ![Animation.FlyAutomatic].includes(animation.type)}
					<h1 class="text-gray-500 text-sm font-medium text-shadow">Easing</h1>
					<div class="relative w-full bg-white rounded-md">
						<Select bind:selected={animation.options.easing}>
							<option selected value={undefined}>None</option>
							<option value={Easing.BackInOut}>Back In Out</option>
							<option value={Easing.BounceIn}>Bounce In</option>
							<option value={Easing.BounceInOut}>Bounce In-Out</option>
							<option value={Easing.BounceOut}>Bounce Out</option>
							<option value={Easing.SineOut}>Sine Out</option>
						</Select>
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}
