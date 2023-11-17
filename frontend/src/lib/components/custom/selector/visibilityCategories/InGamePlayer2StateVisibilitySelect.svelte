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
	description="When Player 2 Combo Counter Is 3 Or More"
	value={VisibilityOption.InGamePlayer2Combo}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGamePlayer2Combo]}
	on:select={select}
>
	Player 2 Combo*
</SelectOption>
