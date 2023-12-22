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
	description="If Current Player Won The Previous Game"
	value={VisibilityOption.PostGameCurrentPlayerWin}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGameCurrentPlayerWin]}
	on:select={select}
>
	Current Player - Win
</SelectOption>
<SelectOption
	description="If Player 1 Won The Previous Game"
	value={VisibilityOption.PostGameCurrentPlayerWin}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer1Win]}
	on:select={select}
>
	Player 1 - Win
</SelectOption>
<SelectOption
	description="If Player 2 Won The Previous Game"
	value={VisibilityOption.PostGamePlayer1Win}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer2Win]}
	on:select={select}
>
	Player 2 - Win
</SelectOption>
<SelectOption
	description="If Player 1 Had 1 or More Stocks Remaining"
	value={VisibilityOption.PostGamePlayer1Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer1Stock1]}
	on:select={select}
>
	Player 1 - Stock 1
</SelectOption>
<SelectOption
	description="If Player 1 Had 2 or More Stocks Remaining"
	value={VisibilityOption.PostGamePlayer1Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer1Stock2]}
	on:select={select}
>
	Player 1 - Stock 2
</SelectOption>
<SelectOption
	description="If Player 1 Had 3 or More Stocks Remaining"
	value={VisibilityOption.PostGamePlayer1Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer1Stock3]}
	on:select={select}
>
	Player 1 - Stock 3
</SelectOption>
<SelectOption
	description="If Player 1 Had 4 or More Stocks Remaining"
	value={VisibilityOption.PostGamePlayer1Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer1Stock4]}
	on:select={select}
>
	Player 1 - Stock 4
</SelectOption>
<SelectOption
	description="If Player 2 Had 1 or More Stocks Remaining"
	value={VisibilityOption.PostGamePlayer2Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer2Stock1]}
	on:select={select}
>
	Player 2 - Stock 1
</SelectOption>
<SelectOption
	description="If Player 2 Had 2 or More Stocks Remaining"
	value={VisibilityOption.PostGamePlayer2Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer2Stock2]}
	on:select={select}
>
	Player 2 - Stock 2
</SelectOption>
<SelectOption
	description="If Player 2 Had 3 or More Stocks Remaining"
	value={VisibilityOption.PostGamePlayer2Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer2Stock3]}
	on:select={select}
>
	Player 2 - Stock 3
</SelectOption>
<SelectOption
	description="If Player 2 Had 4 or More Stocks Remaining"
	value={VisibilityOption.PostGamePlayer2Stock1}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGamePlayer2Stock4]}
	on:select={select}
>
	Player 2 - Stock 4
</SelectOption>
