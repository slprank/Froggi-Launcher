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
		description="Current Player Button A Press"
		value={CustomElement.InGameCurrentPlayerControllerButtonA}
		on:select={select}
	>
		Button A
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Button B Press"
		value={CustomElement.InGameCurrentPlayerControllerButtonB}
		on:select={select}
	>
		Button B
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Button X Press"
		value={CustomElement.InGameCurrentPlayerControllerButtonX}
		on:select={select}
	>
		Button X
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Button Y Press"
		value={CustomElement.InGameCurrentPlayerControllerButtonY}
		on:select={select}
	>
		Button Y
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Button L Press"
		value={CustomElement.InGameCurrentPlayerControllerButtonL}
		on:select={select}
	>
		Button L
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Button R Press"
		value={CustomElement.InGameCurrentPlayerControllerButtonR}
		on:select={select}
	>
		Button R
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Button Z Press"
		value={CustomElement.InGameCurrentPlayerControllerButtonZ}
		on:select={select}
	>
		Button Z
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Button D-Pad Press"
		value={CustomElement.InGameCurrentPlayerControllerDPad}
		on:select={select}
	>
		D-Pad
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Back L-Analog"
		value={CustomElement.InGameCurrentPlayerControllerAnalogL}
		on:select={select}
	>
		L-Analog
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Back R-Analog"
		value={CustomElement.InGameCurrentPlayerControllerAnalogR}
		on:select={select}
	>
		R-Analog
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Left Analog Stick"
		value={CustomElement.InGameCurrentPlayerControllerAnalogStickL}
		on:select={select}
	>
		Left Analog Stick
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Current Player Right Analog Stick"
		value={CustomElement.InGameCurrentPlayerControllerAnalogStickR}
		on:select={select}
	>
		C-Stick
	</SelectOption>
</div>
