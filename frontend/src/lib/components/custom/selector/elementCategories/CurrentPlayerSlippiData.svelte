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
		customElement={CustomElement.CurrentPlayerTag}
		on:select={select}
	>
		Tag
	</ElementOption>
	<ElementOption
		description="Current Player Connect Code"
		customElement={CustomElement.CurrentPlayerConnectCode}
		on:select={select}
	>
		Connect Code
	</ElementOption>
	<ElementOption
		description="Current Player Slippi Rank Icon"
		customElement={CustomElement.CurrentPlayerRankIcon}
		on:select={select}
	>
		Rank Icon
	</ElementOption>
	<ElementOption
		description="Current Player Slippi Rank Text"
		customElement={CustomElement.CurrentPlayerRankText}
		on:select={select}
	>
		Rank Text
	</ElementOption>
	<ElementOption
		description="Current Player Slippi Rank Text"
		customElement={CustomElement.CurrentPlayerRating}
		on:select={select}
	>
		Rating
	</ElementOption>
	<ElementOption
		description="Current Player Continent"
		customElement={CustomElement.CurrentPlayerContinent}
		on:select={select}
	>
		Continent
	</ElementOption>
	<ElementOption
		description="Current Player Continent Initials"
		customElement={CustomElement.CurrentPlayerContinentInitials}
		on:select={select}
	>
		Continent Initials
	</ElementOption>
	<ElementOption
		description="Current Player Global Placement"
		customElement={CustomElement.CurrentPlayerDailyGlobalPlacement}
		on:select={select}
	>
		Global Placement
	</ElementOption>
	<ElementOption
		description="Current Player Regional Placement"
		customElement={CustomElement.CurrentPlayerDailyRegionalPlacement}
		on:select={select}
	>
		Regional Placement
	</ElementOption>
	<ElementOption
		description="Current Player Ranked Wins"
		customElement={CustomElement.CurrentPlayerWins}
		on:select={select}
	>
		Rank Wins
	</ElementOption>
	<ElementOption
		description="Current Player Ranked Wins - Percent"
		customElement={CustomElement.CurrentPlayerWinsPercent}
		on:select={select}
	>
		Rank Wins - Percent
	</ElementOption>
	<ElementOption
		description="Current Player Ranked Losses"
		customElement={CustomElement.CurrentPlayerLosses}
		on:select={select}
	>
		Rank Losses
	</ElementOption>
	<ElementOption
		description="Current Player Ranked Losses - Percent"
		customElement={CustomElement.CurrentPlayerLossesPercent}
		on:select={select}
	>
		Rank Losses - Percent
	</ElementOption>
	<ElementOption
		description="Current Player Most Played Character - Text"
		customElement={CustomElement.CurrentPlayerCharacter1}
		on:select={select}
	>
		Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Current Player Most Played Character - Percent"
		customElement={CustomElement.CurrentPlayerCharacter1Percent}
		on:select={select}
	>
		Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Current Player Most Played Character - Icon"
		customElement={CustomElement.CurrentPlayerCharacter1Icon}
		on:select={select}
	>
		Most Played Character - Icon
	</ElementOption>
	<ElementOption
		description="Current Player 2nd Most Player Character - Text"
		customElement={CustomElement.CurrentPlayerCharacter2}
		on:select={select}
	>
		2nd Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Current Player 2nd Most Player Character - Percent"
		customElement={CustomElement.CurrentPlayerCharacter2Percent}
		on:select={select}
	>
		2nd Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Current Player 2nd Most Player Character - Icon"
		customElement={CustomElement.CurrentPlayerCharacter2Icon}
		on:select={select}
	>
		Most Played Character 2 - Icon
	</ElementOption>
	<ElementOption
		description="Current Player 3rd Most Player Character"
		customElement={CustomElement.CurrentPlayerCharacter3}
		on:select={select}
	>
		3rd Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Current Player 3rd Most Player Character"
		customElement={CustomElement.CurrentPlayerCharacter3Percent}
		on:select={select}
	>
		3rd Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Current Player 3rd Most Player Character"
		customElement={CustomElement.CurrentPlayerCharacter3Icon}
		on:select={select}
	>
		3rd Most Played Character - Icon
	</ElementOption>
</div>
