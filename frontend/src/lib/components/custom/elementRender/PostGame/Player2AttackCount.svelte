<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player2Index = $currentPlayers.at(1)?.playerIndex;

	$: player2AttackCounts = $postGame.postGameStats?.actionCounts[player2Index ?? 0].attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountBair}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.bair && player2Index !== undefined
			? player2AttackCounts.bair
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDair}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.dair && player2Index !== undefined
			? player2AttackCounts.dair
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDash}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.dash && player2Index !== undefined
			? player2AttackCounts.dash
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDsmash}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.dsmash && player2Index !== undefined
			? player2AttackCounts.dsmash
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDtilt}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.dtilt && player2Index !== undefined
			? player2AttackCounts.dtilt
			: defaultPreview
			? `14`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFair}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.fair && player2Index !== undefined
			? player2AttackCounts.fair
			: defaultPreview
			? `7`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFsmash}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.fsmash && player2Index !== undefined
			? player2AttackCounts.fsmash
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFtilt}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.ftilt && player2Index !== undefined
			? player2AttackCounts.ftilt
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.jab1 && player2Index !== undefined
			? player2AttackCounts.jab1
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab2}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.jab2 && player2Index !== undefined
			? player2AttackCounts.jab2
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab3}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.jab3 && player2Index !== undefined
			? player2AttackCounts.jab3
			: defaultPreview
			? `10`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.jabm && player2Index !== undefined
			? player2AttackCounts.jabm
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountNair}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.nair && player2Index !== undefined
			? player2AttackCounts.nair
			: defaultPreview
			? `22`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUair}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.uair && player2Index !== undefined
			? player2AttackCounts.uair
			: defaultPreview
			? `16`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUsmash}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.usmash && player2Index !== undefined
			? player2AttackCounts.usmash
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUtilt}
	<TextElement {style} {dataItem}>
		{player2AttackCounts?.utilt && player2Index !== undefined
			? player2AttackCounts.utilt
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
