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
		description="Player1 Total Number Of Beneficial Trades"
		value={CustomElement.PostGamePlayer1OverallBeneficialTradeCount}
		on:select={select}
	>
		Beneficial Trade Count
	</SelectOption>
	<SelectOption
		description="Player1 Beneficial Trade Ratio Over Opponent"
		value={CustomElement.PostGamePlayer1OverallBeneficialTradeRatio}
		on:select={select}
	>
		Beneficial Trade Ratio
	</SelectOption>
	<SelectOption
		description="Player1 Total Number Of Counter Hits"
		value={CustomElement.PostGamePlayer1OverallCounterHitCount}
		on:select={select}
	>
		Counter Hit Count
	</SelectOption>
	<SelectOption
		description="Player1 Counter Hit Ratio Over Opponent"
		value={CustomElement.PostGamePlayer1OverallCounterHitRatio}
		on:select={select}
	>
		Counter Hit Ratio
	</SelectOption>
	<SelectOption
		description="Player1 Total Damage Dealt"
		value={CustomElement.PostGamePlayer1OverallDamageTotal}
		on:select={select}
	>
		Damage Total
	</SelectOption>
	<SelectOption
		description="Player1 Total Number Of Openings Won"
		value={CustomElement.PostGamePlayer1OverallOpeningsTotal}
		on:select={select}
	>
		Openings Total
	</SelectOption>
	<SelectOption
		description="Player1 Total Damage Per Opening"
		value={CustomElement.PostGamePlayer1OverallDamagePerOpening}
		on:select={select}
	>
		Damage Per Opening
	</SelectOption>
	<SelectOption
		description="Player1 Openings Per Kill"
		value={CustomElement.PostGamePlayer1OverallOpeningsPerKill}
		on:select={select}
	>
		Openings Per Kill
	</SelectOption>
	<SelectOption
		description="Player1 Total Digital Inputs"
		value={CustomElement.PostGamePlayer1OverallDigitalInputsTotal}
		on:select={select}
	>
		Digital Inputs Total
	</SelectOption>
	<SelectOption
		description="Player1 Digital Input Per Minute"
		value={CustomElement.PostGamePlayer1OverallDigitalInputsPerMinute}
		on:select={select}
	>
		Digital Inputs/Min
	</SelectOption>
	<SelectOption
		description="Player1 Digital Input Per Second"
		value={CustomElement.PostGamePlayer1OverallDigitalInputsPerSecond}
		on:select={select}
	>
		Digital Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Player1 Total Inputs"
		value={CustomElement.PostGamePlayer1OverallInputsTotal}
		on:select={select}
	>
		Inputs Total
	</SelectOption>
	<SelectOption
		description="Player1 Input Per Minute"
		value={CustomElement.PostGamePlayer1OverallInputsPerMinute}
		on:select={select}
	>
		Inputs/Min
	</SelectOption>
	<SelectOption
		description="Player1 Input Per Second"
		value={CustomElement.PostGamePlayer1OverallInputsPerSecond}
		on:select={select}
	>
		Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Player1 Neutral Wins Count"
		value={CustomElement.PostGamePlayer1OverallNeutralWinsCount}
		on:select={select}
	>
		Neutral Wins Count
	</SelectOption>
	<SelectOption
		description="Player1 Neutral Wins Ratio Over Opponent"
		value={CustomElement.PostGamePlayer1OverallNeutralWinsRatio}
		on:select={select}
	>
		Neutral Wins Ratio
	</SelectOption>
	<SelectOption
		description="Player1 Stocks Remaining At The End Of The Game"
		value={CustomElement.PostGamePlayer1OverallStocksRemaining}
		on:select={select}
	>
		Remaining Stocks
	</SelectOption>
</div>
