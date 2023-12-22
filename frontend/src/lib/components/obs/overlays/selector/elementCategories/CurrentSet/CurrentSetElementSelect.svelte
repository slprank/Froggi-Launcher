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
		description="Ongoing Set Game Mode - Local/Direct/Unranked/Ranked"
		value={CustomElement.MatchGameMode}
		on:select={select}
	>
		Game Mode
	</SelectOption>
	<SelectOption
		description="Ongoing Set Best Of - 3/5"
		value={CustomElement.MatchBestOf}
		on:select={select}
	>
		Best Of
	</SelectOption>
	<SelectOption
		description="Player 1 Tag"
		value={CustomElement.MatchPlayer1Tag}
		on:select={select}
	>
		Player 1 Tag
	</SelectOption>
	<SelectOption
		description="Player 2 Tag"
		value={CustomElement.MatchPlayer2Tag}
		on:select={select}
	>
		Player 2 Tag
	</SelectOption>
	<SelectOption
		description="Player 1 Current Match Score"
		value={CustomElement.MatchPlayer1Score}
		on:select={select}
	>
		Player 1 Match Score
	</SelectOption>
	<SelectOption
		description="Player 2 Current Match Score"
		value={CustomElement.MatchPlayer2Score}
		on:select={select}
	>
		Player 2 Match Score
	</SelectOption>
</div>
