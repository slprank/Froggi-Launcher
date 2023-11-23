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
		description="Current Player Stock Icon"
		value={CustomElement.InGameCurrentPlayerCharacterIcon}
		on:select={select}
	>
		Current Player Stock Icon
	</SelectOption>
	<SelectOption
		description="Current Player Character Render"
		value={CustomElement.InGameCurrentPlayerCharacterRender}
		on:select={select}
	>
		Current Player Character Render
	</SelectOption>
	<SelectOption
		description="Current Player Character Series Symbols From N64/Melee"
		value={CustomElement.InGameCurrentPlayerCharacterSeriesSymbol}
		on:select={select}
	>
		Current Player Series Symbol Melee
	</SelectOption>
	<SelectOption
		description="Current Player Character Series Symbol From Brawl/Sm4sh/Ultimate"
		value={CustomElement.InGameCurrentPlayerCharacterSeriesSymbolUltimate}
		on:select={select}
	>
		Current Player Series Symbol Ultimate
	</SelectOption>
	<SelectOption
		description="Current Player Percent - 24%"
		value={CustomElement.InGameCurrentPlayerPercent}
		on:select={select}
	>
		Current Player Percent
	</SelectOption>
	<SelectOption
		description="Current Player Percent With Decimals - 24.6% "
		value={CustomElement.InGameCurrentPlayerPercentDecimal}
		on:select={select}
	>
		Current Player Percent Decimal
	</SelectOption>
	<SelectOption
		description="Current Player Combo Counter"
		value={CustomElement.InGameCurrentPlayerComboCounter}
		on:select={select}
	>
		Current Player Combo Counter
	</SelectOption>
</div>
