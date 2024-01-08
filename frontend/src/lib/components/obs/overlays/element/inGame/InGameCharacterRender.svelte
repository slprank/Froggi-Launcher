<script lang="ts">
	import { CHARACTERS_INTERNAL_EXTERNAL } from '$lib/models/constants/characterData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Player } from '$lib/models/types/slippiData';
	import { gameFrame, gameSettings, statsScene } from '$lib/utils/store.svelte';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let defaultPreviewId: number;
	export let direction: 'left' | 'right';

	const playerSettings = $gameSettings.players?.[player?.playerIndex ?? 0];
	const postFrame = $gameFrame?.players?.[player?.playerIndex ?? 0]?.post;

	let characterId: number | null;
	const updateCharacterId = (): number | null => {
		return preview
			? defaultPreviewId
			: postFrame
			? CHARACTERS_INTERNAL_EXTERNAL[postFrame.internalCharacterId ?? -1]
			: playerSettings
			? playerSettings.characterId
			: null;
	};
	$: $statsScene, $gameSettings, (characterId = updateCharacterId());

	let div: HTMLElement;
</script>

{#if characterId}
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
				}px;
		${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
				src={`/image/characters/${characterId}/${
					playerSettings?.characterColor ?? 0
				}/vs-${direction}.png`}
				alt="custom"
			/>
		{/if}
	</div>
{/if}
