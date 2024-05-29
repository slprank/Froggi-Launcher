<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, currentMatch } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player2Index = $currentPlayers?.at(1)?.playerIndex;

	$: player2AttackCounts = $currentMatch?.stats?.actionCounts?.[player2Index ?? 0].attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountBair}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.bair, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.bair
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountDair}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.dair, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.dair
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountDash}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.dash, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.dash
			: defaultPreview
			? `28`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountDsmash}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.dsmash, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.dsmash
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountDtilt}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.dtilt, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.dtilt
			: defaultPreview
			? `14`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountFair}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.fair, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.fair
			: defaultPreview
			? `7`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountFsmash}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.fsmash, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.fsmash
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountFtilt}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.ftilt, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.ftilt
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountJab}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.jab1, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.jab1
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountJab2}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.jab2, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.jab2
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountJab3}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.jab3, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.jab3
			: defaultPreview
			? `10`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.jabm, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.jabm
			: defaultPreview
			? `2`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountNair}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.nair, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.nair
			: defaultPreview
			? `22`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountUair}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.uair, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.uair
			: defaultPreview
			? `16`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountUsmash}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.usmash, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.usmash
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer2AttackCountUtilt}
	<TextElement {style} {dataItem}>
		{![player2AttackCounts?.utilt, player2Index].some((e) => e === undefined || e === null)
			? player2AttackCounts?.utilt
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
