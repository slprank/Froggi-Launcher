<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import { Stage } from '$lib/models/constants/stageData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, gameFrame, gameScore, gameSettings } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';
	import GameStage from '../../element/GameStage.svelte';
	import PlayerRankIcon from '../../element/PlayerRankIcon.svelte';
	import RankedCharacterIcon from '../../element/RankedCharacterIcon.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1ConnectCode}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `ABCD#123` : $currentPlayers?.at(0)?.rank?.current?.connectCode}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1RankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayers.at(0)} preview={defaultPreview} />
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1RankText}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `Silver 2` : $currentPlayers?.at(0)?.rank?.current?.rank ?? ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Rating}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `1174.0` : $currentPlayers?.at(0)?.rank?.current?.rating ?? ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Continent}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `Europe` : $currentPlayers?.at(0)?.rank?.current?.continent ?? ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1ContinentInitials}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `EU` : $currentPlayers?.at(0)?.rank?.current?.continentInitials ?? ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1DailyGlobalPlacement}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `243`
			: $currentPlayers?.at(0)?.rank?.current?.dailyGlobalPlacement ?? 'N/A'}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1DailyRegionalPlacement}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `117`
			: $currentPlayers?.at(0)?.rank?.current?.dailyRegionalPlacement ?? 'N/A'}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Wins}
	<TextElement {style} {dataItem}>
		{defaultPreview ? 40 : $currentPlayers?.at(0)?.rank?.current?.wins ?? 0}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1WinsPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `80.0%`
			: !isNil($currentPlayers?.at(0)?.rank?.current?.winsPercent)
				? `${$currentPlayers?.at(0)?.rank?.current?.winsPercent}%`
				: '100%'}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Losses}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `10` : $currentPlayers?.at(0)?.rank?.current?.losses ?? 0}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1LossesPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `20.0%`
			: !isNil($currentPlayers?.at(0)?.rank?.current?.lossesPercent)
				? `${$currentPlayers?.at(0)?.rank?.current?.lossesPercent}%`
				: '0%'}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character1}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `Peach`
			: $currentPlayers?.at(0)?.rank?.current?.characters.at(0)?.characterName ?? ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character1Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `75.0%`
			: !isNil($currentPlayers?.at(0)?.rank?.current?.characters.at(0)?.gameCountPercent)
				? `${$currentPlayers?.at(0)?.rank?.current?.characters.at(0)?.gameCountPercent}%`
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
		{defaultPreview
			? `Sheik`
			: $currentPlayers?.at(0)?.rank?.current?.characters.at(1)?.characterName ?? ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character2Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `20.4%`
			: !isNil($currentPlayers?.at(0)?.rank?.current?.characters.at(1)?.gameCountPercent)
				? `${$currentPlayers?.at(0)?.rank?.current?.characters.at(1)?.gameCountPercent}%`
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
		{defaultPreview
			? `Marth`
			: $currentPlayers?.at(0)?.rank?.current?.characters.at(2)?.characterName ?? ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer1Character3Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `4.6%`
			: !isNil($currentPlayers?.at(0)?.rank?.current?.characters.at(2)?.gameCountPercent)
				? `${$currentPlayers?.at(0)?.rank?.current?.characters.at(2)?.gameCountPercent}%`
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
