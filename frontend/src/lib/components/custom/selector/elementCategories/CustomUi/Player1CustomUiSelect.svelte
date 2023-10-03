<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../visibilityCategories/SelectVisibilityOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Player 1 Stock Icon"
		value={CustomElement.InGamePlayer1CharacterIcon}
		on:select={select}
	>
		Player 1 Stock Icon
	</SelectOption>
	<SelectOption
		description="Player 1 Render"
		value={CustomElement.InGamePlayer1CharacterRender}
		on:select={select}
	>
		Player 1 Render
	</SelectOption>
	<SelectOption
		description="Player 1 Live In-Game Percent - 24%"
		value={CustomElement.InGamePlayer1Percent}
		on:select={select}
	>
		Player 1 Percent
	</SelectOption>
	<SelectOption
		description="Player 1 Live In-Game Percent With Decimals - 24.6% "
		value={CustomElement.InGamePlayer1PercentDecimal}
		on:select={select}
	>
		Player 1 Percent Decimal
	</SelectOption>
</div>
