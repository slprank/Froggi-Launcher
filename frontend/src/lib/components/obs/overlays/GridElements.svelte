<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types/overlay';
	import { addFont } from './CustomFontHandler.svelte';
	import { getRelativePixelSize } from '$lib/utils/helper';
	import SlippiRank from './elementRender/SlippiRank.svelte';
	import Custom from './elementRender/Custom.svelte';
	import InGame from './elementRender/InGame.svelte';
	import RecentGame from './elementRender/RecentGame.svelte';
	import RecentMatch from './elementRender/RecentMatch.svelte';
	import Session from './elementRender/Session.svelte';
	import RecentMatchSummary from './elementRender/RecentMatchSummary.svelte';
	import Match from './elementRender/Match.svelte';

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

	$: style = {} as GridContentItemStyle;

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
				innerHeight,
				innerWidth,
			)}${value.slice(-9)}`,
		];
	};

	$: shadowSizeX = getRelativePixelSize(dataItem?.data.shadow?.x, innerHeight, innerWidth);
	$: shadowSizeY = getRelativePixelSize(dataItem?.data.shadow?.y, innerHeight, innerWidth);
	$: style.shadow = `filter: drop-shadow(${shadowSizeX}px ${shadowSizeY}px ${
		(dataItem?.data.shadow.spread ?? 0) - 1 ?? 0
	}px ${dataItem?.data.shadow?.color ?? '#000000'});`;

	$: strokeSize = getRelativePixelSize(dataItem.data.textStroke.size, innerHeight, innerWidth);
	$: style.textStroke = `-webkit-text-stroke-width: ${strokeSize}px;
						-webkit-text-stroke-color: ${dataItem.data.textStroke.color};`;

	$: style.transform = `transform: translate(${dataItem.data.transform.translate.x ?? 0}%, ${
		dataItem.data.transform.translate.y ?? 0
	}%) scale(${dataItem.data.transform.scale}) rotate(${dataItem.data.transform.rotate ?? 0}deg);`;

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
		class="w-full h-full hide-siblings"
		style={`${
			dataItem.data?.font?.family !== undefined &&
			`font-family: ${dataItem.data?.font?.family};
	`
		}; ${style.textStroke};
		${style.transform};
		${style.shadow};`}
		bind:this={div}
	>
		{#if div}
			{#key dataItem}
				{#key fontTrigger}
					<div class="w-full h-full">
						<Custom {dataItem} {style} />

						<InGame {dataItem} {defaultPreview} {style} />

						<Match {dataItem} {defaultPreview} {style} />

						<RecentGame {dataItem} {defaultPreview} {style} />

						<RecentMatch {dataItem} {defaultPreview} {style} />

						<RecentMatchSummary {dataItem} {defaultPreview} {style} />

						<SlippiRank {dataItem} {defaultPreview} {style} />

						<Session {dataItem} {defaultPreview} {style} />

						<!-- Post Game Stats -->
						<!-- Post Set Stats -->
					</div>
				{/key}
			{/key}
		{/if}
	</div>
{/await}

<style>
	.hide-siblings :not(:first-child) {
		display: none;
	}
</style>
