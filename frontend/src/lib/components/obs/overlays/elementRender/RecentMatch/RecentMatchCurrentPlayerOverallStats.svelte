<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import { MatchStats } from '$lib/models/types/slippiData';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	export let playerIndex: number;
	export let stats: MatchStats;

	$: overall = stats?.overall?.find((o) => o.playerIndex === playerIndex);
</script>

{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallBeneficialTradeCount}
	<TextElement {style} {dataItem}>
		{![overall?.beneficialTradeRatio.count, playerIndex].some(
			(e) => e === undefined || e === null,
		)
			? overall?.beneficialTradeRatio.count
			: defaultPreview
			? `${24 + playerIndex * 4}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallBeneficialTradeRatio}
	<TextElement {style} {dataItem}>
		{![overall?.beneficialTradeRatio.ratio, playerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (overall?.beneficialTradeRatio?.ratio ?? 0) * 100
			: defaultPreview
			? `${(75 + playerIndex * 11.2).toFixed(1)}`
			: '0'}%
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallCounterHitCount}
	<TextElement {style} {dataItem}>
		{![overall?.counterHitRatio?.count, playerIndex].some((e) => e === undefined || e === null)
			? overall?.counterHitRatio.count
			: defaultPreview
			? `${30 + playerIndex * 4}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallCounterHitRatio}
	<TextElement {style} {dataItem}>
		{![overall?.counterHitRatio.ratio, playerIndex].some((e) => e === undefined || e === null)
			? (overall?.counterHitRatio.ratio ?? 0) * 100
			: defaultPreview
			? `${60 + playerIndex * 9}`
			: '0.0'}%
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallDamageTotal}
	<TextElement {style} {dataItem}>
		{![overall?.totalDamage, playerIndex].some((e) => e === undefined || e === null)
			? overall?.totalDamage.toFixed(1)
			: defaultPreview
			? `${(1081.5 + playerIndex * 162.2).toFixed(1)}`
			: '0.0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallOpeningsTotal}
	<TextElement {style} {dataItem}>
		{![overall?.openingsPerKill?.total, playerIndex].some((e) => e === undefined || e === null)
			? overall?.openingsPerKill.total
			: defaultPreview
			? `${81 + playerIndex * 12}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallDamagePerOpening}
	<TextElement {style} {dataItem}>
		{![overall?.damagePerOpening.ratio, playerIndex].some((e) => e === undefined || e === null)
			? overall?.damagePerOpening.ratio?.toFixed(1)
			: defaultPreview
			? `${(15.6 + playerIndex * 2.3).toFixed(1)}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallOpeningsPerKill}
	<TextElement {style} {dataItem}>
		{![overall?.openingsPerKill.count, playerIndex].some((e) => e === undefined || e === null)
			? overall?.openingsPerKill.count.toFixed(1) ?? '0.0'
			: defaultPreview
			? `${(6.7 + playerIndex * 1).toFixed(1)}`
			: '0.0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallDigitalInputsTotal}
	<TextElement {style} {dataItem}>
		{overall?.digitalInputsPerMinute.total !== undefined
			? overall?.digitalInputsPerMinute.total
			: defaultPreview
			? `${2835 + playerIndex * 425}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallDigitalInputsPerMinute}
	<TextElement {style} {dataItem}>
		{overall?.digitalInputsPerMinute.count !== undefined
			? overall?.digitalInputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `${(315 + playerIndex * 47.2).toFixed(1)}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallDigitalInputsPerSecond}
	<TextElement {style} {dataItem}>
		{overall?.digitalInputsPerMinute.count !== undefined
			? ((overall?.digitalInputsPerMinute?.count ?? 0) / 60).toFixed(2)
			: defaultPreview
			? `${(5.25 + playerIndex / 60).toFixed(2)}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallInputsTotal}
	<TextElement {style} {dataItem}>
		{![overall?.inputsPerMinute.total, playerIndex].some((e) => e === undefined || e === null)
			? overall?.inputsPerMinute.total
			: defaultPreview
			? `${3600 + playerIndex * 540}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallInputsPerMinute}
	<TextElement {style} {dataItem}>
		{![overall?.inputsPerMinute.count, playerIndex].some((e) => e === undefined || e === null)
			? overall?.inputsPerMinute.count.toFixed(0)
			: defaultPreview
			? `${400 + playerIndex * 60}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallInputsPerSecond}
	<TextElement {style} {dataItem}>
		{![overall?.inputsPerMinute.count, playerIndex].some((e) => e === undefined || e === null)
			? ((overall?.inputsPerMinute.count ?? 0) / 60).toFixed(2)
			: defaultPreview
			? `${(6.67 + playerIndex / 60).toFixed(2)}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallNeutralWinsCount}
	<TextElement {style} {dataItem}>
		{![overall?.neutralWinRatio.count, playerIndex].some((e) => e === undefined || e === null)
			? overall?.neutralWinRatio.count
			: defaultPreview
			? `${54 + playerIndex * 8}`
			: '0'}
	</TextElement>
{:else if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerOverallNeutralWinsRatio}
	<TextElement {style} {dataItem}>
		{![overall?.neutralWinRatio.ratio, playerIndex].some((e) => e === undefined || e === null)
			? (overall?.neutralWinRatio?.ratio ?? 0 * 100).toFixed(1)
			: defaultPreview
			? `${(56.0 + playerIndex).toFixed(1)}`
			: '0'}%
	</TextElement>
{/if}
