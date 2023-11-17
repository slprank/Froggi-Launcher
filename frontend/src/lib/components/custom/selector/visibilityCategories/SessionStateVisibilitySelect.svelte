<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SelectOption from './SelectVisibilityOption.svelte';
	import {
		VisibilityOption,
		type SelectedVisibilityOption,
	} from '$lib/models/types/animationOption';

	export let selectedVisibilityOption: SelectedVisibilityOption;
	const dispatch = createEventDispatcher();

	function select(event: CustomEvent<VisibilityOption>) {
		dispatch('select', event.detail);
	}
</script>

<SelectOption
	description="Placeholder"
	value={VisibilityOption.InGameRunning}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameRunning]}
	on:select={select}
>
	Positive Win Rate*
</SelectOption>
<SelectOption
	description="Placeholder"
	value={VisibilityOption.InGameRunning}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameRunning]}
	on:select={select}
>
	Negative Win Rate*
</SelectOption>
<SelectOption
	description="Placeholder"
	value={VisibilityOption.InGameRunning}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameRunning]}
	on:select={select}
>
	Positive Rating*
</SelectOption>
<SelectOption
	description="Placeholder"
	value={VisibilityOption.InGameRunning}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGameRunning]}
	on:select={select}
>
	Negative Rating*
</SelectOption>
