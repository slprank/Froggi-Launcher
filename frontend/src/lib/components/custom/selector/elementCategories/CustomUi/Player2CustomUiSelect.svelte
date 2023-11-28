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
		Stock Icon
	</SelectOption>
	<SelectOption
		description="Player 2 Remaining Stocks"
		value={CustomElement.InGamePlayer2StocksRemaining}
		on:select={select}
	>
		Stock Icon
	</SelectOption>
	<SelectOption
		description="Player 2 Character Render"
		value={CustomElement.InGamePlayer2CharacterRender}
		on:select={select}
	>
		Character Render
	</SelectOption>
	<SelectOption
		description="Player 2 Character Series Symbol (Melee)"
		value={CustomElement.InGamePlayer2CharacterSeriesSymbol}
		on:select={select}
	>
		Series Symbol Melee
	</SelectOption>
	<SelectOption
		description="Player 2 Character Series Symbol (Ultimate)"
		value={CustomElement.InGamePlayer2CharacterSeriesSymbolUltimate}
		on:select={select}
	>
		Series Symbol Ultimate
	</SelectOption>
	<SelectOption
		description="Player 2 Percent - 24%"
		value={CustomElement.InGamePlayer2Percent}
		on:select={select}
	>
		Percent
	</SelectOption>
	<SelectOption
		description="Player 2 Percent With Decimals - 24.6%"
		value={CustomElement.InGamePlayer2PercentDecimal}
		on:select={select}
	>
		Percent Decimal
	</SelectOption>
	<SelectOption
		description="Player 2 Combo Counter"
		value={CustomElement.InGamePlayer2ComboCounter}
		on:select={select}
	>
		Combo Counter
	</SelectOption>
</div>
