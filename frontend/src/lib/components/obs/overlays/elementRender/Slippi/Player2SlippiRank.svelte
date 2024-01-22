<script lang="ts">
	import { CHARACTERS } from '$lib/models/constants/characterData';
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';
	import PlayerRankIcon from '../../element/PlayerRankIcon.svelte';
	import RankedCharacterIcon from '../../element/RankedCharacterIcon.svelte';
	import TextElement from '../../element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;
</script>

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2ConnectCode}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `GHIJ#456` : $currentPlayers?.at(1)?.rank?.current?.connectCode ?? ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2RankIcon}
	<PlayerRankIcon {dataItem} {style} player={$currentPlayers?.at(1)} preview={defaultPreview} />
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2RankText}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `Silver 1` : $currentPlayers?.at(1)?.rank?.current?.rank ?? ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Rating}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `1100.0` : $currentPlayers?.at(1)?.rank?.current?.rating ?? ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Continent}
	{defaultPreview ? `S. America` : $currentPlayers?.at(1)?.rank?.current?.continent ?? ''}
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2ContinentInitials}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `SA` : $currentPlayers?.at(1)?.rank?.current?.continentInitials ?? ''}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2DailyGlobalPlacement}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `223`
			: $currentPlayers?.at(1)?.rank?.current?.dailyGlobalPlacement ?? 'N/A'}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2DailyRegionalPlacement}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `107`
			: $currentPlayers?.at(1)?.rank?.current?.dailyRegionalPlacement ?? 'N/A'}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Wins}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `30` : $currentPlayers?.at(1)?.rank?.current?.wins ?? 0}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2WinsPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `90%`
			: !isNil($currentPlayers?.at(1)?.rank?.current?.winsPercent)
				? `${$currentPlayers?.at(1)?.rank?.current?.winsPercent}%`
				: '100%'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Losses}
	<TextElement {style} {dataItem}>
		{defaultPreview ? `3` : $currentPlayers?.at(1)?.rank?.current?.losses ?? 0}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2LossesPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `10.0%`
			: !isNil($currentPlayers?.at(1)?.rank?.current?.lossesPercent)
				? `${$currentPlayers?.at(1)?.rank?.current?.lossesPercent}%`
				: '0%'}
	</TextElement>
{/if}

{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character1}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `Marth`
			: $currentPlayers?.at(1)?.rank?.current?.characters.at(0)?.characterName ?? ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character1Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `82.0%`
			: !isNil($currentPlayers?.at(1)?.rank?.current?.characters.at(0)?.gameCountPercent)
				? `${$currentPlayers?.at(1)?.rank?.current?.characters.at(0)?.gameCountPercent}%`
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
		{defaultPreview
			? `Samus`
			: $currentPlayers?.at(1)?.rank?.current?.characters.at(1)?.characterName ?? ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character2Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13.8%`
			: !isNil($currentPlayers?.at(1)?.rank?.current?.characters.at(1)?.gameCountPercent)
				? `${$currentPlayers?.at(1)?.rank?.current?.characters.at(1)?.gameCountPercent}%`
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
		{defaultPreview
			? `Bowser`
			: $currentPlayers?.at(1)?.rank?.current?.characters.at(2)?.characterName ?? ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.SlippiRankPlayer2Character3Percent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `4.2%`
			: !isNil($currentPlayers?.at(1)?.rank?.current?.characters.at(2)?.gameCountPercent)
				? `${$currentPlayers?.at(1)?.rank?.current?.characters.at(2)?.gameCountPercent}%`
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
