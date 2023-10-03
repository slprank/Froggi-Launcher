<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		AnimationTrigger,
		type SelectedAnimationTriggerOption,
	} from '$lib/models/types/animationOption';
	import SelectAnimationTriggerOption from './SelectAnimationTriggerOption.svelte';

	export let selectedOption: SelectedAnimationTriggerOption;
	const dispatch = createEventDispatcher();

	function select(event: CustomEvent<AnimationTrigger>) {
		dispatch('select', event.detail);
	}
</script>

<SelectAnimationTriggerOption
	description="When Player1 Takes Damage"
	value={AnimationTrigger.Player1Percent}
	bind:selected={selectedOption[AnimationTrigger.Player1Percent]}
	on:select={select}
>
	Damage Increase
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player1 Loses A Stock"
	value={AnimationTrigger.Player1StockLost}
	bind:selected={selectedOption[AnimationTrigger.Player1StockLost]}
	on:select={select}
>
	Stock Lost
</SelectAnimationTriggerOption>
