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
	description="When Player2 Takes Damage"
	value={AnimationTrigger.InGamePlayer2Percent}
	bind:selected={selectedOption[AnimationTrigger.InGamePlayer2Percent]}
	on:select={select}
>
	Damage Increase
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player2 Loses A Stock"
	value={AnimationTrigger.InGamePlayer2StockLost}
	bind:selected={selectedOption[AnimationTrigger.InGamePlayer2StockLost]}
	on:select={select}
>
	Stock Lost
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player 2 Changes Character (Zelda-Sheik)"
	value={AnimationTrigger.InGamePlayer2CharacterChange}
	bind:selected={selectedOption[AnimationTrigger.InGamePlayer2CharacterChange]}
	on:select={select}
>
	Character Change
</SelectAnimationTriggerOption>
