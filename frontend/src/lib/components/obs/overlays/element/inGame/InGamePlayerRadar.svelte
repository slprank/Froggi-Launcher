<script lang="ts">
	import { Stage } from '$lib/models/constants/stageData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import PlayerSpot from './PlayerSpot.svelte';
	import StageRender from './StageRender.svelte';

	export let dataItem: GridContentItem;
	export let defaultPreview: boolean = false;
	export let style: GridContentItemStyle;
	export let stageId: Stage | undefined | null;
	export let fallbackStageId: Stage | undefined | null = null;

	let stage = defaultPreview ? fallbackStageId : stageId ? stageId : null;
</script>

{#if stage}
	<svg
		class={`w-full h-full flex ${style.classValue} overflow-hidden`}
		style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
		viewBox="-365 -300 730 550"
	>
		<g
			class="-scale-y-100"
			style={`${style.cssValue}; ${
				dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
			}; `}
		>
			<StageRender stageId={stage} />
			{#if !defaultPreview}
				<PlayerSpot />
			{/if}
		</g>
	</svg>
{/if}
