<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers?.at(0)?.playerIndex;

	$: player1AttackCount =
		$postGame?.postGameStats?.actionCounts?.[player1Index ?? 0]?.attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountBair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![player1AttackCount?.bair, player1Index].some(isNil)
			? player1AttackCount?.bair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountDair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![player1AttackCount?.dair, player1Index].some(isNil)
			? player1AttackCount?.dair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountDash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `28`
			: ![player1AttackCount?.dash, player1Index].some(isNil)
			? player1AttackCount?.dash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountDsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![player1AttackCount?.dsmash, player1Index].some(isNil)
			? player1AttackCount?.dsmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountDtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `14`
			: ![player1AttackCount?.dtilt, player1Index].some(isNil)
			? player1AttackCount?.dtilt
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountFair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `7`
			: ![player1AttackCount?.fair, player1Index].some(isNil)
			? player1AttackCount?.fair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountFsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![player1AttackCount?.fsmash, player1Index].some(isNil)
			? player1AttackCount?.fsmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountFtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![player1AttackCount?.ftilt, player1Index].some(isNil)
			? player1AttackCount?.ftilt
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountJab}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![player1AttackCount?.jab1, player1Index].some(isNil)
			? player1AttackCount?.jab1
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountJab2}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![player1AttackCount?.jab2, player1Index].some(isNil)
			? player1AttackCount?.jab2
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountJab3}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `10`
			: ![player1AttackCount?.jab3, player1Index].some(isNil)
			? player1AttackCount?.jab3
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `2`
			: ![player1AttackCount?.jabm, player1Index].some(isNil)
			? player1AttackCount?.jabm
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountNair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22`
			: ![player1AttackCount?.nair, player1Index].some(isNil)
			? player1AttackCount?.nair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountUair}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `16`
			: ![player1AttackCount?.uair, player1Index].some(isNil)
			? player1AttackCount?.uair
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountUsmash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![player1AttackCount?.usmash, player1Index].some(isNil)
			? player1AttackCount?.usmash
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountUtilt}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![player1AttackCount?.utilt, player1Index].some(isNil)
			? player1AttackCount?.utilt
			: '0'}
	</TextElement>
{/if}
