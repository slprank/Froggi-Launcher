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
		description="Current Player Number Of Dash Attack Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountDash}
		on:select={select}
	>
		Dash Attack Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Jab-1 Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountJab}
		on:select={select}
	>
		Jab-1 Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Jab-2 Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountJab2}
		on:select={select}
	>
		Jab-2 Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Jab-3 Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountJab3}
		on:select={select}
	>
		Jab-3 Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Multi Jabs Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountJabMulti}
		on:select={select}
	>
		Jab-Multi Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Back Air Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountBair}
		on:select={select}
	>
		Back Air Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Down Air Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountDair}
		on:select={select}
	>
		Down Air Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Forward Air Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountFair}
		on:select={select}
	>
		Forward Air Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Up Air Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountUair}
		on:select={select}
	>
		Up Air Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Neutral Air Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountNair}
		on:select={select}
	>
		Neutral Air Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Down Tilt Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountDsmash}
		on:select={select}
	>
		Down Smash Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Forward Smash Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountFsmash}
		on:select={select}
	>
		Forward Smash Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Up Smash Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountUsmash}
		on:select={select}
	>
		Up Smash Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Down Tilt Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountDtilt}
		on:select={select}
	>
		Down Tilt Count
	</ElementOption>
	<ElementOption
		description="Current Player Number Of Forward Tilt Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountFtilt}
		on:select={select}
	>
		Forward Tilt Count
	</ElementOption>

	<ElementOption
		description="Current Player Number Of Up Tilt Executed"
		customElement={CustomElement.PostGameCurrentPlayerAttackCountUtilt}
		on:select={select}
	>
		Up Tilt Count
	</ElementOption>
</div>
