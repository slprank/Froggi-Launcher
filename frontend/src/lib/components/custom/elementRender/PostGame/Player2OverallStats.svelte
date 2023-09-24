<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player2Index = $currentPlayers.at(1)?.playerIndex ?? 1;

	$: player2Overall = $postGame.postGameStats?.overall[player2Index];
	$: player2Stocks = $postGame.postGameStats?.stocks.find(
		(stock) => stock.playerIndex === player2Index,
	);
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{player2Overall?.beneficialTradeRatio && player2Index !== undefined
			? player2Overall.beneficialTradeRatio.count
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{player2Overall?.beneficialTradeRatio && player2Index !== undefined
			? (player2Overall.beneficialTradeRatio.ratio ?? 0) * 100
			: defaultPreview
			? `75.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{player2Overall?.counterHitRatio && player2Index !== undefined
			? player2Overall.counterHitRatio.count
			: defaultPreview
			? `10`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{player2Overall?.counterHitRatio && player2Index !== undefined
			? (player2Overall.counterHitRatio.ratio ?? 0) * 100
			: defaultPreview
			? `60.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDamageTotal}
	<TextElement {style} {dataItem}>
		{player2Overall?.totalDamage && player2Index !== undefined
			? player2Overall.totalDamage.toFixed(1)
			: defaultPreview
			? `420`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{player2Overall?.openingsPerKill && player2Index !== undefined
			? player2Overall.openingsPerKill.total
			: defaultPreview
			? `27`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{player2Overall?.damagePerOpening && player2Index !== undefined
			? player2Overall.damagePerOpening.ratio?.toFixed(1)
			: defaultPreview
			? `15.6`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{player2Overall?.openingsPerKill && player2Index !== undefined
			? player2Overall.openingsPerKill.ratio?.toFixed(2) ?? '0.00'
			: defaultPreview
			? `6.75`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{player2Overall?.digitalInputsPerMinute && player2Index !== undefined
			? player2Overall.digitalInputsPerMinute.total
			: defaultPreview
			? `945`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{player2Overall?.digitalInputsPerMinute && player2Index !== undefined
			? player2Overall.digitalInputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `315`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{player2Overall?.digitalInputsPerMinute && player2Index !== undefined
			? (player2Overall.digitalInputsPerMinute.count / 60).toFixed(2)
			: defaultPreview
			? `5.25`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallInputsTotal}
	<TextElement {style} {dataItem}>
		{player2Overall?.inputsPerMinute && player2Index !== undefined
			? player2Overall.inputsPerMinute.total
			: defaultPreview
			? `1200`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{player2Overall?.inputsPerMinute && player2Index !== undefined
			? player2Overall.inputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `400`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{player2Overall?.inputsPerMinute && player2Index !== undefined
			? (player2Overall.inputsPerMinute.count / 60).toFixed(2)
			: defaultPreview
			? `6.67`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{player2Overall?.neutralWinRatio && player2Index !== undefined
			? player2Overall.neutralWinRatio.count
			: defaultPreview
			? `18`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{player2Overall?.neutralWinRatio && player2Index !== undefined
			? (player2Overall.neutralWinRatio?.ratio ?? 0 * 100).toFixed(1)
			: defaultPreview
			? `44.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallStocksRemaining}
	<TextElement {style} {dataItem}>
		{player2Stocks && player2Index !== undefined
			? player2Stocks.count
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
