<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player2Index = $currentPlayers?.at(1)?.playerIndex ?? 1;

	$: player2Overall = $postGame?.postGameStats?.overall?.[player2Index];
	$: player2Stocks = $postGame?.postGameStats?.stocks.find(
		(stock) => stock.playerIndex === player2Index,
	);
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![player2Overall?.beneficialTradeRatio.count, player2Index].some(isNil)
			? player2Overall?.beneficialTradeRatio.count
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `75.0`
			: ![player2Overall?.beneficialTradeRatio.ratio, player2Index].some(isNil)
			? (player2Overall?.beneficialTradeRatio.ratio ?? 0) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `10`
			: ![player2Overall?.counterHitRatio.count, player2Index].some(isNil)
			? player2Overall?.counterHitRatio.count
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `60.0`
			: ![player2Overall?.counterHitRatio.ratio, player2Index].some(isNil)
			? (player2Overall?.counterHitRatio.ratio ?? 0) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDamageTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `300.0`
			: ![player2Overall?.totalDamage, player2Index].some(isNil)
			? player2Overall?.totalDamage.toFixed(1)
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `27`
			: ![player2Overall?.openingsPerKill.total, player2Index].some(isNil)
			? player2Overall?.openingsPerKill.total
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `15.6`
			: ![player2Overall?.damagePerOpening.ratio, player2Index].some(isNil)
			? player2Overall?.damagePerOpening.ratio?.toFixed(1)
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `6.7`
			: ![player2Overall?.openingsPerKill.ratio, player2Index].some(isNil)
			? player2Overall?.openingsPerKill.ratio?.toFixed(1) ?? '0.0'
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `945`
			: ![player2Overall?.digitalInputsPerMinute.total, player2Index].some(isNil)
			? player2Overall?.digitalInputsPerMinute.total
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `315`
			: ![player2Overall?.digitalInputsPerMinute.count, player2Index].some(isNil)
			? player2Overall?.digitalInputsPerMinute.count.toFixed(0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5.25`
			: ![player2Overall?.digitalInputsPerMinute.count, player2Index].some(isNil)
			? ((player2Overall?.digitalInputsPerMinute.count ?? 0) / 60).toFixed(2)
			: '0.00'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallInputsTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `1200`
			: ![player2Overall?.inputsPerMinute.total, player2Index].some(isNil)
			? player2Overall?.inputsPerMinute.total
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `400`
			: ![player2Overall?.inputsPerMinute.count, player2Index].some(isNil)
			? player2Overall?.inputsPerMinute.count.toFixed(0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `6.67`
			: ![player2Overall?.inputsPerMinute.count, player2Index].some(isNil)
			? ((player2Overall?.inputsPerMinute.count ?? 0) / 60).toFixed(2)
			: '0.00'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `18`
			: ![player2Overall?.neutralWinRatio.count, player2Index].some(isNil)
			? player2Overall?.neutralWinRatio.count
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `44.0`
			: ![player2Overall?.neutralWinRatio.ratio, player2Index].some(isNil)
			? ((player2Overall?.neutralWinRatio?.ratio ?? 0) * 100).toFixed(1)
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2OverallStocksRemaining}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `2`
			: ![player2Stocks, player2Index].some(isNil)
			? player2Stocks?.count
			: '0'}
	</TextElement>
{/if}
