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
		description="Player2 Button A Press"
		value={CustomElement.InGamePlayer2ControllerButtonA}
		on:select={select}
	>
		Button A
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Button B Press"
		value={CustomElement.InGamePlayer2ControllerButtonB}
		on:select={select}
	>
		Button B
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Button X Press"
		value={CustomElement.InGamePlayer2ControllerButtonX}
		on:select={select}
	>
		Button X
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Button Y Press"
		value={CustomElement.InGamePlayer2ControllerButtonY}
		on:select={select}
	>
		Button Y
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Button L Press"
		value={CustomElement.InGamePlayer2ControllerButtonL}
		on:select={select}
	>
		Button L
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Button R Press"
		value={CustomElement.InGamePlayer2ControllerButtonR}
		on:select={select}
	>
		Button R
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Button Z Press"
		value={CustomElement.InGamePlayer2ControllerButtonZ}
		on:select={select}
	>
		Button Z
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Button D-Pad Press"
		value={CustomElement.InGamePlayer2ControllerDPad}
		on:select={select}
	>
		D-Pad
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Back L-Analog"
		value={CustomElement.InGamePlayer2ControllerAnalogL}
		on:select={select}
	>
		L-Analog
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Back R-Analog"
		value={CustomElement.InGamePlayer2ControllerAnalogR}
		on:select={select}
	>
		R-Analog
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Left Analog Stick"
		value={CustomElement.InGamePlayer2ControllerAnalogStickL}
		on:select={select}
	>
		Left Analog Stick
	</SelectOption>
</div>
<div class="flex flex-col gap-2">
	<SelectOption
		description="Player2 Right Analog Stick"
		value={CustomElement.InGamePlayer2ControllerAnalogStickR}
		on:select={select}
	>
		C-Stick
	</SelectOption>
</div>
