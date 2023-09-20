<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import { createEventDispatcher } from 'svelte';
	import ElementOption from '../ElementOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<ElementOption
		description="Player 2 Stock Icon"
		customElement={CustomElement.InGamePlayer2CharacterIcon}
		on:select={select}
	>
		Player 2 Stock Icon
	</ElementOption>
	<ElementOption
		description="Player 2 Stock Render"
		customElement={CustomElement.InGamePlayer2CharacterRender}
		on:select={select}
	>
		Player 2 Stock Render
	</ElementOption>
	<ElementOption
		description="Player 2 Live In-Game Percent - 24%"
		customElement={CustomElement.InGamePlayer2Percent}
		on:select={select}
	>
		Player 2 Percent
	</ElementOption>
	<ElementOption
		description="Player 2 Live In-Game Percent With Decimals - 24.6%"
		customElement={CustomElement.InGamePlayer2PercentDecimal}
		on:select={select}
	>
		Player 2 Percent Decimal
	</ElementOption>
</div>
