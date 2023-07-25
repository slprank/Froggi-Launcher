<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';
	import { currentPlayers, gameFrame, gameScore } from '$lib/utils/store.svelte';
	import PlayerPercent from '$lib/components/custom/element/PlayerPercent.svelte';
	import CharacterRender from './element/CharacterRender.svelte';
	import PlayerRankIcon from './element/PlayerRankIcon.svelte';
	import { addFont } from './CustomFontHandler.svelte';

	export let dataItem: GridContentItem;
	export let edit: boolean = false;
	export let preview: boolean = false;

	$: defaultPreview = edit || preview;

	let style: GridContentItemStyle = {
		classValue: '',
		cssValue: '',
		shadow: '',
	};

	$: style.classValue = Object.entries(dataItem?.data.class ?? {})
		.map(([_, value]) => `${value}`)
		.join(' ');

	$: style.cssValue = Object.entries(dataItem?.data.css ?? {})
		.map(([key, value]) => `${toKebabCase(key)}: ${value}`)
		.join('; ');

	$: style.shadow = `filter: drop-shadow(${dataItem?.data.shadow?.x ?? 0}px ${
		dataItem?.data.shadow?.y ?? 0
	}px ${(dataItem?.data.shadow.spread ?? 0) - 1 ?? 0}px ${
		dataItem?.data.shadow?.color ?? '#000000'
	});`;

	function toKebabCase(str: string) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	const updateFont = async () => {
		await addFont(dataItem.data.font.base64, dataItem.id);
		await document.fonts.ready;
	};
	updateFont();

	$: console.log('current players:', $currentPlayers);
</script>

{#await updateFont() then}
	{#key dataItem}
		<div
			class="w-full h-full"
			style={`${
				dataItem.data?.font?.family !== undefined &&
				`font-family: ${dataItem.data?.font?.family}`
			}`}
		>
			{#if dataItem?.elementId === CustomElement.CustomString}
				<TextElement {style} {dataItem} {edit}>
					{dataItem?.data.string}
				</TextElement>
			{/if}
			{#if dataItem?.elementId === CustomElement.CustomBox}
				<div
					class={`w-full h-full ${style.classValue}`}
					style={`${style.shadow}; ${style.cssValue}; ${
						dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
					}; `}
				/>
			{/if}
			{#if dataItem?.elementId === CustomElement.CustomImage}
				<div
					class={`w-full h-full ${style.classValue}`}
					style={`${style.cssValue}; ${
						dataItem?.data.advancedStyling ? dataItem?.data.css.customBox : ''
					}; `}
				>
					<img
						class="w-full h-full"
						style={`${style.shadow}; object-fit: ${
							dataItem?.data.image.objectFit ?? 'contain'
						};
					${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
						src={dataItem?.data.image.src}
						alt="custom"
					/>
				</div>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player1Tag}
				{#key $currentPlayers?.at(0)?.displayName}
					<TextElement {style} {dataItem} {edit}>
						{$currentPlayers?.at(0)?.displayName
							? $currentPlayers?.at(0)?.displayName
							: `Player1`}
					</TextElement>
				{/key}
			{/if}
			{#if dataItem?.elementId === CustomElement.Player2Tag}
				{#key $currentPlayers?.at(1)?.displayName}
					<TextElement {style} {dataItem} {edit}>
						{$currentPlayers?.at(1)?.displayName
							? $currentPlayers?.at(1)?.displayName
							: `Player2`}
					</TextElement>
				{/key}
			{/if}
			{#if dataItem?.elementId === CustomElement.Player1Percent}
				<PlayerPercent
					{style}
					{dataItem}
					{edit}
					numberOfDecimals={0}
					frame={$gameFrame?.players[0]?.post}
				/>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player2Percent}
				<PlayerPercent
					{style}
					{dataItem}
					{edit}
					numberOfDecimals={0}
					frame={$gameFrame?.players[1]?.post}
				/>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player1PercentDecimal}
				<PlayerPercent
					{style}
					{dataItem}
					{edit}
					numberOfDecimals={1}
					frame={$gameFrame?.players[0]?.post}
				/>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player2PercentDecimal}
				<PlayerPercent
					{style}
					{dataItem}
					{edit}
					numberOfDecimals={1}
					frame={$gameFrame?.players[1]?.post}
				/>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player1Score}
				<TextElement {style} {dataItem} {edit}>
					{$gameScore?.at(0) ?? '0'}
				</TextElement>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player2Score}
				<TextElement {style} {dataItem} {edit}>
					{$gameScore?.at(1) ?? '0'}
				</TextElement>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player1RankIcon}
				<PlayerRankIcon
					{dataItem}
					{style}
					player={$currentPlayers.at(0)}
					preview={defaultPreview}
				/>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player2RankIcon}
				<PlayerRankIcon
					{dataItem}
					{style}
					player={$currentPlayers.at(1)}
					preview={defaultPreview}
				/>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player1CharacterRender && $currentPlayers.at(0)}
				<CharacterRender
					{dataItem}
					{style}
					player={$currentPlayers.at(0)}
					preview={defaultPreview}
				/>
			{/if}
			{#if dataItem?.elementId === CustomElement.Player2CharacterRender && $currentPlayers.at(1)}
				<CharacterRender
					{dataItem}
					{style}
					player={$currentPlayers.at(1)}
					preview={defaultPreview}
				/>
			{/if}
		</div>
	{/key}
{/await}
