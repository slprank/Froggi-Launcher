<script lang="ts">
	import { AnimationTrigger, CustomElement } from '$lib/models/enum';
	import type { GridContentItem } from '$lib/models/types';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';
	import { currentPlayers, gameFrame, gameScore } from '$lib/utils/store.svelte';
	import PlayerPercent from '$lib/components/custom/element/PlayerPercent.svelte';

	export let dataItem: GridContentItem;
	export let edit: boolean;

	$: classValue = Object.entries(dataItem?.data.class ?? {})
		.map(([_, value]) => `${value}`)
		.join(' ');

	$: cssValue = Object.entries(dataItem?.data.css ?? {})
		.map(([key, value]) => `${toKebabCase(key)}: ${value}`)
		.join('; ');

	$: shadow = `filter: drop-shadow(${dataItem?.data.shadow?.x ?? 0}px ${
		dataItem?.data.shadow?.y ?? 0
	}px ${(dataItem?.data.shadow.spread ?? 0) - 1 ?? 0}px ${
		dataItem?.data.shadow?.color ?? '#000000'
	});`;

	function toKebabCase(str: string) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
</script>

{#if dataItem?.elementId === CustomElement.CustomString}
	<TextElement {classValue} {cssValue} {dataItem} {edit} {shadow}>
		{dataItem?.data.string}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.CustomBox}
	<div
		class={`w-full h-full ${classValue}`}
		style={`${shadow}; ${cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.CustomImage}
	<div
		class={`w-full h-full ${classValue}`}
		style={`${cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="w-full h-full"
			style={`${shadow}; object-fit: ${dataItem?.data.image.objectFit ?? 'contain'};
					${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={dataItem?.data.image.src}
			alt="custom"
		/>
	</div>
{/if}
{#if dataItem?.elementId === CustomElement.Player1Tag}
	{#key $currentPlayers?.at(0)?.displayName}
		<TextElement {classValue} {cssValue} {dataItem} {edit} {shadow}>
			{$currentPlayers?.at(0)?.displayName ? $currentPlayers?.at(0)?.displayName : `Player1`}
		</TextElement>
	{/key}
{/if}
{#if dataItem?.elementId === CustomElement.Player2Tag}
	{#key $currentPlayers?.at(1)?.displayName}
		<TextElement {classValue} {cssValue} {dataItem} {edit} {shadow}>
			{$currentPlayers?.at(1)?.displayName ? $currentPlayers?.at(1)?.displayName : `Player2`}
		</TextElement>
	{/key}
{/if}
{#if dataItem?.elementId === CustomElement.Player1Percent}
	<PlayerPercent
		{cssValue}
		{classValue}
		{dataItem}
		{edit}
		{shadow}
		numberOfDecimals={0}
		frame={$gameFrame?.players[0]?.post}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.Player2Percent}
	<PlayerPercent
		{cssValue}
		{classValue}
		{dataItem}
		{edit}
		{shadow}
		numberOfDecimals={0}
		frame={$gameFrame?.players[1]?.post}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.Player1PercentDecimal}
	<PlayerPercent
		{cssValue}
		{classValue}
		{dataItem}
		{edit}
		{shadow}
		numberOfDecimals={1}
		frame={$gameFrame?.players[0]?.post}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.Player2PercentDecimal}
	<PlayerPercent
		{cssValue}
		{classValue}
		{dataItem}
		{edit}
		{shadow}
		numberOfDecimals={1}
		frame={$gameFrame?.players[1]?.post}
	/>
{/if}
{#if dataItem?.elementId === CustomElement.Player1Score}
	<TextElement {classValue} {cssValue} {dataItem} {edit} {shadow}>
		{$gameScore?.at(0) ?? '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.Player2Score}
	<TextElement {classValue} {cssValue} {dataItem} {edit} {shadow}>
		{$gameScore?.at(1) ?? '0'}
	</TextElement>
{/if}
{#if dataItem?.elementId === CustomElement.Player1RankIcon && $currentPlayers.at(0)?.rankedNetplayProfile}
	<div
		class={`w-full h-full ${classValue}`}
		style={`${cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="w-full h-full object-contain"
			style={`${shadow}; ${
				dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''
			};`}
			src={`/image/rank-icons/${$currentPlayers
				.at(0)
				?.rankedNetplayProfile?.rank?.toUpperCase()}.svg`}
			alt="rank-icon"
		/>
	</div>
{/if}
{#if dataItem?.elementId === CustomElement.Player2RankIcon && $currentPlayers.at(1)?.rankedNetplayProfile}
	<div
		class={`w-full h-full ${classValue}`}
		style={`${cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="w-full h-full object-contain"
			style={`${shadow}; ${
				dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''
			};`}
			src={`/image/rank-icons/${$currentPlayers
				.at(1)
				?.rankedNetplayProfile?.rank?.toUpperCase()}.svg`}
			alt="rank-icon"
		/>
	</div>
{/if}
{#if dataItem?.elementId === CustomElement.Player1CharacterRender}
	<div
		class={`w-full h-full ${classValue}`}
		style={`${cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="w-full h-full"
			style={`${shadow}; object-fit: cover; ${'object-position: 100% 0;'};
					${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={`/image/character-renders/${$currentPlayers.at(0)?.characterId}.png`}
			alt="custom"
		/>
	</div>
{/if}
{#if dataItem?.elementId === CustomElement.Player2CharacterRender}
	<div
		class={`w-full h-full ${classValue}`}
		style={`${cssValue}; ${
			dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
		}; `}
	>
		<img
			class="w-full h-full"
			style={`${shadow}; object-fit: cover; ${'object-position: 100% 0;'};
					${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
			src={`/image/character-renders/${$currentPlayers.at(1)?.characterId}.png`}
			alt="custom"
		/>
	</div>
{/if}
