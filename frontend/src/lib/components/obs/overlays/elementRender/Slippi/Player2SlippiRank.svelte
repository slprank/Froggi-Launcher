<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers } from '$lib/utils/store.svelte';
	import PlayerRankIcon from '../../element/PlayerRankIcon.svelte';
	import RankedCharacterIcon from '../../element/RankedCharacterIcon.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2ConnectCode}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.connectCode || defaultPreview ? `GHIJ#456` : ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2RankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayers?.at(1)} preview={defaultPreview} />
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2RankText}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.rank
			? $currentPlayers?.at(1)?.rank?.current?.rank
			: defaultPreview
			? `Silver 1`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Rating}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.rating
			? $currentPlayers?.at(1)?.rank?.current?.rating
			: defaultPreview
			? `1100.0`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Continent}
	{$currentPlayers?.at(1)?.rank?.current?.continent
		? $currentPlayers?.at(1)?.rank?.current?.continent
		: defaultPreview
		? `S. America`
		: ''}
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2ContinentInitials}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.continentInitials
			? $currentPlayers?.at(1)?.rank?.current?.continentInitials
			: defaultPreview
			? `SA`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2DailyGlobalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.dailyGlobalPlacement
			? $currentPlayers?.at(1)?.rank?.current?.dailyGlobalPlacement
			: defaultPreview
			? `223`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2DailyRegionalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.dailyRegionalPlacement
			? $currentPlayers?.at(1)?.rank?.current?.dailyRegionalPlacement
			: defaultPreview
			? `107`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Wins}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.wins
			? $currentPlayers?.at(1)?.rank?.current?.wins
			: defaultPreview
			? `30`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2WinsPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.winsPercent
			? `${$currentPlayers?.at(1)?.rank?.current?.winsPercent}%`
			: defaultPreview
			? `90%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Losses}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.losses
			? $currentPlayers?.at(1)?.rank?.current?.losses
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2LossesPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.lossesPercent
			? `${$currentPlayers?.at(1)?.rank?.current?.lossesPercent}%`
			: defaultPreview
			? `10.0%`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character1}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.characters.at(0)?.characterName
			? $currentPlayers?.at(1)?.rank?.current?.characters.at(0)?.characterName
			: defaultPreview
			? `Marth`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character1Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.characters.at(0)?.gameCountPercent
			? `${$currentPlayers?.at(1)?.rank?.current?.characters.at(0)?.gameCountPercent}%`
			: defaultPreview
			? `82.0%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character1Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayers?.at(1)}
		preview={defaultPreview}
		characterNumber={1}
		defaultPreviewId={Number(CHARACTERS['marth'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character2}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.characters.at(1)?.characterName
			? $currentPlayers?.at(1)?.rank?.current?.characters.at(1)?.characterName
			: defaultPreview
			? `Samus`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character2Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.characters.at(1)?.gameCountPercent
			? `${$currentPlayers?.at(1)?.rank?.current?.characters.at(1)?.gameCountPercent}%`
			: defaultPreview
			? `13.8%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character2Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayers?.at(1)}
		preview={defaultPreview}
		characterNumber={1}
		defaultPreviewId={Number(CHARACTERS['samus'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character3}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.characters.at(2)?.characterName
			? $currentPlayers?.at(1)?.rank?.current?.characters.at(2)?.characterName
			: defaultPreview
			? `Bowser`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character3Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.characters.at(2)?.gameCountPercent
			? `${$currentPlayers?.at(1)?.rank?.current?.characters.at(2)?.gameCountPercent}%`
			: defaultPreview
			? `4.2%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character3Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayers?.at(1)}
		preview={defaultPreview}
		characterNumber={2}
		defaultPreviewId={Number(CHARACTERS['bowser'])}
	/>
{/if}
