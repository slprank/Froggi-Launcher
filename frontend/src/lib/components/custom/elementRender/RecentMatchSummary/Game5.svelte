<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, postGame, recentGames } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';
	import GameStage from '../../element/GameStage.svelte';
	import { Stage } from '@slippi/slippi-js';
	import CharacterIcon from '../../element/CharacterIcon.svelte';
	import CharacterRender from '../../element/CharacterRender.svelte';
	import { Character } from '$lib/models/enum';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	let gameNumber = $recentGames.length > 5 ? -1 : 4;
	$: game = $recentGames.at(gameNumber);
</script>

{#if game}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Stage}
		<GameStage
			{style}
			{dataItem}
			{defaultPreview}
			stageId={game.settings?.stageId}
			fallbackStageId={Stage.YOSHIS_ISLAND}
		/>
	{/if}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Player1Score}
		<TextElement {style} {dataItem}>
			{game.score.at(0) ? game.score[0] : defaultPreview ? `3` : '0'}
		</TextElement>
	{/if}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Player2Score}
		<TextElement {style} {dataItem}>
			{game.score.at(1) ? game.score[1] : defaultPreview ? `2` : '0'}
		</TextElement>
	{/if}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Player1CharacterIcon}
		<CharacterIcon
			{style}
			{dataItem}
			characterId={game.settings?.players.at($currentPlayers.at(0)?.playerIndex ?? 0)
				?.characterId}
			{defaultPreview}
			defaultPreviewId={Character.Ganondorf}
		/>
	{/if}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Player2CharacterIcon}
		<CharacterIcon
			{style}
			{dataItem}
			characterId={game.settings?.players.at($currentPlayers.at(1)?.playerIndex ?? 1)
				?.characterId}
			{defaultPreview}
			defaultPreviewId={Character.Falcon}
		/>
	{/if}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Player1CharacterRender}
		<CharacterRender
			{style}
			{dataItem}
			characterId={game.settings?.players.at($currentPlayers.at(0)?.playerIndex ?? 0)
				?.characterId}
			{defaultPreview}
			defaultPreviewId={Character.Ganondorf}
		/>
	{/if}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Player2CharacterRender}
		<CharacterRender
			{style}
			{dataItem}
			characterId={game.settings?.players.at($currentPlayers.at(1)?.playerIndex ?? 1)
				?.characterId}
			{defaultPreview}
			defaultPreviewId={Character.Falcon}
		/>
	{/if}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Player1StocksRemaining}
		<TextElement {style} {dataItem}>
			{game
				? game?.lastFrame?.players[$currentPlayers.at(0)?.playerIndex ?? 0]?.post
						.stocksRemaining
				: defaultPreview
				? `1`
				: '0'}
		</TextElement>
	{/if}
	{#if dataItem?.elementId === CustomElement.CurrentSetGame5Player2StocksRemaining}
		<TextElement {style} {dataItem}>
			{game
				? game?.lastFrame?.players[$currentPlayers.at(1)?.playerIndex ?? 1]?.post
						.stocksRemaining
				: defaultPreview
				? `0`
				: '0'}
		</TextElement>
	{/if}
{/if}
