<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountBair}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.displayName
			? $currentPlayer?.rank?.current?.displayName
			: defaultPreview
			? `Current Player`
			: ''}
	</TextElement>
{/if}
