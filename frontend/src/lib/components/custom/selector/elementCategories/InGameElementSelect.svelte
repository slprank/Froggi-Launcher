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
		description="Current Player Slippi Tag"
		customElement={CustomElement.Player1Tag}
		on:select={select}
	>
		Current Player Tag
	</ElementOption>
	<ElementOption
		description="Player 1 Slippi Tag"
		customElement={CustomElement.Player1Tag}
		on:select={select}
	>
		Player 1 Tag
	</ElementOption>
	<ElementOption
		description="Player 2 Slippi Tag"
		customElement={CustomElement.Player2Tag}
		on:select={select}
	>
		Player 2 Tag
	</ElementOption>
	<ElementOption
		description="Current Player Slippi Rank Icon"
		customElement={CustomElement.CurrentPlayerRankIcon}
		on:select={select}
	>
		Current Player Rank Icon
	</ElementOption>
	<ElementOption
		description="Player 1 Slippi Rank Icon"
		customElement={CustomElement.Player1RankIcon}
		on:select={select}
	>
		Player 1 Rank Icon
	</ElementOption>
	<ElementOption
		description="Player 2 Slippi Rank Icon"
		customElement={CustomElement.Player2RankIcon}
		on:select={select}
	>
		Player 2 Rank Icon
	</ElementOption>
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
		description="Current Player Character Render - CSS"
		customElement={CustomElement.CurrentPlayerCharacterRender}
		on:select={select}
	>
		Current Player Character Render
	</ElementOption>
	<ElementOption
		description="Player 1 Character Render - CSS"
		customElement={CustomElement.Player1CharacterRender}
		on:select={select}
	>
		Player 1 Character Render
	</ElementOption>
	<ElementOption
		description="Player 2 Character Render - CSS"
		customElement={CustomElement.Player2CharacterRender}
		on:select={select}
	>
		Player 2 Character Render
	</ElementOption>
	<ElementOption
		description="Current Player Character Icon - CSS"
		customElement={CustomElement.CurrentPlayerCharacterIcon}
		on:select={select}
	>
		Current Player Character Icon
	</ElementOption>
	<ElementOption
		description="Player 1 Character Icon - CSS"
		customElement={CustomElement.Player1CharacterIcon}
		on:select={select}
	>
		Player 1 Character Icon
	</ElementOption>
	<ElementOption
		description="Player 2 Character Icon - CSS"
		customElement={CustomElement.Player2CharacterIcon}
		on:select={select}
	>
		Player 2 Character Icon
	</ElementOption>

	<ElementOption
		description="Current game mode - Ranked/Unranked/Versus"
		customElement={CustomElement.GameMode}
		on:select={select}
	>
		Game Mode
	</ElementOption>
	<ElementOption
		description="Best of 3/5 - Bo3 while playing ranked - Manually set through dashboard"
		customElement={CustomElement.BestOf}
		on:select={select}
	>
		Best Of
	</ElementOption>
</div>
