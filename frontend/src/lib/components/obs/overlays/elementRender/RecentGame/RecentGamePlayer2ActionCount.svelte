<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/obs/overlays/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player2Index = $currentPlayers?.at(1)?.playerIndex;

	$: player2ActionCounts = $postGame?.postGameStats?.actionCounts?.[player2Index ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.airDodgeCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.airDodgeCount
			: defaultPreview
			? `53`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountDashDance}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.dashDanceCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.dashDanceCount
			: defaultPreview
			? `137`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.dashDanceCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.dashDanceCount
			: defaultPreview
			? `19`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountRoll}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.rollCount, player2Index].some((e) => e === undefined || e === null)
			? player2ActionCounts?.rollCount
			: defaultPreview
			? `13`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.spotDodgeCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.spotDodgeCount
			: defaultPreview
			? `18`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.wavedashCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.wavedashCount
			: defaultPreview
			? `63`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.wavelandCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.wavelandCount
			: defaultPreview
			? `37`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.grabCount, player2Index].some((e) => e === undefined || e === null)
			? (player2ActionCounts?.grabCount.success ?? 0) +
			  (player2ActionCounts?.grabCount?.fail ?? 0)
			: defaultPreview
			? `14`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.grabCount.success, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.grabCount.success
			: defaultPreview
			? `9`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.grabCount, player2Index].some((e) => e === undefined || e === null)
			? Number(
					(
						(player2ActionCounts?.grabCount.success ?? 0) /
						((player2ActionCounts?.grabCount.success ?? 0) +
							(player2ActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `64.2`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.grabCount.fail, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.grabCount.fail
			: defaultPreview
			? `5`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.grabCount, player2Index].some((e) => e === undefined || e === null)
			? Number(
					(
						(player2ActionCounts?.grabCount.fail ?? 0) /
						((player2ActionCounts?.grabCount.success ?? 0) +
							(player2ActionCounts?.grabCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `37.8`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.groundTechCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? (player2ActionCounts?.groundTechCount.neutral ?? 0) +
			  (player2ActionCounts?.groundTechCount.in ?? 0) +
			  (player2ActionCounts?.groundTechCount.away ?? 0) +
			  (player2ActionCounts?.groundTechCount.fail ?? 0)
			: defaultPreview
			? `23`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.groundTechCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? (player2ActionCounts?.groundTechCount.neutral ?? 0) +
			  (player2ActionCounts?.groundTechCount.in ?? 0) +
			  (player2ActionCounts?.groundTechCount.away ?? 0)
			: defaultPreview
			? `22`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.groundTechCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
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
			: defaultPreview
			? `95.6`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.groundTechCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.groundTechCount.in
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.groundTechCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.groundTechCount.away
			: defaultPreview
			? `11`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.groundTechCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.groundTechCount.neutral
			: defaultPreview
			? `3`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.groundTechCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.groundTechCount.fail
			: defaultPreview
			? `1`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.groundTechCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(player2ActionCounts?.groundTechCount.fail ?? 0) /
						((player2ActionCounts?.groundTechCount.fail ?? 0) +
							(player2ActionCounts?.groundTechCount.neutral ?? 0) +
							(player2ActionCounts?.groundTechCount.in ?? 0) +
							(player2ActionCounts?.groundTechCount.away ?? 0))
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `4.4`
			: '0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.lCancelCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? (player2ActionCounts?.lCancelCount.success ?? 0) +
			  (player2ActionCounts?.lCancelCount.fail ?? 0)
			: defaultPreview
			? `54`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.lCancelCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.lCancelCount.success
			: defaultPreview
			? `42`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.lCancelCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(player2ActionCounts?.lCancelCount.success ?? 0) /
						((player2ActionCounts?.lCancelCount.success ?? 0) +
							(player2ActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `77.8`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.lCancelCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? player2ActionCounts?.lCancelCount.fail
			: defaultPreview
			? `12`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.lCancelCount, player2Index].some(
			(e) => e === undefined || e === null,
		)
			? Number(
					(
						(player2ActionCounts?.lCancelCount.fail ?? 0) /
						((player2ActionCounts?.lCancelCount.fail ?? 0) +
							(player2ActionCounts?.lCancelCount.fail ?? 0))
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `22.2`
			: '0.0'}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.throwCount, player2Index].some((e) => e === undefined || e === null)
			? (player2ActionCounts?.throwCount.up ?? 0) +
			  (player2ActionCounts?.throwCount.forward ?? 0) +
			  (player2ActionCounts?.throwCount.back ?? 0) +
			  (player2ActionCounts?.throwCount.down ?? 0)
			: defaultPreview
			? `17`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.throwCount, player2Index].some((e) => e === undefined || e === null)
			? player2ActionCounts?.throwCount.up
			: defaultPreview
			? `8`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.throwCount, player2Index].some((e) => e === undefined || e === null)
			? player2ActionCounts?.throwCount.down
			: defaultPreview
			? `2`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.throwCount, player2Index].some((e) => e === undefined || e === null)
			? player2ActionCounts?.throwCount.back
			: defaultPreview
			? `3`
			: '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{![player2ActionCounts?.throwCount, player2Index].some((e) => e === undefined || e === null)
			? player2ActionCounts?.throwCount.forward
			: defaultPreview
			? `4`
			: '0'}
	</TextElement>
{/if}
