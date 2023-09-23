<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer.playerIndex ?? 0;
	$: player1Index = $currentPlayers.at(0)?.playerIndex ?? 0;
	$: player2Index = $currentPlayers.at(1)?.playerIndex ?? 1;

	$: currentPlayerAttackCount =
		$postGame.postGameStats?.actionCounts[currentPlayerIndex].attackCount;
	$: player1AttackCount = $postGame.postGameStats?.actionCounts[player1Index].attackCount;
	$: player2AttackCount = $postGame.postGameStats?.actionCounts[player2Index].attackCount;
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountBair}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.bair
			? currentPlayerAttackCount.bair
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDair}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.dair
			? currentPlayerAttackCount.dair
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDash}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.dash
			? currentPlayerAttackCount.dash
			: defaultPreview
			? `28`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDsmash}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.dsmash
			? currentPlayerAttackCount.dsmash
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountDtilt}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.dtilt
			? currentPlayerAttackCount.dtilt
			: defaultPreview
			? `14`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFair}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.fair ? currentPlayerAttackCount.fair : defaultPreview ? `7` : ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFsmash}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.fsmash
			? currentPlayerAttackCount.fsmash
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountFtilt}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.ftilt
			? currentPlayerAttackCount.ftilt
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab2}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.jab2
			? currentPlayerAttackCount.jab2
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJab3}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.jab3
			? currentPlayerAttackCount.jab3
			: defaultPreview
			? `10`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountJabMulti}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.jabm ? currentPlayerAttackCount.jabm : defaultPreview ? `2` : ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountNair}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.nair
			? currentPlayerAttackCount.nair
			: defaultPreview
			? `22`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUair}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.uair
			? currentPlayerAttackCount.uair
			: defaultPreview
			? `16`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUsmash}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.usmash
			? currentPlayerAttackCount.usmash
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerAttackCountUtilt}
	<TextElement {style} {dataItem}>
		{currentPlayerAttackCount?.utilt
			? currentPlayerAttackCount.utilt
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
