<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers.at(0)?.playerIndex;

	$: player1AttackCount = $postGame.postGameStats?.actionCounts[player1Index ?? 0].attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountBair}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.bair && player1Index !== undefined
			? player1AttackCount.bair
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountDair}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.dair && player1Index !== undefined
			? player1AttackCount.dair
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountDash}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.dash && player1Index !== undefined
			? player1AttackCount.dash
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountDsmash}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.dsmash && player1Index !== undefined
			? player1AttackCount.dsmash
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountDtilt}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.dtilt && player1Index !== undefined
			? player1AttackCount.dtilt
			: defaultPreview
			? `14`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountFair}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.fair && player1Index !== undefined
			? player1AttackCount.fair
			: defaultPreview
			? `7`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountFsmash}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.fsmash && player1Index !== undefined
			? player1AttackCount.fsmash
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountFtilt}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.ftilt && player1Index !== undefined
			? player1AttackCount.ftilt
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountJab}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.jab1 && player1Index !== undefined
			? player1AttackCount.jab1
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountJab2}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.jab2 && player1Index !== undefined
			? player1AttackCount.jab2
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountJab3}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.jab3 && player1Index !== undefined
			? player1AttackCount.jab3
			: defaultPreview
			? `10`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.jabm && player1Index !== undefined
			? player1AttackCount.jabm
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountNair}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.nair && player1Index !== undefined
			? player1AttackCount.nair
			: defaultPreview
			? `22`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountUair}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.uair && player1Index !== undefined
			? player1AttackCount.uair
			: defaultPreview
			? `16`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountUsmash}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.usmash && player1Index !== undefined
			? player1AttackCount.usmash
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1AttackCountUtilt}
	<TextElement {style} {dataItem}>
		{player1AttackCount?.utilt && player1Index !== undefined
			? player1AttackCount.utilt
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
