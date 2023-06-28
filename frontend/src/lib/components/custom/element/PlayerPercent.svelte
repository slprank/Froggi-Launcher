<script lang="ts">
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import type { GridContentItem } from '$lib/models/types';
	import type { PreFrameUpdateType } from '@slippi/slippi-js';

	export let classValue: string;
	export let cssValue: string;
	export let dataItem: GridContentItem;
	export let edit: boolean;
	export let shadow: string;

	export let frame: PreFrameUpdateType | undefined;
	export let numberOfDecimals: number;

	$: framePercent = frame ? Math.floor(frame.percent ?? 0).toFixed() : 0;

	const MAX_INTENSITY = 300;

	let percentageColor: string = '#ffffff';

	$: decimals = (): string | undefined =>
		numberOfDecimals
			? frame?.percent?.toFixed(numberOfDecimals).split('.').at(1) ?? '0'
			: undefined;

	const updateColor = () => {
		console.log('updating');
		var startColor = '#ffffff'; // Replace with your desired start color
		var endColor = '#6f1622'; // Replace with your desired end color

		percentageColor = interpolateColors(
			startColor,
			endColor,
			parseInt(frame?.percent?.toFixed() ?? '0'),
		); // Call the function to interpolate the colors

		console.log(percentageColor);
	};
	$: frame?.percent, updateColor();

	function interpolateColors(startColor: string, endColor: string, value: number) {
		value = Math.min(value, MAX_INTENSITY);
		var startRGB = hexToRgb(startColor); // Convert the start color to RGB
		var endRGB = hexToRgb(endColor); // Convert the end color to RGB

		var r = interpolate(startRGB.r, endRGB.r, value); // Interpolate the red component
		var g = interpolate(startRGB.g, endRGB.g, value); // Interpolate the green component
		var b = interpolate(startRGB.b, endRGB.b, value); // Interpolate the blue component

		return rgbToHex(r, g, b); // Convert the interpolated RGB values back to hex
	}

	function interpolate(start: number, end: number, value: number) {
		return start + (end - start) * (value / MAX_INTENSITY); // Perform linear interpolation
	}

	function hexToRgb(hex: string) {
		var bigint = parseInt(hex.slice(1), 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		return { r, g, b };
	}

	function rgbToHex(r: number, g: number, b: number) {
		var hex = ((r << 16) | (g << 8) | b).toString(16);
		return '#' + ('000000' + hex).slice(-6);
	}
</script>

{#key frame?.percent}
	<div class="w-full h-full relative">
		{#each Array.from(Array(2)) as _, i}
			<div class={`w-full h-full absolute ${i === 0 ? 'text-black' : ''}`}>
				<TextFitMulti
					class={`h-full ${classValue} justify-end ${i === 0 ? 'font-[900]' : ``}`}
					style={`${shadow}; ${cssValue}; ${
						dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
					};  ${edit ? 'color: black' : ''} ${
						i !== 0 ? `color: ${percentageColor}` : ``
					}`}
					maxFont={1000}
				>
					{#if !numberOfDecimals}
						<span class="mr-[.3em]">
							{`${framePercent}`}
							<span class="text-[80%] mx-[-.2em]">%</span>
						</span>
					{/if}
					{#if numberOfDecimals}
						<span class="mr-[.4em]">
							{`${framePercent}`}
							<span class="text-[55%] mx-[-.5em]">
								{`${numberOfDecimals ? `.${decimals()}` : ''}%`}
							</span>
						</span>
					{/if}
				</TextFitMulti>
			</div>
		{/each}
	</div>
{/key}
