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
		{$currentPlayer?.rank?.current?.displayName
			? $currentPlayer?.rank?.current?.displayName
			: defaultPreview
			? `Current Player`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerConnectCode}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.connectCode
			? $currentPlayer?.rank?.current?.connectCode
			: defaultPreview
			? `ABCDEF#0`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerRankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayer} preview={defaultPreview} />
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerRankText}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.rank
			? $currentPlayer?.rank?.current?.rank
			: defaultPreview
			? `Gold 2`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerRating}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.rating
			? $currentPlayer?.rank?.current?.rating
			: defaultPreview
			? `1429.3`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerContinent}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.continent
			? $currentPlayer?.rank?.current?.continent
			: defaultPreview
			? `North America`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerContinentInitials}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.continentInitials
			? $currentPlayer?.rank?.current?.continentInitials
			: defaultPreview
			? `NA`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerDailyGlobalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.dailyGlobalPlacement
			? $currentPlayer?.rank?.current?.dailyGlobalPlacement
			: defaultPreview
			? `270`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerDailyRegionalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.dailyRegionalPlacement
			? $currentPlayer?.rank?.current?.dailyRegionalPlacement
			: defaultPreview
			? `138`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerWins}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.wins
			? $currentPlayer?.rank?.current?.wins
			: defaultPreview
			? `50`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerWinsPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.winsPercent
			? `${$currentPlayer?.rank?.current?.winsPercent}%`
			: defaultPreview
			? `66.7%`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerLosses}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.losses
			? $currentPlayer?.rank?.current?.losses
			: defaultPreview
			? `25`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerLossesPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.lossesPercent
			? `${$currentPlayer?.rank?.current?.lossesPercent}%`
			: defaultPreview
			? `33.3%`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter1}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.characters.at(0)?.characterName
			? $currentPlayer?.rank?.current?.characters.at(0)?.characterName
			: defaultPreview
			? `Fox`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter1Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.characters.at(0)?.gameCountPercent
			? `${$currentPlayer?.rank?.current?.characters.at(0)?.gameCountPercent}%`
			: defaultPreview
			? `74.3%`
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
		{$currentPlayer?.rank?.current?.characters.at(1)?.characterName
			? $currentPlayer?.rank?.current?.characters.at(1)?.characterName
			: defaultPreview
			? `Ganondorf`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter2Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.characters.at(1)?.gameCountPercent
			? `${$currentPlayer?.rank?.current?.characters.at(1)?.gameCountPercent}%`
			: defaultPreview
			? `18.3%`
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
		{$currentPlayer?.rank?.current?.characters.at(2)?.characterName
			? $currentPlayer?.rank?.current?.characters.at(2)?.characterName
			: defaultPreview
			? `Falco`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerCharacter3Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.characters.at(2)?.gameCountPercent
			? `${$currentPlayer?.rank?.current?.characters.at(2)?.gameCountPercent}%`
			: defaultPreview
			? `7.4%`
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
