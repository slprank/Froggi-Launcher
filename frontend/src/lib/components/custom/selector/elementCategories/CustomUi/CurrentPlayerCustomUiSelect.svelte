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
		description="Current Player Render"
		value={CustomElement.InGameCurrentPlayerCharacterRender}
		on:select={select}
	>
		Current Player Render
	</SelectOption>
	<SelectOption
		description="Current Player Live In-Game Percent - 24%"
		value={CustomElement.InGameCurrentPlayerPercent}
		on:select={select}
	>
		Current Player Percent
	</SelectOption>
	<SelectOption
		description="Current Player Live In-Game Percent With Decimals - 24.6% "
		value={CustomElement.InGameCurrentPlayerPercentDecimal}
		on:select={select}
	>
		Current Player Percent Decimal
	</SelectOption>
</div>
