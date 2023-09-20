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
		description="Player 1 Slippi Tag"
		customElement={CustomElement.SlippiRankPlayer1Tag}
		on:select={select}
	>
		Tag
	</ElementOption>
	<ElementOption
		description="Player 1 Connect Code"
		customElement={CustomElement.SlippiRankPlayer1ConnectCode}
		on:select={select}
	>
		Connect Code
	</ElementOption>
	<ElementOption
		description="Player 1 Slippi Rank Icon"
		customElement={CustomElement.SlippiRankPlayer1RankIcon}
		on:select={select}
	>
		Rank Icon
	</ElementOption>
	<ElementOption
		description="Player 1 Slippi Rank - Text"
		customElement={CustomElement.SlippiRankPlayer1RankText}
		on:select={select}
	>
		Rank Text
	</ElementOption>
	<ElementOption
		description="Player 1 Slippi Rating"
		customElement={CustomElement.SlippiRankPlayer1Rating}
		on:select={select}
	>
		Rating
	</ElementOption>
	<ElementOption
		description="Player 1 Continent"
		customElement={CustomElement.SlippiRankPlayer1Continent}
		on:select={select}
	>
		Continent
	</ElementOption>
	<ElementOption
		description="Player 1 Continent Initials"
		customElement={CustomElement.SlippiRankPlayer1ContinentInitials}
		on:select={select}
	>
		Continent Initials
	</ElementOption>
	<ElementOption
		description="Player 1 Global Placement"
		customElement={CustomElement.SlippiRankPlayer1DailyGlobalPlacement}
		on:select={select}
	>
		Global Placement
	</ElementOption>
	<ElementOption
		description="Player 1 Regional Placement"
		customElement={CustomElement.SlippiRankPlayer1DailyRegionalPlacement}
		on:select={select}
	>
		Regional Placement
	</ElementOption>
	<ElementOption
		description="Player 1 Ranked Wins"
		customElement={CustomElement.SlippiRankPlayer1Wins}
		on:select={select}
	>
		Rank Wins
	</ElementOption>
	<ElementOption
		description="Player 1 Ranked Wins - Percent"
		customElement={CustomElement.SlippiRankPlayer1WinsPercent}
		on:select={select}
	>
		Rank Wins - Percent
	</ElementOption>
	<ElementOption
		description="Player 1 Ranked Losses"
		customElement={CustomElement.SlippiRankPlayer1Losses}
		on:select={select}
	>
		Rank Losses
	</ElementOption>
	<ElementOption
		description="Player 1 Ranked Losses - Percent"
		customElement={CustomElement.SlippiRankPlayer1LossesPercent}
		on:select={select}
	>
		Rank Losses - Percent
	</ElementOption>
	<ElementOption
		description="Player 1 Most Played Character Name"
		customElement={CustomElement.SlippiRankPlayer1Character1}
		on:select={select}
	>
		Most Played Character Name
	</ElementOption>
	<ElementOption
		description="Player 1 Most Played Character Percent"
		customElement={CustomElement.SlippiRankPlayer1Character1Percent}
		on:select={select}
	>
		Most Played Character Percent
	</ElementOption>
	<ElementOption
		description="Player 1 Most Played Character Icon"
		customElement={CustomElement.SlippiRankPlayer1Character1Icon}
		on:select={select}
	>
		Most Played Character Icon
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character Name"
		customElement={CustomElement.SlippiRankPlayer1Character2}
		on:select={select}
	>
		2nd Most Played Character Name
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character "
		customElement={CustomElement.SlippiRankPlayer1Character2Percent}
		on:select={select}
	>
		2nd Most Played Character Percent
	</ElementOption>
	<ElementOption
		description="Player 1 2nd Most Player Character - Icon"
		customElement={CustomElement.SlippiRankPlayer1Character2Icon}
		on:select={select}
	>
		2nd Most Played Character Icon
	</ElementOption>
	<ElementOption
		description="Player 1 3rd Most Player Character - Text"
		customElement={CustomElement.SlippiRankPlayer1Character3}
		on:select={select}
	>
		3rd Most Played Character
	</ElementOption>
	<ElementOption
		description="Player 1 3rd Most Player Character - Percent"
		customElement={CustomElement.SlippiRankPlayer1Character3Percent}
		on:select={select}
	>
		3nd Most Played Character Percent
	</ElementOption>
	<ElementOption
		description="Player 1 3rd Most Player Character - Icon"
		customElement={CustomElement.SlippiRankPlayer1Character3Icon}
		on:select={select}
	>
		3rd Most Played Character Icon
	</ElementOption>
</div>
