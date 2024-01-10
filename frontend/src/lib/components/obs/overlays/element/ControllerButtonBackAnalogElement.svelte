<script lang="ts">
	import { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
	export let analogValue: number | undefined;
</script>

<div class="w-full h-full flex justify-center object-contain relative">
	<svg
		style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
		class="absolute"
		width="100%"
		height="100%"
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle style="fill: black;" cx="50" cy="50" r="30" />
		<polygon points="45,5 85,25 85,75 50,95 15,75 15,25" style="fill: black" />
	</svg>
</div>
