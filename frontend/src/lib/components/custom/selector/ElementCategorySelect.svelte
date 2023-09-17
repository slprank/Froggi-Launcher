<script lang="ts">
	import { CustomElement, ElementCategory, LiveStatsScene } from '$lib/models/enum';
	import { statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import CustomUiElementSelect from './elementCategories/CustomUiElementSelect.svelte';
	import CustomElementSelect from './elementCategories/CustomElementSelect.svelte';
	import PostGameElementSelect from './elementCategories/PostGameElementSelect.svelte';
	import PostSetElementSelect from './elementCategories/PostSetElementSelect.svelte';
	import Player1SlippiData from './elementCategories/Player1SlippiData.svelte';
	import Player2SlippiData from './elementCategories/Player2SlippiData.svelte';
	import CurrentPlayerSlippiData from './elementCategories/CurrentPlayerSlippiData.svelte';
	import CurrentSetElementSelect from './elementCategories/CurrentSetElementSelect.svelte';

	export let selectedElementId: CustomElement;
	export let open: boolean;

	function select(customElement: CustomEvent<CustomElement>) {
		selectedElementId = customElement.detail;
		open = false;
	}

	let selectedCategory: LiveStatsScene | ElementCategory = $statsScene;

	$: buttons = [
		{
			category: ElementCategory.Custom,
			visible: true,
		},
		{
			category: ElementCategory.CustomUi,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: ElementCategory.ControllerInput,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: ElementCategory.Player1SlippiData,
			visible: [
				LiveStatsScene.PreGame,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
			].includes($statsScene),
		},
		{
			category: ElementCategory.Player2SlippiData,
			visible: [
				LiveStatsScene.PreGame,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
			].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentPlayerSlippiData,
			visible: [
				LiveStatsScene.PreGame,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
				LiveStatsScene.RankChange,
			].includes($statsScene),
		},
		{
			category: ElementCategory.PostGameStats,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.PostSetStats,
			visible: [LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentSetStats,
			visible: [
				LiveStatsScene.PreGame,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
				LiveStatsScene.RankChange,
			].includes($statsScene),
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
					{button.category}
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
			{#if selectedCategory === ElementCategory.CustomUi}
				<CustomUiElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.PostGameStats}
				<PostGameElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.PostSetStats}
				<PostSetElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentSetStats}
				<CurrentSetElementSelect on:select={select} />
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
