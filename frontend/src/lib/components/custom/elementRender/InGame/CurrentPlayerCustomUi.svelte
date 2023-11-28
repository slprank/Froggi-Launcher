<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, gameFrame } from '$lib/utils/store.svelte';
	import PlayerPercent from '$lib/components/custom/element/PlayerPercent.svelte';
	import InGameCharacterIcon from '$lib/components/custom/element/inGame/InGameCharacterIcon.svelte';
	import InGameCharacterRender from '$lib/components/custom/element/inGame/InGameCharacterRender.svelte';
	import InGameCharacterSeriesSymbol from '$lib/components/custom/element/inGame/InGameCharacterSeriesSymbol.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.InGameCurrentPlayerPercent}
	<PlayerPercent
		{style}
		{dataItem}
		{defaultPreview}
		numberOfDecimals={0}
		player={$currentPlayer}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGameCurrentPlayerPercentDecimal}
	<PlayerPercent
		{style}
		{dataItem}
		{defaultPreview}
		numberOfDecimals={1}
		player={$currentPlayer}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1StocksRemaining}
	<TextElement {style} {dataItem}>
		{$gameFrame?.players[$currentPlayer?.playerIndex ?? 0]?.post.stocksRemaining ?? '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGameCurrentPlayerCharacterIcon}
	<InGameCharacterIcon
		{dataItem}
		{style}
		preview={defaultPreview}
		player={$currentPlayer}
		defaultPreviewId={Number(CHARACTERS['fox'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGameCurrentPlayerCharacterRender}
	<InGameCharacterRender
		{dataItem}
		{style}
		player={$currentPlayer}
		preview={defaultPreview}
		defaultPreviewId={Number(CHARACTERS['fox'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGameCurrentPlayerCharacterSeriesSymbol}
	<InGameCharacterSeriesSymbol
		{dataItem}
		{style}
		player={$currentPlayer}
		preview={defaultPreview}
		defaultPreviewId={Number(CHARACTERS['fox'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGameCurrentPlayerCharacterSeriesSymbolUltimate}
	<InGameCharacterSeriesSymbol
		{dataItem}
		{style}
		player={$currentPlayer}
		preview={defaultPreview}
		defaultPreviewId={Number(CHARACTERS['fox'])}
		series={'ultimate'}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGameCurrentPlayerComboCounter}
	<TextElement {style} {dataItem}>
		{$gameFrame?.players[$currentPlayer?.playerIndex ?? 0]?.post.currentComboCount ?? '0'}
	</TextElement>
{/if}
