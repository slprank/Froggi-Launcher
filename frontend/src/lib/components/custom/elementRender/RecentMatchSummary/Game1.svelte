<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers.at(0)?.playerIndex;

	$: player1ActionCounts = $postGame?.postGameStats?.actionCounts?.[player1Index ?? 0];

	// TODO: Finish
</script>

{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentStage}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `53`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer1Score}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `1`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer2Score}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer1CharacterIcon}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer2CharacterIcon}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer1CharacterRender}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer2CharacterRender}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer1StocksRemaining}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer2StocksRemaining}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
