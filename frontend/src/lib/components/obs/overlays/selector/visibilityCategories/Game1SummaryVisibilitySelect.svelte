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
	description="Current Set Game 1 Completed"
	value={VisibilityOption.PostGame1SummaryCompleted}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryCompleted]}
	on:select={select}
>
	Game Completed
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - Current Player - Win"
	value={VisibilityOption.PostGame1SummaryCurrentPlayerWin}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryCurrentPlayerWin]}
	on:select={select}
>
	Current Player - Win
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 1 Won The Previous Game"
	value={VisibilityOption.PostGame1SummaryPlayer1Win}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer1Win]}
	on:select={select}
>
	Player 1 - Win
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 2 Won The Previous Game"
	value={VisibilityOption.PostGame1SummaryPlayer2Win}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer2Win]}
	on:select={select}
>
	Player 2 - Win
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 1 Had 1 or More Stocks Remaining"
	value={VisibilityOption.PostGame1SummaryPlayer1Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer1Stock1]}
	on:select={select}
>
	Player 1 - Stock 1
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 1 Had 2 or More Stocks Remaining"
	value={VisibilityOption.PostGame1SummaryPlayer1Stock2}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer1Stock2]}
	on:select={select}
>
	Player 1 - Stock 2
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 1 Had 3 or More Stocks Remaining"
	value={VisibilityOption.PostGame1SummaryPlayer1Stock3}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer1Stock3]}
	on:select={select}
>
	Player 1 - Stock 3
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 1 Had 4 or More Stocks Remaining"
	value={VisibilityOption.PostGame1SummaryPlayer1Stock4}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer1Stock4]}
	on:select={select}
>
	Player 1 - Stock 4
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 2 Had 1 or More Stocks Remaining"
	value={VisibilityOption.PostGame1SummaryPlayer2Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer2Stock1]}
	on:select={select}
>
	Player 2 - Stock 1
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 2 Had 2 or More Stocks Remaining"
	value={VisibilityOption.PostGame1SummaryPlayer2Stock2}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer2Stock2]}
	on:select={select}
>
	Player 2 - Stock 2
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 2 Had 3 or More Stocks Remaining"
	value={VisibilityOption.PostGame1SummaryPlayer2Stock3}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer2Stock3]}
	on:select={select}
>
	Player 2 - Stock 3
</SelectOption>
<SelectOption
	description="Current Set Game 1 or 5th Most Recent Game - If Player 2 Had 4 or More Stocks Remaining"
	value={VisibilityOption.PostGame1SummaryPlayer2Stock4}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGame1SummaryPlayer2Stock4]}
	on:select={select}
>
	Player 2 - Stock 4
</SelectOption>
