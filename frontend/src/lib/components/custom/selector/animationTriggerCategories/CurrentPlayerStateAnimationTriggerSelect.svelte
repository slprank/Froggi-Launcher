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
	description="When Current Player Takes Damage"
	value={AnimationTrigger.CurrentPlayerPercent}
	bind:selected={selectedOption[AnimationTrigger.CurrentPlayerPercent]}
	on:select={select}
>
	Damage Increase
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Current Player Loses A Stock"
	value={AnimationTrigger.CurrentPlayerStockLost}
	bind:selected={selectedOption[AnimationTrigger.CurrentPlayerStockLost]}
	on:select={select}
>
	Stock Lost
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Current Player Changes Character (Zelda-Sheik)"
	value={AnimationTrigger.CurrentPlayerCharacterChange}
	bind:selected={selectedOption[AnimationTrigger.CurrentPlayerCharacterChange]}
	on:select={select}
>
	Character Change
</SelectAnimationTriggerOption>
