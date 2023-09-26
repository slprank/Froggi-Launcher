<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../SelectOption.svelte';
	import { VisibilityOption } from '$lib/models/enum';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="While Game Is Running"
		value={VisibilityOption.Running}
		on:select={select}
	>
		Game Active
	</SelectOption>
	<SelectOption
		description="While Game Is Paused"
		value={VisibilityOption.Paused}
		on:select={select}
	>
		Game Paused
	</SelectOption>
	<SelectOption
		description="When Game Starts And Neither Player Can Move Their Character"
		value={VisibilityOption.StartInactionable}
		on:select={select}
	>
		Players Inactionable
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
