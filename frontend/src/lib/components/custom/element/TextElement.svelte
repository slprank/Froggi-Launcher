<script lang="ts">
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
</script>

{#key dataItem}
	<TextFitMulti
		class={`h-full flex ${style.classValue}`}
		style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
		};`}
		maxFont={1000}
	>
		<slot />
	</TextFitMulti>
{/key}
