<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SelectOption from './SelectVisibilityOption.svelte';
	import type { SelectedVisibilityCondition, VisibilityOption } from '$lib/models/types/animationOption';
	import { DOUBLES_CONDITION_GROUPS } from '$lib/utils/doublesConditions';

	// Doubles conditions. "Player 1 / Player 2" conditions already mean Team 1 · P1 / Team 2 · P1.
	export let selectedVisibilityOption: SelectedVisibilityCondition;
	const dispatch = createEventDispatcher();
	const select = (event: CustomEvent<VisibilityOption>) => dispatch('select', event.detail);
</script>

<div class="flex flex-col gap-2">
	<p class="text-xs opacity-50">Player 1 / Player 2 conditions are Team 1 · Player 1 and Team 2 · Player 1. These add each team's second player, team totals and the format.</p>
	{#each DOUBLES_CONDITION_GROUPS as group (group.title)}
		<p class="section-label">{group.title}</p>
		{#each group.options as option (option.value)}
			<SelectOption description={option.label} value={option.value} bind:selected={selectedVisibilityOption[option.value]} on:select={select}>
				{option.label}
			</SelectOption>
		{/each}
	{/each}
</div>
