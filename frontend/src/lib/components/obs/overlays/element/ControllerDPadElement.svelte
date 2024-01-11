<script lang="ts">
	import { ControllerButtons } from '$lib/models/types/controller';
	import { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
	export let buttonPresses: ControllerButtons | undefined;
</script>

<div class="w-full h-full flex justify-center object-contain relative">
	<img
		style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
		src={`/image/controller-buttons/DPadGate.png`}
		alt="button"
	/>
	{#if buttonPresses?.isDPadUpPressed}
		<img
			style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
			src={`/image/controller-buttons/DPadUp.png`}
			alt="button"
		/>
	{/if}
	{#if buttonPresses?.isDPadDownPressed}
		<img
			style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
			src={`/image/controller-buttons/DPadDown.png`}
			alt="button"
		/>
	{/if}
	{#if buttonPresses?.isDPadLeftPressed}
		<img
			style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
			src={`/image/controller-buttons/DPadLeft.png`}
			alt="button"
		/>
	{/if}
	{#if buttonPresses?.isDPadRightPressed}
		<img
			style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
			src={`/image/controller-buttons/DPadRight.png`}
			alt="button"
		/>
	{/if}
</div>
