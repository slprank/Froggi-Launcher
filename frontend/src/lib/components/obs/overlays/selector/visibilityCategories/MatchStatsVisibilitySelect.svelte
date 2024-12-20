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
	description="When Player 1 Has A Match Score Of 1 Or More"
	value={VisibilityOption.MatchStatsPlayer1Score1}
	bind:selected={selectedVisibilityOption[VisibilityOption.MatchStatsPlayer1Score1]}
	on:select={select}
>
	Player 1 Score 1+
</SelectOption>
<SelectOption
	description="When Player 1 Has A Match Score Of 2 Or More"
	value={VisibilityOption.MatchStatsPlayer1Score2}
	bind:selected={selectedVisibilityOption[VisibilityOption.MatchStatsPlayer1Score2]}
	on:select={select}
>
	Player 1 Score 2+
</SelectOption>
<SelectOption
	description="When Player 1 Has A Match Score Of 3 Or More"
	value={VisibilityOption.MatchStatsPlayer1Score1}
	bind:selected={selectedVisibilityOption[VisibilityOption.MatchStatsPlayer1Score3]}
	on:select={select}
>
	Player 1 Score 3+
</SelectOption>

<SelectOption
	description="When Player 2 Has A Match Score Of 1 Or More"
	value={VisibilityOption.MatchStatsPlayer2Score1}
	bind:selected={selectedVisibilityOption[VisibilityOption.MatchStatsPlayer2Score1]}
	on:select={select}
>
	Player 2 Score 1+
</SelectOption>
<SelectOption
	description="When Player 2 Has A Match Score Of 2 Or More"
	value={VisibilityOption.MatchStatsPlayer2Score2}
	bind:selected={selectedVisibilityOption[VisibilityOption.MatchStatsPlayer2Score2]}
	on:select={select}
>
	Player 2 Score 2+
</SelectOption>
<SelectOption
	description="When Player 2 Has A Match Score Of 3 Or More"
	value={VisibilityOption.MatchStatsPlayer2Score1}
	bind:selected={selectedVisibilityOption[VisibilityOption.MatchStatsPlayer2Score3]}
	on:select={select}
>
	Player 1 Score 3+
</SelectOption>
