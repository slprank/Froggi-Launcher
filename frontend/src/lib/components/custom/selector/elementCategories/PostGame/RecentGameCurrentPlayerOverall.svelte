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
		description="Current Player Total Number Of Beneficial Trades"
		value={CustomElement.PostGameCurrentPlayerOverallBeneficialTradeCount}
		on:select={select}
	>
		Beneficial Trade Count
	</SelectOption>
	<SelectOption
		description="Current Player Beneficial Trade Ratio Over Opponent"
		value={CustomElement.PostGameCurrentPlayerOverallBeneficialTradeRatio}
		on:select={select}
	>
		Beneficial Trade Ratio
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Counter Hits"
		value={CustomElement.PostGameCurrentPlayerOverallCounterHitCount}
		on:select={select}
	>
		Counter Hit Count
	</SelectOption>
	<SelectOption
		description="Current Player Counter Hit Ratio Over Opponent"
		value={CustomElement.PostGameCurrentPlayerOverallCounterHitRatio}
		on:select={select}
	>
		Counter Hit Ratio
	</SelectOption>
	<SelectOption
		description="Current Player Total Damage Dealt"
		value={CustomElement.PostGameCurrentPlayerOverallDamageTotal}
		on:select={select}
	>
		Damage Total
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Openings Won"
		value={CustomElement.PostGameCurrentPlayerOverallOpeningsTotal}
		on:select={select}
	>
		Openings Total
	</SelectOption>
	<SelectOption
		description="Current Player Total Damage Per Opening"
		value={CustomElement.PostGameCurrentPlayerOverallDamagePerOpening}
		on:select={select}
	>
		Damage Per Opening
	</SelectOption>
	<SelectOption
		description="Current Player Openings Per Kill"
		value={CustomElement.PostGameCurrentPlayerOverallOpeningsPerKill}
		on:select={select}
	>
		Openings Per Kill
	</SelectOption>
	<SelectOption
		description="Current Player Total Digital Inputs"
		value={CustomElement.PostGameCurrentPlayerOverallDigitalInputsTotal}
		on:select={select}
	>
		Digital Inputs Total
	</SelectOption>
	<SelectOption
		description="Current Player Digital Input Per Minute"
		value={CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerMinute}
		on:select={select}
	>
		Digital Inputs/Min
	</SelectOption>
	<SelectOption
		description="Current Player Digital Input Per Second"
		value={CustomElement.PostGameCurrentPlayerOverallDigitalInputsPerSecond}
		on:select={select}
	>
		Digital Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Current Player Total Inputs"
		value={CustomElement.PostGameCurrentPlayerOverallInputsTotal}
		on:select={select}
	>
		Inputs Total
	</SelectOption>
	<SelectOption
		description="Current Player Input Per Minute"
		value={CustomElement.PostGameCurrentPlayerOverallInputsPerMinute}
		on:select={select}
	>
		Inputs/Min
	</SelectOption>
	<SelectOption
		description="Current Player Input Per Second"
		value={CustomElement.PostGameCurrentPlayerOverallInputsPerSecond}
		on:select={select}
	>
		Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Current Player Neutral Wins Count"
		value={CustomElement.PostGameCurrentPlayerOverallNeutralWinsCount}
		on:select={select}
	>
		Neutral Wins Count
	</SelectOption>
	<SelectOption
		description="Current Player Neutral Wins Ratio Over Opponent"
		value={CustomElement.PostGameCurrentPlayerOverallNeutralWinsRatio}
		on:select={select}
	>
		Neutral Wins Ratio
	</SelectOption>
	<SelectOption
		description="Current Player Stocks Remaining At The End Of The Game"
		value={CustomElement.PostGameCurrentPlayerOverallStocksRemaining}
		on:select={select}
	>
		Remaining Stocks
	</SelectOption>
</div>
