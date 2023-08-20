<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import { createEventDispatcher } from 'svelte';
	import ElementOption from './ElementOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<ElementOption
		description="Player 1 Ongoing Set Score"
		customElement={CustomElement.Player1Score}
		on:select={select}
	>
		Player 1 Set Score
	</ElementOption>
	<ElementOption
		description="Player 2 Ongoing Set Score"
		customElement={CustomElement.Player2Score}
		on:select={select}
	>
		Player 2 Set Score
	</ElementOption>
	<ElementOption
		description="Player 1 Stock Icon"
		customElement={CustomElement.Player1CharacterIcon}
		on:select={select}
	>
		Player 1 Stock Icon
	</ElementOption>
	<ElementOption
		description="Player 2 Stock Icon"
		customElement={CustomElement.Player2CharacterIcon}
		on:select={select}
	>
		Player 2 Stock Icon
	</ElementOption>
	<ElementOption
		description="Player 1 Live In-Game Percent - 24%"
		customElement={CustomElement.Player1Percent}
		on:select={select}
	>
		Player 1 Percent
	</ElementOption>
	<ElementOption
		description="Player 2 Live In-Game Percent - 24%"
		customElement={CustomElement.Player2Percent}
		on:select={select}
	>
		Player 2 Percent
	</ElementOption>
	<ElementOption
		description="Player 1 Live In-Game Percent With Decimals - 24.6% "
		customElement={CustomElement.Player1PercentDecimal}
		on:select={select}
	>
		Player 1 Percent Decimal
	</ElementOption>
	<ElementOption
		description="Player 2 Live In-Game Percent With Decimals - 24.6%"
		customElement={CustomElement.Player2PercentDecimal}
		on:select={select}
	>
		Player 2 Percent Decimal
	</ElementOption>
</div>
