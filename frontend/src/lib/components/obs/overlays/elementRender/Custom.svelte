<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import TextElement from '../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.CustomString}
	<TextElement {style} {dataItem}>
		{dataItem?.data.string}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CustomBox}
	<div
		class={`w-full h-full ${style.classValue}`}
		style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CustomImage}
	<div
		class={`w-full h-full ${style.classValue}`}
		style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="w-full h-full"
			style={`object-fit: ${dataItem?.data.image.objectFit ?? 'contain'};
					${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={dataItem?.data.image.src}
			alt="custom"
		/>
	</div>
{/if}
