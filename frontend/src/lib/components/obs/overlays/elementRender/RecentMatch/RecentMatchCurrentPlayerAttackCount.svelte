<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, currentMatch } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer?.playerIndex;

	$: currentPlayerAttackCount =
		$currentMatch?.stats?.actionCounts?.[currentPlayerIndex ?? 0]?.attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountBair}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.bair, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.bair
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountDair}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.dair, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.dair
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountDash}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.dash, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.dash
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountDsmash}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.dsmash, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.dsmash
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountDtilt}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.dtilt, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.dtilt
			: defaultPreview
			? `14`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountFair}
	<TextElement {style} {dataItem}>
		{[currentPlayerAttackCount?.fair, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.fair
			: defaultPreview
			? `7`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountFsmash}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.fsmash, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.fsmash
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountFtilt}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.ftilt, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.ftilt
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountJab}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.jab1, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.jab1
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountJab2}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.jab2, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.jab2
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountJab3}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.jab3, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.jab3
			: defaultPreview
			? `10`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.jabm, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.jabm
			: defaultPreview
			? `2`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountNair}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.nair, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.nair
			: defaultPreview
			? `22`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountUair}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.uair, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.uair
			: defaultPreview
			? `16`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountUsmash}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.usmash, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.usmash
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerAttackCountUtilt}
	<TextElement {style} {dataItem}>
		{![currentPlayerAttackCount?.utilt, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerAttackCount?.utilt
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
