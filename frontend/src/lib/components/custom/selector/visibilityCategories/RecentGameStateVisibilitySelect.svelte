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
	description="If Current Player Won The Previous Game"
	value={VisibilityOption.PostGameCurrentPlayerWin}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGameCurrentPlayerWin]}
	on:select={select}
>
	Current Player Win
</SelectOption>
<SelectOption
	description="If Current Player Lost The Previous Game"
	value={VisibilityOption.PostGameCurrentPlayerLoss}
	bind:selected={selectedVisibilityOption[VisibilityOption.PostGameCurrentPlayerLoss]}
	on:select={select}
>
	Current Player Loss
</SelectOption>
