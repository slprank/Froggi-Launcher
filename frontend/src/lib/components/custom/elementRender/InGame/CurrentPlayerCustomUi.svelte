<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, currentPlayers, gameScore } from '$lib/utils/store.svelte';
	import PlayerPercent from '../../element/PlayerPercent.svelte';
	import TextElement from '../../element/TextElement.svelte';
	import InGameCharacterIcon from '../../element/inGame/InGameCharacterIcon.svelte';
	import InGameCharacterRender from '../../element/inGame/InGameCharacterRender.svelte';

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
