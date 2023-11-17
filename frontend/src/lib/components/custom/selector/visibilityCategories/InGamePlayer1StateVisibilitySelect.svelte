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
	description="When Player 1 Combo Counter Is 3 Or More"
	value={VisibilityOption.InGamePlayer1Combo}
	bind:selected={selectedVisibilityOption[VisibilityOption.InGamePlayer1Combo]}
	on:select={select}
>
	Player 1 Combo
</SelectOption>
