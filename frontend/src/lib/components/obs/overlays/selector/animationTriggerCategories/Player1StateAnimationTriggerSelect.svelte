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
	value={AnimationTrigger.InGamePlayer1Percent}
	bind:selected={selectedOption[AnimationTrigger.InGamePlayer1Percent]}
	on:select={select}
>
	Damage Increase
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player1 Loses A Stock"
	value={AnimationTrigger.InGamePlayer1StockLost}
	bind:selected={selectedOption[AnimationTrigger.InGamePlayer1StockLost]}
	on:select={select}
>
	Stock Lost
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player 1 Changes Character (Zelda-Sheik)"
	value={AnimationTrigger.InGamePlayer1CharacterChange}
	bind:selected={selectedOption[AnimationTrigger.InGamePlayer1CharacterChange]}
	on:select={select}
>
	Character Change
</SelectAnimationTriggerOption>
