<script lang="ts">
	import { CHARACTERS_INTERNAL_EXTERNAL } from '$lib/models/constants/characterData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Player } from '$lib/models/types/slippiData';
	import { gameFrame, gameSettings } from '$lib/utils/store.svelte';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let defaultPreviewId: number;

	$: playerPostFrame = $gameFrame?.players?.[player?.playerIndex ?? 0]?.post;
	$: playerSettings = $gameSettings.players?.[player?.playerIndex ?? 0];
	$: characterId = playerPostFrame
		? CHARACTERS_INTERNAL_EXTERNAL[playerPostFrame.internalCharacterId ?? -1]
		: playerSettings
		? playerSettings.characterId
		: preview
		? defaultPreviewId
		: -1;

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
		{#if div}
			<img
				class="h-full aspect-video"
				style={`object-fit: cover; ${'object-position: 100% 0;'};  height: ${
					div?.clientHeight
				}px;
		${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
				src={`/image/character-renders/${characterId}.png`}
				alt="custom"
			/>
		{/if}
	</div>
{/if}
