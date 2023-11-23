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
	$: externalCharacterId = preview
		? defaultPreviewId
		: playerPostFrame
		? CHARACTERS_INTERNAL_EXTERNAL[playerPostFrame.internalCharacterId ?? -1]
		: playerSettings
		? playerSettings.characterId
		: null;

	let characterId: number;
	const updateCharacterId = (externalCharacterId: number | null): number => {
		if (!externalCharacterId || characterId >= 0) return characterId;
		return externalCharacterId;
	};
	$: externalCharacterId, (characterId = updateCharacterId(externalCharacterId));
</script>

{#key gameSettings}
	{#if characterId}
		<div
			class={`w-full h-full flex ${style.classValue}`}
			style={`${style.cssValue}; ${
				dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
			}; `}
		>
			<img
				class="h-full w-full aspect-video"
				style={`object-fit: ${dataItem?.data.image.objectFit ?? 'contain'};
			${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
				src={`/image/characters/${characterId}/0.png`}
				alt="custom"
			/>
		</div>
	{/if}
{/key}
