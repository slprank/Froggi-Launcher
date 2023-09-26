<script lang="ts">
	import { CustomElement, ElementCategory, LiveStatsScene } from '$lib/models/enum';
	import { statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import Player1CustomUiSelect from '$lib/components/custom/selector/elementCategories/CustomUi/Player1CustomUiSelect.svelte';
	import Player2CustomUiSelect from '$lib/components/custom/selector/elementCategories/CustomUi/Player2CustomUiSelect.svelte';
	import CustomElementSelect from '$lib/components/custom/selector/elementCategories/Custom/CustomElementSelect.svelte';
	import Player1SlippiData from '$lib/components/custom/selector/elementCategories/SlippiData/Player1SlippiData.svelte';
	import Player2SlippiData from '$lib/components/custom/selector/elementCategories/SlippiData/Player2SlippiData.svelte';
	import CurrentPlayerSlippiData from '$lib/components/custom/selector/elementCategories/SlippiData/CurrentPlayerSlippiData.svelte';
	import CurrentSetElementSelect from '$lib/components/custom/selector/elementCategories/CurrentSet/CurrentSetElementSelect.svelte';
	import CurrentPlayerActionCount from '$lib/components/custom/selector/elementCategories/PostGame/CurrentPlayerActionCount.svelte';
	import CurrentPlayerAttackCount from '$lib/components/custom/selector/elementCategories/PostGame/CurrentPlayerAttackCount.svelte';
	import CustomUiSelect from '$lib/components/custom/selector/elementCategories/CustomUi/CustomUiSelect.svelte';
	import CurrentPlayerOverall from '$lib/components/custom/selector//elementCategories/PostGame/CurrentPlayerOverall.svelte';
	import Player1AttackCount from '$lib/components/custom/selector/elementCategories/PostGame/Player1AttackCount.svelte';
	import Player1ActionCount from '$lib/components/custom/selector/elementCategories/PostGame/Player1ActionCount.svelte';
	import Player1Overall from '$lib/components/custom/selector/elementCategories/PostGame/Player1Overall.svelte';
	import Player2AttackCount from '$lib/components/custom/selector/elementCategories/PostGame/Player2AttackCount.svelte';
	import Player2ActionCount from '$lib/components/custom/selector/elementCategories/PostGame/Player2ActionCount.svelte';
	import Player2Overall from '$lib/components/custom/selector/elementCategories/PostGame/Player2Overall.svelte';

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
			category: ElementCategory.Player1CustomUi,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: ElementCategory.Player2CustomUi,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: ElementCategory.ControllerInput,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentPlayerSlippiData,
			visible: [
				LiveStatsScene.Menu,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
				LiveStatsScene.RankChange,
			].includes($statsScene),
		},
		{
			category: ElementCategory.Player1SlippiData,
			visible: [
				LiveStatsScene.Menu,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
			].includes($statsScene),
		},
		{
			category: ElementCategory.Player2SlippiData,
			visible: [
				LiveStatsScene.Menu,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostSet,
			].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentPlayerPostGameAttackCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentPlayerPostGameActionCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentPlayerPostGameOverallStats,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player1PostGameAttackCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player1PostGameActionCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player1PostGameOverallStats,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player2PostGameAttackCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player2PostGameActionCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player2PostGameOverallStats,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.PostSetStats,
			visible: [LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentSetStats,
			visible: [
				LiveStatsScene.Menu,
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
				<CustomUiSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1CustomUi}
				<Player1CustomUiSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2CustomUi}
				<Player2CustomUiSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameAttackCount}
				<CurrentPlayerAttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameActionCount}
				<CurrentPlayerActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameOverallStats}
				<CurrentPlayerOverall on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameAttackCount}
				<Player1AttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameActionCount}
				<Player1ActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameOverallStats}
				<Player1Overall on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameAttackCount}
				<Player2AttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameActionCount}
				<Player2ActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameOverallStats}
				<Player2Overall on:select={select} />
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
