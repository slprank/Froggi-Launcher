<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import type { Player } from '$lib/models/types/slippiData';
	import { gameFrame } from '$lib/utils/store.svelte';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let defaultPreviewId: number;

	$: playerPostFrame = $gameFrame.players[player?.playerIndex ?? 0]?.post;
	$: characterId = playerPostFrame
		? playerPostFrame.internalCharacterId
		: preview
		? defaultPreviewId
		: -1;
</script>

{#if player}
	<div
		class={`w-full h-full ${style.classValue}`}
		style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="h-full aspect-video"
			style={`object-fit: ${dataItem?.data.image.objectFit ?? 'contain'};
			${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={`/image/characters/${characterId}/0.png`}
			alt="custom"
		/>
	</div>
{/if}
