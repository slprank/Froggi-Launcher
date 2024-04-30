<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player2Index = $currentPlayers?.at(1)?.playerIndex;

	$: player2AttackCounts =
		$postGame?.postGameStats?.actionCounts?.[player2Index ?? 0]?.attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountBair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![player2AttackCounts?.bair, player2Index].some(isNil)
			? player2AttackCounts?.bair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountDair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![player2AttackCounts?.dair, player2Index].some(isNil)
			? player2AttackCounts?.dair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountDash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![player2AttackCounts?.dash, player2Index].some(isNil)
			? player2AttackCounts?.dash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountDsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![player2AttackCounts?.dsmash, player2Index].some(isNil)
			? player2AttackCounts?.dsmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountDtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `14`
			: ![player2AttackCounts?.dtilt, player2Index].some(isNil)
			? player2AttackCounts?.dtilt
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountFair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `7`
			: ![player2AttackCounts?.fair, player2Index].some(isNil)
			? player2AttackCounts?.fair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountFsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![player2AttackCounts?.fsmash, player2Index].some(isNil)
			? player2AttackCounts?.fsmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountFtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![player2AttackCounts?.ftilt, player2Index].some(isNil)
			? player2AttackCounts?.ftilt
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountJab}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![player2AttackCounts?.jab1, player2Index].some(isNil)
			? player2AttackCounts?.jab1
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountJab2}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![player2AttackCounts?.jab2, player2Index].some(isNil)
			? player2AttackCounts?.jab2
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountJab3}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `10`
			: ![player2AttackCounts?.jab3, player2Index].some(isNil)
			? player2AttackCounts?.jab3
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `2`
			: ![player2AttackCounts?.jabm, player2Index].some(isNil)
			? player2AttackCounts?.jabm
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountNair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22`
			: ![player2AttackCounts?.nair, player2Index].some(isNil)
			? player2AttackCounts?.nair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountUair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `16`
			: ![player2AttackCounts?.uair, player2Index].some(isNil)
			? player2AttackCounts?.uair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountUsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![player2AttackCounts?.usmash, player2Index].some(isNil)
			? player2AttackCounts?.usmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2AttackCountUtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![player2AttackCounts?.utilt, player2Index].some(isNil)
			? player2AttackCounts?.utilt
			: '0'}
	</TextElement>
{/if}
