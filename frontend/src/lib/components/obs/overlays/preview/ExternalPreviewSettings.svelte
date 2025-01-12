<script lang="ts">
	import FileToBase64Input from '$lib/components/input/FileToBase64Input.svelte';
	import SliderInput from '$lib/components/input/SliderInput.svelte';

	export let base64: string;
	export let imageOpacity: number;
	export let reset: Function;
</script>

<div class="w-full grid grid-flow-row grid-cols-8 gap-2 items-center">
	<div
		class="w-full col-span-3 grid items-center"
		data-tooltip="Set a temporary background image (Only visible if a background isn't already set)"
	>
		<FileToBase64Input
			bind:base64
			acceptedExtensions={'.jpg, .jpeg, .png, .gif, .svg, .webp'}
		/>
	</div>
	<div class="w-full col-span-2 grid items-center">
		<SliderInput min={0} max={1} step={0.01} bind:value={imageOpacity} />
	</div>
	<button
		class="col-start-7 col-span-2 transition background-color-primary bg-opacity-25 hover:bg-opacity-40 font-semibold text-secondary-color text-md whitespace-nowrap w-full h-10 px-2 xl:text-xl border border-white rounded"
		on:click={() => reset()}
	>
		Reset
	</button>
</div>
