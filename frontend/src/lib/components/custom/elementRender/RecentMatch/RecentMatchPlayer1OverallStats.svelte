<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, postMatch } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers.at(0)?.playerIndex;

	$: player1Overall = $postMatch?.overall?.[player1Index ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{![player1Overall?.beneficialTradeRatio.count, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.beneficialTradeRatio.count
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{![player1Overall?.beneficialTradeRatio.ratio, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? (player1Overall?.beneficialTradeRatio.ratio ?? 0) * 100
			: defaultPreview
			? `75.0`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{![player1Overall?.counterHitRatio.count, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.counterHitRatio.count
			: defaultPreview
			? `10`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{![player1Overall?.counterHitRatio.ratio, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? (player1Overall?.counterHitRatio.ratio ?? 0) * 100
			: defaultPreview
			? `60.0`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDamageTotal}
	<TextElement {style} {dataItem}>
		{![player1Overall?.totalDamage, player1Index].some((e) => e === undefined || e === null)
			? player1Overall?.totalDamage.toFixed(1)
			: defaultPreview
			? `420.7`
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{![player1Overall?.openingsPerKill.total, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.openingsPerKill.total
			: defaultPreview
			? `27`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{![player1Overall?.damagePerOpening.ratio, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.damagePerOpening.ratio?.toFixed(1)
			: defaultPreview
			? `15.6`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{![player1Overall?.openingsPerKill.count, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.openingsPerKill.count.toFixed(1)
			: defaultPreview
			? `6.7`
			: '0.0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{![player1Overall?.digitalInputsPerMinute.total, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.digitalInputsPerMinute.total
			: defaultPreview
			? `945`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{![player1Overall?.digitalInputsPerMinute.count, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.digitalInputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `315`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{![player1Overall?.digitalInputsPerMinute.count, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? ((player1Overall?.digitalInputsPerMinute.count ?? 0) / 60).toFixed(2)
			: defaultPreview
			? `5.25`
			: '0.00'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallInputsTotal}
	<TextElement {style} {dataItem}>
		{![player1Overall?.inputsPerMinute.total, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.inputsPerMinute.total
			: defaultPreview
			? `1200`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{![player1Overall?.inputsPerMinute.count, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1Overall?.inputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `400`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{![player1Overall?.inputsPerMinute.count, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? ((player1Overall?.inputsPerMinute.count ?? 0) / 60).toFixed(2)
			: defaultPreview
			? `6.67`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{![player1Overall?.neutralWinRatio, player1Index].some((e) => e === undefined || e === null)
			? player1Overall?.neutralWinRatio.count
			: defaultPreview
			? `18`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1OverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{![player1Overall?.neutralWinRatio.ratio, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? ((player1Overall?.neutralWinRatio?.ratio ?? 0) * 100).toFixed(1)
			: defaultPreview
			? `56.0`
			: '0.0'}%
	</TextElement>
{/if}
