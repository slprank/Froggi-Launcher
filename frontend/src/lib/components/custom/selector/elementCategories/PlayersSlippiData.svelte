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
		description="Player 1 Connect Code"
		customElement={CustomElement.Player1ConnectCode}
		on:select={select}
	>
		Player 1 Connect Code
	</ElementOption>
	<ElementOption
		description="Player 2 Connect Code"
		customElement={CustomElement.Player2ConnectCode}
		on:select={select}
	>
		Player 2 Connect Code
	</ElementOption>
	<ElementOption
		description="Player 1 Slippi Rank Icon"
		customElement={CustomElement.Player1RankIcon}
		on:select={select}
	>
		Player 1 Rank - Icon
	</ElementOption>
	<ElementOption
		description="Player 2 Slippi Rank Icon"
		customElement={CustomElement.Player2RankIcon}
		on:select={select}
	>
		Player 2 Rank - Icon
	</ElementOption>
	<ElementOption
		description="Player 1 Slippi Rank - Text"
		customElement={CustomElement.Player1RankText}
		on:select={select}
	>
		Player 1 Rank - Text
	</ElementOption>
	<ElementOption
		description="Player 2 Slippi Rank - Text"
		customElement={CustomElement.Player2RankText}
		on:select={select}
	>
		Player 2 Rank - Text
	</ElementOption>
	<ElementOption
		description="Player 1 Slippi Rating"
		customElement={CustomElement.Player1Rating}
		on:select={select}
	>
		Player 1 Rating
	</ElementOption>
	<ElementOption
		description="Player 2 Slippi Rating"
		customElement={CustomElement.Player2Rating}
		on:select={select}
	>
		Player 2 Rating
	</ElementOption>
	<ElementOption
		description="Player 1 Continent"
		customElement={CustomElement.Player1Continent}
		on:select={select}
	>
		Player 1 Continent
	</ElementOption>
	<ElementOption
		description="Player 2 Continent"
		customElement={CustomElement.Player2Continent}
		on:select={select}
	>
		Player 2 Continent
	</ElementOption>
	<ElementOption
		description="Player 1 Continent Initials"
		customElement={CustomElement.Player1ContinentInitials}
		on:select={select}
	>
		Player 1 Continent Initials
	</ElementOption>
	<ElementOption
		description="Player 2 Continent Initials"
		customElement={CustomElement.Player2ContinentInitials}
		on:select={select}
	>
		Player 2 Continent Initials
	</ElementOption>
	<ElementOption
		description="Player 1 Global Placement"
		customElement={CustomElement.Player1DailyGlobalPlacement}
		on:select={select}
	>
		Player 1 Global Placement
	</ElementOption>
	<ElementOption
		description="Player 2 Global Placement"
		customElement={CustomElement.Player2DailyGlobalPlacement}
		on:select={select}
	>
		Player 2 Global Placement
	</ElementOption>
	<ElementOption
		description="Player 1 Regional Placement"
		customElement={CustomElement.Player1DailyRegionalPlacement}
		on:select={select}
	>
		Player 1 Regional Placement
	</ElementOption>
	<ElementOption
		description="Player 2 Regional Placement"
		customElement={CustomElement.Player2DailyRegionalPlacement}
		on:select={select}
	>
		Player 2 Regional Placement
	</ElementOption>
	<ElementOption
		description="Player 1 Ranked Wins"
		customElement={CustomElement.Player1Wins}
		on:select={select}
	>
		Player 1 Rank Wins
	</ElementOption>
	<ElementOption
		description="Player 2 Ranked Wins"
		customElement={CustomElement.Player2Wins}
		on:select={select}
	>
		Player 2 Rank Wins
	</ElementOption>
	<ElementOption
		description="Player 1 Ranked Wins - Percent"
		customElement={CustomElement.Player1WinsPercent}
		on:select={select}
	>
		Player 1 Rank Wins - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 Ranked Wins - Percent"
		customElement={CustomElement.Player2WinsPercent}
		on:select={select}
	>
		Player 2 Rank Wins - Percent
	</ElementOption>
	<ElementOption
		description="Player 1 Ranked Losses"
		customElement={CustomElement.Player1Losses}
		on:select={select}
	>
		Player 1 Rank Losses
	</ElementOption>
	<ElementOption
		description="Player 2 Ranked Losses"
		customElement={CustomElement.Player2Losses}
		on:select={select}
	>
		Player 2 Rank Losses
	</ElementOption>
	<ElementOption
		description="Player 1 Ranked Losses - Percent"
		customElement={CustomElement.Player1LossesPercent}
		on:select={select}
	>
		Player 1 Rank Wins - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 Ranked Losses - Percent"
		customElement={CustomElement.Player2LossesPercent}
		on:select={select}
	>
		Player 2 Rank Losses - Percent
	</ElementOption>
	<ElementOption
		description="Player 1 Most Played Character - Text"
		customElement={CustomElement.Player1Character1}
		on:select={select}
	>
		Player 1 Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Player 2 Most Played Character - Text"
		customElement={CustomElement.Player2Character1}
		on:select={select}
	>
		Player 2 Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Player 1 Most Played Character - Percent"
		customElement={CustomElement.Player1Character1Percent}
		on:select={select}
	>
		Player 1 Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 Most Played Character - Percent"
		customElement={CustomElement.Player2Character1Percent}
		on:select={select}
	>
		Player 2 Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 1 Most Played Character - Icon"
		customElement={CustomElement.Player1Character1Icon}
		on:select={select}
	>
		Player 1 Most Played Character - Icon
	</ElementOption>
	<ElementOption
		description="Player 2 Most Played Character - Icon"
		customElement={CustomElement.Player2Character2Icon}
		on:select={select}
	>
		Player 2 Most Played Character - Icon
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character - Text"
		customElement={CustomElement.Player1Character2}
		on:select={select}
	>
		Player 1 2nd Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Player 2 2nd Most Player Character - Text"
		customElement={CustomElement.Player2Character2}
		on:select={select}
	>
		Player 2 2nd Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character - Percent"
		customElement={CustomElement.Player1Character2Percent}
		on:select={select}
	>
		Player 1 2nd Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 2nd Most Player Character - Percent"
		customElement={CustomElement.Player2Character2Percent}
		on:select={select}
	>
		Player 2 2nd Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character - Icon"
		customElement={CustomElement.Player1Character2Icon}
		on:select={select}
	>
		Player 1 2nd Most Played Character - Icon
	</ElementOption>
	<ElementOption
		description="Player 2 2nd Most Player Character - Icon"
		customElement={CustomElement.Player2Character2Icon}
		on:select={select}
	>
		Player 2 2nd Most Played Character - Icon
	</ElementOption>
	<ElementOption
		description="Player 1 3nd Most Player Character - Text"
		customElement={CustomElement.Player1Character3}
		on:select={select}
	>
		Player 1 3rd Most Played Character
	</ElementOption>
	<ElementOption
		description="Player 1 3nd Most Player Character - Text"
		customElement={CustomElement.Player2Character3}
		on:select={select}
	>
		Player 2 3rd Most Played Character
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character - Percent"
		customElement={CustomElement.Player1Character3Percent}
		on:select={select}
	>
		Player 1 3nd Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 2nd Most Player Character - Percent"
		customElement={CustomElement.Player2Character3Percent}
		on:select={select}
	>
		Player 2 3nd Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character - Icon"
		customElement={CustomElement.Player1Character3Icon}
		on:select={select}
	>
		Player 1 3rd Most Played Character - Icon
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character - Icon"
		customElement={CustomElement.Player2Character3Icon}
		on:select={select}
	>
		Player 2 3rd Most Played Character - Icon
	</ElementOption>
</div>
