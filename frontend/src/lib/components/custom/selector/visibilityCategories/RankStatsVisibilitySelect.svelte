<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SelectOption from './SelectVisibilityOption.svelte';
	import {
		VisibilityOption,
		type SelectedVisibilityOption,
	} from '$lib/models/types/animationOption';

	export let selectedVisibilityOption: SelectedVisibilityOption;
	const dispatch = createEventDispatcher();

	function select(event: CustomEvent<VisibilityOption>) {
		dispatch('select', event.detail);
	}
</script>

<SelectOption
	description="When Ranked Game End And Rating Updates"
	value={VisibilityOption.RankStatsBeforeRankUpdated}
	bind:selected={selectedVisibilityOption[VisibilityOption.RankStatsBeforeRankUpdated]}
	on:select={select}
>
	Before Rank Updated
</SelectOption>
<SelectOption
	description="When Ranked Game End And Rating Is Updated"
	value={VisibilityOption.RankStatsBeforeRankUpdated}
	bind:selected={selectedVisibilityOption[VisibilityOption.RankStatsBeforeRankUpdated]}
	on:select={select}
>
	After Rank Updated
</SelectOption>
