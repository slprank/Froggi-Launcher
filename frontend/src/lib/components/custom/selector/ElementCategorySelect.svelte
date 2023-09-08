<script lang="ts">
	import { CustomElement, ElementCategory, LiveStatsScene } from '$lib/models/enum';
	import { statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import CustomUiElementSelect from './elementCategories/CustomUiElementSelect.svelte';
	import CustomElementSelect from './elementCategories/CustomElementSelect.svelte';
	import InGameElementSelect from './elementCategories/InGameElementSelect.svelte';
	import PostGameElementSelect from './elementCategories/PostGameElementSelect.svelte';
	import PostSetElementSelect from './elementCategories/PostSetElementSelect.svelte';
	import PreGameElementSelect from './elementCategories/PreGameElementSelect.svelte';
	import RankChangeElementSelect from './elementCategories/RankChangeElementSelect.svelte';
	import WaitingElementSelect from './elementCategories/WaitingElementSelect.svelte';
	import Player1SlippiData from './elementCategories/Player1SlippiData.svelte';
	import Player2SlippiData from './elementCategories/Player2SlippiData.svelte';
	import CurrentPlayerSlippiData from './elementCategories/CurrentPlayerSlippiData.svelte';

	export let selectedElementId: CustomElement;
	export let open: boolean;

	function select(customElement: CustomEvent<CustomElement>) {
		selectedElementId = customElement.detail;
		open = false;
	}

	let selectedCategory: LiveStatsScene | ElementCategory = $statsScene;

	$: buttons = [
		{
			text: 'Custom',
			category: ElementCategory.Custom,
			visible: true,
		},
		{
			text: 'Custom UI',
			category: ElementCategory.CustomUi,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			text: 'Player1 Slippi Data',
			category: ElementCategory.Player1SlippiData,
			visible: [
				LiveStatsScene.PreGame,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
			].includes($statsScene),
		},
		{
			text: 'Player2 Slippi Data',
			category: ElementCategory.Player2SlippiData,
			visible: [
				LiveStatsScene.PreGame,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
			].includes($statsScene),
		},
		{
			text: 'Current Player Slippi Data',
			category: ElementCategory.CurrentPlayerSlippiData,
			visible: [
				LiveStatsScene.PreGame,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
			].includes($statsScene),
		},
		{
			text: 'Pre Game',
			category: ElementCategory.PreGame,
			visible: [LiveStatsScene.PreGame].includes($statsScene),
		},
		{
			text: 'Post Game Stats',
			category: ElementCategory.PostGame,
			visible: [LiveStatsScene.PostGame].includes($statsScene),
		},
		{
			text: 'Post Set Stats',
			category: ElementCategory.PostSet,
			visible: [LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			text: 'Rank Change',
			category: ElementCategory.RankChange,
			visible: [LiveStatsScene.RankChange].includes($statsScene),
		},
	];

	$: console.log($statsScene);
</script>

<div class="w-full h-full flex flex-col gap-2">
	<h1 class="text-gray-500 text-lg font-medium text-shadow">Category</h1>
	<div class="w-lg 3xl:w-full flex flex-wrap gap-2">
		{#each buttons.filter((b) => b.visible) as button}
			<div class="grid gap-2 justify-start items-start">
				<button
					class={`transition bg-black bg-opacity-25 hover:bg-opacity-40 hover:scale-110 font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border rounded ${
						selectedCategory === button.category ? 'border-red-500' : 'border-white'
					}`}
					on:click={() => {
						selectedCategory = button.category;
					}}
				>
					{button.text}
				</button>
			</div>
		{/each}
	</div>
	<h1 class="text-gray-500 text-lg font-medium text-shadow">Element</h1>
	{#key selectedCategory}
		<div
			in:fly={{ duration: 250, x: 50, delay: 250 }}
			out:fly={{ duration: 250, x: 50 }}
			class="overflow-scroll"
		>
			{#if selectedCategory === ElementCategory.Custom}
				<CustomElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.WaitingForDolphin}
				<WaitingElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.PreGame}
				<PreGameElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.InGame}
				<InGameElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CustomUi}
				<CustomUiElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.PostGame}
				<PostGameElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.PostSet}
				<PostSetElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.RankChange}
				<RankChangeElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerSlippiData}
				<CurrentPlayerSlippiData on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1SlippiData}
				<Player1SlippiData on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2SlippiData}
				<Player2SlippiData on:select={select} />
			{/if}
		</div>
	{/key}
</div>
