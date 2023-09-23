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
		description="Player1 Total Number Of Beneficial Trades"
		customElement={CustomElement.PostGamePlayer1OverallBeneficialTradeCount}
		on:select={select}
	>
		Beneficial Trade Count
	</ElementOption>
	<ElementOption
		description="Player1 Beneficial Trade Ratio Over Opponent"
		customElement={CustomElement.PostGamePlayer1OverallBeneficialTradeRatio}
		on:select={select}
	>
		Beneficial Trade Ratio
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Counter Hits"
		customElement={CustomElement.PostGamePlayer1OverallCounterHitCount}
		on:select={select}
	>
		Counter Hit Count
	</ElementOption>
	<ElementOption
		description="Player1 Counter Hit Ratio Over Opponent"
		customElement={CustomElement.PostGamePlayer1OverallCounterHitRatio}
		on:select={select}
	>
		Counter Hit Ratio
	</ElementOption>
	<ElementOption
		description="Player1 Total Damage Dealt"
		customElement={CustomElement.PostGamePlayer1OverallDamageTotal}
		on:select={select}
	>
		Damage Total
	</ElementOption>
	<ElementOption
		description="Player1 Total Number Of Openings Won"
		customElement={CustomElement.PostGamePlayer1OverallOpeningsTotal}
		on:select={select}
	>
		Openings Total
	</ElementOption>
	<ElementOption
		description="Player1 Total Damage Per Opening"
		customElement={CustomElement.PostGamePlayer1OverallDamagePerOpening}
		on:select={select}
	>
		Damage Per Opening
	</ElementOption>
	<ElementOption
		description="Player1 Openings Per Kill"
		customElement={CustomElement.PostGamePlayer1OverallOpeningsPerKill}
		on:select={select}
	>
		Openings Per Kill
	</ElementOption>
	<ElementOption
		description="Player1 Total Digital Inputs"
		customElement={CustomElement.PostGamePlayer1OverallDigitalInputsTotal}
		on:select={select}
	>
		Digital Inputs Total
	</ElementOption>
	<ElementOption
		description="Player1 Digital Input Per Minute"
		customElement={CustomElement.PostGamePlayer1OverallDigitalInputsPerMinute}
		on:select={select}
	>
		Digital Inputs/Min
	</ElementOption>
	<ElementOption
		description="Player1 Digital Input Per Second"
		customElement={CustomElement.PostGamePlayer1OverallDigitalInputsPerSecond}
		on:select={select}
	>
		Digital Inputs/Sec
	</ElementOption>
	<ElementOption
		description="Player1 Total Inputs"
		customElement={CustomElement.PostGamePlayer1OverallInputsTotal}
		on:select={select}
	>
		Inputs Total
	</ElementOption>
	<ElementOption
		description="Player1 Input Per Minute"
		customElement={CustomElement.PostGamePlayer1OverallInputsPerMinute}
		on:select={select}
	>
		Inputs/Min
	</ElementOption>
	<ElementOption
		description="Player1 Input Per Second"
		customElement={CustomElement.PostGamePlayer1OverallInputsPerSecond}
		on:select={select}
	>
		Inputs/Sec
	</ElementOption>
	<ElementOption
		description="Player1 Neutral Wins Count"
		customElement={CustomElement.PostGamePlayer1OverallNeutralWinsCount}
		on:select={select}
	>
		Neutral Wins Count
	</ElementOption>
	<ElementOption
		description="Player1 Neutral Wins Ratio Over Opponent"
		customElement={CustomElement.PostGamePlayer1OverallNeutralWinsRatio}
		on:select={select}
	>
		Neutral Wins Ratio
	</ElementOption>
	<ElementOption
		description="Player1 Stocks Remaining At The End Of The Game"
		customElement={CustomElement.PostGamePlayer1OverallStocksRemaining}
		on:select={select}
	>
		Remaining Stocks
	</ElementOption>
</div>
