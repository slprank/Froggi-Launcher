<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { gameScore } from '$lib/utils/store.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.InGamePlayer1Score}
	<TextElement {style} {dataItem}>
		{$gameScore?.at(0) ?? '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer2Score}
	<TextElement {style} {dataItem}>
		{$gameScore?.at(1) ?? '0'}
	</TextElement>
{/if}
