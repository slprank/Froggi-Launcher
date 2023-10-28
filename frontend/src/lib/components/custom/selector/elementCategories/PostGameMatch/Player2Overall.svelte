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
		description="Player2 Total Number Of Beneficial Trades"
		value={CustomElement.PostGameMatchPlayer2OverallBeneficialTradeCount}
		on:select={select}
	>
		Beneficial Trade Count
	</SelectOption>
	<SelectOption
		description="Player2 Beneficial Trade Ratio Over Opponent"
		value={CustomElement.PostGameMatchPlayer2OverallBeneficialTradeRatio}
		on:select={select}
	>
		Beneficial Trade Ratio
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Counter Hits"
		value={CustomElement.PostGameMatchPlayer2OverallCounterHitCount}
		on:select={select}
	>
		Counter Hit Count
	</SelectOption>
	<SelectOption
		description="Player2 Counter Hit Ratio Over Opponent"
		value={CustomElement.PostGameMatchPlayer2OverallCounterHitRatio}
		on:select={select}
	>
		Counter Hit Ratio
	</SelectOption>
	<SelectOption
		description="Player2 Total Damage Dealt"
		value={CustomElement.PostGameMatchPlayer2OverallDamageTotal}
		on:select={select}
	>
		Damage Total
	</SelectOption>
	<SelectOption
		description="Player2 Total Number Of Openings Won"
		value={CustomElement.PostGameMatchPlayer2OverallOpeningsTotal}
		on:select={select}
	>
		Openings Total
	</SelectOption>
	<SelectOption
		description="Player2 Total Damage Per Opening"
		value={CustomElement.PostGameMatchPlayer2OverallDamagePerOpening}
		on:select={select}
	>
		Damage Per Opening
	</SelectOption>
	<SelectOption
		description="Player2 Openings Per Kill"
		value={CustomElement.PostGameMatchPlayer2OverallOpeningsPerKill}
		on:select={select}
	>
		Openings Per Kill
	</SelectOption>
	<SelectOption
		description="Player2 Total Digital Inputs"
		value={CustomElement.PostGameMatchPlayer2OverallDigitalInputsTotal}
		on:select={select}
	>
		Digital Inputs Total
	</SelectOption>
	<SelectOption
		description="Player2 Digital Input Per Minute"
		value={CustomElement.PostGameMatchPlayer2OverallDigitalInputsPerMinute}
		on:select={select}
	>
		Digital Inputs/Min
	</SelectOption>
	<SelectOption
		description="Player2 Digital Input Per Second"
		value={CustomElement.PostGameMatchPlayer2OverallDigitalInputsPerSecond}
		on:select={select}
	>
		Digital Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Player2 Total Inputs"
		value={CustomElement.PostGameMatchPlayer2OverallInputsTotal}
		on:select={select}
	>
		Inputs Total
	</SelectOption>
	<SelectOption
		description="Player2 Input Per Minute"
		value={CustomElement.PostGameMatchPlayer2OverallInputsPerMinute}
		on:select={select}
	>
		Inputs/Min
	</SelectOption>
	<SelectOption
		description="Player2 Input Per Second"
		value={CustomElement.PostGameMatchPlayer2OverallInputsPerSecond}
		on:select={select}
	>
		Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Player2 Neutral Wins Count"
		value={CustomElement.PostGameMatchPlayer2OverallNeutralWinsCount}
		on:select={select}
	>
		Neutral Wins Count
	</SelectOption>
	<SelectOption
		description="Player2 Neutral Wins Ratio Over Opponent"
		value={CustomElement.PostGameMatchPlayer2OverallNeutralWinsRatio}
		on:select={select}
	>
		Neutral Wins Ratio
	</SelectOption>
</div>
