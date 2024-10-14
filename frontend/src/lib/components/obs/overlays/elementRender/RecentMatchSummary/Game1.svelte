<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, recentGames } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import GameStage from '../../element/GameStage.svelte';
	import { Stage } from '$lib/models/constants/stageData';
	import CharacterIcon from '../../element/CharacterIcon.svelte';
	import CharacterRender from '../../element/CharacterRender.svelte';
	import { Character } from '$lib/models/enum';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: gameNumber = $recentGames.length > 5 ? -5 : 0;
	$: game = $recentGames.at(gameNumber)?.at(0);
</script>

{#if dataItem?.elementId === CustomElement.CurrentSetGame1Stage}
	<GameStage
		{style}
		{dataItem}
		{defaultPreview}
		stageId={game?.settings?.stageId}
		fallbackStageId={Stage.BATTLEFIELD}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player1Score}
	<TextElement {style} {dataItem}>
		{game?.score.at(0) ? game.score[0] : defaultPreview ? `1` : '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player2Score}
	<TextElement {style} {dataItem}>
		{game?.score.at(1) ? game.score[1] : defaultPreview ? `0` : '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player1CharacterIcon}
	<CharacterIcon
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers?.at(0)?.playerIndex ?? 0)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Ganondorf}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player2CharacterIcon}
	<CharacterIcon
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers?.at(1)?.playerIndex ?? 1)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Falcon}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player1CharacterRenderLeft}
	<CharacterRender
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers?.at(0)?.playerIndex ?? 0)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Ganondorf}
		direction="left"
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player1CharacterRenderRight}
	<CharacterRender
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers?.at(0)?.playerIndex ?? 0)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Ganondorf}
		direction="right"
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player2CharacterRenderLeft}
	<CharacterRender
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers?.at(1)?.playerIndex ?? 1)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Falcon}
		direction="left"
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player2CharacterRenderRight}
	<CharacterRender
		{style}
		{dataItem}
		characterId={game?.settings?.players.at($currentPlayers?.at(1)?.playerIndex ?? 1)
			?.characterId}
		{defaultPreview}
		defaultPreviewId={Character.Falcon}
		direction="right"
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player1StocksRemaining}
	<TextElement {style} {dataItem}>
		{game
			? game?.lastFrame?.players?.[$currentPlayers?.at(0)?.playerIndex ?? 0]?.post
					.stocksRemaining
			: defaultPreview
			? `2`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CurrentSetGame1Player2StocksRemaining}
	<TextElement {style} {dataItem}>
		{game
			? game?.lastFrame?.players?.[$currentPlayers?.at(1)?.playerIndex ?? 1]?.post
					.stocksRemaining
			: defaultPreview
			? `0`
			: '0'}
	</TextElement>
{/if}
