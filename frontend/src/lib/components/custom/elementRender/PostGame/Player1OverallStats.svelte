<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers.at(0)?.playerIndex;

	$: player1Overall = $postGame.postGameStats?.overall[player1Index ?? 0];
	$: player1Stocks = $postGame.postGameStats?.stocks.find(
		(stock) => stock.playerIndex === player1Index,
	);
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{player1Overall?.beneficialTradeRatio && player1Index !== undefined
			? player1Overall.beneficialTradeRatio.count
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{player1Overall?.beneficialTradeRatio && player1Index !== undefined
			? (player1Overall.beneficialTradeRatio.ratio ?? 0) * 100
			: defaultPreview
			? `75.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{player1Overall?.counterHitRatio && player1Index !== undefined
			? player1Overall.counterHitRatio.count
			: defaultPreview
			? `10`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{player1Overall?.counterHitRatio && player1Index !== undefined
			? (player1Overall.counterHitRatio.ratio ?? 0) * 100
			: defaultPreview
			? `60.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDamageTotal}
	<TextElement {style} {dataItem}>
		{player1Overall?.totalDamage && player1Index !== undefined
			? player1Overall.totalDamage
			: defaultPreview
			? `420`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{player1Overall?.openingsPerKill && player1Index !== undefined
			? player1Overall.openingsPerKill.total
			: defaultPreview
			? `27`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{player1Overall?.damagePerOpening && player1Index !== undefined
			? player1Overall.damagePerOpening.ratio
			: defaultPreview
			? `15.6`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{player1Overall?.openingsPerKill && player1Index !== undefined
			? player1Overall.openingsPerKill.count
			: defaultPreview
			? `6.75`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{player1Overall?.digitalInputsPerMinute && player1Index !== undefined
			? player1Overall.digitalInputsPerMinute.total
			: defaultPreview
			? `945`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{player1Overall?.digitalInputsPerMinute && player1Index !== undefined
			? player1Overall.digitalInputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `315`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{player1Overall?.digitalInputsPerMinute && player1Index !== undefined
			? (player1Overall.digitalInputsPerMinute.count / 60).toFixed(2)
			: defaultPreview
			? `5.25`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallInputsTotal}
	<TextElement {style} {dataItem}>
		{player1Overall?.inputsPerMinute && player1Index !== undefined
			? player1Overall.inputsPerMinute.total
			: defaultPreview
			? `1200`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{player1Overall?.inputsPerMinute && player1Index !== undefined
			? player1Overall.inputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `400`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{player1Overall?.inputsPerMinute && player1Index !== undefined
			? (player1Overall.inputsPerMinute.count / 60).toFixed(2)
			: defaultPreview
			? `6.67`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{player1Overall?.neutralWinRatio && player1Index !== undefined
			? player1Overall.neutralWinRatio.count
			: defaultPreview
			? `18`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{player1Overall?.neutralWinRatio && player1Index !== undefined
			? (player1Overall.neutralWinRatio?.ratio ?? 0 * 100).toFixed(1)
			: defaultPreview
			? `56`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallStocksRemaining}
	<TextElement {style} {dataItem}>
		{player1Stocks && player1Index !== undefined
			? player1Stocks.count
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
