<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../SelectOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Player 1 Ongoing Set Score"
		value={CustomElement.CurrentSetPlayer1Score}
		on:select={select}
	>
		Player 1 Set Score
	</SelectOption>
	<SelectOption
		description="Player 2 Ongoing Set Score"
		value={CustomElement.CurrentSetPlayer2Score}
		on:select={select}
	>
		Player 2 Set Score
	</SelectOption>
</div>
