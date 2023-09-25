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
		description="Player 1 Stock Icon"
		customElement={CustomElement.InGamePlayer1CharacterIcon}
		on:select={select}
	>
		Player 1 Stock Icon
	</ElementOption>
	<ElementOption
		description="Player 1 Render"
		customElement={CustomElement.InGamePlayer1CharacterRender}
		on:select={select}
	>
		Player 1 Render
	</ElementOption>
	<ElementOption
		description="Player 1 Live In-Game Percent - 24%"
		customElement={CustomElement.InGamePlayer1Percent}
		on:select={select}
	>
		Player 1 Percent
	</ElementOption>
	<ElementOption
		description="Player 1 Live In-Game Percent With Decimals - 24.6% "
		customElement={CustomElement.InGamePlayer1PercentDecimal}
		on:select={select}
	>
		Player 1 Percent Decimal
	</ElementOption>
</div>
