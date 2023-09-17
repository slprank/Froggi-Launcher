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
		description="Player 2 Slippi Tag"
		customElement={CustomElement.SlippiRankPlayer2Tag}
		on:select={select}
	>
		Tag
	</ElementOption>
	<ElementOption
		description="Player 2 Connect Code"
		customElement={CustomElement.SlippiRankPlayer2ConnectCode}
		on:select={select}
	>
		Connect Code
	</ElementOption>
	<ElementOption
		description="Player 2 Slippi Rank Icon"
		customElement={CustomElement.SlippiRankPlayer2RankIcon}
		on:select={select}
	>
		Rank Icon
	</ElementOption>
	<ElementOption
		description="Player 2 Slippi Rank - Text"
		customElement={CustomElement.SlippiRankPlayer2RankText}
		on:select={select}
	>
		Rank Text
	</ElementOption>
	<ElementOption
		description="Player 2 Slippi Rating"
		customElement={CustomElement.SlippiRankPlayer2Rating}
		on:select={select}
	>
		Rating
	</ElementOption>
	<ElementOption
		description="Player 2 Continent"
		customElement={CustomElement.SlippiRankPlayer2Continent}
		on:select={select}
	>
		Continent
	</ElementOption>
	<ElementOption
		description="Player 2 Continent Initials"
		customElement={CustomElement.SlippiRankPlayer2ContinentInitials}
		on:select={select}
	>
		Continent Initials
	</ElementOption>
	<ElementOption
		description="Player 2 Global Placement"
		customElement={CustomElement.SlippiRankPlayer2DailyGlobalPlacement}
		on:select={select}
	>
		Global Placement
	</ElementOption>
	<ElementOption
		description="Player 2 Regional Placement"
		customElement={CustomElement.SlippiRankPlayer2DailyRegionalPlacement}
		on:select={select}
	>
		Regional Placement
	</ElementOption>
	<ElementOption
		description="Player 2 Ranked Wins"
		customElement={CustomElement.SlippiRankPlayer2Wins}
		on:select={select}
	>
		Rank Wins
	</ElementOption>
	<ElementOption
		description="Player 2 Ranked Wins - Percent"
		customElement={CustomElement.SlippiRankPlayer2WinsPercent}
		on:select={select}
	>
		Rank Wins - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 Ranked Losses"
		customElement={CustomElement.SlippiRankPlayer2Losses}
		on:select={select}
	>
		Rank Losses
	</ElementOption>
	<ElementOption
		description="Player 2 Ranked Losses - Percent"
		customElement={CustomElement.SlippiRankPlayer2LossesPercent}
		on:select={select}
	>
		Rank Losses - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 Most Played Character - Text"
		customElement={CustomElement.SlippiRankPlayer2Character1}
		on:select={select}
	>
		Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Player 2 Most Played Character - Percent"
		customElement={CustomElement.SlippiRankPlayer2Character1Percent}
		on:select={select}
	>
		Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 Most Played Character - Icon"
		customElement={CustomElement.SlippiRankPlayer2Character2Icon}
		on:select={select}
	>
		Most Played Character - Icon
	</ElementOption>
	<ElementOption
		description="Player 2 2nd Most Player Character - Text"
		customElement={CustomElement.SlippiRankPlayer2Character2}
		on:select={select}
	>
		2nd Most Played Character - Text
	</ElementOption>
	<ElementOption
		description="Player 2 2nd Most Player Character - Percent"
		customElement={CustomElement.SlippiRankPlayer2Character2Percent}
		on:select={select}
	>
		2nd Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 2nd Most Player Character - Icon"
		customElement={CustomElement.SlippiRankPlayer2Character2Icon}
		on:select={select}
	>
		2nd Most Played Character - Icon
	</ElementOption>
	<ElementOption
		description="Player 2 3rd Most Player Character - Text"
		customElement={CustomElement.SlippiRankPlayer2Character3}
		on:select={select}
	>
		3rd Most Played Character
	</ElementOption>
	<ElementOption
		description="Player 2 3rd Most Player Character - Percent"
		customElement={CustomElement.SlippiRankPlayer2Character3Percent}
		on:select={select}
	>
		3nd Most Played Character - Percent
	</ElementOption>
	<ElementOption
		description="Player 2 3rd Most Player Character - Icon"
		customElement={CustomElement.SlippiRankPlayer2Character3Icon}
		on:select={select}
	>
		3rd Most Played Character - Icon
	</ElementOption>
</div>
