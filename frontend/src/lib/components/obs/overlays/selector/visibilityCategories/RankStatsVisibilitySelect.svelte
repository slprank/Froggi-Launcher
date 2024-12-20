<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SelectOption from './SelectVisibilityOption.svelte';
	import {
		VisibilityOption,
		type SelectedVisibilityCondition,
	} from '$lib/models/types/animationOption';

	export let selectedVisibilityOption: SelectedVisibilityCondition;
	const dispatch = createEventDispatcher();

	function select(event: CustomEvent<VisibilityOption>) {
		dispatch('select', event.detail);
	}
</script>

<SelectOption
	description="When Ranked Game End And Rating Updates (~4sec)"
	value={VisibilityOption.RankStatsBeforeRankUpdated}
	bind:selected={selectedVisibilityOption[VisibilityOption.RankStatsBeforeRankUpdated]}
	on:select={select}
>
	Before Rank Updated
</SelectOption>
<SelectOption
	description="When Ranked Game End And Rating Is Updated (remaining ~5sec)"
	value={VisibilityOption.RankStatsAfterRankUpdated}
	bind:selected={selectedVisibilityOption[VisibilityOption.RankStatsAfterRankUpdated]}
	on:select={select}
>
	After Rank Updated
</SelectOption>
<SelectOption
	description="If The Recent Ranked Match Was Won"
	value={VisibilityOption.RankStatsMatchWon}
	bind:selected={selectedVisibilityOption[VisibilityOption.RankStatsMatchWon]}
	on:select={select}
>
	Match Won
</SelectOption>
