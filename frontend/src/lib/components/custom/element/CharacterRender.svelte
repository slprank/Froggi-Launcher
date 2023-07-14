<script lang="ts">
	import type { GridContentItem, GridContentItemStyle, Player } from '$lib/models/types';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;

	$: playerCharacterId = player?.characterId;
	$: characterId = preview
		? playerCharacterId || Math.floor(Math.random() * 26) + 1
		: player?.characterId;

	let div: HTMLElement;
</script>

{#if player}
	<div
		class={`w-full h-full ${style.classValue} grid justify-end`}
		style={`${style.cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
		bind:this={div}
	>
		<img
			class="h-full aspect-video"
			style={`${style.shadow}; object-fit: cover; ${'object-position: 100% 0;'};  height: ${
				div?.clientHeight
			}px;
		${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={`/image/character-renders/${characterId}.png`}
			alt="custom"
		/>
	</div>
{/if}
