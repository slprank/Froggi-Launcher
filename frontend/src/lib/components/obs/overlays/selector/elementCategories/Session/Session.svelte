<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '$lib/components/obs/overlays/selector/visibilityCategories/SelectVisibilityOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Session Number Of Wins"
		value={CustomElement.SessionWins}
		on:select={select}
	>
		Wins
	</SelectOption>
	<SelectOption
		description="Current Session Number Of Losses"
		value={CustomElement.SessionLosses}
		on:select={select}
	>
		Losses
	</SelectOption>
	<SelectOption
		description="Current Session Number Of Games"
		value={CustomElement.SessionGameNumber}
		on:select={select}
	>
		Games
	</SelectOption>
	<SelectOption
		description="Current Session Net Rating Change"
		value={CustomElement.SessionRating}
		on:select={select}
	>
		Rating
	</SelectOption>
</div>
