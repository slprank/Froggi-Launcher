<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Player } from '$lib/models/types/slippiData';
	import type { Stage } from '@slippi/slippi-js';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean = false;
	export let style: GridContentItemStyle;
	export let stageId: Stage | undefined | null;
	export let fallbackStageId: Stage | undefined | null = null;

	let stage = stageId ? stageId : defaultPreview ? fallbackStageId : null;
</script>

{#if stage}
	<div
		class={`w-full h-full ${style.classValue} overflow-hidden`}
		style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="w-full h-full object-cover"
			style={`${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={`/image/stages/${stage}.png`}
			alt="stage"
		/>
	</div>
{/if}
