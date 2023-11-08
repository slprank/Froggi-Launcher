<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../visibilityCategories/SelectVisibilityOption.svelte';
	import { recentGames } from '$lib/utils/store.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Recent Game Stage Image"
		value={CustomElement.CurrentSetGame2Stage}
		on:select={select}
	>
		Recent Game Stage
	</SelectOption>
	<SelectOption
		description="Recent Game Player 1 Score"
		value={CustomElement.CurrentSetGame2Player1Score}
		on:select={select}
	>
		Player 1 Score
	</SelectOption>
	<SelectOption
		description="Recent Game Player 2 Score"
		value={CustomElement.CurrentSetGame2Player2Score}
		on:select={select}
	>
		Player 2 Score
	</SelectOption>
	<SelectOption
		description="Recent Game Player 1 Character Icon"
		value={CustomElement.CurrentSetGame2Player1CharacterIcon}
		on:select={select}
	>
		Player 1 Character Icon
	</SelectOption>
	<SelectOption
		description="Recent Game Player 2 Character Icon"
		value={CustomElement.CurrentSetGame2Player2CharacterIcon}
		on:select={select}
	>
		Player 2 Character Icon
	</SelectOption>
	<SelectOption
		description="Recent Game Player 1 Character Render"
		value={CustomElement.CurrentSetGame2Player1CharacterRender}
		on:select={select}
	>
		Player 1 Character Render
	</SelectOption>
	<SelectOption
		description="Recent Game Player 2 Character Render"
		value={CustomElement.CurrentSetGame2Player2CharacterRender}
		on:select={select}
	>
		Player 2 Character Render
	</SelectOption>
	<SelectOption
		description="Recent Game Player 1 Stocks Remaining"
		value={CustomElement.CurrentSetGame2Player1StocksRemaining}
		on:select={select}
	>
		Player 1 Stocks Remaining
	</SelectOption>
	<SelectOption
		description="Recent Game Player 2 Stocks Remaining"
		value={CustomElement.CurrentSetGame2Player2StocksRemaining}
		on:select={select}
	>
		Player 2 Stocks Remaining
	</SelectOption>
</div>
