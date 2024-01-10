<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Character } from '$lib/models/enum';

	export let dataItem: GridContentItem;
	export let characterId: Character | undefined | null;
	export let characterColorId: number | undefined | null = 0;
	export let defaultPreview: boolean = false;
	export let defaultPreviewId: Character;
	export let style: GridContentItemStyle;
	export let direction: 'left' | 'right';

	$: character = defaultPreview ? defaultPreviewId : characterId ? characterId : -1;

	let div: HTMLElement;
</script>

<div
	class={`w-full h-full ${style.classValue} flex`}
	style={`${style.cssValue}; ${
		dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
	}; justify-content: ${direction === 'left' ? 'flex-end' : 'flex-start'}`}
	bind:this={div}
>
	{#if div}
		<img
			class="h-full"
			style={`object-fit: cover; ${'object-position: 100% 0;'};  height: ${
				div?.clientHeight
			}px; justify-content: center;
		${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={`/image/characters/${character}/${characterColorId ?? 0}/vs-${direction}.png`}
			alt="custom"
		/>
	{/if}
</div>
