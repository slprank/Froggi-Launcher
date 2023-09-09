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
	import { CHARACTERS } from '$lib/models/const';

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

	$: console.log('current player', $currentPlayer);

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

	$: console.log('TODO Border, CSS', `${style.cssValue}`);

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
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.displayName
								? $currentPlayer?.rank?.current?.displayName
								: defaultPreview
								? `Current Player`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Tag}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.displayName
								? $currentPlayers?.at(0)?.rank?.current?.displayName
								: defaultPreview
								? `Player 1`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Tag}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.displayName
								? $currentPlayers?.at(1)?.rank?.current?.displayName
								: defaultPreview
								? `Player 2`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerConnectCode}
						{#key $currentPlayer?.rank?.current?.connectCode}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayer?.rank?.current?.connectCode
									? $currentPlayer?.rank?.current?.connectCode
									: defaultPreview
									? `ABCDEF#0`
									: ''}
							</TextElement>
						{/key}
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1ConnectCode}
						{#key $currentPlayers?.at(0)?.rank?.current?.connectCode}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayers?.at(0)?.rank?.current?.connectCode ||
								defaultPreview
									? `ABCD#123`
									: ''}
							</TextElement>
						{/key}
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2ConnectCode}
						{#key $currentPlayers?.at(1)?.rank?.current?.connectCode}
							<TextElement {style} {dataItem} {edit}>
								{$currentPlayers?.at(1)?.rank?.current?.connectCode ||
								defaultPreview
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
							{$currentPlayer?.rank?.current?.rank
								? $currentPlayer?.rank?.current?.rank
								: defaultPreview
								? `Gold 2`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1RankText}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.rank
								? $currentPlayers?.at(0)?.rank?.current?.rank
								: defaultPreview
								? `Silver 2`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2RankText}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.rank
								? $currentPlayers?.at(1)?.rank?.current?.rank
								: defaultPreview
								? `Silver 1`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerRating}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.rating
								? $currentPlayer?.rank?.current?.rating
								: defaultPreview
								? `1429.3`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Rating}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.rating
								? $currentPlayers?.at(0)?.rank?.current?.rating
								: defaultPreview
								? `1174.0`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Rating}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.rating
								? $currentPlayers?.at(1)?.rank?.current?.rating
								: defaultPreview
								? `1100.0`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerContinent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.continent
								? $currentPlayer?.rank?.current?.continent
								: defaultPreview
								? `North America`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Continent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.continent
								? $currentPlayers?.at(0)?.rank?.current?.continent
								: defaultPreview
								? `Europe`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Continent}
						{$currentPlayers?.at(1)?.rank?.current?.continent
							? $currentPlayers?.at(1)?.rank?.current?.continent
							: defaultPreview
							? `S. America`
							: ''}
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerContinentInitials}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.continentInitials
								? $currentPlayer?.rank?.current?.continentInitials
								: defaultPreview
								? `NA`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1ContinentInitials}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.continentInitials
								? $currentPlayers?.at(0)?.rank?.current?.continentInitials
								: defaultPreview
								? `EU`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2ContinentInitials}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.continentInitials
								? $currentPlayers?.at(1)?.rank?.current?.continentInitials
								: defaultPreview
								? `SA`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerDailyGlobalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.dailyGlobalPlacement
								? $currentPlayer?.rank?.current?.dailyGlobalPlacement
								: defaultPreview
								? `270`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1DailyGlobalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.dailyGlobalPlacement
								? $currentPlayers?.at(0)?.rank?.current?.dailyGlobalPlacement
								: defaultPreview
								? `243`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2DailyGlobalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.dailyGlobalPlacement
								? $currentPlayers?.at(1)?.rank?.current?.dailyGlobalPlacement
								: defaultPreview
								? `223`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerDailyRegionalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.dailyRegionalPlacement
								? $currentPlayer?.rank?.current?.dailyRegionalPlacement
								: defaultPreview
								? `138`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1DailyRegionalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.dailyRegionalPlacement
								? $currentPlayers?.at(0)?.rank?.current?.dailyRegionalPlacement
								: defaultPreview
								? `117`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2DailyRegionalPlacement}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.dailyRegionalPlacement
								? $currentPlayers?.at(1)?.rank?.current?.dailyRegionalPlacement
								: defaultPreview
								? `107`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerWins}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.wins
								? $currentPlayer?.rank?.current?.wins
								: defaultPreview
								? `50`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Wins}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.wins
								? $currentPlayers?.at(0)?.rank?.current?.wins
								: defaultPreview
								? `40`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Wins}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.wins
								? $currentPlayers?.at(1)?.rank?.current?.wins
								: defaultPreview
								? `30`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerWinsPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.winsPercent
								? `${$currentPlayer?.rank?.current?.winsPercent}%`
								: defaultPreview
								? `66.7%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1WinsPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.winsPercent
								? `${$currentPlayers?.at(0)?.rank?.current?.winsPercent}%`
								: defaultPreview
								? `80.0%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2WinsPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.winsPercent
								? `${$currentPlayers?.at(1)?.rank?.current?.winsPercent}%`
								: defaultPreview
								? `90%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerLosses}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.losses
								? $currentPlayer?.rank?.current?.losses
								: defaultPreview
								? `25`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Losses}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.losses
								? $currentPlayers?.at(0)?.rank?.current?.losses
								: defaultPreview
								? `10`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Losses}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.losses
								? $currentPlayers?.at(1)?.rank?.current?.losses
								: defaultPreview
								? `3`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerLossesPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.lossesPercent
								? `${$currentPlayer?.rank?.current?.lossesPercent}%`
								: defaultPreview
								? `33.3%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1LossesPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.lossesPercent
								? `${$currentPlayers?.at(0)?.rank?.current?.lossesPercent}%`
								: defaultPreview
								? `20.0%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2LossesPercent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.lossesPercent
								? `${$currentPlayers?.at(1)?.rank?.current?.lossesPercent}%`
								: defaultPreview
								? `10.0%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter1}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.characters.at(0)?.characterName
								? $currentPlayer?.rank?.current?.characters.at(0)?.characterName
								: defaultPreview
								? `Fox`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter1Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.characters.at(0)?.gameCountPercent
								? `${
										$currentPlayer?.rank?.current?.characters.at(0)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `74.3%`
								: ''}%
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter1Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayer}
							preview={defaultPreview}
							characterNumber={0}
							defaultPreviewId={Number(CHARACTERS['fox'])}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter2}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.characters.at(1)?.characterName
								? $currentPlayer?.rank?.current?.characters.at(1)?.characterName
								: defaultPreview
								? `Ganondorf`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter2Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.characters.at(1)?.gameCountPercent
								? `${
										$currentPlayer?.rank?.current?.characters.at(1)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `18.3%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter2Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayer}
							preview={defaultPreview}
							characterNumber={1}
							defaultPreviewId={Number(CHARACTERS['ganondorf'])}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter3}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.characters.at(2)?.characterName
								? $currentPlayer?.rank?.current?.characters.at(2)?.characterName
								: defaultPreview
								? `Falco`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter3Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayer?.rank?.current?.characters.at(2)?.gameCountPercent
								? `${
										$currentPlayer?.rank?.current?.characters.at(2)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `7.4%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.CurrentPlayerCharacter3Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayer}
							preview={defaultPreview}
							characterNumber={2}
							defaultPreviewId={Number(CHARACTERS['falco'])}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character1}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(0)?.characterName
								? $currentPlayers?.at(0)?.rank?.current?.characters.at(0)
										?.characterName
								: defaultPreview
								? `Peach`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character1Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(0)
								?.gameCountPercent
								? `${
										$currentPlayers?.at(0)?.rank?.current?.characters.at(0)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `75.0%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character1Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(0)}
							preview={defaultPreview}
							characterNumber={0}
							defaultPreviewId={Number(CHARACTERS['peach'])}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character2}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(1)?.characterName
								? $currentPlayers?.at(0)?.rank?.current?.characters.at(1)
										?.characterName
								: defaultPreview
								? `Sheik`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character2Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(1)
								?.gameCountPercent
								? `${
										$currentPlayers?.at(0)?.rank?.current?.characters.at(1)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `20.4%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character2Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(0)}
							preview={defaultPreview}
							characterNumber={1}
							defaultPreviewId={Number(CHARACTERS['sheik'])}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character3}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(2)?.characterName
								? $currentPlayers?.at(0)?.rank?.current?.characters.at(2)
										?.characterName
								: defaultPreview
								? `Marth`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character3Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(0)?.rank?.current?.characters.at(2)
								?.gameCountPercent
								? `${
										$currentPlayers?.at(0)?.rank?.current?.characters.at(2)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `4.6%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character3Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(0)}
							preview={defaultPreview}
							characterNumber={2}
							defaultPreviewId={Number(CHARACTERS['marth'])}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character1}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(0)?.characterName
								? $currentPlayers?.at(1)?.rank?.current?.characters.at(0)
										?.characterName
								: defaultPreview
								? `Marth`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character1Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(0)
								?.gameCountPercent
								? `${
										$currentPlayers?.at(1)?.rank?.current?.characters.at(0)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `82.0%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character1Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(1)}
							preview={defaultPreview}
							characterNumber={1}
							defaultPreviewId={Number(CHARACTERS['marth'])}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character2}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(1)?.characterName
								? $currentPlayers?.at(1)?.rank?.current?.characters.at(1)
										?.characterName
								: defaultPreview
								? `Samus`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character2Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(1)
								?.gameCountPercent
								? `${
										$currentPlayers?.at(1)?.rank?.current?.characters.at(1)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `13.8%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character2Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(1)}
							preview={defaultPreview}
							characterNumber={1}
							defaultPreviewId={Number(CHARACTERS['samus'])}
						/>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character3}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(2)?.characterName
								? $currentPlayers?.at(1)?.rank?.current?.characters.at(2)
										?.characterName
								: defaultPreview
								? `Bowser`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player2Character3Percent}
						<TextElement {style} {dataItem} {edit}>
							{$currentPlayers?.at(1)?.rank?.current?.characters.at(2)
								?.gameCountPercent
								? `${
										$currentPlayers?.at(1)?.rank?.current?.characters.at(2)
											?.gameCountPercent
								  }%`
								: defaultPreview
								? `4.2%`
								: ''}
						</TextElement>
					{/if}
					{#if dataItem?.elementId === CustomElement.Player1Character3Icon}
						<CharacterIcon
							{dataItem}
							{style}
							player={$currentPlayers?.at(1)}
							preview={defaultPreview}
							characterNumber={2}
							defaultPreviewId={Number(CHARACTERS['bowser'])}
						/>
					{/if}
				{/key}
			{/key}
		{/if}
	</div>
{/await}
