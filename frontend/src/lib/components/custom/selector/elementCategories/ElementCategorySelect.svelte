<script lang="ts">
	import { ElementCategory, LiveStatsScene } from '$lib/models/enum';
	import type { CustomElement } from '$lib/models/constants/customElement';
	import { statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import RecentGamePlayer1CustomUiSelect from '$lib/components/custom/selector/elementCategories/CustomUi/Player1CustomUiSelect.svelte';
	import RecentGamePlayer2CustomUiSelect from '$lib/components/custom/selector/elementCategories/CustomUi/Player2CustomUiSelect.svelte';
	import RecentGameCustomElementSelect from '$lib/components/custom/selector/elementCategories/Custom/CustomElementSelect.svelte';
	import RecentGamePlayer1SlippiData from '$lib/components/custom/selector/elementCategories/SlippiData/Player1SlippiData.svelte';
	import RecentGamePlayer2SlippiData from '$lib/components/custom/selector/elementCategories/SlippiData/Player2SlippiData.svelte';
	import RecentGameCurrentPlayerSlippiData from '$lib/components/custom/selector/elementCategories/SlippiData/CurrentPlayerSlippiData.svelte';
	import RecentGameCurrentSetElementSelect from '$lib/components/custom/selector/elementCategories/CurrentSet/CurrentSetElementSelect.svelte';
	import RecentGameCustomUiSelect from '$lib/components/custom/selector/elementCategories/CustomUi/CustomUiSelect.svelte';
	import RecentGameCurrentPlayerActionCount from '$lib/components/custom/selector/elementCategories/PostGame/RecentGameCurrentPlayerActionCount.svelte';
	import RecentGameCurrentPlayerAttackCount from '$lib/components/custom/selector/elementCategories/PostGame/RecentGameCurrentPlayerAttackCount.svelte';
	import RecentGameCurrentPlayerOverall from '$lib/components/custom/selector/elementCategories/PostGame/RecentGameCurrentPlayerOverall.svelte';
	import RecentGamePlayer1AttackCount from '$lib/components/custom/selector/elementCategories/PostGame/RecentGamePlayer1AttackCount.svelte';
	import RecentGamePlayer1ActionCount from '$lib/components/custom/selector/elementCategories/PostGame/RecentGamePlayer1ActionCount.svelte';
	import RecentGamePlayer1Overall from '$lib/components/custom/selector/elementCategories/PostGame/RecentGamePlayer1Overall.svelte';
	import RecentGamePlayer2AttackCount from '$lib/components/custom/selector/elementCategories/PostGame/RecentGamePlayer2AttackCount.svelte';
	import RecentGamePlayer2ActionCount from '$lib/components/custom/selector/elementCategories/PostGame/RecentGamePlayer2ActionCount.svelte';
	import RecentGamePlayer2Overall from '$lib/components/custom/selector/elementCategories/PostGame/RecentGamePlayer2Overall.svelte';

	import CurrentMatchCurrentPlayerActionCount from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchCurrentPlayerActionCount.svelte';
	import CurrentMatchCurrentPlayerAttackCount from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchCurrentPlayerAttackCount.svelte';
	import CurrentMatchCurrentPlayerOverall from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchCurrentPlayerOverall.svelte';
	import CurrentMatchPlayer1AttackCount from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchPlayer1AttackCount.svelte';
	import CurrentMatchPlayer1ActionCount from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchPlayer1ActionCount.svelte';
	import CurrentMatchPlayer1Overall from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchPlayer1Overall.svelte';
	import CurrentMatchPlayer2AttackCount from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchPlayer2AttackCount.svelte';
	import CurrentMatchPlayer2ActionCount from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchPlayer2ActionCount.svelte';
	import CurrentMatchPlayer2Overall from '$lib/components/custom/selector/elementCategories/PostGameMatch/CurrentMatchPlayer2Overall.svelte';

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
			category: ElementCategory.GameCustomUi,
			visible: [LiveStatsScene.InGame].includes($statsScene),
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
			category: ElementCategory.CurrentPlayerPostGameMatchAttackCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentPlayerPostGameMatchActionCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.CurrentPlayerPostGameMatchOverallStats,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player1PostGameMatchAttackCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player1PostGameMatchActionCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player1PostGameMatchOverallStats,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player2PostGameMatchAttackCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player2PostGameMatchActionCount,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
		{
			category: ElementCategory.Player2PostGameMatchOverallStats,
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
				<RecentGameCustomElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.GameCustomUi}
				<RecentGameCustomUiSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1CustomUi}
				<RecentGamePlayer1CustomUiSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2CustomUi}
				<RecentGamePlayer2CustomUiSelect on:select={select} />
			{/if}

			{#if selectedCategory === ElementCategory.CurrentSetStats}
				<RecentGameCurrentSetElementSelect on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerSlippiData}
				<RecentGameCurrentPlayerSlippiData on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1SlippiData}
				<RecentGamePlayer1SlippiData on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2SlippiData}
				<RecentGamePlayer2SlippiData on:select={select} />
			{/if}

			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameAttackCount}
				<RecentGameCurrentPlayerAttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameActionCount}
				<RecentGameCurrentPlayerActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameOverallStats}
				<RecentGameCurrentPlayerOverall on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameAttackCount}
				<RecentGamePlayer1AttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameActionCount}
				<RecentGamePlayer1ActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameOverallStats}
				<RecentGamePlayer1Overall on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameAttackCount}
				<RecentGamePlayer2AttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameActionCount}
				<RecentGamePlayer2ActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameOverallStats}
				<RecentGamePlayer2Overall on:select={select} />
			{/if}

			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameMatchAttackCount}
				<CurrentMatchCurrentPlayerAttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameMatchActionCount}
				<CurrentMatchCurrentPlayerActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.CurrentPlayerPostGameMatchOverallStats}
				<CurrentMatchCurrentPlayerOverall on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameMatchAttackCount}
				<CurrentMatchPlayer1AttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameMatchActionCount}
				<CurrentMatchPlayer1ActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player1PostGameMatchOverallStats}
				<CurrentMatchPlayer1Overall on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameMatchAttackCount}
				<CurrentMatchPlayer2AttackCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameMatchActionCount}
				<CurrentMatchPlayer2ActionCount on:select={select} />
			{/if}
			{#if selectedCategory === ElementCategory.Player2PostGameMatchOverallStats}
				<CurrentMatchPlayer2Overall on:select={select} />
			{/if}
		</div>
	{/key}
</div>
