<script lang="ts">
	import type { AnimationOptions, ElementAnimation } from '$lib/models/types';
	import { Animation, Easing } from '$lib/models/enum';
	import Select from './Select.svelte';

	const min = 0;
	const max = 1000;
	export let animation: ElementAnimation;
	export let label: string | undefined = undefined;
	// TODO: Add dropdown for key listening value
</script>

{#if animation}
	<div class="w-full">
		{#if label}
			<h1 class="text-gray-500 text-md font-medium text-shadow">{label}</h1>
		{/if}
		<div class="w-32">
			<h1 class="text-gray-500 text-sm font-medium text-shadow">Type</h1>
			<div class="relative w-24 h-11 bg-white rounded-md">
				<Select bind:selected={animation.animationType}>
					<option selected value={Animation.None}>None</option>
					<option value={Animation.Blur}>Blur</option>
					<option value={Animation.Fade}>Fade</option>
					<option value={Animation.Fly}>Fly</option>
					<option value={Animation.Scale}>Scale</option>
					<option value={Animation.Shake}>Shake</option>
					<option value={Animation.Slide}>Slide</option>
				</Select>
			</div>

			{#if animation?.animationType !== Animation.None}
				<h1 class="text-gray-500 text-sm font-medium text-shadow">X-distance</h1>
				<div class="relative w-24 h-11 bg-white rounded-md">
					<input
						type="number"
						class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
						id="numberInput"
						step={1}
						{min}
						{max}
						bind:value={animation.options.x}
					/>
				</div>

				<h1 class="text-gray-500 text-sm font-medium text-shadow">Y-distance</h1>
				<div class="relative w-24 h-11 bg-white rounded-md">
					<input
						type="number"
						class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
						id="numberInput"
						step={max / 100}
						{min}
						{max}
						bind:value={animation.options.y}
					/>
				</div>

				<h1 class="text-gray-500 text-sm font-medium text-shadow">Duration</h1>
				<div class="relative w-24 h-11 bg-white rounded-md">
					<input
						type="number"
						class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
						id="numberInput"
						step={max / 100}
						{min}
						{max}
						bind:value={animation.options.duration}
					/>
				</div>

				<h1 class="text-gray-500 text-sm font-medium text-shadow">Delay</h1>
				<div class="relative w-24 h-11 bg-white rounded-md">
					<input
						type="number"
						class="peer block bg-white w-full h-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:bg-gray-700 dark:text-white"
						id="numberInput"
						step={max / 100}
						{min}
						{max}
						bind:value={animation.options.delay}
					/>
				</div>

				<h1 class="text-gray-500 text-sm font-medium text-shadow">Easing</h1>
				<div class="relative w-24 h-11 bg-white rounded-md">
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
		</div>
	</div>
{/if}
