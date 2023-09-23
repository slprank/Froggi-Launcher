<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player1Index = $currentPlayers.at(0)?.playerIndex;

	$: player1ActionCounts = $postGame.postGameStats?.actionCounts[player1Index ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.airDodgeCount && player1Index !== undefined
			? player1ActionCounts.airDodgeCount
			: defaultPreview
			? `53`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountDashDance}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.dashDanceCount && player1Index !== undefined
			? player1ActionCounts.dashDanceCount
			: defaultPreview
			? `137`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.dashDanceCount && player1Index !== undefined
			? player1ActionCounts.dashDanceCount
			: defaultPreview
			? `19`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountRoll}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.rollCount && player1Index !== undefined
			? player1ActionCounts.rollCount
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.spotDodgeCount && player1Index !== undefined
			? player1ActionCounts.spotDodgeCount
			: defaultPreview
			? `18`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.wavedashCount && player1Index !== undefined
			? player1ActionCounts.wavedashCount
			: defaultPreview
			? `63`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.wavelandCount && player1Index !== undefined
			? player1ActionCounts.wavelandCount
			: defaultPreview
			? `37`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.grabCount && player1Index !== undefined
			? player1ActionCounts.grabCount.success + player1ActionCounts.grabCount.fail
			: defaultPreview
			? `14`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.grabCount.success && player1Index !== undefined
			? player1ActionCounts.grabCount.success
			: defaultPreview
			? `9`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.grabCount && player1Index !== undefined
			? Number(
					(
						player1ActionCounts.grabCount.success /
						(player1ActionCounts.grabCount.success + player1ActionCounts.grabCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `64.2`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.grabCount.fail && player1Index !== undefined
			? player1ActionCounts.grabCount.fail
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.grabCount && player1Index !== undefined
			? Number(
					(
						player1ActionCounts.grabCount.fail /
						(player1ActionCounts.grabCount.success + player1ActionCounts.grabCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `37.8`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.groundTechCount && player1Index !== undefined
			? player1ActionCounts.groundTechCount.neutral +
			  player1ActionCounts.groundTechCount.in +
			  player1ActionCounts.groundTechCount.away +
			  player1ActionCounts.groundTechCount.fail
			: defaultPreview
			? `23`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.groundTechCount && player1Index !== undefined
			? player1ActionCounts.groundTechCount.neutral +
			  player1ActionCounts.groundTechCount.in +
			  player1ActionCounts.groundTechCount.away
			: defaultPreview
			? `22`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.groundTechCount && player1Index !== undefined
			? Number(
					(
						(player1ActionCounts.groundTechCount.neutral +
							player1ActionCounts.groundTechCount.in +
							player1ActionCounts.groundTechCount.away) /
						(player1ActionCounts.groundTechCount.fail +
							player1ActionCounts.groundTechCount.neutral +
							player1ActionCounts.groundTechCount.in +
							player1ActionCounts.groundTechCount.away)
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `95.6`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.groundTechCount && player1Index !== undefined
			? player1ActionCounts.groundTechCount.in
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.groundTechCount && player1Index !== undefined
			? player1ActionCounts.groundTechCount.away
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.groundTechCount && player1Index !== undefined
			? player1ActionCounts.groundTechCount.neutral
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.groundTechCount && player1Index !== undefined
			? player1ActionCounts.groundTechCount.fail
			: defaultPreview
			? `1`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.groundTechCount && player1Index !== undefined
			? Number(
					(
						player1ActionCounts.groundTechCount.fail /
						(player1ActionCounts.groundTechCount.fail +
							player1ActionCounts.groundTechCount.neutral +
							player1ActionCounts.groundTechCount.in +
							player1ActionCounts.groundTechCount.away)
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `4.4`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.lCancelCount && player1Index !== undefined
			? player1ActionCounts.lCancelCount.success + player1ActionCounts.lCancelCount.fail
			: defaultPreview
			? `54`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.lCancelCount && player1Index !== undefined
			? player1ActionCounts.lCancelCount.success
			: defaultPreview
			? `42`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.lCancelCount && player1Index !== undefined
			? Number(
					(
						player1ActionCounts.lCancelCount.success /
						(player1ActionCounts.lCancelCount.success +
							player1ActionCounts.lCancelCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `77.8`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.lCancelCount && player1Index !== undefined
			? player1ActionCounts.lCancelCount.fail
			: defaultPreview
			? `12`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.lCancelCount && player1Index !== undefined
			? Number(
					(
						player1ActionCounts.lCancelCount.fail /
						(player1ActionCounts.lCancelCount.fail +
							player1ActionCounts.lCancelCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `22.2`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.throwCount && player1Index !== undefined
			? player1ActionCounts.throwCount.up +
			  player1ActionCounts.throwCount.forward +
			  player1ActionCounts.throwCount.back +
			  player1ActionCounts.throwCount.down
			: defaultPreview
			? `17`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.throwCount && player1Index !== undefined
			? player1ActionCounts.throwCount.up
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.throwCount && player1Index !== undefined
			? player1ActionCounts.throwCount.down
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.throwCount && player1Index !== undefined
			? player1ActionCounts.throwCount.back
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer1ActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{player1ActionCounts?.throwCount && player1Index !== undefined
			? player1ActionCounts.throwCount.forward
			: defaultPreview
			? `4`
			: ''}
	</TextElement>
{/if}
