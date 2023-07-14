<script lang="ts">
	import type { GridContentItem, GridContentItemStyle, Player } from '$lib/models/types';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;

	$: playerRankIcon = player?.rankedNetplayProfile?.rank?.toUpperCase();
	$: rankIcon = preview ? playerRankIcon || 'GOLD 2' : playerRankIcon;

	$: console.log('hmm', playerRankIcon, rankIcon);
</script>

{#if player?.rankedNetplayProfile || preview}
	<div
		class={`w-full h-full ${style.classValue}`}
		style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="w-full h-full object-contain"
			style={`${style.shadow}; ${
				dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''
			};`}
			src={`/image/rank-icons/${rankIcon}.svg`}
			alt="rank-icon"
		/>
	</div>
{/if}
