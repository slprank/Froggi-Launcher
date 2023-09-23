<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer.playerIndex ?? 0;
	$: player1Index = $currentPlayers.at(0)?.playerIndex ?? 0;
	$: player2Index = $currentPlayers.at(1)?.playerIndex ?? 1;

	$: currentPlayerActionCounts = $postGame.postGameStats?.actionCounts[currentPlayerIndex];
	$: player1ActionCounts = $postGame.postGameStats?.actionCounts[player1Index];
	$: player2ActionCounts = $postGame.postGameStats?.actionCounts[player2Index];
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.airDodgeCount
			? currentPlayerActionCounts.airDodgeCount
			: defaultPreview
			? `53`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountDashDance}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.dashDanceCount
			? currentPlayerActionCounts.dashDanceCount
			: defaultPreview
			? `137`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.dashDanceCount
			? currentPlayerActionCounts.dashDanceCount
			: defaultPreview
			? `19`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountRoll}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.rollCount
			? currentPlayerActionCounts.rollCount
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.spotDodgeCount
			? currentPlayerActionCounts.spotDodgeCount
			: defaultPreview
			? `18`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.wavedashCount
			? currentPlayerActionCounts.wavedashCount
			: defaultPreview
			? `63`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.wavelandCount
			? currentPlayerActionCounts.wavelandCount
			: defaultPreview
			? `37`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount
			? currentPlayerActionCounts.grabCount.success + currentPlayerActionCounts.grabCount.fail
			: defaultPreview
			? `14`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount.success
			? currentPlayerActionCounts.grabCount.success
			: defaultPreview
			? `9`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount
			? Number(
					(
						currentPlayerActionCounts.grabCount.success /
						(currentPlayerActionCounts.grabCount.success +
							currentPlayerActionCounts.grabCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `64.2`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount.fail
			? currentPlayerActionCounts.grabCount.fail
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount
			? Number(
					(
						currentPlayerActionCounts.grabCount.fail /
						(currentPlayerActionCounts.grabCount.success +
							currentPlayerActionCounts.grabCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `37.8`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount
			? currentPlayerActionCounts.groundTechCount.neutral +
			  currentPlayerActionCounts.groundTechCount.in +
			  currentPlayerActionCounts.groundTechCount.away +
			  currentPlayerActionCounts.groundTechCount.fail
			: defaultPreview
			? `23`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount
			? currentPlayerActionCounts.groundTechCount.neutral +
			  currentPlayerActionCounts.groundTechCount.in +
			  currentPlayerActionCounts.groundTechCount.away
			: defaultPreview
			? `22`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount
			? Number(
					(
						(currentPlayerActionCounts.groundTechCount.neutral +
							currentPlayerActionCounts.groundTechCount.in +
							currentPlayerActionCounts.groundTechCount.away) /
						(currentPlayerActionCounts.groundTechCount.fail +
							currentPlayerActionCounts.groundTechCount.neutral +
							currentPlayerActionCounts.groundTechCount.in +
							currentPlayerActionCounts.groundTechCount.away)
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `95.6`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount
			? currentPlayerActionCounts.groundTechCount.in
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount
			? currentPlayerActionCounts.groundTechCount.away
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount
			? currentPlayerActionCounts.groundTechCount.neutral
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount
			? currentPlayerActionCounts.groundTechCount.fail
			: defaultPreview
			? `1`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount
			? Number(
					(
						currentPlayerActionCounts.groundTechCount.fail /
						(currentPlayerActionCounts.groundTechCount.fail +
							currentPlayerActionCounts.groundTechCount.neutral +
							currentPlayerActionCounts.groundTechCount.in +
							currentPlayerActionCounts.groundTechCount.away)
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `4.4`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.lCancelCount
			? currentPlayerActionCounts.lCancelCount.success +
			  currentPlayerActionCounts.lCancelCount.fail
			: defaultPreview
			? `54`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.lCancelCount
			? currentPlayerActionCounts.lCancelCount.success
			: defaultPreview
			? `42`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.lCancelCount
			? Number(
					(
						currentPlayerActionCounts.lCancelCount.success /
						(currentPlayerActionCounts.lCancelCount.success +
							currentPlayerActionCounts.lCancelCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `77.8`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.lCancelCount
			? currentPlayerActionCounts.lCancelCount.fail
			: defaultPreview
			? `12`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.lCancelCount
			? Number(
					(
						currentPlayerActionCounts.lCancelCount.fail /
						(currentPlayerActionCounts.lCancelCount.fail +
							currentPlayerActionCounts.lCancelCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `22.2`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.throwCount
			? currentPlayerActionCounts.throwCount.up +
			  currentPlayerActionCounts.throwCount.forward +
			  currentPlayerActionCounts.throwCount.back +
			  currentPlayerActionCounts.throwCount.down
			: defaultPreview
			? `17`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.throwCount
			? currentPlayerActionCounts.throwCount.up
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.throwCount
			? currentPlayerActionCounts.throwCount.down
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.throwCount
			? currentPlayerActionCounts.throwCount.back
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.throwCount
			? currentPlayerActionCounts.throwCount.forward
			: defaultPreview
			? `4`
			: ''}
	</TextElement>
{/if}
