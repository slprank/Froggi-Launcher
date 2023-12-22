<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, postGame, currentMatch } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer?.playerIndex;

	$: currentPlayerOverall = $currentMatch?.stats?.overall?.[currentPlayerIndex ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.beneficialTradeRatio.count, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.beneficialTradeRatio.count
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.beneficialTradeRatio.ratio, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (currentPlayerOverall?.beneficialTradeRatio?.ratio ?? 0) * 100
			: defaultPreview
			? `75.0`
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.counterHitRatio?.count, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.counterHitRatio.count
			: defaultPreview
			? `10`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.counterHitRatio.ratio, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (currentPlayerOverall?.counterHitRatio.ratio ?? 0) * 100
			: defaultPreview
			? `60.0`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDamageTotal}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.totalDamage, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.totalDamage.toFixed(1)
			: defaultPreview
			? `420.7`
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.openingsPerKill?.total, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.openingsPerKill.total
			: defaultPreview
			? `27`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.damagePerOpening.ratio, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.damagePerOpening.ratio?.toFixed(1)
			: defaultPreview
			? `15.6`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.openingsPerKill.count, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.openingsPerKill.count.toFixed(1) ?? '0.0'
			: defaultPreview
			? `6.7`
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute.total !== undefined
			? currentPlayerOverall?.digitalInputsPerMinute.total
			: defaultPreview
			? `945`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute.count !== undefined
			? currentPlayerOverall?.digitalInputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `315`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{currentPlayerOverall?.digitalInputsPerMinute.count !== undefined
			? ((currentPlayerOverall?.digitalInputsPerMinute?.count ?? 0) / 60).toFixed(2)
			: defaultPreview
			? `5.25`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsTotal}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.inputsPerMinute.total, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.inputsPerMinute.total
			: defaultPreview
			? `1200`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.inputsPerMinute.count, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.inputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `400`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.inputsPerMinute.count, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? ((currentPlayerOverall?.inputsPerMinute.count ?? 0) / 60).toFixed(2)
			: defaultPreview
			? `6.67`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.neutralWinRatio.count, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerOverall?.neutralWinRatio.count
			: defaultPreview
			? `18`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerOverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{![currentPlayerOverall?.neutralWinRatio.ratio, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (currentPlayerOverall?.neutralWinRatio?.ratio ?? 0 * 100).toFixed(1)
			: defaultPreview
			? `56.0`
			: '0'}%
	</TextElement>
{/if}
