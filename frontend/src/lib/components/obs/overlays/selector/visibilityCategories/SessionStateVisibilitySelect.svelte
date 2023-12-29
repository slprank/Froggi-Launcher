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
	description="When You Have A Even Or Positive Win Rate The Current Session"
	value={VisibilityOption.SessionPositiveWinRate}
	bind:selected={selectedVisibilityOption[VisibilityOption.SessionPositiveWinRate]}
	on:select={select}
>
	Positive Win Rate
</SelectOption>
<SelectOption
	description="When You Have A Even Or Net Positive Rating The Current Session"
	value={VisibilityOption.SessionPositiveNetRating}
	bind:selected={selectedVisibilityOption[VisibilityOption.SessionPositiveNetRating]}
	on:select={select}
>
	Positive Rating
</SelectOption>
