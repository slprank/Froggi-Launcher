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
	description="When Player 1 Score Changes"
	value={AnimationTrigger.MatchPlayer1ScoreChange}
	bind:selected={selectedOption[AnimationTrigger.MatchPlayer1ScoreChange]}
	on:select={select}
>
	Player 1 Score Change
</SelectAnimationTriggerOption>

<SelectAnimationTriggerOption
	description="When Player 2 Score Changes"
	value={AnimationTrigger.MatchPlayer2ScoreChange}
	bind:selected={selectedOption[AnimationTrigger.MatchPlayer2ScoreChange]}
	on:select={select}
>
	Player 2 Score Change
</SelectAnimationTriggerOption>
