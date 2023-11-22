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
		description="Player 2 Stock Icon"
		value={CustomElement.InGamePlayer2CharacterIcon}
		on:select={select}
	>
		Player 2 Stock Icon
	</SelectOption>
	<SelectOption
		description="Player 2 Render"
		value={CustomElement.InGamePlayer2CharacterRender}
		on:select={select}
	>
		Player 2 Render
	</SelectOption>
	<SelectOption
		description="Player 2 Character Series Symbol (Melee)"
		value={CustomElement.InGamePlayer2CharacterSeriesSymbol}
		on:select={select}
	>
		Player 2 Series Symbol Melee
	</SelectOption>
	<SelectOption
		description="Player 2 Character Series Symbol (Ultimate)"
		value={CustomElement.InGamePlayer2CharacterSeriesSymbolUltimate}
		on:select={select}
	>
		Player 2 Series Symbol Ultimate
	</SelectOption>
	<SelectOption
		description="Player 2 Live In-Game Percent - 24%"
		value={CustomElement.InGamePlayer2Percent}
		on:select={select}
	>
		Player 2 Percent
	</SelectOption>
	<SelectOption
		description="Player 2 Live In-Game Percent With Decimals - 24.6%"
		value={CustomElement.InGamePlayer2PercentDecimal}
		on:select={select}
	>
		Player 2 Percent Decimal
	</SelectOption>
</div>
