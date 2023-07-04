<script lang="ts">
	import TextFitMulti from '$lib/components/TextFitMulti.svelte';
	import type { GridContentItem } from '$lib/models/types';

	export let classValue: string;
	export let cssValue: string;
	export let dataItem: GridContentItem;
	export let edit: boolean;
	export let shadow: string;
</script>

{#key dataItem}
	<TextFitMulti
		class={`h-full flex ${classValue}`}
		style={`${shadow}; ${cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customText : ''
		};  ${edit ? 'color: black' : ''}`}
		maxFont={1000}
	>
		<slot />
	</TextFitMulti>
{/key}
