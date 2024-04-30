<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player2Index = $currentPlayers?.at(1)?.playerIndex;

	$: player2ActionCounts = $postGame?.postGameStats?.actionCounts?.[player2Index ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `53`
			: ![player2ActionCounts?.airDodgeCount, player2Index].some(isNil)
			? player2ActionCounts?.airDodgeCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountDashDance}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `137`
			: ![player2ActionCounts?.dashDanceCount, player2Index].some(isNil)
			? player2ActionCounts?.dashDanceCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `19`
			: ![player2ActionCounts?.ledgegrabCount, player2Index].some(isNil)
			? player2ActionCounts?.ledgegrabCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountRoll}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `13`
			: ![player2ActionCounts?.rollCount, player2Index].some(isNil)
			? player2ActionCounts?.rollCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `18`
			: ![player2ActionCounts?.spotDodgeCount, player2Index].some(isNil)
			? player2ActionCounts?.spotDodgeCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `63`
			: ![player2ActionCounts?.wavedashCount, player2Index].some(isNil)
			? player2ActionCounts?.wavedashCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `37`
			: ![player2ActionCounts?.wavelandCount, player2Index].some(isNil)
			? player2ActionCounts?.wavelandCount
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `14`
			: ![player2ActionCounts?.grabCount, player2Index].some(isNil)
			? (player2ActionCounts?.grabCount.success ?? 0) +
			  (player2ActionCounts?.grabCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `9`
			: ![player2ActionCounts?.grabCount.success, player2Index].some(isNil)
			? player2ActionCounts?.grabCount.success
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `64.2%`
			: ![player2ActionCounts?.grabCount, player2Index].some(isNil)
			? Number(
					(
						(player2ActionCounts?.grabCount.success ?? 0) /
						((player2ActionCounts?.grabCount.success ?? 0) +
							(player2ActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `5`
			: ![player2ActionCounts?.grabCount.fail, player2Index].some(isNil)
			? player2ActionCounts?.grabCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `37.8%`
			: ![player2ActionCounts?.grabCount, player2Index].some(isNil)
			? Number(
					(
						(player2ActionCounts?.grabCount.fail ?? 0) /
						((player2ActionCounts?.grabCount.success ?? 0) +
							(player2ActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `23`
			: ![player2ActionCounts?.groundTechCount, player2Index].some(isNil)
			? (player2ActionCounts?.groundTechCount.neutral ?? 0) +
			  (player2ActionCounts?.groundTechCount.in ?? 0) +
			  (player2ActionCounts?.groundTechCount.away ?? 0) +
			  (player2ActionCounts?.groundTechCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22`
			: ![player2ActionCounts?.groundTechCount, player2Index].some(isNil)
			? (player2ActionCounts?.groundTechCount.neutral ?? 0) +
			  (player2ActionCounts?.groundTechCount.in ?? 0) +
			  (player2ActionCounts?.groundTechCount.away ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `95.6%`
			: ![player2ActionCounts?.groundTechCount, player2Index].some(isNil)
			? Number(
					(
						((player2ActionCounts?.groundTechCount.neutral ?? 0) +
							(player2ActionCounts?.groundTechCount.in ?? 0) +
							(player2ActionCounts?.groundTechCount.away ?? 0)) /
						((player2ActionCounts?.groundTechCount.fail ?? 0) +
							(player2ActionCounts?.groundTechCount.neutral ?? 0) +
							(player2ActionCounts?.groundTechCount.in ?? 0) +
							(player2ActionCounts?.groundTechCount.away ?? 0))
					).toFixed(),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![player2ActionCounts?.groundTechCount.in, player2Index].some(isNil)
			? player2ActionCounts?.groundTechCount.in
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `11`
			: ![player2ActionCounts?.groundTechCount.away, player2Index].some(isNil)
			? player2ActionCounts?.groundTechCount.away
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `3`
			: ![player2ActionCounts?.groundTechCount.neutral, player2Index].some(isNil)
			? player2ActionCounts?.groundTechCount.neutral
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `1`
			: ![player2ActionCounts?.groundTechCount.fail, player2Index].some(isNil)
			? player2ActionCounts?.groundTechCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `4.4%`
			: ![player2ActionCounts?.groundTechCount.fail, player2Index].some(isNil)
			? Number(
					(
						(player2ActionCounts?.groundTechCount.fail ?? 0) /
						((player2ActionCounts?.groundTechCount.fail ?? 0) +
							(player2ActionCounts?.groundTechCount.neutral ?? 0) +
							(player2ActionCounts?.groundTechCount.in ?? 0) +
							(player2ActionCounts?.groundTechCount.away ?? 0))
					).toFixed(),
			  ) * 100
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `54`
			: ![player2ActionCounts?.lCancelCount, player2Index].some(isNil)
			? (player2ActionCounts?.lCancelCount.success ?? 0) +
			  (player2ActionCounts?.lCancelCount.fail ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `42`
			: ![player2ActionCounts?.lCancelCount.success, player2Index].some(isNil)
			? player2ActionCounts?.lCancelCount.success
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `77.8%`
			: ![player2ActionCounts?.lCancelCount, player2Index].some(isNil)
			? Number(
					(
						(player2ActionCounts?.lCancelCount.success ?? 0) /
						((player2ActionCounts?.lCancelCount.success ?? 0) +
							(player2ActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `12`
			: ![player2ActionCounts?.lCancelCount.fail, player2Index].some(isNil)
			? player2ActionCounts?.lCancelCount.fail
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `22.2%`
			: ![player2ActionCounts?.lCancelCount.fail, player2Index].some(isNil)
			? Number(
					(
						(player2ActionCounts?.lCancelCount.fail ?? 0) /
						((player2ActionCounts?.lCancelCount.success ?? 0) +
							(player2ActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `17`
			: ![player2ActionCounts?.throwCount, player2Index].some(isNil)
			? (player2ActionCounts?.throwCount.up ?? 0) +
			  (player2ActionCounts?.throwCount.forward ?? 0) +
			  (player2ActionCounts?.throwCount.back ?? 0) +
			  (player2ActionCounts?.throwCount.down ?? 0)
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `8`
			: ![player2ActionCounts?.throwCount.up, player2Index].some(isNil)
			? player2ActionCounts?.throwCount.up
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `2`
			: ![player2ActionCounts?.throwCount.down, player2Index].some(isNil)
			? player2ActionCounts?.throwCount.down
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `3`
			: ![player2ActionCounts?.throwCount.back, player2Index].some(isNil)
			? player2ActionCounts?.throwCount.back
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{defaultPreview
			? `4`
			: ![player2ActionCounts?.throwCount.forward, player2Index].some(isNil)
			? player2ActionCounts?.throwCount.forward
			: '0'}
	</TextElement>
{/if}
