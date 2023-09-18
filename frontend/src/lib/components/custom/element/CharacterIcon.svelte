<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import type { Player } from '$lib/models/types/slippiData';
	import { currentPlayers, gameFrame } from '$lib/utils/store.svelte';

	export let dataItem: GridContentItem;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let player: Player | undefined;
	export let defaultPreviewId: number;

	$gameFrame.players[$currentPlayers.at(0)?.playerIndex ?? 0]?.post.internalCharacterId ?? 0;

	$: getCharacterId = () => {
		if (preview && (!$gameFrame || !player)) return defaultPreviewId;
		return $gameFrame.players[player?.playerIndex ?? 0]?.post.internalCharacterId ?? 0;
	};
</script>

<div
	class={`w-full h-full ${style.classValue}`}
	style={`${style.cssValue}; ${
		dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
	}; `}
>
	<img
		class="h-full aspect-video contain"
		style={`object-fit: ${dataItem?.data.image.objectFit ?? 'contain'}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''
		};`}
		src={`/image/characters/${getCharacterId()}/0.png`}
		alt="custom"
	/>
</div>
