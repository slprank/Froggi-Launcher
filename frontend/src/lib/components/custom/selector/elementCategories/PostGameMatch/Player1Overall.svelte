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
		value={CustomElement.PostGameMatchPlayer1OverallBeneficialTradeCount}
		on:select={select}
	>
		Beneficial Trade Count
	</SelectOption>
	<SelectOption
		description="Player1 Beneficial Trade Ratio Over Opponent"
		value={CustomElement.PostGameMatchPlayer1OverallBeneficialTradeRatio}
		on:select={select}
	>
		Beneficial Trade Ratio
	</SelectOption>
	<SelectOption
		description="Player1 Total Number Of Counter Hits"
		value={CustomElement.PostGameMatchPlayer1OverallCounterHitCount}
		on:select={select}
	>
		Counter Hit Count
	</SelectOption>
	<SelectOption
		description="Player1 Counter Hit Ratio Over Opponent"
		value={CustomElement.PostGameMatchPlayer1OverallCounterHitRatio}
		on:select={select}
	>
		Counter Hit Ratio
	</SelectOption>
	<SelectOption
		description="Player1 Total Damage Dealt"
		value={CustomElement.PostGameMatchPlayer1OverallDamageTotal}
		on:select={select}
	>
		Damage Total
	</SelectOption>
	<SelectOption
		description="Player1 Total Number Of Openings Won"
		value={CustomElement.PostGameMatchPlayer1OverallOpeningsTotal}
		on:select={select}
	>
		Openings Total
	</SelectOption>
	<SelectOption
		description="Player1 Total Damage Per Opening"
		value={CustomElement.PostGameMatchPlayer1OverallDamagePerOpening}
		on:select={select}
	>
		Damage Per Opening
	</SelectOption>
	<SelectOption
		description="Player1 Openings Per Kill"
		value={CustomElement.PostGameMatchPlayer1OverallOpeningsPerKill}
		on:select={select}
	>
		Openings Per Kill
	</SelectOption>
	<SelectOption
		description="Player1 Total Digital Inputs"
		value={CustomElement.PostGameMatchPlayer1OverallDigitalInputsTotal}
		on:select={select}
	>
		Digital Inputs Total
	</SelectOption>
	<SelectOption
		description="Player1 Digital Input Per Minute"
		value={CustomElement.PostGameMatchPlayer1OverallDigitalInputsPerMinute}
		on:select={select}
	>
		Digital Inputs/Min
	</SelectOption>
	<SelectOption
		description="Player1 Digital Input Per Second"
		value={CustomElement.PostGameMatchPlayer1OverallDigitalInputsPerSecond}
		on:select={select}
	>
		Digital Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Player1 Total Inputs"
		value={CustomElement.PostGameMatchPlayer1OverallInputsTotal}
		on:select={select}
	>
		Inputs Total
	</SelectOption>
	<SelectOption
		description="Player1 Input Per Minute"
		value={CustomElement.PostGameMatchPlayer1OverallInputsPerMinute}
		on:select={select}
	>
		Inputs/Min
	</SelectOption>
	<SelectOption
		description="Player1 Input Per Second"
		value={CustomElement.PostGameMatchPlayer1OverallInputsPerSecond}
		on:select={select}
	>
		Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Player1 Neutral Wins Count"
		value={CustomElement.PostGameMatchPlayer1OverallNeutralWinsCount}
		on:select={select}
	>
		Neutral Wins Count
	</SelectOption>
	<SelectOption
		description="Player1 Neutral Wins Ratio Over Opponent"
		value={CustomElement.PostGameMatchPlayer1OverallNeutralWinsRatio}
		on:select={select}
	>
		Neutral Wins Ratio
	</SelectOption>
</div>
