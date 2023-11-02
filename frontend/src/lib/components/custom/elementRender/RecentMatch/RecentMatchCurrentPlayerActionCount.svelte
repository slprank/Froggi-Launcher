<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, postMatch } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer?.playerIndex;
	$: currentPlayerActionCounts = $postMatch?.actionCounts?.[currentPlayerIndex ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.airDodgeCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.airDodgeCount
			: defaultPreview
			? `53`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountDashDance}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.dashDanceCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.dashDanceCount
			: defaultPreview
			? `137`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.dashDanceCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.dashDanceCount
			: defaultPreview
			? `19`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountRoll}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.rollCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.rollCount
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.spotDodgeCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.spotDodgeCount
			: defaultPreview
			? `18`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.wavedashCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.wavedashCount
			: defaultPreview
			? `63`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.wavelandCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.wavelandCount
			: defaultPreview
			? `37`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.grabCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (currentPlayerActionCounts?.grabCount.success ?? 0) +
			  (currentPlayerActionCounts?.grabCount.fail ?? 0)
			: defaultPreview
			? `14`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.grabCount.success, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.grabCount.success
			: defaultPreview
			? `9`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.grabCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(currentPlayerActionCounts?.grabCount.success ?? 0) /
						((currentPlayerActionCounts?.grabCount.success ?? 0) +
							(currentPlayerActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `64.2`
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.grabCount.fail, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.grabCount.fail
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.grabCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(currentPlayerActionCounts?.grabCount.fail ?? 0) /
						((currentPlayerActionCounts?.grabCount.success ?? 0) +
							(currentPlayerActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `37.8`
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (currentPlayerActionCounts?.groundTechCount.neutral ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.in ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.away ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.fail ?? 0)
			: defaultPreview
			? `23`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (currentPlayerActionCounts?.groundTechCount.neutral ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.in ?? 0) +
			  (currentPlayerActionCounts?.groundTechCount.away ?? 0)
			: defaultPreview
			? `22`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
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
			: defaultPreview
			? `95.6`
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.groundTechCount.in
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.groundTechCount.away
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.groundTechCount.neutral
			: defaultPreview
			? `3`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.groundTechCount.fail
			: defaultPreview
			? `1`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.groundTechCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(currentPlayerActionCounts?.groundTechCount.fail ?? 0) /
						((currentPlayerActionCounts?.groundTechCount.fail ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.neutral ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.in ?? 0) +
							(currentPlayerActionCounts?.groundTechCount.away ?? 0))
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `4.4`
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (currentPlayerActionCounts?.lCancelCount.success ?? 0) +
			  (currentPlayerActionCounts?.lCancelCount.fail ?? 0)
			: defaultPreview
			? `54`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.lCancelCount.success
			: defaultPreview
			? `42`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(currentPlayerActionCounts?.lCancelCount.success ?? 0) /
						((currentPlayerActionCounts?.lCancelCount.success ?? 0) +
							(currentPlayerActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1) ?? 0.0,
			  ) * 100
			: defaultPreview
			? `77.8`
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.lCancelCount.fail
			: defaultPreview
			? `12`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.lCancelCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(currentPlayerActionCounts?.lCancelCount.fail ?? 0) /
						((currentPlayerActionCounts?.lCancelCount.fail ?? 0) +
							(currentPlayerActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `22.2`
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? (currentPlayerActionCounts?.throwCount.up ?? 0) +
			  (currentPlayerActionCounts?.throwCount.forward ?? 0) +
			  (currentPlayerActionCounts?.throwCount.back ?? 0) +
			  (currentPlayerActionCounts?.throwCount.down ?? 0)
			: defaultPreview
			? `17`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.throwCount.up
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.throwCount.down
			: defaultPreview
			? `2`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.throwCount.back
			: defaultPreview
			? `3`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchCurrentPlayerActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{![currentPlayerActionCounts?.throwCount, currentPlayerIndex].some(
			(e) => e === undefined || e === null,
		)
			? currentPlayerActionCounts?.throwCount.forward
			: defaultPreview
			? `4`
			: '0'}
	</TextElement>
{/if}
