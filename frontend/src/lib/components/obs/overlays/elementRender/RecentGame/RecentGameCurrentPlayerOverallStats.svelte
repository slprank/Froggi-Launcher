<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer?.playerIndex;

	$: currentPlayerOverall = $postGame.postGameStats?.overall?.[currentPlayerIndex ?? 0];
	$: currentPlayerStocks = $postGame.postGameStats?.stocks.find(
		(stock) => stock.playerIndex === currentPlayerIndex,
	);
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![currentPlayerOverall?.beneficialTradeRatio.count, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.beneficialTradeRatio.count
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `75.0`
			: ![currentPlayerOverall?.beneficialTradeRatio.ratio, currentPlayerIndex].some(isNil)
			? (currentPlayerOverall?.beneficialTradeRatio?.ratio ?? 0) * 100
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `10`
			: ![currentPlayerOverall?.counterHitRatio?.count, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.counterHitRatio.count
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `60.0`
			: ![currentPlayerOverall?.counterHitRatio.ratio, currentPlayerIndex].some(isNil)
			? (currentPlayerOverall?.counterHitRatio.ratio ?? 0) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDamageTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `360.5`
			: ![currentPlayerOverall?.totalDamage, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.totalDamage.toFixed(1)
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `27`
			: ![currentPlayerOverall?.openingsPerKill?.total, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.openingsPerKill.total
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `15.6`
			: ![currentPlayerOverall?.damagePerOpening.ratio, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.damagePerOpening.ratio?.toFixed(1)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `6.7`
			: ![currentPlayerOverall?.openingsPerKill.count, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.openingsPerKill.count.toFixed(1) ?? '0.0'
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `945`
			: ![currentPlayerOverall?.digitalInputsPerMinute.total, currentPlayerIndex].includes(
					undefined,
			  )
			? currentPlayerOverall?.digitalInputsPerMinute.total
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `315`
			: ![currentPlayerOverall?.digitalInputsPerMinute.count, currentPlayerIndex].includes(
					undefined,
			  )
			? currentPlayerOverall?.digitalInputsPerMinute.count.toFixed(0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5.25`
			: ![currentPlayerOverall?.digitalInputsPerMinute.count, currentPlayerIndex].includes(
					undefined,
			  )
			? ((currentPlayerOverall?.digitalInputsPerMinute?.count ?? 0) / 60).toFixed(2)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `1200`
			: ![currentPlayerOverall?.inputsPerMinute.total, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.inputsPerMinute.total
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `400`
			: ![currentPlayerOverall?.inputsPerMinute.count, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.inputsPerMinute.count.toFixed(0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `6.67`
			: ![currentPlayerOverall?.inputsPerMinute.count, currentPlayerIndex].some(isNil)
			? ((currentPlayerOverall?.inputsPerMinute.count ?? 0) / 60).toFixed(2)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `18`
			: ![currentPlayerOverall?.neutralWinRatio.count, currentPlayerIndex].some(isNil)
			? currentPlayerOverall?.neutralWinRatio.count
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `56.0`
			: ![currentPlayerOverall?.neutralWinRatio.ratio, currentPlayerIndex].some(isNil)
			? (currentPlayerOverall?.neutralWinRatio?.ratio ?? 0 * 100).toFixed(1)
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallStocksRemaining}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `2`
			: ![currentPlayerStocks?.count, currentPlayerIndex].some(isNil)
			? currentPlayerStocks?.count ?? 0
			: '0'}
	</TextElement>
{/if}
