<script lang="ts">
	import { CustomElement, Transition } from '$lib/types/enum';
	import type { GridContentItem } from '$lib/types/types';
	import { obs, statsScene } from '$lib/utils/store.svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import TextFitMulti from '../TextFitMulti.svelte';
	import { COL, ROW } from '$lib/types/const';

	export let dataItem: GridContentItem | undefined = undefined;
	export let edit: boolean = false;
	export let preview: boolean = false;
	export let selectedId: string | undefined = undefined;
	export let transition: Transition = Transition.None;
	export let font = '';

	export let testItem: GridContentItem | undefined = undefined;

	function updateTestData() {
		if (testItem) dataItem = testItem;
	}
	$: testItem, updateTestData();

	$: classValue = Object.entries(dataItem?.data.class ?? {})
		.map(([_, value]) => `${value}`)
		.join(' ');

	$: cssValue = Object.entries(dataItem?.data.css ?? {})
		.map(([key, value]) => `${toKebabCase(key)}: ${value}`)
		.join('; ');

	function toKebabCase(str: string) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	const animate = (node: Element) => {
		if (!preview || edit || !dataItem) return;
		const duration = 250;
		const delay =
			dataItem[COL]?.y + Math.abs(dataItem[COL]?.x + dataItem[COL]?.w / 2 - COL / 2) ?? 0;
		const y = ((dataItem[COL]?.y - ROW / 2) / ROW) * 50;
		const x = ((dataItem[COL]?.x - COL / 2) / COL) * 50;
		switch (transition) {
			case Transition.None:
				return;
			case Transition.Fade:
				return fade(node, { duration: duration, delay: delay });
			case Transition.Fly:
				return fly(node, { duration: duration, x: x, y: y, delay: delay });
			case Transition.Scale:
				return scale(node, { duration: duration, delay: delay });
		}
	};

	// TODO: Add remaining components
	// TODO: Use live data
	// TODO: Add custom font support
</script>

<svelte:head>
	<!--
		<link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${font}`} />
	-->
</svelte:head>

{#key $obs || $statsScene || dataItem}
	<div
		class={`custom-font h-full w-full  ${edit ? 'bg-white' : 'text-white'} ${
			selectedId && selectedId === dataItem?.id ? 'border border-red-500' : ''
		} bg-opacity-50`}
		style={`font-family: ${font}`}
		in:animate
	>
		{#if dataItem?.elementId == CustomElement.CustomString}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${cssValue} ${edit ? 'color: black;' : ''}`}
				maxFont={1000}
			>
				{dataItem?.data.string}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.CustomBox}
			<div class={`w-full h-full ${classValue}`} style={`${cssValue}`} />
		{/if}
		{#if dataItem?.elementId == CustomElement.Player1Tag}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${cssValue} ${edit ? 'color: black' : ''}`}
				maxFont={1000}
			>
				{`Player1`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player2Tag}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${cssValue} ${edit ? 'color: black' : ''}`}
				maxFont={1000}
			>
				{`Player2`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player1Score}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${cssValue} ${edit ? 'color: black' : ''}`}
				maxFont={1000}
			>
				{`1`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player2Score}
			<TextFitMulti
				class={`h-full flex ${classValue}`}
				style={`${cssValue} ${edit ? 'color: black' : ''}`}
				maxFont={1000}
			>
				{`0`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player1RankIcon}
			<div
				class={`w-full h-full flex justify-center items-center ${classValue}`}
				style={`${cssValue}`}
			>
				<img
					class="w-full h-full object-contain aspect-square"
					src="/image/rank-icons/GOLD 3.svg"
					alt="rank-icon"
				/>
			</div>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player2RankIcon}
			<div
				class={`w-full h-full flex justify-center items-center ${classValue}`}
				style={`${cssValue}`}
			>
				<img
					class="w-full h-full object-contain aspect-square"
					src="/image/rank-icons/SILVER 3.svg"
					alt="rank-icon"
				/>
			</div>
		{/if}
	</div>
{/key}
