<script lang="ts">
	import { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
	export let isButtonPressed: boolean | undefined;
	export let button: string | undefined;
</script>

<div class="w-full h-full flex justify-center object-contain">
	<img
		style={`${style.cssValue}; ${dataItem?.data.advancedStyling}; ${style.shadow} ${
			!isButtonPressed ? 'opacity: 0.5' : ''
		}`}
		src={`/image/controller-buttons/${button}.svg`}
		alt="button"
	/>
</div>
