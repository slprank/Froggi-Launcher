<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer } from '$lib/utils/store.svelte';
	import PlayerRankIcon from '../../element/PlayerRankIcon.svelte';
	import RankedCharacterIcon from '../../element/RankedCharacterIcon.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerTag}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `Current Player`
			: $currentPlayer?.rank?.current?.displayName
			? $currentPlayer?.rank?.current?.displayName
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerConnectCode}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `ABCDEF#0`
			: $currentPlayer?.rank?.current?.connectCode
			? $currentPlayer?.rank?.current?.connectCode
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerRankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayer} preview={defaultPreview} />
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerRankText}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `Gold 2`
			: $currentPlayer?.rank?.current?.rank
			? $currentPlayer?.rank?.current?.rank
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerRating}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `1429.3`
			: $currentPlayer?.rank?.current?.rating
			? $currentPlayer?.rank?.current?.rating
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerContinent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `North America`
			: $currentPlayer?.rank?.current?.continent
			? $currentPlayer?.rank?.current?.continent
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerContinentInitials}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `NA`
			: $currentPlayer?.rank?.current?.continentInitials
			? $currentPlayer?.rank?.current?.continentInitials
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerDailyGlobalPlacement}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `270`
			: $currentPlayer?.rank?.current?.dailyGlobalPlacement
			? $currentPlayer?.rank?.current?.dailyGlobalPlacement
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerDailyRegionalPlacement}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `138`
			: $currentPlayer?.rank?.current?.dailyRegionalPlacement
			? $currentPlayer?.rank?.current?.dailyRegionalPlacement
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerWins}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `50`
			: $currentPlayer?.rank?.current?.wins
			? $currentPlayer?.rank?.current?.wins
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerWinsPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `66.7%`
			: $currentPlayer?.rank?.current?.winsPercent
			? `${$currentPlayer?.rank?.current?.winsPercent}%`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerLosses}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `25`
			: $currentPlayer?.rank?.current?.losses
			? $currentPlayer?.rank?.current?.losses
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerLossesPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `33.3%`
			: $currentPlayer?.rank?.current?.lossesPercent
			? `${$currentPlayer?.rank?.current?.lossesPercent}%`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter1}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `Fox`
			: $currentPlayer?.rank?.current?.characters.at(0)?.characterName
			? $currentPlayer?.rank?.current?.characters.at(0)?.characterName
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter1Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `74.3%`
			: $currentPlayer?.rank?.current?.characters.at(0)?.gameCountPercent
			? `${$currentPlayer?.rank?.current?.characters.at(0)?.gameCountPercent}%`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter1Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayer}
		preview={defaultPreview}
		characterNumber={0}
		defaultPreviewId={Number(CHARACTERS['fox'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter2}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `Ganondorf`
			: $currentPlayer?.rank?.current?.characters.at(1)?.characterName
			? $currentPlayer?.rank?.current?.characters.at(1)?.characterName
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter2Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `18.3%`
			: $currentPlayer?.rank?.current?.characters.at(1)?.gameCountPercent
			? `${$currentPlayer?.rank?.current?.characters.at(1)?.gameCountPercent}%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter2Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayer}
		preview={defaultPreview}
		characterNumber={1}
		defaultPreviewId={Number(CHARACTERS['ganondorf'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter3}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `Falco`
			: $currentPlayer?.rank?.current?.characters.at(2)?.characterName
			? $currentPlayer?.rank?.current?.characters.at(2)?.characterName
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter3Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `7.4%`
			: $currentPlayer?.rank?.current?.characters.at(2)?.gameCountPercent
			? `${$currentPlayer?.rank?.current?.characters.at(2)?.gameCountPercent}%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter3Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayer}
		preview={defaultPreview}
		characterNumber={2}
		defaultPreviewId={Number(CHARACTERS['falco'])}
	/>
{/if}
