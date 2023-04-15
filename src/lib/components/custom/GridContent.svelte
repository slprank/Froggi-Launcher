<script lang="ts">
	import { CustomElement } from '$lib/types/enum';
	import type { GridContentItem } from '$lib/types/types';
	import { obs } from '$lib/utils/store.svelte';
	import TextFitMulti from '../TextFitMulti.svelte';

	export let dataItem: GridContentItem;
	export let edit: boolean = false;
	export let font = '';

	$: console.log('hmmmm', dataItem);

	// TODO: Add custom font support

	// TODO: Add components as seperete components
	// TODO: Use game data to display
</script>

<svelte:head>
	<!--
		<link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=${font}`} />
	-->
</svelte:head>

{#key $obs}
	<div
		class={`custom-font h-full w-full overflow-hidden  ${
			edit ? 'bg-white' : 'text-white'
		} bg-opacity-50`}
		style={`font-family: ${font}`}
	>
		{#if dataItem?.elementId == CustomElement.CustomString}
			<TextFitMulti class={`h-full flex ${dataItem.data.css}`} maxFont={1000}>
				{dataItem?.data.string}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.CustomBox}
			<div class={`${dataItem?.data.css}`} />
		{/if}
		{#if dataItem?.elementId == CustomElement.Player1Tag}
			<TextFitMulti class={`h-full flex ${dataItem.data.css}`} maxFont={1000}>
				{`Player1`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player2Tag}
			<TextFitMulti class={`h-full flex ${dataItem.data.css}`} maxFont={1000}>
				{`Player2`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player1Score}
			<TextFitMulti class={`h-full flex ${dataItem.data.css}`} maxFont={1000}>
				{`1`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player2Score}
			<TextFitMulti class={`h-full flex ${dataItem.data.css}`} maxFont={1000}>
				{`0`}
			</TextFitMulti>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player1RankIcon}
			<div class={`w-full h-full flex justify-center items-center ${dataItem.data.css}`}>
				<img
					class="w-full h-full object-contain aspect-square"
					src="/image/rank-icons/GOLD 3.svg"
					alt="rank-icon"
				/>
			</div>
		{/if}
		{#if dataItem?.elementId == CustomElement.Player2RankIcon}
			<div class={`w-full h-full flex justify-center items-center ${dataItem.data.css}`}>
				<img
					class="w-full h-full object-contain aspect-square"
					src="/image/rank-icons/SILVER 3.svg"
					alt="rank-icon"
				/>
			</div>
		{/if}
	</div>
{/key}
