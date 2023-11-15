<script lang="ts">
	import { LiveStatsScene } from '$lib/models/enum';
	import { statsScene } from '$lib/utils/store.svelte';
	import { fly } from 'svelte/transition';
	import InGameStateVisibilitySelect from './InGameStateVisibilitySelect.svelte';
	import RecentGameStateVisibilitySelect from './RecentGameStateVisibilitySelect.svelte';
	import {
		VisibilityCategory,
		type SelectedVisibilityOption,
		type VisibilityOption,
	} from '$lib/models/types/animationOption';
	import { VisibilityToggle } from '$lib/models/types/animationOption';

	export let selectedVisibilityOption: SelectedVisibilityOption;

	function select(event: CustomEvent<VisibilityOption>) {
		switch (selectedVisibilityOption[event.detail]) {
			case VisibilityToggle.Disabled:
				selectedVisibilityOption[event.detail] = VisibilityToggle.True;
				return;
			case VisibilityToggle.True:
				selectedVisibilityOption[event.detail] = VisibilityToggle.False;
				return;
			case VisibilityToggle.False:
				selectedVisibilityOption[event.detail] = VisibilityToggle.Disabled;
				return;
			default:
				selectedVisibilityOption[event.detail] = VisibilityToggle.Disabled;
		}
	}

	let selectedCategory: VisibilityCategory = VisibilityCategory.InGameState;

	$: buttons = [
		{
			category: VisibilityCategory.InGameState,
			visible: [LiveStatsScene.InGame].includes($statsScene),
		},
		{
			category: VisibilityCategory.RecentGame,
			visible: [LiveStatsScene.PostGame, LiveStatsScene.PostSet].includes($statsScene),
		},
	];
</script>

<div class="w-full h-full flex flex-col gap-4">
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
	<h1 class="text-gray-500 text-lg font-medium text-shadow">Options</h1>
	{#key selectedCategory}
		<div
			in:fly={{ duration: 250, x: 50, delay: 250 }}
			out:fly={{ duration: 250, x: 50 }}
			class="overflow-scroll"
		>
			{#if selectedCategory === VisibilityCategory.InGameState}
				<div class="flex flex-col gap-2">
					<InGameStateVisibilitySelect on:select={select} {selectedVisibilityOption} />
				</div>
			{/if}
			{#if selectedCategory === VisibilityCategory.RecentGame}
				<div class="flex flex-col gap-2">
					<RecentGameStateVisibilitySelect
						on:select={select}
						{selectedVisibilityOption}
					/>
				</div>
			{/if}
		</div>
		<br />
	{/key}
</div>
