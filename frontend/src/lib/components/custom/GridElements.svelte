<script lang="ts">
	import { Character, CustomElement } from '$lib/models/enum';
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import TextElement from '$lib/components/custom/element/TextElement.svelte';
	import { currentPlayer, currentPlayers, gameScore } from '$lib/utils/store.svelte';
	import PlayerPercent from '$lib/components/custom/element/PlayerPercent.svelte';
	import CharacterRender from './element/CharacterRender.svelte';
	import PlayerRankIcon from './element/PlayerRankIcon.svelte';
	import { addFont } from './CustomFontHandler.svelte';
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';
	import CharacterIcon from './element/CharacterIcon.svelte';

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

					<!-- Slippi Data -->
					{#if dataItem?.elementId === CustomElement.CurrentPlayerTag}
						{#key $currentPlayers?.at(0)?.displayName}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayer.displayName || defaultPreview
									? `Current Player`
									: ''}
							</TextElement>
						{/key}
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
					{#if dataItem?.elementId === CustomElement.CurrentPlayerConnectCode}
						{#key $currentPlayer?.connectCode}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayer.connectCode || defaultPreview ? `ABCDEF#0` : ''}
							</TextElement>
						{/key}
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1ConnectCode}
						{#key $currentPlayers?.at(0)?.connectCode}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayers?.at(0)?.connectCode || defaultPreview
									? `ABCD#123`
									: ''}
							</TextElement>
						{/key}
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2ConnectCode}
						{#key $currentPlayers?.at(1)?.connectCode}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayers?.at(1)?.connectCode || defaultPreview
									? `GHIJ#456`
									: ''}
							</TextElement>
						{/key}
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerRankIcon}
						<PlayerRankIcon
							{dataItem}
							{style}
							player={$currentPlayer}
							preview={defaultPreview}
						/>
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
					{#if dataItem?.elementId === CustomElement.CurrentPlayerRankText}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.rank ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1RankText}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.rank ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2RankText}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.rank ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerRating}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.rating ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Rating}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.rating ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Rating}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.rating ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerContinent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.continent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Continent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.continent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Continent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.continent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerContinentInitials}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.continentInitials ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1ContinentInitials}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.continentInitials ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2ContinentInitials}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.continentInitials ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerDailyGlobalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.dailyGlobalPlacement ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1DailyGlobalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.dailyGlobalPlacement ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2DailyGlobalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.dailyGlobalPlacement ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerDailyRegionalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.dailyRegionalPlacement ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1DailyRegionalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.dailyRegionalPlacement ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2DailyRegionalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.dailyRegionalPlacement ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerWins}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.wins ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Wins}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.wins ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Wins}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.wins ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerWinsPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.winsPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1WinsPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.winsPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2WinsPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.winsPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerLosses}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.losses ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Losses}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.losses ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Losses}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.losses ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerLossesPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1LossesPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2LossesPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter1}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter1Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter1Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayer}
							preview={defaultPreview}
						>
							{$currentPlayer.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter2}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter2Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter2Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayer}
							preview={defaultPreview}
						>
							{$currentPlayer?.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter3}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter3Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter3Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayer}
							preview={defaultPreview}
						>
							{$currentPlayer?.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character1}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character1Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character1Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(0)}
							preview={defaultPreview}
						>
							{$currentPlayers?.at(0)?.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character2}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character2Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character2Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(0)}
							preview={defaultPreview}
						>
							{$currentPlayers?.at(0)?.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character3}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character3Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character3Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(0)}
							preview={defaultPreview}
						>
							{$currentPlayers?.at(0)?.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character1}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character1Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character1Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(1)}
							preview={defaultPreview}
						>
							{$currentPlayers?.at(1)?.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character2}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character2Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character2Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(1)}
							preview={defaultPreview}
						>
							{$currentPlayers?.at(1)?.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character3}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(0) ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character3Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.lossesPercent ?? ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character3Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(1)}
							preview={defaultPreview}
						>
							{$currentPlayers?.at(1)?.rank?.current?.lossesPercent ?? ''}
						</CharacterIcon>
					{/if}
				{/key}
			{/key}
		{/if}
	</div>
{/await}
