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
		value={CustomElement.PostGameMatchCurrentPlayerOverallBeneficialTradeCount}
		on:select={select}
	>
		Beneficial Trade Count
	</SelectOption>
	<SelectOption
		description="Current Player Beneficial Trade Ratio Over Opponent"
		value={CustomElement.PostGameMatchCurrentPlayerOverallBeneficialTradeRatio}
		on:select={select}
	>
		Beneficial Trade Ratio
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Counter Hits"
		value={CustomElement.PostGameMatchCurrentPlayerOverallCounterHitCount}
		on:select={select}
	>
		Counter Hit Count
	</SelectOption>
	<SelectOption
		description="Current Player Counter Hit Ratio Over Opponent"
		value={CustomElement.PostGameMatchCurrentPlayerOverallCounterHitRatio}
		on:select={select}
	>
		Counter Hit Ratio
	</SelectOption>
	<SelectOption
		description="Current Player Total Damage Dealt"
		value={CustomElement.PostGameMatchCurrentPlayerOverallDamageTotal}
		on:select={select}
	>
		Damage Total
	</SelectOption>
	<SelectOption
		description="Current Player Total Number Of Openings Won"
		value={CustomElement.PostGameMatchCurrentPlayerOverallOpeningsTotal}
		on:select={select}
	>
		Openings Total
	</SelectOption>
	<SelectOption
		description="Current Player Total Damage Per Opening"
		value={CustomElement.PostGameMatchCurrentPlayerOverallDamagePerOpening}
		on:select={select}
	>
		Damage Per Opening
	</SelectOption>
	<SelectOption
		description="Current Player Openings Per Kill"
		value={CustomElement.PostGameMatchCurrentPlayerOverallOpeningsPerKill}
		on:select={select}
	>
		Openings Per Kill
	</SelectOption>
	<SelectOption
		description="Current Player Total Digital Inputs"
		value={CustomElement.PostGameMatchCurrentPlayerOverallDigitalInputsTotal}
		on:select={select}
	>
		Digital Inputs Total
	</SelectOption>
	<SelectOption
		description="Current Player Digital Input Per Minute"
		value={CustomElement.PostGameMatchCurrentPlayerOverallDigitalInputsPerMinute}
		on:select={select}
	>
		Digital Inputs/Min
	</SelectOption>
	<SelectOption
		description="Current Player Digital Input Per Second"
		value={CustomElement.PostGameMatchCurrentPlayerOverallDigitalInputsPerSecond}
		on:select={select}
	>
		Digital Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Current Player Total Inputs"
		value={CustomElement.PostGameMatchCurrentPlayerOverallInputsTotal}
		on:select={select}
	>
		Inputs Total
	</SelectOption>
	<SelectOption
		description="Current Player Input Per Minute"
		value={CustomElement.PostGameMatchCurrentPlayerOverallInputsPerMinute}
		on:select={select}
	>
		Inputs/Min
	</SelectOption>
	<SelectOption
		description="Current Player Input Per Second"
		value={CustomElement.PostGameMatchCurrentPlayerOverallInputsPerSecond}
		on:select={select}
	>
		Inputs/Sec
	</SelectOption>
	<SelectOption
		description="Current Player Neutral Wins Count"
		value={CustomElement.PostGameMatchCurrentPlayerOverallNeutralWinsCount}
		on:select={select}
	>
		Neutral Wins Count
	</SelectOption>
	<SelectOption
		description="Current Player Neutral Wins Ratio Over Opponent"
		value={CustomElement.PostGameMatchCurrentPlayerOverallNeutralWinsRatio}
		on:select={select}
	>
		Neutral Wins Ratio
	</SelectOption>
</div>
