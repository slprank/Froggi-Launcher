<script lang="ts">
	import { colorOverlay } from '$lib/utils/colorOverlay';
	import { CustomElement } from '$lib/models/constants/customElement';
	import { CHARACTERS, CHARACTERS_INTERNAL_EXTERNAL } from '$lib/models/constants/characterData';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { resolvePackImage } from '$lib/models/types/assetPack';
	import { assetPacks, currentPlayer, currentPlayers, gameFrame, gameSettings, isElectron, urls } from '$lib/utils/store.svelte';
	import { isLighterTeammate, playersForSlot } from '$lib/utils/teams';
	import { isNil } from 'lodash';

	// "Player 1 / Player 2 / Current Player Character": the player's character + skin from an asset
	// pack (data.assetPack; default = built-in stock icons). Pack lookup: skin → skin 0 → built-in.
	export let dataItem: GridContentItem;
	export let defaultPreview: boolean;
	export let style: GridContentItemStyle;

	$: players = playersForSlot($currentPlayers, dataItem.data.playerSlot);
	$: player =
		dataItem.elementId === CustomElement.InGamePlayer1Character
			? players.at(0)
			: dataItem.elementId === CustomElement.InGamePlayer2Character
				? players.at(1)
				: $currentPlayer;
	// Two teammates on the same character: the higher port is drawn lighter (not when recoloured).
	$: lighter = !defaultPreview && !dataItem.data.colorOverlay?.enabled && isLighterTeammate($gameSettings?.players ?? [], player);

	// Live frame first (follows Sheik/Zelda transforms), else the character from game start.
	$: postFrame = $gameFrame?.players?.[player?.playerIndex ?? 0]?.post;
	$: liveCharacterId = isNil(postFrame?.internalCharacterId) ? undefined : CHARACTERS_INTERNAL_EXTERNAL[postFrame.internalCharacterId];
	$: characterId = defaultPreview ? Number(CHARACTERS['fox']) : liveCharacterId ?? player?.characterId;
	$: skinId = defaultPreview ? 0 : player?.characterColor ?? 0;

	$: resourceBase = ($isElectron ? $urls?.localResource : $urls?.externalResource) ?? '';
	$: src = isNil(characterId) ? undefined : resolvePackImage($assetPacks, dataItem.data.assetPack, characterId, skinId, resourceBase);
</script>

{#if src}
	<div
		class={`w-full h-full flex ${style.classValue}`}
		style={`${style.cssValue}; ${dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''}; `}
	>
		<img
			use:colorOverlay={dataItem?.data.colorOverlay}
			class="h-full w-full"
			style={`object-fit: ${dataItem?.data.image.objectFit ?? 'contain'}; ${lighter ? 'filter: brightness(1.35) saturate(0.85);' : ''}
			${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			{src}
			alt="character"
		/>
	</div>
{/if}
