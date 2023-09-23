<script lang="ts">
	import type { GridContentItem, GridContentItemStyle } from '$lib/models/types';
	import { addFont } from './CustomFontHandler.svelte';
	import { getRelativePixelSize } from '$lib/utils/helper.svelte';
	import SlippiRank from './elementRender/SlippiRank.svelte';
	import Custom from './elementRender/Custom.svelte';
	import InGame from './elementRender/InGame.svelte';
	import PostGame from './elementRender/PostGame.svelte';

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
					<Custom {dataItem} {style} />

					<InGame {dataItem} {defaultPreview} {style} />

					<PostGame {dataItem} {defaultPreview} {style} />

					<SlippiRank {dataItem} {defaultPreview} {style} />

					<!-- Post Game Stats -->
					<!-- Post Set Stats -->
				{/key}
			{/key}
		{/if}
	</div>
{/await}
