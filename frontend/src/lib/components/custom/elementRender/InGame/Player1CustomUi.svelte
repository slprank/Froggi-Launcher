<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, gameFrame, gameScore } from '$lib/utils/store.svelte';
	import PlayerPercent from '../../element/PlayerPercent.svelte';
	import TextElement from '../../element/TextElement.svelte';
	import InGameCharacterIcon from '../../element/inGame/InGameCharacterIcon.svelte';
	import InGameCharacterRender from '../../element/inGame/InGameCharacterRender.svelte';
	import InGameCharacterSeriesSymbol from '../../element/inGame/InGameCharacterSeriesSymbol.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.InGamePlayer1Percent}
	<PlayerPercent
		{style}
		{dataItem}
		{defaultPreview}
		numberOfDecimals={0}
		player={$currentPlayers?.at(0)}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1PercentDecimal}
	<PlayerPercent
		{style}
		{dataItem}
		{defaultPreview}
		numberOfDecimals={1}
		player={$currentPlayers?.at(0)}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1StockNumber}
	<TextElement {style} {dataItem}>
		{$gameFrame?.players[$currentPlayers?.at(0)?.playerIndex ?? 0]?.post.stocksRemaining ?? '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1CharacterIcon}
	<InGameCharacterIcon
		{dataItem}
		{style}
		preview={defaultPreview}
		player={$currentPlayers?.at(0)}
		defaultPreviewId={Number(CHARACTERS['fox'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1CharacterRender}
	<InGameCharacterRender
		{dataItem}
		{style}
		player={$currentPlayers?.at(0)}
		preview={defaultPreview}
		defaultPreviewId={Number(CHARACTERS['fox'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1CharacterSeriesSymbol}
	<InGameCharacterSeriesSymbol
		{dataItem}
		{style}
		player={$currentPlayers?.at(0)}
		preview={defaultPreview}
		defaultPreviewId={Number(CHARACTERS['fox'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1CharacterSeriesSymbolUltimate}
	<InGameCharacterSeriesSymbol
		{dataItem}
		{style}
		player={$currentPlayers?.at(0)}
		preview={defaultPreview}
		defaultPreviewId={Number(CHARACTERS['fox'])}
		series={'ultimate'}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1ComboCounter}
	<TextElement {style} {dataItem}>
		{$gameFrame?.players[$currentPlayers?.at(0)?.playerIndex ?? 0]?.post.currentComboCount ??
			'0'}
	</TextElement>
{/if}
