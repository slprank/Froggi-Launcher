<script lang="ts">
	import { CustomElement } from '$lib/models/enum';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../SelectOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Total Number Of Beneficial Trades"
		value={CustomElement.PostGamePlayer2OverallBeneficialTradeCount}
		on:select={select}
	>
		Beneficial Trade Count
	</SelectOption>
	<SelectOption
		description="Player2 Beneficial Trade Ratio Over Opponent"
		value={CustomElement.PostGamePlayer2OverallBeneficialTradeRatio}
		on:select={select}
	>
		Beneficial Trade Ratio
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Counter Hits"
		value={CustomElement.PostGamePlayer2OverallCounterHitCount}
		on:select={select}
	>
		Counter Hit Count
	</SelectOption>
	<SelectOption
		description="Player2 Counter Hit Ratio Over Opponent"
		value={CustomElement.PostGamePlayer2OverallCounterHitRatio}
		on:select={select}
	>
		Counter Hit Ratio
	</SelectOption>
	<SelectOption
		description="Player2 Total Damage Dealt"
		value={CustomElement.PostGamePlayer2OverallDamageTotal}
		on:select={select}
	>
		Damage Total
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Openings Won"
		value={CustomElement.PostGamePlayer2OverallOpeningsTotal}
		on:select={select}
	>
		Openings Total
	</SelectOption>
	<SelectOption
		description="Player2 Total Damage Per Opening"
		value={CustomElement.PostGamePlayer2OverallDamagePerOpening}
		on:select={select}
	>
		Damage Per Opening
	</SelectOption>
	<SelectOption
		description="Player2 Openings Per Kill"
		value={CustomElement.PostGamePlayer2OverallOpeningsPerKill}
		on:select={select}
	>
		Openings Per Kill
	</SelectOption>
	<SelectOption
		description="Player2 Total Digital Inputs"
		value={CustomElement.PostGamePlayer2OverallDigitalInputsTotal}
		on:select={select}
	>
		Digital Inputs Total
	</SelectOption>
	<SelectOption
		description="Player2 Digital Input Per Minute"
		value={CustomElement.PostGamePlayer2OverallDigitalInputsPerMinute}
		on:select={select}
	>
		Digital Inputs/Min
	</SelectOption>
	<SelectOption
		description="Player2 Digital Input Per Second"
		value={CustomElement.PostGamePlayer2OverallDigitalInputsPerSecond}
		on:select={select}
	>
		Digital Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Player2 Total Inputs"
		value={CustomElement.PostGamePlayer2OverallInputsTotal}
		on:select={select}
	>
		Inputs Total
	</SelectOption>
	<SelectOption
		description="Player2 Input Per Minute"
		value={CustomElement.PostGamePlayer2OverallInputsPerMinute}
		on:select={select}
	>
		Inputs/Min
	</SelectOption>
	<SelectOption
		description="Player2 Input Per Second"
		value={CustomElement.PostGamePlayer2OverallInputsPerSecond}
		on:select={select}
	>
		Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Player2 Neutral Wins Count"
		value={CustomElement.PostGamePlayer2OverallNeutralWinsCount}
		on:select={select}
	>
		Neutral Wins Count
	</SelectOption>
	<SelectOption
		description="Player2 Neutral Wins Ratio Over Opponent"
		value={CustomElement.PostGamePlayer2OverallNeutralWinsRatio}
		on:select={select}
	>
		Neutral Wins Ratio
	</SelectOption>
	<SelectOption
		description="Player2 Stocks Remaining At The End Of The Game"
		value={CustomElement.PostGamePlayer2OverallStocksRemaining}
		on:select={select}
	>
		Remaining Stocks
	</SelectOption>
</div>
