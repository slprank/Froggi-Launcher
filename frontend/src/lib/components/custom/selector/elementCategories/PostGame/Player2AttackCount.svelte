<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../SelectOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Number Of Dash Attack Executed"
		value={CustomElement.PostGamePlayer2AttackCountDash}
		on:select={select}
	>
		Dash Attack Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Jab-1 Executed"
		value={CustomElement.PostGamePlayer2AttackCountJab}
		on:select={select}
	>
		Jab-1 Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Jab-2 Executed"
		value={CustomElement.PostGamePlayer2AttackCountJab2}
		on:select={select}
	>
		Jab-2 Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Jab-3 Executed"
		value={CustomElement.PostGamePlayer2AttackCountJab3}
		on:select={select}
	>
		Jab-3 Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Multi Jabs Executed"
		value={CustomElement.PostGamePlayer2AttackCountJabMulti}
		on:select={select}
	>
		Jab-Multi Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Back Air Executed"
		value={CustomElement.PostGamePlayer2AttackCountBair}
		on:select={select}
	>
		Back Air Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Down Air Executed"
		value={CustomElement.PostGamePlayer2AttackCountDair}
		on:select={select}
	>
		Down Air Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Forward Air Executed"
		value={CustomElement.PostGamePlayer2AttackCountFair}
		on:select={select}
	>
		Forward Air Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Up Air Executed"
		value={CustomElement.PostGamePlayer2AttackCountUair}
		on:select={select}
	>
		Up Air Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Neutral Air Executed"
		value={CustomElement.PostGamePlayer2AttackCountNair}
		on:select={select}
	>
		Neutral Air Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Down Tilt Executed"
		value={CustomElement.PostGamePlayer2AttackCountDsmash}
		on:select={select}
	>
		Down Smash Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Forward Smash Executed"
		value={CustomElement.PostGamePlayer2AttackCountFsmash}
		on:select={select}
	>
		Forward Smash Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Up Smash Executed"
		value={CustomElement.PostGamePlayer2AttackCountUsmash}
		on:select={select}
	>
		Up Smash Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Down Tilt Executed"
		value={CustomElement.PostGamePlayer2AttackCountDtilt}
		on:select={select}
	>
		Down Tilt Count
	</SelectOption>
	<SelectOption
		description="Player2 Number Of Forward Tilt Executed"
		value={CustomElement.PostGamePlayer2AttackCountFtilt}
		on:select={select}
	>
		Forward Tilt Count
	</SelectOption>

	<SelectOption
		description="Player2 Number Of Up Tilt Executed"
		value={CustomElement.PostGamePlayer2AttackCountUtilt}
		on:select={select}
	>
		Up Tilt Count
	</SelectOption>
</div>
