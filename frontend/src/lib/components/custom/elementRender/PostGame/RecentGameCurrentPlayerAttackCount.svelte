<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer?.playerIndex;

	$: currentPlayerAttackCount =
		$postGame.postGameStats?.actionCounts?.[currentPlayerIndex ?? 0]?.attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountBair}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDair}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDash}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDsmash}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDtilt}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFair}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFsmash}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFtilt}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab2}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab3}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJabMulti}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountNair}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUair}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUsmash}
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
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUtilt}
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
