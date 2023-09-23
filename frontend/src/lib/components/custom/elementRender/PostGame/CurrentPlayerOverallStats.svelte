<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer?.playerIndex;

	$: currentPlayerOverall = $postGame.postGameStats?.overall[currentPlayerIndex ?? 0];
	$: currentPlayerStocks = $postGame.postGameStats?.stocks.find(
		(stock) => stock.playerIndex === currentPlayerIndex,
	);
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.beneficialTradeRatio && currentPlayerIndex !== undefined
			? currentPlayerOverall.beneficialTradeRatio.count
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.beneficialTradeRatio && currentPlayerIndex !== undefined
			? (currentPlayerOverall.beneficialTradeRatio.ratio ?? 0) * 100
			: defaultPreview
			? `75.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.counterHitRatio && currentPlayerIndex !== undefined
			? currentPlayerOverall.counterHitRatio.count
			: defaultPreview
			? `10`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.counterHitRatio && currentPlayerIndex !== undefined
			? (currentPlayerOverall.counterHitRatio.ratio ?? 0) * 100
			: defaultPreview
			? `60.0`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDamageTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.totalDamage && currentPlayerIndex !== undefined
			? currentPlayerOverall.totalDamage
			: defaultPreview
			? `420`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.openingsPerKill && currentPlayerIndex !== undefined
			? currentPlayerOverall.openingsPerKill.total
			: defaultPreview
			? `27`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.damagePerOpening && currentPlayerIndex !== undefined
			? currentPlayerOverall.damagePerOpening.ratio
			: defaultPreview
			? `15.6`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.openingsPerKill && currentPlayerIndex !== undefined
			? currentPlayerOverall.openingsPerKill.count
			: defaultPreview
			? `6.75`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute && currentPlayerIndex !== undefined
			? currentPlayerOverall.digitalInputsPerMinute.total
			: defaultPreview
			? `945`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute && currentPlayerIndex !== undefined
			? currentPlayerOverall.digitalInputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `315`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute && currentPlayerIndex !== undefined
			? (currentPlayerOverall.digitalInputsPerMinute.count / 60).toFixed(2)
			: defaultPreview
			? `5.25`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.inputsPerMinute && currentPlayerIndex !== undefined
			? currentPlayerOverall.inputsPerMinute.total
			: defaultPreview
			? `1200`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.inputsPerMinute && currentPlayerIndex !== undefined
			? currentPlayerOverall.inputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `400`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.inputsPerMinute && currentPlayerIndex !== undefined
			? (currentPlayerOverall.inputsPerMinute.count / 60).toFixed(2)
			: defaultPreview
			? `6.67`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.neutralWinRatio && currentPlayerIndex !== undefined
			? currentPlayerOverall.neutralWinRatio.count
			: defaultPreview
			? `18`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.neutralWinRatio && currentPlayerIndex !== undefined
			? (currentPlayerOverall.neutralWinRatio?.ratio ?? 0 * 100).toFixed(1)
			: defaultPreview
			? `56`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallStocksRemaining}
	<TextElement {style} {dataItem}>
		{currentPlayerStocks && currentPlayerIndex !== undefined
			? currentPlayerStocks.count
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
