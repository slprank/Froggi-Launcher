<script lang="ts">
	import { CHARACTERS_INTERNAL_EXTERNAL } from '$lib/models/constants/characterData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Player } from '$lib/models/types/slippiData';
	import { gameFrame, gameSettings } from '$lib/utils/store.svelte';
	import type { FrameEntryType } from '@slippi/slippi-js';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let defaultPreviewId: number;

	$: playerSettings = $gameSettings.players?.[player?.playerIndex ?? 0];

	let characterId: number | null;
	$: $gameSettings, (characterId = null);
	const updateCharacterId = (gameFrame: FrameEntryType | null | undefined): number | null => {
		const postFrame = gameFrame?.players?.[player?.playerIndex ?? 0]?.post;
		return preview
		? defaultPreviewId
		: postFrame
		? CHARACTERS_INTERNAL_EXTERNAL[postFrame.internalCharacterId ?? -1]
		: playerSettings
		? playerSettings.characterId
		: null;
	};
	$: characterId = updateCharacterId($gameFrame);

	let div: HTMLElement;
</script>

{#if characterId}
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
