<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, currentMatch } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers?.at(0)?.playerIndex;

	$: player1AttackCount = $currentMatch?.stats?.actionCounts?.[player1Index ?? 0].attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountBair}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.bair, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.bair
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountDair}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.dair, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.dair
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountDash}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.dash, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.dash
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountDsmash}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.dsmash, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.dsmash
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountDtilt}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.dtilt, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.dtilt
			: defaultPreview
			? `14`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountFair}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.fair, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.fair
			: defaultPreview
			? `7`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountFsmash}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.fsmash, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.fsmash
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountFtilt}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.ftilt, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.ftilt
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountJab}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.jab1, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.jab1
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountJab2}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.jab2, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.jab2
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountJab3}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.jab3, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.jab3
			: defaultPreview
			? `10`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.jabm, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.jabm
			: defaultPreview
			? `2`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountNair}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.nair, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.nair
			: defaultPreview
			? `22`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountUair}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.uair, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.uair
			: defaultPreview
			? `16`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountUsmash}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.usmash, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.usmash
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1AttackCountUtilt}
	<TextElement {style} {dataItem}>
		{![player1AttackCount?.utilt, player1Index].some((e) => e === undefined || e === null)
			? player1AttackCount?.utilt
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
