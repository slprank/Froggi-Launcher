<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers.at(0)?.playerIndex;

	$: player1ActionCounts = $postGame?.postGameStats?.actionCounts?.[player1Index ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `53`
			: ![player1ActionCounts?.airDodgeCount, player1Index].some(isNil)
			? player1ActionCounts?.airDodgeCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountDashDance}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `137`
			: ![player1ActionCounts?.dashDanceCount, player1Index].some(isNil)
			? player1ActionCounts?.dashDanceCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `19`
			: ![player1ActionCounts?.dashDanceCount, player1Index].some(isNil)
			? player1ActionCounts?.dashDanceCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountRoll}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![player1ActionCounts?.rollCount, player1Index].some(isNil)
			? player1ActionCounts?.rollCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `18`
			: ![player1ActionCounts?.spotDodgeCount, player1Index].some(isNil)
			? player1ActionCounts?.spotDodgeCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `63`
			: ![player1ActionCounts?.wavedashCount, player1Index].some(isNil)
			? player1ActionCounts?.wavedashCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `37`
			: ![player1ActionCounts?.wavelandCount, player1Index].some(isNil)
			? player1ActionCounts?.wavelandCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `14`
			: ![player1ActionCounts?.grabCount, player1Index].some(isNil)
			? (player1ActionCounts?.grabCount.success ?? 0) +
			  (player1ActionCounts?.grabCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `9`
			: ![player1ActionCounts?.grabCount.success, player1Index].some(isNil)
			? player1ActionCounts?.grabCount.success
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `64.2`
			: ![player1ActionCounts?.grabCount, player1Index].some(isNil)
			? Number(
					(
						(player1ActionCounts?.grabCount.success ?? 0) /
						((player1ActionCounts?.grabCount.success ?? 0) +
							(player1ActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![player1ActionCounts?.grabCount.fail, player1Index].some(isNil)
			? player1ActionCounts?.grabCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `37.8`
			: ![player1ActionCounts?.grabCount, player1Index].some(isNil)
			? Number(
					(
						(player1ActionCounts?.grabCount.fail ?? 0) /
						((player1ActionCounts?.grabCount.success ?? 0) +
							(player1ActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `23`
			: ![player1ActionCounts?.groundTechCount, player1Index].some(isNil)
			? (player1ActionCounts?.groundTechCount.neutral ?? 0) +
			  (player1ActionCounts?.groundTechCount.in ?? 0) +
			  (player1ActionCounts?.groundTechCount.away ?? 0) +
			  (player1ActionCounts?.groundTechCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22`
			: ![player1ActionCounts?.groundTechCount, player1Index].some(isNil)
			? (player1ActionCounts?.groundTechCount.neutral ?? 0) +
			  (player1ActionCounts?.groundTechCount.in ?? 0) +
			  (player1ActionCounts?.groundTechCount.away ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `95.6`
			: ![player1ActionCounts?.groundTechCount, player1Index].some(isNil)
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
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![player1ActionCounts?.groundTechCount, player1Index].some(isNil)
			? player1ActionCounts?.groundTechCount.in
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![player1ActionCounts?.groundTechCount, player1Index].some(isNil)
			? player1ActionCounts?.groundTechCount.away
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `3`
			: ![player1ActionCounts?.groundTechCount, player1Index].some(isNil)
			? player1ActionCounts?.groundTechCount.neutral
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `1`
			: ![player1ActionCounts?.groundTechCount, player1Index].some(isNil)
			? player1ActionCounts?.groundTechCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `4.4`
			: ![player1ActionCounts?.groundTechCount, player1Index].some(isNil)
			? Number(
					(
						(player1ActionCounts?.groundTechCount.fail ?? 0) /
						((player1ActionCounts?.groundTechCount.fail ?? 0) +
							(player1ActionCounts?.groundTechCount.neutral ?? 0) +
							(player1ActionCounts?.groundTechCount.in ?? 0) +
							(player1ActionCounts?.groundTechCount.away ?? 0))
					).toFixed(1),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `54`
			: ![player1ActionCounts?.lCancelCount, player1Index].some(isNil)
			? (player1ActionCounts?.lCancelCount.success ?? 0) +
			  (player1ActionCounts?.lCancelCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `42`
			: ![player1ActionCounts?.lCancelCount, player1Index].some(isNil)
			? player1ActionCounts?.lCancelCount.success
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `77.8`
			: ![player1ActionCounts?.lCancelCount, player1Index].some(isNil)
			? Number(
					(
						(player1ActionCounts?.lCancelCount.success ?? 0) /
						((player1ActionCounts?.lCancelCount.success ?? 0) +
							(player1ActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1) ?? 0.0,
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `12`
			: ![player1ActionCounts?.lCancelCount, player1Index].some(isNil)
			? player1ActionCounts?.lCancelCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22.2`
			: ![player1ActionCounts?.lCancelCount, player1Index].some(isNil)
			? Number(
					(
						(player1ActionCounts?.lCancelCount.fail ?? 0) /
						((player1ActionCounts?.lCancelCount.fail ?? 0) +
							(player1ActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `17`
			: ![player1ActionCounts?.throwCount, player1Index].some(isNil)
			? (player1ActionCounts?.throwCount.up ?? 0) +
			  (player1ActionCounts?.throwCount.forward ?? 0) +
			  (player1ActionCounts?.throwCount.back ?? 0) +
			  (player1ActionCounts?.throwCount.down ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![player1ActionCounts?.throwCount, player1Index].some(isNil)
			? player1ActionCounts?.throwCount.up
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `2`
			: ![player1ActionCounts?.throwCount, player1Index].some(isNil)
			? player1ActionCounts?.throwCount.down
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `3`
			: ![player1ActionCounts?.throwCount, player1Index].some(isNil)
			? player1ActionCounts?.throwCount.back
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `4`
			: ![player1ActionCounts?.throwCount, player1Index].some(isNil)
			? player1ActionCounts?.throwCount.forward
			: '0'}
	</TextElement>
{/if}
