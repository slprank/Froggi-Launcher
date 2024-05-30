<script lang="ts">
	import { CHARACTERS_INTERNAL_EXTERNAL } from '$lib/models/constants/characterData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Player } from '$lib/models/types/slippiData';
	import { gameFrame, gameSettings, statsScene } from '$lib/utils/store.svelte';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let defaultPreviewId: number;

	const playerSettings = $gameSettings.players?.[player?.playerIndex ?? 0];
	const postFrame = $gameFrame?.players?.[player?.playerIndex ?? 0]?.post;

	let characterId: number | null;
	const updateCharacterId = (): number | null => {
		return preview
			? defaultPreviewId
			: postFrame
			? CHARACTERS_INTERNAL_EXTERNAL[postFrame.internalCharacterId ?? -1]
			: playerSettings
			? playerSettings.characterId
			: null;
	};
	$: $statsScene, $gameSettings, (characterId = updateCharacterId());
</script>

{#key $gameSettings}
	{#if !isNil(characterId)}
		<div
			class={`w-full h-full flex ${style.classValue}`}
			style={`${style.cssValue}; ${
				dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
			}; `}
		>
			<img
				class="h-full w-full aspect-video"
				style={`object-fit: ${dataItem?.data.image.objectFit ?? 'contain'};
			${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
				src={`/image/characters/${characterId}/0/stock.png`}
				alt="custom"
			/>
		</div>
	{/if}
{/key}
