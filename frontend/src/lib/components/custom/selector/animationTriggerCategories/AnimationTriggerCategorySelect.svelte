<script lang="ts">
	import { LiveStatsScene } from '$lib/models/enum';
	import { statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import GameStateAnimationTriggerSelect from './GameStateAnimationTriggerSelect.svelte';
	import MatchStateAnimationTriggerSelect from './MatchStateAnimationTriggerSelect.svelte';
	import CurrentPlayerStateAnimationTriggerSelect from './CurrentPlayerStateAnimationTriggerSelect.svelte';
	import Player1StateAnimationTriggerSelect from './Player1StateAnimationTriggerSelect.svelte';
	import Player2StateAnimationTriggerSelect from './Player2StateAnimationTriggerSelect.svelte';
	import RankStatsAnimationTriggerSelect from './RankStatsAnimationTriggerSelect.svelte';
	import {
		AnimationTrigger,
		AnimationTriggerCategory,
		type SelectedAnimationTriggerOption,
	} from '$lib/models/types/animationOption';

	export let selectedOption: SelectedAnimationTriggerOption;

	function select(event: CustomEvent<AnimationTrigger>) {
		selectedOption[event.detail] = !selectedOption[event.detail];
	}

	const buttons = [
		{
			category: AnimationTriggerCategory.DolphinState,
			visible: [LiveStatsScene.WaitingForDolphin].includes($statsScene),
		},
		{
			category: AnimationTriggerCategory.GameState,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: AnimationTriggerCategory.MatchState,
			visible: [
				LiveStatsScene.Menu,
				LiveStatsScene.InGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.PostGame,
				LiveStatsScene.RankChange,
			].includes($statsScene),
		},
		{
			category: AnimationTriggerCategory.CurrentPlayerState,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: AnimationTriggerCategory.Player1State,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: AnimationTriggerCategory.Player2State,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: AnimationTriggerCategory.RankStats,
			visible: [LiveStatsScene.RankChange].includes($statsScene),
		},
	];
	let selectedCategory: AnimationTriggerCategory =
		buttons?.find((button) => button.visible)?.category ?? AnimationTriggerCategory.GameState;
</script>

<div class="w-full h-full flex flex-col gap-4">
	<h1 class="text-gray-500 text-lg font-medium text-shadow">Category</h1>
	<div class="w-lg 3xl:w-full flex flex-wrap gap-2">
		{#each buttons.filter((b) => b.visible) as button}
			<div class="grid gap-2 justify-start items-start">
				<button
					class={`transition bg-black bg-opacity-25 hover:bg-opacity-40  font-semibold text-white text-md whitespace-nowrap h-10 px-2 xl:text-xl border rounded ${
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
	<h1 class="text-gray-500 text-lg font-medium text-shadow">Options</h1>
	{#key selectedCategory}
		<div
			in:fly={{ duration: 250, x: 50, delay: 250 }}
			out:fly={{ duration: 250, x: 50 }}
			class="overflow-scroll"
		>
			{#if selectedCategory === AnimationTriggerCategory.GameState}
				<div class="flex flex-col gap-2">
					<GameStateAnimationTriggerSelect on:select={select} {selectedOption} />
				</div>
			{/if}
			{#if selectedCategory === AnimationTriggerCategory.MatchState}
				<div class="flex flex-col gap-2">
					<MatchStateAnimationTriggerSelect on:select={select} {selectedOption} />
				</div>
			{/if}
			{#if selectedCategory === AnimationTriggerCategory.CurrentPlayerState}
				<div class="flex flex-col gap-2">
					<CurrentPlayerStateAnimationTriggerSelect on:select={select} {selectedOption} />
				</div>
			{/if}
			{#if selectedCategory === AnimationTriggerCategory.Player1State}
				<div class="flex flex-col gap-2">
					<Player1StateAnimationTriggerSelect on:select={select} {selectedOption} />
				</div>
			{/if}
			{#if selectedCategory === AnimationTriggerCategory.Player2State}
				<div class="flex flex-col gap-2">
					<Player2StateAnimationTriggerSelect on:select={select} {selectedOption} />
				</div>
			{/if}
			{#if selectedCategory === AnimationTriggerCategory.RankStats}
				<div class="flex flex-col gap-2">
					<RankStatsAnimationTriggerSelect on:select={select} {selectedOption} />
				</div>
			{/if}
		</div>
		<br />
	{/key}
</div>
