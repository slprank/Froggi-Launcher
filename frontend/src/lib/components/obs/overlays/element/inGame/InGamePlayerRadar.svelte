<script lang="ts">
	import { Stage } from '$lib/models/constants/stageData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import StageOutline from '../StageOutline.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean = false;
	export let style: GridContentItemStyle;
	export let stageId: Stage | undefined | null;
	export let fallbackStageId: Stage | undefined | null = null;

	let stage = defaultPreview ? fallbackStageId : stageId ? stageId : null;

	console.log(style.cssValue)
</script>

{#if stage}
	<svg class={`w-full h-full flex ${style.classValue} overflow-hidden`} style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `} viewBox="-365 -300 730 500" >
          <g class="-scale-y-100 " style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}>
			  <StageOutline stageId={stage}/>	
          </g>
        </svg>
{/if}
