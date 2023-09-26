<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../SelectOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="While Game Is Running"
		value={CustomElement.CurrentSetPlayer1Score}
		on:select={select}
	>
		Game Active
	</SelectOption>
	<SelectOption
		description="While Game Is Paused"
		value={CustomElement.CurrentSetPlayer1Score}
		on:select={select}
	>
		Game Paused
	</SelectOption>
	<SelectOption
		description="When Game Starts And Neither Player Can Move Their Character"
		value={CustomElement.CurrentSetPlayer1Score}
		on:select={select}
	>
		Players Uncontrollable
	</SelectOption>
	<SelectOption
		description="When 'Ready' Is Being Displayed Before Game Starts"
		value={CustomElement.CurrentSetPlayer1Score}
		on:select={select}
	>
		Ready
	</SelectOption>
	<SelectOption
		description="When 'Go' Is Being Displayed Before Game Starts"
		value={CustomElement.CurrentSetPlayer1Score}
		on:select={select}
	>
		Go
	</SelectOption>
	<SelectOption
		description="When The Timer Has 5 Seconds Remaining"
		value={CustomElement.CurrentSetPlayer1Score}
		on:select={select}
	>
		Countdown
	</SelectOption>
</div>
