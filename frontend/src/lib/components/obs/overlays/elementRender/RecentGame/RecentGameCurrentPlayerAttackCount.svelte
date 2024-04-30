<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer?.playerIndex;

	$: currentPlayerAttackCount =
		$postGame.postGameStats?.actionCounts?.[currentPlayerIndex ?? 0]?.attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountBair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![currentPlayerAttackCount?.bair, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.bair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![currentPlayerAttackCount?.dair, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.dair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![currentPlayerAttackCount?.dash, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.dash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![currentPlayerAttackCount?.dsmash, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.dsmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `14`
			: ![currentPlayerAttackCount?.dtilt, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.dtilt
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `7`
			: ![currentPlayerAttackCount?.fair, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.fair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![currentPlayerAttackCount?.fsmash, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.fsmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![currentPlayerAttackCount?.ftilt, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.ftilt
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![currentPlayerAttackCount?.jab1, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.jab1
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab2}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![currentPlayerAttackCount?.jab2, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.jab2
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab3}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `10`
			: ![currentPlayerAttackCount?.jab3, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.jab3
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `2`
			: ![currentPlayerAttackCount?.jabm, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.jabm
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountNair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22`
			: ![currentPlayerAttackCount?.nair, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.nair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `16`
			: ![currentPlayerAttackCount?.uair, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.uair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![currentPlayerAttackCount?.usmash, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.usmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![currentPlayerAttackCount?.utilt, currentPlayerIndex].some(isNil)
			? currentPlayerAttackCount?.utilt
			: '0'}
	</TextElement>
{/if}
