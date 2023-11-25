<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, currentMatch } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers?.at(0)?.playerIndex;

	$: player1ActionCounts = $currentMatch?.stats?.actionCounts?.[player1Index ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.airDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.airDodgeCount
			: defaultPreview
			? `53`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountDashDance}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.dashDanceCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.dashDanceCount
			: defaultPreview
			? `137`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.dashDanceCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.dashDanceCount
			: defaultPreview
			? `19`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountRoll}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.rollCount, player1Index].some((e) => e === undefined || e === null)
			? player1ActionCounts?.rollCount
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.spotDodgeCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.spotDodgeCount
			: defaultPreview
			? `18`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.wavedashCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.wavedashCount
			: defaultPreview
			? `63`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.wavelandCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.wavelandCount
			: defaultPreview
			? `37`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.grabCount, player1Index].some((e) => e === undefined || e === null)
			? (player1ActionCounts?.grabCount.success ?? 0) +
			  (player1ActionCounts?.grabCount.fail ?? 0)
			: defaultPreview
			? `14`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.grabCount.success, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.grabCount.success
			: defaultPreview
			? `9`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.grabCount, player1Index].some((e) => e === undefined || e === null)
			? Number(
					(
						(player1ActionCounts?.grabCount.success ?? 0) /
						((player1ActionCounts?.grabCount.success ?? 0) +
							(player1ActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `64.2`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.grabCount.fail, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.grabCount.fail
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.grabCount, player1Index].some((e) => e === undefined || e === null)
			? Number(
					(
						(player1ActionCounts?.grabCount.fail ?? 0) /
						((player1ActionCounts?.grabCount.success ?? 0) +
							(player1ActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `37.8`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.groundTechCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? (player1ActionCounts?.groundTechCount.neutral ?? 0) +
			  (player1ActionCounts?.groundTechCount.in ?? 0) +
			  (player1ActionCounts?.groundTechCount.away ?? 0) +
			  (player1ActionCounts?.groundTechCount.fail ?? 0)
			: defaultPreview
			? `23`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.groundTechCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? (player1ActionCounts?.groundTechCount.neutral ?? 0) +
			  (player1ActionCounts?.groundTechCount.in ?? 0) +
			  (player1ActionCounts?.groundTechCount.away ?? 0)
			: defaultPreview
			? `22`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.groundTechCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						((player1ActionCounts?.groundTechCount.neutral ?? 0) +
							(player1ActionCounts?.groundTechCount.in ?? 0) +
							(player1ActionCounts?.groundTechCount.away ?? 0)) /
						((player1ActionCounts?.groundTechCount.fail ?? 0) +
							(player1ActionCounts?.groundTechCount.neutral ?? 0) +
							(player1ActionCounts?.groundTechCount.in ?? 0) +
							(player1ActionCounts?.groundTechCount.away ?? 0))
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `95.6`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.groundTechCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.groundTechCount.in
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.groundTechCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.groundTechCount.away
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.groundTechCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.groundTechCount.neutral
			: defaultPreview
			? `3`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.groundTechCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.groundTechCount.fail
			: defaultPreview
			? `1`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.groundTechCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(player1ActionCounts?.groundTechCount.fail ?? 0) /
						((player1ActionCounts?.groundTechCount.fail ?? 0) +
							(player1ActionCounts?.groundTechCount.neutral ?? 0) +
							(player1ActionCounts?.groundTechCount.in ?? 0) +
							(player1ActionCounts?.groundTechCount.away ?? 0))
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `4.4`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.lCancelCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? (player1ActionCounts?.lCancelCount.success ?? 0) +
			  (player1ActionCounts?.lCancelCount.fail ?? 0)
			: defaultPreview
			? `54`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.lCancelCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.lCancelCount.success
			: defaultPreview
			? `42`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.lCancelCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(player1ActionCounts?.lCancelCount.success ?? 0) /
						((player1ActionCounts?.lCancelCount.success ?? 0) +
							(player1ActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1) ?? 0.0,
			  ) * 100
			: defaultPreview
			? `77.8`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.lCancelCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? player1ActionCounts?.lCancelCount.fail
			: defaultPreview
			? `12`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.lCancelCount, player1Index].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(player1ActionCounts?.lCancelCount.fail ?? 0) /
						((player1ActionCounts?.lCancelCount.fail ?? 0) +
							(player1ActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `22.2`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.throwCount, player1Index].some((e) => e === undefined || e === null)
			? (player1ActionCounts?.throwCount.up ?? 0) +
			  (player1ActionCounts?.throwCount.forward ?? 0) +
			  (player1ActionCounts?.throwCount.back ?? 0) +
			  (player1ActionCounts?.throwCount.down ?? 0)
			: defaultPreview
			? `17`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.throwCount, player1Index].some((e) => e === undefined || e === null)
			? player1ActionCounts?.throwCount.up
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.throwCount, player1Index].some((e) => e === undefined || e === null)
			? player1ActionCounts?.throwCount.down
			: defaultPreview
			? `2`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.throwCount, player1Index].some((e) => e === undefined || e === null)
			? player1ActionCounts?.throwCount.back
			: defaultPreview
			? `3`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameMatchPlayer1ActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{![player1ActionCounts?.throwCount, player1Index].some((e) => e === undefined || e === null)
			? player1ActionCounts?.throwCount.forward
			: defaultPreview
			? `4`
			: '0'}
	</TextElement>
{/if}
