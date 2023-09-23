<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer.playerIndex ?? 0;
	$: player1Index = $currentPlayers.at(0)?.playerIndex ?? 0;
	$: player2Index = $currentPlayers.at(1)?.playerIndex ?? 1;

	$: currentPlayerOverall = $postGame.postGameStats?.overall[currentPlayerIndex];
	$: player1Overall = $postGame.postGameStats?.overall[player1Index];
	$: player2Overall = $postGame.postGameStats?.overall[player2Index];

	$: currentPlayerStocks = $postGame.postGameStats?.stocks.find(
		(stock) => stock.playerIndex === currentPlayerIndex,
	);
	$: player1Stocks = $postGame.postGameStats?.stocks.find(
		(stock) => stock.playerIndex === player1Index,
	);
	$: player2Stocks = $postGame.postGameStats?.stocks.find(
		(stock) => stock.playerIndex === player2Index,
	);
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.beneficialTradeRatio
			? currentPlayerOverall.beneficialTradeRatio.count
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.beneficialTradeRatio
			? (currentPlayerOverall.beneficialTradeRatio.ratio ?? 0) * 100
			: defaultPreview
			? `75.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.counterHitRatio
			? currentPlayerOverall.counterHitRatio.count
			: defaultPreview
			? `10`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.counterHitRatio
			? (currentPlayerOverall.counterHitRatio.ratio ?? 0) * 100
			: defaultPreview
			? `60.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDamageTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.totalDamage
			? currentPlayerOverall.totalDamage
			: defaultPreview
			? `420`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.openingsPerKill
			? currentPlayerOverall.openingsPerKill.total
			: defaultPreview
			? `27`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.damagePerOpening
			? currentPlayerOverall.damagePerOpening.ratio
			: defaultPreview
			? `15.6`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.openingsPerKill
			? currentPlayerOverall.openingsPerKill.count
			: defaultPreview
			? `6.75`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute
			? currentPlayerOverall.digitalInputsPerMinute.total
			: defaultPreview
			? `945`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute
			? currentPlayerOverall.digitalInputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `315`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute
			? (currentPlayerOverall.digitalInputsPerMinute.count / 60).toFixed(2)
			: defaultPreview
			? `5.25`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.inputsPerMinute
			? currentPlayerOverall.inputsPerMinute.total
			: defaultPreview
			? `1200`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.inputsPerMinute
			? currentPlayerOverall.inputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `400`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.inputsPerMinute
			? (currentPlayerOverall.inputsPerMinute.count / 60).toFixed(2)
			: defaultPreview
			? `6.67`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.neutralWinRatio
			? currentPlayerOverall.neutralWinRatio.count
			: defaultPreview
			? `18`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.neutralWinRatio
			? (currentPlayerOverall.neutralWinRatio?.ratio ?? 0 * 100).toFixed(1)
			: defaultPreview
			? `56`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallStocksRemaining}
	<TextElement {style} {dataItem}>
		{currentPlayerStocks ? currentPlayerStocks.count : defaultPreview ? `2` : ''}
	</TextElement>
{/if}
