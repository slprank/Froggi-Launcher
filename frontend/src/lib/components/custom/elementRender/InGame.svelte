<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayers, gameFrame, gameScore } from '$lib/utils/store.svelte';
	import CharacterIcon from '../element/inGame/CharacterIcon.svelte';
	import CharacterRender from '../element/inGame/CharacterRender.svelte';
	import PlayerPercent from '../element/PlayerPercent.svelte';
	import TextElement from '../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.InGamePlayer1Percent}
	<PlayerPercent {style} {dataItem} {defaultPreview} numberOfDecimals={0} playerIndex={0} />
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer2Percent}
	<PlayerPercent {style} {dataItem} {defaultPreview} numberOfDecimals={0} playerIndex={1} />
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1PercentDecimal}
	<PlayerPercent {style} {dataItem} {defaultPreview} numberOfDecimals={1} playerIndex={0} />
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer2PercentDecimal}
	<PlayerPercent {style} {dataItem} {defaultPreview} numberOfDecimals={1} playerIndex={1} />
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1Score}
	<TextElement {style} {dataItem}>
		{$gameScore?.at(0) ?? '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer2Score}
	<TextElement {style} {dataItem}>
		{$gameScore?.at(1) ?? '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1CharacterIcon}
	<CharacterIcon
		{dataItem}
		{style}
		preview={defaultPreview}
		player={$currentPlayers.at(0)}
		defaultPreviewId={Number(CHARACTERS['fox'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer2CharacterIcon}
	<CharacterIcon
		{dataItem}
		{style}
		preview={defaultPreview}
		player={$currentPlayers.at(1)}
		defaultPreviewId={Number(CHARACTERS['falco'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer1CharacterRender}
	<CharacterRender
		{dataItem}
		{style}
		player={$currentPlayers.at(0)}
		preview={defaultPreview}
		defaultPreviewId={2}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.InGamePlayer2CharacterRender}
	<CharacterRender
		{dataItem}
		{style}
		player={$currentPlayers.at(1)}
		preview={defaultPreview}
		defaultPreviewId={22}
	/>
{/if}
