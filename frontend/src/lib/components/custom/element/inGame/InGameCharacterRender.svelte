<script lang="ts">
	import { SCENE_TRANSITION_DELAY } from '$lib/models/const';
	import { CHARACTERS_INTERNAL_EXTERNAL } from '$lib/models/constants/characterData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import type { Player } from '$lib/models/types/slippiData';
	import { gameFrame, gameSettings } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';

	export let dataItem: GridContentItem;
	export let player: Player | undefined;
	export let preview: boolean = false;
	export let style: GridContentItemStyle;
	export let defaultPreviewId: number;

	$: console.log('preview', preview);

	$: playerPostFrame = $gameFrame?.players?.[player?.playerIndex ?? 0]?.post;
	$: playerSettings = $gameSettings.players?.[player?.playerIndex ?? 0];
	$: externalCharacterId = preview
		? defaultPreviewId
		: playerPostFrame
		? CHARACTERS_INTERNAL_EXTERNAL[playerPostFrame.internalCharacterId ?? -1]
		: playerSettings
		? playerSettings.characterId
		: null;

	let characterId: number | null;
	const updateCharacterId = (externalCharacterId: number | null): number | null => {
		if (!externalCharacterId || !characterId || characterId >= 0) return characterId;
		return externalCharacterId;
	};
	$: externalCharacterId, (characterId = updateCharacterId(externalCharacterId));
	$: $gameSettings, (characterId = null);

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
