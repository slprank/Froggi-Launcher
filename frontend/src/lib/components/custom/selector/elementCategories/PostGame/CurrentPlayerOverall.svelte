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
		description="Current Player Total Number Of Beneficial Trades"
		customElement={CustomElement.PostGameCurrentPlayerOverallBeneficialTradeCount}
		on:select={select}
	>
		Beneficial Trade Count
	</ElementOption>
	<ElementOption
		description="Current Player Beneficial Trade Ratio Over Opponent"
		customElement={CustomElement.PostGameCurrentPlayerOverallBeneficialTradeRatio}
		on:select={select}
	>
		Beneficial Trade Ratio
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Counter Hits"
		customElement={CustomElement.PostGameCurrentPlayerOverallCounterHitCount}
		on:select={select}
	>
		Counter Hit Count
	</ElementOption>
	<ElementOption
		description="Current Player Counter Hit Ratio Over Opponent"
		customElement={CustomElement.PostGameCurrentPlayerOverallCounterHitRatio}
		on:select={select}
	>
		Counter Hit Ratio
	</ElementOption>
	<ElementOption
		description="Current Player Total Damage Dealt"
		customElement={CustomElement.PostGameCurrentPlayerOverallDamageTotal}
		on:select={select}
	>
		Damage Total
	</ElementOption>
	<ElementOption
		description="Current Player Total Number Of Openings Won"
		customElement={CustomElement.PostGameCurrentPlayerOverallOpeningsTotal}
		on:select={select}
	>
		Openings Total
	</ElementOption>
	<ElementOption
		description="Current Player Total Damage Per Opening"
		customElement={CustomElement.PostGameCurrentPlayerOverallDamagePerOpening}
		on:select={select}
	>
		Damage Per Opening
	</ElementOption>
	<ElementOption
		description="Current Player Openings Per Kill"
		customElement={CustomElement.PostGameCurrentPlayerOverallOpeningsPerKill}
		on:select={select}
	>
		Openings Per Kill
	</ElementOption>
	<ElementOption
		description="Current Player Total Digital Inputs"
		customElement={CustomElement.PostGameCurrentPlayerOverallDigitalInputsTotal}
		on:select={select}
	>
		Digital Inputs Total
	</ElementOption>
	<ElementOption
		description="Current Player Digital Input Per Minute"
		customElement={CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerMinute}
		on:select={select}
	>
		Digital Inputs/Min
	</ElementOption>
	<ElementOption
		description="Current Player Digital Input Per Second"
		customElement={CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerSecond}
		on:select={select}
	>
		Digital Inputs/Sec
	</ElementOption>
	<ElementOption
		description="Current Player Total Inputs"
		customElement={CustomElement.PostGameCurrentPlayerOverallInputsTotal}
		on:select={select}
	>
		Inputs Total
	</ElementOption>
	<ElementOption
		description="Current Player Input Per Minute"
		customElement={CustomElement.PostGameCurrentPlayerOverallInputsPerMinute}
		on:select={select}
	>
		Inputs/Min
	</ElementOption>
	<ElementOption
		description="Current Player Input Per Second"
		customElement={CustomElement.PostGameCurrentPlayerOverallInputsPerSecond}
		on:select={select}
	>
		Inputs/Sec
	</ElementOption>
	<ElementOption
		description="Current Player Neutral Wins Count"
		customElement={CustomElement.PostGameCurrentPlayerOverallNeutralWinsCount}
		on:select={select}
	>
		Neutral Wins Count
	</ElementOption>
	<ElementOption
		description="Current Player Neutral Wins Ratio Over Opponent"
		customElement={CustomElement.PostGameCurrentPlayerOverallNeutralWinsRatio}
		on:select={select}
	>
		Neutral Wins Ratio
	</ElementOption>
	<ElementOption
		description="Current Player Stocks Remaining At The End Of The Game"
		customElement={CustomElement.PostGameCurrentPlayerOverallStocksRemaining}
		on:select={select}
	>
		Remaining Stocks
	</ElementOption>
</div>
