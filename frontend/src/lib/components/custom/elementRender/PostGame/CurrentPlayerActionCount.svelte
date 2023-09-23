<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: currentPlayerIndex = $currentPlayer?.playerIndex;
	$: currentPlayerActionCounts = $postGame.postGameStats?.actionCounts[currentPlayerIndex ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.airDodgeCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.airDodgeCount
			: defaultPreview
			? `53`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountDashDance}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.dashDanceCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.dashDanceCount
			: defaultPreview
			? `137`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.dashDanceCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.dashDanceCount
			: defaultPreview
			? `19`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountRoll}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.rollCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.rollCount
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.spotDodgeCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.spotDodgeCount
			: defaultPreview
			? `18`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.wavedashCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.wavedashCount
			: defaultPreview
			? `63`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.wavelandCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.wavelandCount
			: defaultPreview
			? `37`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.grabCount.success + currentPlayerActionCounts.grabCount.fail
			: defaultPreview
			? `14`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount.success && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.grabCount.success
			: defaultPreview
			? `9`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.grabCount.fail && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.grabCount.fail
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.grabCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.groundTechCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.groundTechCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.groundTechCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.groundTechCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.groundTechCount.in
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.groundTechCount.away
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.groundTechCount.neutral
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.groundTechCount.fail
			: defaultPreview
			? `1`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.groundTechCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.lCancelCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.lCancelCount.success +
			  currentPlayerActionCounts.lCancelCount.fail
			: defaultPreview
			? `54`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.lCancelCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.lCancelCount.success
			: defaultPreview
			? `42`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.lCancelCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.lCancelCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.lCancelCount.fail
			: defaultPreview
			? `12`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.lCancelCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.throwCount && currentPlayerIndex !== undefined
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
		{currentPlayerActionCounts?.throwCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.throwCount.up
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.throwCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.throwCount.down
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.throwCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.throwCount.back
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGameCurrentPlayerActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{currentPlayerActionCounts?.throwCount && currentPlayerIndex !== undefined
			? currentPlayerActionCounts.throwCount.forward
			: defaultPreview
			? `4`
			: ''}
	</TextElement>
{/if}
