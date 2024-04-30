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
	$: currentPlayerActionCounts =
		$postGame?.postGameStats?.actionCounts?.[currentPlayerIndex ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `53`
			: ![currentPlayerActionCounts?.airDodgeCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.airDodgeCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountDashDance}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `137`
			: ![currentPlayerActionCounts?.dashDanceCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.dashDanceCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `19`
			: ![currentPlayerActionCounts?.dashDanceCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.dashDanceCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountRoll}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![currentPlayerActionCounts?.rollCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.rollCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `18`
			: ![currentPlayerActionCounts?.spotDodgeCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.spotDodgeCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `63`
			: ![currentPlayerActionCounts?.wavedashCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.wavedashCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `37`
			: ![currentPlayerActionCounts?.wavelandCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.wavelandCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `14`
			: ![currentPlayerActionCounts?.grabCount, currentPlayerIndex].some(isNil)
			? (currentPlayerActionCounts?.grabCount.success ?? 0) +
			  (currentPlayerActionCounts?.grabCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `9`
			: ![currentPlayerActionCounts?.grabCount.success, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.grabCount.success
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `64.2`
			: ![currentPlayerActionCounts?.grabCount, currentPlayerIndex].some(isNil)
			? Number(
					(
						(currentPlayerActionCounts?.grabCount.success ?? 0) /
						((currentPlayerActionCounts?.grabCount.success ?? 0) +
							(currentPlayerActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![currentPlayerActionCounts?.grabCount.fail, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.grabCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `37.8`
			: ![currentPlayerActionCounts?.grabCount, currentPlayerIndex].some(isNil)
			? Number(
					(
						(currentPlayerActionCounts?.grabCount.fail ?? 0) /
						((currentPlayerActionCounts?.grabCount.success ?? 0) +
							(currentPlayerActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `23`
			: ![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(isNil)
			? (currentPlayerActionCounts?.groundTechCount.neutral ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.in ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.away ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22`
			: ![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(isNil)
			? (currentPlayerActionCounts?.groundTechCount.neutral ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.in ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.away ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `95.6`
			: ![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(isNil)
			? Number(
					(
						((currentPlayerActionCounts?.groundTechCount.neutral ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.in ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.away ?? 0)) /
						((currentPlayerActionCounts?.groundTechCount.fail ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.neutral ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.in ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.away ?? 0))
					).toFixed(),
			  ) * 100
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.groundTechCount.in
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.groundTechCount.away
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `3`
			: ![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.groundTechCount.neutral
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `1`
			: ![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.groundTechCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `4.4`
			: ![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(isNil)
			? Number(
					(
						(currentPlayerActionCounts?.groundTechCount.fail ?? 0) /
						((currentPlayerActionCounts?.groundTechCount.fail ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.neutral ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.in ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.away ?? 0))
					).toFixed(),
			  ) * 100
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `54`
			: ![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(isNil)
			? (currentPlayerActionCounts?.lCancelCount.success ?? 0) +
			  (currentPlayerActionCounts?.lCancelCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `42`
			: ![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.lCancelCount.success
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `77.8`
			: ![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(isNil)
			? Number(
					(
						(currentPlayerActionCounts?.lCancelCount.success ?? 0) /
						((currentPlayerActionCounts?.lCancelCount.success ?? 0) +
							(currentPlayerActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1) ?? 0.0,
			  ) * 100
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `12`
			: ![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.lCancelCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22.2`
			: ![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(isNil)
			? Number(
					(
						(currentPlayerActionCounts?.lCancelCount.fail ?? 0) /
						((currentPlayerActionCounts?.lCancelCount.fail ?? 0) +
							(currentPlayerActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `17`
			: ![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(isNil)
			? (currentPlayerActionCounts?.throwCount.up ?? 0) +
			  (currentPlayerActionCounts?.throwCount.forward ?? 0) +
			  (currentPlayerActionCounts?.throwCount.back ?? 0) +
			  (currentPlayerActionCounts?.throwCount.down ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.throwCount.up
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `2`
			: ![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.throwCount.down
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `3`
			: ![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.throwCount.back
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `4`
			: ![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(isNil)
			? currentPlayerActionCounts?.throwCount.forward
			: '0'}
	</TextElement>
{/if}
