<script lang="ts">
	import { CustomElement } from '$lib/models/constants/customElement';
	import { createEventDispatcher } from 'svelte';
	import SelectOption from '../../visibilityCategories/SelectVisibilityOption.svelte';

	const dispatch = createEventDispatcher();

	function select(customElement: CustomEvent<CustomElement>) {
		dispatch('select', customElement.detail);
	}
	console.log('here');
</script>

<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Number Of Dash Attack Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountDash}
		on:select={select}
	>
		Dash Attack Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Jab-1 Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountJab}
		on:select={select}
	>
		Jab-1 Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Jab-2 Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountJab2}
		on:select={select}
	>
		Jab-2 Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Jab-3 Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountJab3}
		on:select={select}
	>
		Jab-3 Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Multi Jabs Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountJabMulti}
		on:select={select}
	>
		Jab-Multi Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Back Air Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountBair}
		on:select={select}
	>
		Back Air Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Down Air Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountDair}
		on:select={select}
	>
		Down Air Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Forward Air Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountFair}
		on:select={select}
	>
		Forward Air Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Up Air Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountUair}
		on:select={select}
	>
		Up Air Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Neutral Air Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountNair}
		on:select={select}
	>
		Neutral Air Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Down Tilt Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountDsmash}
		on:select={select}
	>
		Down Smash Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Forward Smash Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountFsmash}
		on:select={select}
	>
		Forward Smash Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Up Smash Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountUsmash}
		on:select={select}
	>
		Up Smash Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Down Tilt Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountDtilt}
		on:select={select}
	>
		Down Tilt Count
	</SelectOption>
	<SelectOption
		description="Current Player Number Of Forward Tilt Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountFtilt}
		on:select={select}
	>
		Forward Tilt Count
	</SelectOption>

	<SelectOption
		description="Current Player Number Of Up Tilt Executed"
		value={CustomElement.PostGameMatchCurrentPlayerAttackCountUtilt}
		on:select={select}
	>
		Up Tilt Count
	</SelectOption>
</div>
