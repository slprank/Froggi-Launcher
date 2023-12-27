<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import { Stage } from '$lib/models/constants/stageData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, gameFrame, gameScore, gameSettings } from '$lib/utils/store.svelte';
	import GameStage from '../../element/GameStage.svelte';
	import PlayerRankIcon from '../../element/PlayerRankIcon.svelte';
	import RankedCharacterIcon from '../../element/RankedCharacterIcon.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.MatchPlayer1Tag}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.displayName
			? $currentPlayers?.at(0)?.rank?.current?.displayName
			: defaultPreview
			? `Player 1`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1ConnectCode}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.connectCode || defaultPreview ? `ABCD#123` : ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1RankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayers.at(0)} preview={defaultPreview} />
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1RankText}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.rank
			? $currentPlayers?.at(0)?.rank?.current?.rank
			: defaultPreview
			? `Silver 2`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Rating}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.rating
			? $currentPlayers?.at(0)?.rank?.current?.rating
			: defaultPreview
			? `1174.0`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Continent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.continent
			? $currentPlayers?.at(0)?.rank?.current?.continent
			: defaultPreview
			? `Europe`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1ContinentInitials}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.continentInitials
			? $currentPlayers?.at(0)?.rank?.current?.continentInitials
			: defaultPreview
			? `EU`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1DailyGlobalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.dailyGlobalPlacement
			? $currentPlayers?.at(0)?.rank?.current?.dailyGlobalPlacement
			: defaultPreview
			? `243`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1DailyRegionalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.dailyRegionalPlacement
			? $currentPlayers?.at(0)?.rank?.current?.dailyRegionalPlacement
			: defaultPreview
			? `117`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Wins}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.wins
			? $currentPlayers?.at(0)?.rank?.current?.wins
			: defaultPreview
			? `40`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1WinsPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.winsPercent
			? `${$currentPlayers?.at(0)?.rank?.current?.winsPercent}%`
			: defaultPreview
			? `80.0%`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Losses}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.losses
			? $currentPlayers?.at(0)?.rank?.current?.losses
			: defaultPreview
			? `10`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1LossesPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.lossesPercent
			? `${$currentPlayers?.at(0)?.rank?.current?.lossesPercent}%`
			: defaultPreview
			? `20.0%`
			: ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character1}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.characters.at(0)?.characterName
			? $currentPlayers?.at(0)?.rank?.current?.characters.at(0)?.characterName
			: defaultPreview
			? `Peach`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character1Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.characters.at(0)?.gameCountPercent
			? `${$currentPlayers?.at(0)?.rank?.current?.characters.at(0)?.gameCountPercent}%`
			: defaultPreview
			? `75.0%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character1Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayers?.at(0)}
		preview={defaultPreview}
		characterNumber={0}
		defaultPreviewId={Number(CHARACTERS['peach'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character2}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.characters.at(1)?.characterName
			? $currentPlayers?.at(0)?.rank?.current?.characters.at(1)?.characterName
			: defaultPreview
			? `Sheik`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character2Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.characters.at(1)?.gameCountPercent
			? `${$currentPlayers?.at(0)?.rank?.current?.characters.at(1)?.gameCountPercent}%`
			: defaultPreview
			? `20.4%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character2Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayers?.at(0)}
		preview={defaultPreview}
		characterNumber={1}
		defaultPreviewId={Number(CHARACTERS['sheik'])}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character3}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.characters.at(2)?.characterName
			? $currentPlayers?.at(0)?.rank?.current?.characters.at(2)?.characterName
			: defaultPreview
			? `Marth`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character3Percent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.characters.at(2)?.gameCountPercent
			? `${$currentPlayers?.at(0)?.rank?.current?.characters.at(2)?.gameCountPercent}%`
			: defaultPreview
			? `4.6%`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character3Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayers?.at(0)}
		preview={defaultPreview}
		characterNumber={2}
		defaultPreviewId={Number(CHARACTERS['marth'])}
	/>
{/if}
