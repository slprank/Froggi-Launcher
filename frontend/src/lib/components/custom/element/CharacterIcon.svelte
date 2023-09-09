<script lang="ts">
	import type { GridContentItem, GridContentItemStyle, Player } from '$lib/models/types';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let characterNumber: number;
	export let defaultPreviewId: number;

	$: characterId = getCharacterId(
		player?.rank?.current?.characters.at(characterNumber)?.characterId,
	);

	const getCharacterId = (characterId: number | undefined | null) => {
		if (preview && (characterId === undefined || characterId === null)) return defaultPreviewId;
		return characterId;
	};
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
			style={`${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={`/image/characters/${characterId}/0.png`}
			alt="custom"
		/>
	</div>
{/if}
