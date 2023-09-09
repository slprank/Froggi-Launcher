<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import type { Player } from '$lib/models/types/slippiData';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;

	$: characterId = getCharacterId(player?.characterId);

	const getCharacterId = (characterId: number | undefined | null) => {
		if (preview && (characterId === undefined || characterId === null))
			return Math.floor(Math.random() * 25);
		return characterId;
	};

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
			style={`object-fit: cover; ${'object-position: 100% 0;'};  height: ${
				div?.clientHeight
			}px;
		${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={`/image/character-renders/${characterId}.png`}
			alt="custom"
		/>
	</div>
{/if}
