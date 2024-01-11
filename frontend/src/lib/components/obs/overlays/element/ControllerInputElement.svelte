<script lang="ts">
	import { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
	export let isButtonPressed: boolean | undefined;
	export let button: string | undefined;
</script>

<div class="w-full h-full flex justify-center object-contain relative">
	<img
		style={`absolute ${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
		src={`/image/controller-buttons/texture/${button}-outline.png`}
		alt="button"
	/>
	{#if isButtonPressed}
		<img
			style={`absolute ${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
			src={`/image/controller-buttons/${button}-pressed.png`}
			alt="button"
		/>
	{/if}
</div>
