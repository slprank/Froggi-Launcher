<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import type { Player } from '$lib/models/types/slippiData';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let characterNumber: number;
	export let defaultPreviewId: number;

	const getCharacterId = () => {
		if (preview) return defaultPreviewId;
		return player?.rank?.current?.characters.at(characterNumber)?.characterId;
	};

	let characterId: number | undefined = getCharacterId();
</script>

{#if characterId}
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
			src={`/image/characters/${characterId}/0.png`}
			alt="custom"
		/>
	</div>
{/if}
