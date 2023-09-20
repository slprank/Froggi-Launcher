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
		description="Player 1 Ongoing Set Score"
		customElement={CustomElement.CurrentSetPlayer1Score}
		on:select={select}
	>
		Player 1 Set Score
	</ElementOption>
	<ElementOption
		description="Player 2 Ongoing Set Score"
		customElement={CustomElement.CurrentSetPlayer2Score}
		on:select={select}
	>
		Player 2 Set Score
	</ElementOption>
</div>
