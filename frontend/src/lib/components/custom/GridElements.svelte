<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';
	import { currentPlayers, gameFrame, gameScore } from '$lib/utils/store.svelte';
	import PlayerPercent from '$lib/components/custom/element/PlayerPercent.svelte';
	import CharacterRender from './element/CharacterRender.svelte';
	import PlayerRankIcon from './element/PlayerRankIcon.svelte';
	import { addFont } from './CustomFontHandler.svelte';
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';

	export let dataItem: GridContentItem;
	export let edit: boolean = false;
	export let preview: boolean = false;
	export let boardHeight: number | undefined = undefined;
	export let boardWidth: number | undefined = undefined;

	let div: HTMLElement;
	$: boardWidth = div?.clientWidth ?? 0;
	$: boardHeight = div?.clientHeight ?? 0;
	let innerWidth = 0;
	let innerHeight = 0;

	$: defaultPreview = edit || preview;

	$: style = {
		classValue: '',
		cssValue: '',
		shadow: '',
		stroke: '',
	} as GridContentItemStyle;

	$: innerWidth,
		(style.classValue = Object.entries(dataItem?.data.class ?? {})
			.map(([_, value]) => `${value}`)
			.join(' '));

	$: innerWidth,
		(style.cssValue = Object.entries(dataItem?.data.css ?? {})
			.map(relativeBoarderSize)
			.map(([key, value]) => `${toKebabCase(key)}: ${value}`)
			.join('; '));

	const relativeBoarderSize = ([key, value]: [string, string]) => {
		if (!['borderLeft', 'borderRight', 'borderTop', 'borderBottom'].includes(key))
			return [key, value];
		return [
			key,
			`${getRelativePixelSize(
				Number(value.slice(0, -9)),
				boardHeight ?? innerHeight,
				boardWidth ?? innerWidth,
			)}${value.slice(-9)}`,
		];
	};

	$: console.log('CSS', `${style.cssValue}`);

	$: shadowSizeX = getRelativePixelSize(
		dataItem?.data.shadow?.x,
		boardHeight ?? innerHeight,
		boardWidth ?? innerWidth,
	);
	$: shadowSizeY = getRelativePixelSize(
		dataItem?.data.shadow?.y,
		boardHeight ?? innerHeight,
		boardWidth ?? innerWidth,
	);
	$: style.shadow = `filter: drop-shadow(${shadowSizeX}px ${shadowSizeY}px ${
		(dataItem?.data.shadow.spread ?? 0) - 1 ?? 0
	}px ${dataItem?.data.shadow?.color ?? '#000000'});`;

	$: strokeSize = getRelativePixelSize(
		dataItem.data.stroke.size,
		boardHeight ?? innerHeight,
		boardWidth ?? innerWidth,
	);
	$: style.stroke = `-webkit-text-stroke-width: ${strokeSize}rem;
						-webkit-text-stroke-color: ${dataItem.data.stroke.color};`;

	function toKebabCase(str: string) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	let fontTrigger = 0;
	const updateFont = async () => {
		await addFont(dataItem.data.font.base64, dataItem.id);
		await document.fonts.ready;
		setTimeout(() => (fontTrigger = Math.random()), 50);
	};
	$: dataItem.data.font.base64, updateFont();
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#await updateFont() then}
	<div
		class="w-full h-full"
		style={`${
			dataItem.data?.font?.family !== undefined &&
			`font-family: ${dataItem.data?.font?.family};
	`
		}; ${style.stroke};
		${style.shadow};`}
		bind:this={div}
	>
		{#if div}
			{#key dataItem}
				{#key fontTrigger}
					{#if dataItem?.elementId === CustomElement.CustomString}
						<TextElement {style} {dataItem} {edit}>
							{dataItem?.data.string}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CustomBox}
						<div
							class={`w-full h-full ${style.classValue}`}
							style={`${style.cssValue}; ${
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
								style={`object-fit: ${dataItem?.data.image.objectFit ?? 'contain'};
					${dataItem?.data.advancedStyling ? dataItem?.data.css.customImage : ''};`}
								src={dataItem?.data.image.src}
								alt="custom"
							/>
						</div>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Tag}
						{#key $currentPlayers?.at(0)?.displayName}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayers?.at(0)?.displayName || defaultPreview
									? `Player1`
									: ''}
							</TextElement>
						{/key}
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Tag}
						{#key $currentPlayers?.at(1)?.displayName}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayers?.at(1)?.displayName || defaultPreview
									? `Player2`
									: ''}
							</TextElement>
						{/key}
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Percent}
						<PlayerPercent
							{style}
							{dataItem}
							{edit}
							{preview}
							numberOfDecimals={0}
							playerIndex={0}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Percent}
						<PlayerPercent
							{style}
							{dataItem}
							{edit}
							{preview}
							numberOfDecimals={0}
							playerIndex={1}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1PercentDecimal}
						<PlayerPercent
							{style}
							{dataItem}
							{edit}
							{preview}
							numberOfDecimals={1}
							playerIndex={0}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2PercentDecimal}
						<PlayerPercent
							{style}
							{dataItem}
							{edit}
							{preview}
							numberOfDecimals={1}
							playerIndex={1}
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
				{/key}
			{/key}
		{/if}
	</div>
{/await}
