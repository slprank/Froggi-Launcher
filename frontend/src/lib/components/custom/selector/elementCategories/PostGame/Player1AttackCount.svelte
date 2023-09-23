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
		description="Player1 Number Of Dash Attack Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountDash}
		on:select={select}
	>
		Dash Attack Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Jab-1 Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountJab}
		on:select={select}
	>
		Jab-1 Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Jab-2 Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountJab2}
		on:select={select}
	>
		Jab-2 Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Jab-3 Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountJab3}
		on:select={select}
	>
		Jab-3 Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Multi Jabs Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountJabMulti}
		on:select={select}
	>
		Jab-Multi Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Back Air Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountBair}
		on:select={select}
	>
		Back Air Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Down Air Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountDair}
		on:select={select}
	>
		Down Air Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Forward Air Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountFair}
		on:select={select}
	>
		Forward Air Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Up Air Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountUair}
		on:select={select}
	>
		Up Air Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Neutral Air Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountNair}
		on:select={select}
	>
		Neutral Air Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Down Tilt Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountDsmash}
		on:select={select}
	>
		Down Smash Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Forward Smash Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountFsmash}
		on:select={select}
	>
		Forward Smash Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Up Smash Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountUsmash}
		on:select={select}
	>
		Up Smash Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Down Tilt Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountDtilt}
		on:select={select}
	>
		Down Tilt Count
	</ElementOption>
	<ElementOption
		description="Player1 Number Of Forward Tilt Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountFtilt}
		on:select={select}
	>
		Forward Tilt Count
	</ElementOption>

	<ElementOption
		description="Player1 Number Of Up Tilt Executed"
		customElement={CustomElement.PostGamePlayer1AttackCountUtilt}
		on:select={select}
	>
		Up Tilt Count
	</ElementOption>
</div>
