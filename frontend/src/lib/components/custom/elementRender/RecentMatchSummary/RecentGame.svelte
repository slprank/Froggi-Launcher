<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, recentGames } from '$lib/utils/store.svelte';
	import GameStage from '../../element/GameStage.svelte';
	import CharacterIcon from '../../element/CharacterIcon.svelte';
	import CharacterRender from '../../element/CharacterRender.svelte';
	import { Character } from '$lib/models/enum';
	import { Stage } from '$lib/models/constants/stageData';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	const game = $recentGames.at(-1);
</script>

{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentStage}
	<GameStage
		{style}
		{dataItem}
		{defaultPreview}
		stageId={game?.settings?.stageId}
		fallbackStageId={Stage.YOSHIS_ISLAND_N64}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer1Score}
	<TextElement {style} {dataItem}>
		{game?.score.at(0) ? game.score[0] : defaultPreview ? `1` : '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer2Score}
	<TextElement {style} {dataItem}>
		{game?.score.at(1) ? game.score[1] : defaultPreview ? `0` : '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer1CharacterIcon}
	<CharacterIcon
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers.at(0)?.playerIndex ?? 0)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Ganondorf}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer2CharacterIcon}
	<CharacterIcon
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers.at(1)?.playerIndex ?? 1)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Falcon}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer1CharacterRender}
	<CharacterRender
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers.at(0)?.playerIndex ?? 0)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Ganondorf}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer2CharacterRender}
	<CharacterRender
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers.at(1)?.playerIndex ?? 1)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Falcon}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer1StocksRemaining}
	<TextElement {style} {dataItem}>
		{game
			? game?.lastFrame?.players[$currentPlayers.at(0)?.playerIndex ?? 0]?.post
					.stocksRemaining
			: defaultPreview
			? `2`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGameRecentPlayer2StocksRemaining}
	<TextElement {style} {dataItem}>
		{game
			? game?.lastFrame?.players[$currentPlayers.at(1)?.playerIndex ?? 1]?.post
					.stocksRemaining
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
