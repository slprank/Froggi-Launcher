<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { currentPlayer, currentPlayers, postGame } from '$lib/utils/store.svelte';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: player2Index = $currentPlayers.at(1)?.playerIndex;

	$: player2ActionCounts = $postGame.postGameStats?.actionCounts[player2Index ?? 0];
</script>

{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountAirDodge}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.airDodgeCount && player2Index !== undefined
			? player2ActionCounts.airDodgeCount
			: defaultPreview
			? `53`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountDashDance}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.dashDanceCount && player2Index !== undefined
			? player2ActionCounts.dashDanceCount
			: defaultPreview
			? `137`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLedgeGrab}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.dashDanceCount && player2Index !== undefined
			? player2ActionCounts.dashDanceCount
			: defaultPreview
			? `19`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountRoll}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.rollCount && player2Index !== undefined
			? player2ActionCounts.rollCount
			: defaultPreview
			? `13`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountSpotDodge}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.spotDodgeCount && player2Index !== undefined
			? player2ActionCounts.spotDodgeCount
			: defaultPreview
			? `18`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountWaveDash}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.wavedashCount && player2Index !== undefined
			? player2ActionCounts.wavedashCount
			: defaultPreview
			? `63`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountWaveLand}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.wavelandCount && player2Index !== undefined
			? player2ActionCounts.wavelandCount
			: defaultPreview
			? `37`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabTotal}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.grabCount && player2Index !== undefined
			? player2ActionCounts.grabCount.success + player2ActionCounts.grabCount.fail
			: defaultPreview
			? `14`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabSuccess}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.grabCount.success && player2Index !== undefined
			? player2ActionCounts.grabCount.success
			: defaultPreview
			? `9`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabSuccessPercent}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.grabCount && player2Index !== undefined
			? Number(
					(
						player2ActionCounts.grabCount.success /
						(player2ActionCounts.grabCount.success + player2ActionCounts.grabCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `64.2`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabFail}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.grabCount.fail && player2Index !== undefined
			? player2ActionCounts.grabCount.fail
			: defaultPreview
			? `5`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGrabFailPercent}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.grabCount && player2Index !== undefined
			? Number(
					(
						player2ActionCounts.grabCount.fail /
						(player2ActionCounts.grabCount.success + player2ActionCounts.grabCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `37.8`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechTotal}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.groundTechCount && player2Index !== undefined
			? player2ActionCounts.groundTechCount.neutral +
			  player2ActionCounts.groundTechCount.in +
			  player2ActionCounts.groundTechCount.away +
			  player2ActionCounts.groundTechCount.fail
			: defaultPreview
			? `23`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechSuccess}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.groundTechCount && player2Index !== undefined
			? player2ActionCounts.groundTechCount.neutral +
			  player2ActionCounts.groundTechCount.in +
			  player2ActionCounts.groundTechCount.away
			: defaultPreview
			? `22`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechSuccessPercent}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.groundTechCount && player2Index !== undefined
			? Number(
					(
						(player2ActionCounts.groundTechCount.neutral +
							player2ActionCounts.groundTechCount.in +
							player2ActionCounts.groundTechCount.away) /
						(player2ActionCounts.groundTechCount.fail +
							player2ActionCounts.groundTechCount.neutral +
							player2ActionCounts.groundTechCount.in +
							player2ActionCounts.groundTechCount.away)
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `95.6`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechIn}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.groundTechCount && player2Index !== undefined
			? player2ActionCounts.groundTechCount.in
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechAway}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.groundTechCount && player2Index !== undefined
			? player2ActionCounts.groundTechCount.away
			: defaultPreview
			? `11`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechNeutral}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.groundTechCount && player2Index !== undefined
			? player2ActionCounts.groundTechCount.neutral
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechFail}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.groundTechCount && player2Index !== undefined
			? player2ActionCounts.groundTechCount.fail
			: defaultPreview
			? `1`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountGroundTechFailPercent}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.groundTechCount && player2Index !== undefined
			? Number(
					(
						player2ActionCounts.groundTechCount.fail /
						(player2ActionCounts.groundTechCount.fail +
							player2ActionCounts.groundTechCount.neutral +
							player2ActionCounts.groundTechCount.in +
							player2ActionCounts.groundTechCount.away)
					).toFixed(),
			  ) * 100
			: defaultPreview
			? `4.4`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelTotal}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.lCancelCount && player2Index !== undefined
			? player2ActionCounts.lCancelCount.success + player2ActionCounts.lCancelCount.fail
			: defaultPreview
			? `54`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelSuccess}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.lCancelCount && player2Index !== undefined
			? player2ActionCounts.lCancelCount.success
			: defaultPreview
			? `42`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelSuccessPercent}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.lCancelCount && player2Index !== undefined
			? Number(
					(
						player2ActionCounts.lCancelCount.success /
						(player2ActionCounts.lCancelCount.success +
							player2ActionCounts.lCancelCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `77.8`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelFail}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.lCancelCount && player2Index !== undefined
			? player2ActionCounts.lCancelCount.fail
			: defaultPreview
			? `12`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountLCancelFailPercent}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.lCancelCount && player2Index !== undefined
			? Number(
					(
						player2ActionCounts.lCancelCount.fail /
						(player2ActionCounts.lCancelCount.fail +
							player2ActionCounts.lCancelCount.fail)
					).toFixed(1),
			  ) * 100
			: defaultPreview
			? `22.2`
			: ''}%
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowTotal}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.throwCount && player2Index !== undefined
			? player2ActionCounts.throwCount.up +
			  player2ActionCounts.throwCount.forward +
			  player2ActionCounts.throwCount.back +
			  player2ActionCounts.throwCount.down
			: defaultPreview
			? `17`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowUp}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.throwCount && player2Index !== undefined
			? player2ActionCounts.throwCount.up
			: defaultPreview
			? `8`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowDown}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.throwCount && player2Index !== undefined
			? player2ActionCounts.throwCount.down
			: defaultPreview
			? `2`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowBack}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.throwCount && player2Index !== undefined
			? player2ActionCounts.throwCount.back
			: defaultPreview
			? `3`
			: ''}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.PostGamePlayer2ActionCountThrowForward}
	<TextElement {style} {dataItem}>
		{player2ActionCounts?.throwCount && player2Index !== undefined
			? player2ActionCounts.throwCount.forward
			: defaultPreview
			? `4`
			: ''}
	</TextElement>
{/if}
