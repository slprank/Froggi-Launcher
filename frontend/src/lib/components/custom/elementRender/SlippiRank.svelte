<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayers, currentPlayer } from '$lib/utils/store.svelte';
	import RankedCharacterIcon from '../element/RankedCharacterIcon.svelte';
	import PlayerRankIcon from '../element/PlayerRankIcon.svelte';
	import TextElement from '../element/TextElement.svelte';

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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Tag}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.displayName
			? $currentPlayers?.at(0)?.rank?.current?.displayName
			: defaultPreview
			? `Player 1`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Tag}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.displayName
			? $currentPlayers?.at(1)?.rank?.current?.displayName
			: defaultPreview
			? `Player 2`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1ConnectCode}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.connectCode || defaultPreview ? `ABCD#123` : ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2ConnectCode}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.connectCode || defaultPreview ? `GHIJ#456` : ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerRankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayer} preview={defaultPreview} />
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1RankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayers.at(0)} preview={defaultPreview} />
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2RankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayers.at(1)} preview={defaultPreview} />
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1RankText}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.rank
			? $currentPlayers?.at(0)?.rank?.current?.rank
			: defaultPreview
			? `Silver 2`
			: ''}
	</TextElement>
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
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerRating}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.rating
			? $currentPlayer?.rank?.current?.rating
			: defaultPreview
			? `1429.3`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Rating}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.rating
			? $currentPlayers?.at(1)?.rank?.current?.rating
			: defaultPreview
			? `1100.0`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Continent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.continent
			? $currentPlayers?.at(0)?.rank?.current?.continent
			: defaultPreview
			? `Europe`
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
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerContinentInitials}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.continentInitials
			? $currentPlayer?.rank?.current?.continentInitials
			: defaultPreview
			? `NA`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2ContinentInitials}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.continentInitials
			? $currentPlayers?.at(1)?.rank?.current?.continentInitials
			: defaultPreview
			? `SA`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1DailyGlobalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.dailyGlobalPlacement
			? $currentPlayers?.at(0)?.rank?.current?.dailyGlobalPlacement
			: defaultPreview
			? `243`
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
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerDailyRegionalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.dailyRegionalPlacement
			? $currentPlayer?.rank?.current?.dailyRegionalPlacement
			: defaultPreview
			? `138`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2DailyRegionalPlacement}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.dailyRegionalPlacement
			? $currentPlayers?.at(1)?.rank?.current?.dailyRegionalPlacement
			: defaultPreview
			? `107`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Wins}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.wins
			? $currentPlayers?.at(0)?.rank?.current?.wins
			: defaultPreview
			? `40`
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
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerWinsPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.winsPercent
			? `${$currentPlayer?.rank?.current?.winsPercent}%`
			: defaultPreview
			? `66.7%`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2WinsPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.winsPercent
			? `${$currentPlayers?.at(1)?.rank?.current?.winsPercent}%`
			: defaultPreview
			? `90%`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Losses}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(0)?.rank?.current?.losses
			? $currentPlayers?.at(0)?.rank?.current?.losses
			: defaultPreview
			? `10`
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
{#if dataItem?.elementId === CustomElement.SlippiRankCurrentPlayerLossesPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayer?.rank?.current?.lossesPercent
			? `${$currentPlayer?.rank?.current?.lossesPercent}%`
			: defaultPreview
			? `33.3%`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2LossesPercent}
	<TextElement {style} {dataItem}>
		{$currentPlayers?.at(1)?.rank?.current?.lossesPercent
			? `${$currentPlayers?.at(1)?.rank?.current?.lossesPercent}%`
			: defaultPreview
			? `10.0%`
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
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character3Icon}
	<RankedCharacterIcon
		{dataItem}
		{style}
		player={$currentPlayers?.at(1)}
		preview={defaultPreview}
		characterNumber={2}
		defaultPreviewId={Number(CHARACTERS['bowser'])}
	/>
{/if}
