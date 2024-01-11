<script lang="ts">
	import { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
	export let analogValue: number | undefined;

	$: console.log(style);
</script>

<div
	class={`w-full h-full overflow-hidden ${style.classValue} progress-container`}
	style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow}`}
>
	<div class="progress-bar" style={`width: ${(analogValue ?? 0) * 100}%`} />
</div>

<style>
	/* Style for the progress bar container */
	.progress-container {
		width: 100%;
		height: 100%;
		background-color: transparent;
	}

	/* Style for the progress bar */
	.progress-bar {
		height: 100%; /* You can adjust the height as needed */
		background-color: white; /* White color for progress */
	}
</style>
