<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Character } from '$lib/models/enum';
	import { isNil } from 'lodash';

	export let dataItem: GridContentItem;
	export let characterId: Character | undefined | null;
	export let defaultPreview: boolean = false;
	export let defaultPreviewId: Character;
	export let style: GridContentItemStyle;

	$: character = defaultPreview ? defaultPreviewId : characterId ? characterId : -1;
	// TODO: Include colors
</script>

{#if !isNil(character)}
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
			src={`/image/characters/${character}/0/stock.png`}
			alt="custom"
		/>
	</div>
{/if}
